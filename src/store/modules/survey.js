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
      }
    ],
    answerSheet: {}
  },
  getters: {
    surveyQuestionList(state) {
      return state.questionList;
    }
  },
  mutations: {},
  actions: {}
};
