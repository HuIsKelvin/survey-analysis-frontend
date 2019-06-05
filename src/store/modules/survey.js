import Vue from "vue";
import ElementUI from 'element-ui'

export default {
  namespaced: true,
  state: {
    // 答卷的题型的默认值
    valueType: {
      radio: 0,
      checkouBox: [],
      text: "",
      scale: 0,
      rate: 0,
      sort: []
    },
    // 是否提交答卷
    submitFlag: false,
    questionire: {
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
          jumpLogic: {
            0: 3,
            1: 5
          }
        },
        {
          type: "checkBox",
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
            input: "shuru"
          }
        },
        {
          type: "scale",
          index: 4,
          title: "题目4",
          isRequired: true,
          content: {
            top: 5
          }
        },
        {
          type: "rate",
          index: 5,
          title: "题目5",
          isRequired: true,
          content: {
            top: 5
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
        }
      ]
    },
    answerSheet: {
      quesId: 0,
      answer: []
    }
  },
  getters: {
    surveyQuestionList(state) {
      // 显示isShow==true的题
      return state.questionire.questionList.filter(el => {
        return el.isShow === true;
      });
    },
    surveyQuestionire(state) {
      return state.questionire;
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
      state.questionire = payload.questionire;
      this.commit("survey/generateAnswerSheet");
    },
    // 将接收的 questionList 进行整备，增加相应字段
    prepareQuestionList(state) {
      state.questionire.questionList.forEach(element => {
        Vue.set(element, "isShow", true);
        // 增加提示字段
        // Vue.set(element, "tipMsg", "");
      });
      console.log(state.questionire.questionList);
    },
    // 生成默认答卷
    generateAnswerSheet(state) {
      state.answerSheet = {
        quesId: state.questionire.id,
        answer: []
      };
      state.questionire.questionList.forEach(el => {
        if (el.type === "description") {
          return;
        }
        let answer = {
          type: el.type,
          data: state["valueType"][el.type]
        };
        state.answerSheet.answer.push(answer);
      });
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
    // 发送已填写的问卷
    submitAnswerSheet(state, payload) {
      let qid = payload.qid;
      this.commit("survey/checkRequiredQuestion");
      
      // 若可以发送
      if(state.submitFlag) {
        console.log("from vuex: submit answer");
        this.commit("survey/prepareAnswerToSubmit");
        console.log(state.answerSheet);
        // 发送答卷
        // axios.post("url/answersheet/" + qid)
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
      state.questionire.questionList.forEach(question => {
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
      state.questionire.questionList.forEach(question => {
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
    setQuestionire(context) {
      context.commit("setQuestionire", payload);
      // context.commit("generateAnswerSheet");
    },
    generateAnsSheet(context) {
      context.commit("generateAnswerSheet");
    },
    updateValue(context, payload) {
      context.commit("updateValue", payload);
    },
    submitAnswerSheet(context, payload) {
      context.commit("submitAnswerSheet", payload);
    }
  }
};
