import Vue from "vue";

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
    questionList: [
      {
        type: "radio",
        index: 1,
        title: "题目1",
        isRequired: true,
        content: {
          options: ["ans1", "ans2"]
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
          options: ["ans1", "ans2"]
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
      }
    ],
    answerSheet: []
  },
  getters: {
    surveyQuestionList(state) {
      // 显示isShow==true的题
      return state.questionList.filter(el => {
        return el.isShow === true;
      });
    },
    answerSheet(state) {
      return state.answerSheet;
    },
    getContentByIndex: state => index => {
      return state.answerSheet[index - 1]["content"];
    }
  },
  mutations: {
    // 将接收的 questionList 进行整备，增加相应字段
    prepareQuestionList(state) {
      state.questionList.forEach(element => {
        Vue.set(element, "isShow", true);
      });
    },
    // 生成默认答卷
    generateAnswerSheet(state) {
      state.answerSheet = [];
      state.questionList.forEach(el => {
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
    }
  },
  actions: {
    // 用于测试，到时删除此方法
    prepareQuestionList(context) {
      context.commit("prepareQuestionList");
    },
    generateAnsSheet(context) {
      context.commit("generateAnswerSheet");
    },
    updateValue(context, payload) {
      context.commit("updateValue", payload);
    }
  }
};
