export default {
  namespaced: true,
  state: {
    questionList: [
      {
        type: "radio",
        index: 1,
        title: "题目1",
        isRequired: false,
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
        isRequired: true,
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
      }
    ],
    answerSheet: [
      {
        type: "radio",
        content: 2
      },
      {
        type: "checkbox",
        content: [1, 2]
      },
      {
        type: "text",
        content: ""
      }
    ]
  },
  getters: {
    surveyQuestionList(state) {
      return state.questionList;
    },
    answerSheet(state) {
      return state.answerSheet;
    }
  },
  mutations: {
    updateValue(state, payload) {
      if (payload.value) {
        this.answerSheet[payload.index - 1]["content"] = payload.value;
      }
      console.log("from survey:" + payload);
    }
  },
  actions: {
    updateValue(context, payload) {
      console.log(payload)
      context.commit("updateValue", payload);
    }
  }
};
