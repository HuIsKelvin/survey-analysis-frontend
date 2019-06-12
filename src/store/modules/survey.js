"use strict";

import Vue from "vue";
import ElementUI from 'element-ui'

export default {
  namespaced: true,
  state: {

    // 答卷的题型的默认值
    valueType: {
      radio: 0,
      checkbox: [],
      textarea: "",
      scale: 0,
      rate: 0,
      sort: [],
      textInput: "",
      numInput: 0
    },

    // 是否提交答卷
    submitFlag: false,

    // 问卷对象
    userQuestionList: {
      name: "my first questionire",
      id: 123456,
      questionList: [
        {
          type: "radio",
          index: 1,
          title: "题目1",
          isRequired: true,
          content: {
            options: ["ans1", "ans2", "ans3", "ans4"]
          },
          jumpLogic: [
            {
              startValue: 0,
              endValue: 5
            },
            {
              startValue: 1,
              endValue: 3
            }
          ]
        },
        {
          type: "checkbox",
          index: 2,
          title: "题目2",
          isRequired: false,
          content: {
            options: ["ans1", "ans2", "ans3", "ans4"]
          }
        },
        {
          type: "textarea",
          index: 3,
          title: "题目3",
          isRequired: true,
          content: {
          }
        },
        {
          type: "scale",
          index: 4,
          title: "题目4",
          isRequired: true,
          content: {
            max: 5,
            min: 1
          }
        },
        {
          type: "rate",
          index: 5,
          title: "题目5",
          isRequired: true,
          content: {
            max: 5
          }
        },
        {
          type: "description",
          index: 0,
          title: "段落描述"
        },
        {
          type: "sort",
          index: 6,
          isRequired: false,
          title: "排序题",
          content: {
            options: ["ans1", "ans2", "ans3", "ans4"]
          }
        },
        {
          type: "textInput",
          index: 7,
          title: "文字输入题",
          isRequired: false
        },
        {
          type: "numInput",
          index: 8,
          title: "数字输入题",
          isRequired: false
        }
      ]
    },

    // 答卷对象
    answerSheet: {
      quesId: 0,
      answer: []
    }
  },
  getters: {
    // surveyQuestionList(state) {
    //   // 显示isShow==true的题
    //   let result = state.userQuestionList.questionList.filter(el => {
    //     return (el.isShow === true) && (el.currentPage === state.currentPage) && (el.type !== "pagination");
    //   });
    //   console.log("show question: " + result);
    //   return result;
    // },
    surveyQuestionire(state) {
      return state.userQuestionList;
    },
    answerSheet(state) {
      return state.answerSheet;
    },
    getContentByIndex: state => index => {
      return state.answerSheet.answer[index - 1]["data"];
    }
  },
  mutations: {
    setQuestionire(state, payload) {
      state.userQuestionList = payload.questionire;
      console.log("after set questionire");
      // console.log(state.userQuestionList);
      this.commit("survey/prepareQuestionList");
      this.commit("survey/generateAnswerSheet");
    },

    // 将接收的 questionList 进行整备，增加相应字段
    prepareQuestionList(state) {
      state.userQuestionList.questionList.forEach(element => {
        Vue.set(element, "isShow", true);

        // 增加提示字段
        // Vue.set(element, "tipMsg", "");
      });
      console.log("prepare questionList");
      // console.log(state.userQuestionList.questionList);
    },

    // 生成默认答卷
    generateAnswerSheet(state) {
      state.answerSheet = {
        quesId: state.userQuestionList.questionnaireId,
        answer: []
      };
      state.userQuestionList.questionList.forEach(el => {

        // 跳过 段落说明 和 分页
        if (el.type === "description" || el.type === "pagination") { return; }

        let answer = {
          type: el.type,
          data: state["valueType"][el.type]
        };
        state.answerSheet.answer.push(answer);
      });
      console.log("generate answerSheet");
      console.log(state.answerSheet);
    },

    // 更新答卷的值
    // payload = {qindex:number, value: number|array}
    updateValue(state, payload) {
      if (payload.value && state.answerSheet.answer[payload.qindex - 1]) {
        state.answerSheet.answer[payload.qindex - 1]["data"] = payload.value;
        console.log("after update");
        console.log(state.answerSheet.answer[payload.qindex - 1]);
      }
    },

    // 跳转逻辑
    // payload 包含 startIndex, jumpLogic, option
    jumpQestion(state, payload) {
      // 当前题目 index
      let startIndex = parseInt(payload.startIndex);
      let jumpLogic = payload.jumpLogic;
      // 当前选中的 选项
      let option = parseInt(payload.option);
      if(!option) return;
      // 跳转到的题目 index
      let endIndex = -1;
      if(jumpLogic[option - 1]) {
        endIndex = parseInt(jumpLogic[option - 1].endValue);
      }
      // 找到这个 jumpLogic 中跳到最远的题
      let maxEndIndex = 0;
      jumpLogic.forEach(el => {
        if(maxEndIndex < el.endValue) maxEndIndex = el.endValue;
      })
      // 问卷列表
      let qList = state.userQuestionList.questionList;

      let i = (startIndex - 1) >= 0 ? (startIndex - 1) : 0;
      while (qList[i].index <= maxEndIndex) {
        if (qList[i].index > startIndex && qList[i].index < endIndex) {
          state.userQuestionList.questionList[i].isShow = false;
        } else {
          state.userQuestionList.questionList[i].isShow = true;
        }
        i++;
      }
      console.log(state.userQuestionList.questionList);
    },

    // 发送已填写的问卷
    submitAnswerSheet(state, payload) {
      let qid = payload.qid;
      this.commit("survey/checkRequiredQuestion");
      
      // 若可以发送
      if(state.submitFlag) {
        console.log("from vuex: submit answer");
        this.commit("survey/prepareAnswerToSubmit");
        console.log(state.answerSheet);
        // state.answerSheet.quesId = 15626231503;
        // 发送答卷
        axios.post("/answerSheet/save?qid=" + qid, state.answerSheet)
          .then(res => {
            console.log("submit success!!!");
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          })
      } else {
        // 提示未填完
        ElementUI.Message({
          showClose: true,
          message: "您有必做题还未填！",
          type: "error"
        });
      }
    },

    // 遍历检查必做题是否已做
    checkRequiredQuestion(state) {
      state.submitFlag = true;
      // 答卷的答案数据
      let answer = state.answerSheet.answer;
      // 遍历检查
      state.userQuestionList.questionList.forEach(question => {
        // 排除分页、段落说明等题目
        if(question.index <= 0) { return; }
        if(question.isRequired && question.isShow) {
          let data = answer[question.index-1]["data"];
          if(data === null || data === 0 || data === [] || data === " ") {
            state.submitFlag = false;
          }
        }
      })
    },

    // 发送答卷前，预处理
    // 将非必答题，且未答的题目答案，设为null
    prepareAnswerToSubmit(state) {
      // 答卷的答案数据
      let answer = state.answerSheet.answer;
      state.userQuestionList.questionList.forEach(question => {
        // 排除分页、段落说明等题目
        if(question.index <= 0) { return; }
        let ansData = answer[question.index-1]["data"];
        if(!question.isShow) {
          // 题目被跳转逻辑隐藏
          ansData = -3;
        } else {
          // 用户未答该题，且不是必做题
          // 因为必做题已经检验过了
          if(ansData === null || ansData === 0 || ansData.length === 0) {
            answer[question.index-1]["data"] = null;
          }
        }
      })
    }
  },
  actions: {

    // 用于测试，到时删除此方法
    prepareQuestionList(context) {
      context.commit("prepareQuestionList");
      context.commit("generateAnswerSheet");
    },

    // 将问卷对象 set 到 state
    setQuestionire(context, payload) {
      context.commit("setQuestionire", payload);
      // context.commit("generateAnswerSheet");
    },

    // 生成答卷对象
    generateAnsSheet(context) {
      context.commit("generateAnswerSheet");
    },

    // 跳题逻辑
    jumpQuestion(context, payload) {
      context.commit("jumpQestion", payload);
    },

    // 更新某题目答案
    updateValue(context, payload) {
      context.commit("updateValue", payload);
    },

    // 提交问卷
    submitAnswerSheet(context, payload) {
      context.commit("submitAnswerSheet", payload);
    }
  }
};
