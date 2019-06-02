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
      rate: 0
    },
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
          type: "text",
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
    answerSheet: []
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
      return state.answerSheet[index - 1]["content"];
    }
  },
  mutations: {
    setQuestionire(state, payload) {
      state.questionire = payload.questionire;
    },
    // 将接收的 questionList 进行整备，增加相应字段
    prepareQuestionList(state) {
      state.questionire.questionList.forEach(element => {
        Vue.set(element, "isShow", true);
        Vue.set(element, "tipMsg", "");
      });
      console.log(state.questionire.questionList);
    },
    // 生成默认答卷
    generateAnswerSheet(state) {
      state.answerSheet = [];
      state.questionire.questionList.forEach(el => {
        if (el.type === "description") {
          return;
        }
        let answer = {
          type: el.type,
          content: state["valueType"][el.type]
        };
        state.answerSheet.push(answer);
      });
    },
    // 更新答卷的值
    // payload = {qindex:number, value: number|array}
    updateValue(state, payload) {
      if (payload.value && state.answerSheet[payload.qindex - 1]) {
        state.answerSheet[payload.qindex - 1]["content"] = payload.value;
        console.log("after update");
        console.log(state.answerSheet[payload.qindex - 1]);
      }
    },
    // 发送已填写的问卷
    submitAnswerSheet(state, payload) {
      // let qid = payload.qid;
      // axios.post("url/answersheet/" + qid)
      console.log("-------------------");
      console.log("from vuex: submit answer");
      console.log(payload.qid);
      console.log("-------------------");

      // 弹出消息提示
      ElementUI.Message({
        showClose: true,
        message: "未填完！",
        type: "error"
      })
    }
  },
  actions: {
    // 用于测试，到时删除此方法
    prepareQuestionList(context) {
      context.commit("prepareQuestionList");
    },
    setQuestionire(context) {
      context.commit("setQuestionire");
      context.commit("generateAnswerSheet");
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
