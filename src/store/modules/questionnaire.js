import * as types from "../types";
// import createPersistedState from 'vuex-persistedstate'

export default {
  // plugins: [createPersistedState()],
  state: {
    pageManage: {
      isClick: false
    },
    userQuestionList: {
      userID: "1234",
      questionnaireTitle: "",
      introContents: "",
      endContents: "",
      questionList: [
        {
          type: "radio", // 题目类型，单选radio，多选checkbox，填空textarea
          index: 1, // 题目序号
          title: "", // 题目标题
          isRequired: true, // 是否必填 true | false
          content: {
            // 题目内容
            options: ["item1", "item2"] // 单选选项
          }
        },
        {
          type: "checkbox",
          content: {
            options: ["item1", "item2"]
          }
        },
        {
          type: "sequence",
          content: {
            options: ["item1", "item2"]
          }
        },
        {
          type: "scale",
          content: {
            // min: 1,
            max: 5
          }
        },
        {
          type: "score",
          content: {
            min: 1,
            max: 10
          }
        },
        {
          type: "text",
          content: {
            input: ""
          }
        }
      ],
      jumpLogic: {
        // 跳转逻辑
        0: 3, // 选项对应跳到的题号
        1: 5
      }
    }
  },
  mutations: {
    [types.SET_ISCLICK]: (state, boolean) => {
      state.pageManage.isCLICK = boolean;
    },
    [types.SET_USERID]: (state, userID) => {
      state.userQuestionList.userID = userID;
    },
    [types.SET_QUESTIONNAIRE_TITLE]: (state, questionnaireTitle) => {
      state.userQuestionList.questionnaireTitle = questionnaireTitle;
    },
    [types.SET_QUESTIONNAIRE_INTRO]: (state, introContents) => {
      state.userQuestionList.introContents = introContents;
    },
    [types.SET_QUESTIONNAIRE_END]: (state, endContents) => {
      state.userQuestionList.endContents = endContents;
    },
    [types.SET_QUESTIONLIST]: (state, questionList) => {
      state.userQuestionList.questionList = questionList;
    },
    [types.SET_JUMPLOGIC]: (state, jumplogic) => {
      state.userQuestionList.jumplogic = jumplogic;
    },
    [types.ADD_QUESTIONLIST_OBJECT]: (state, obj) => {
      state.userQuestionList.questionList.push(obj);
    },
    [types.DELETE_QUESTIONLIST_OBJECT]: (state, index) => {
      state.userQuestionList.questionList.splice(index, 1);
    },
    // 拽拖更新questionList数组排序
    [types.UPDATE_QUESTIONLIST]: (state, value) => {
      state.userQuestionList.questionList = value;
    },
    [types.ADD_QUESTION_OPTION_ITEM]: (state, index) => {
      state.userQuestionList.questionList[index].content.options.push("选项");
    },
    [types.CHANGE_QUESTIONLIST_VALUE]: (state, obj) => {
      let qList = state.userQuestionList.questionList;
      if (obj.type == "title") {
        qList[obj.index][obj.type] = obj.content;
      }
      if (obj.type == "options") {
        qList[obj.QIndex].content[obj.type][obj.iIndex - 1] = obj.iString;
      }
      state.userQuestionList.questionList = qList;
    }
  },
  actions: {
    update(context, value) {
      context.commit("update_questionList", value);
    }
  },
  getters: {
    isClick: state => state.pageManage.isClick,
    q_userID: state => state.userQuestionList.userID,
    questionnaireTitle: state => state.userQuestionList.questionnaireTitle,
    introContents: state => state.userQuestionList.introContents,
    endContents: state => state.userQuestionList.endContents,
    questionList: state => state.userQuestionList.questionList,
    jumplogic: state => state.userQuestionList.jumplogic
  }
}