import * as types from "../types";
// import createPersistedState from 'vuex-persistedstate'

export default {
  // plugins: [createPersistedState()],
  state: {
    pageManage: {
      isClick: false
    },
    userQuestionList: {
      userId: "1234",
      questionnaireTitle: "",
      // name: "",
      introContents: "",
      // comment: "",
      endContents: "",
      // endComment: "",
      // beginTime: "",
      // endTime: "",
      pagination: {
        isPagination: false,
        totalPage: 0,
        index: []
      },
      totalQuestionNum: 0,
      questionList: [
        {
          // 题目类型，单选radio || 多选checkbox || 排序sort || 填空textarea
          // 打分rate || 量表scale || 段落说明description || 名字name ||
          // 性别sex || 年龄age || 地址address
          type: "radio",
          index: 1, // 题号
          title: "单选题", // 题目标题
          isRequired: true, // 是否必填 true || false， 默认true
          content: {
            // 题目内容
            options: ["item1", "item2"], // radio，checkbox，sort‘类型有意义
            max: 5, // rate，scale有意义
            min: 1, // rate，scale有意义
            input: "" // textarea，name，sex，age，address有意义
          },
          jumpLogic: [
            // 跳转逻辑。radio，checkbox有意义
            {
              startValue: "1.北京",
              endValue: "Q1.xxxxxx"
            }
          ]
        }
      ]
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
    [types.SET_TOTALQUESTIONNUM]: (state, num) => {
      state.userQuestionList.totalQuestionNum = num;
    },
    [types.SET_USERQUESTIONLIST]: (state, num) => {
      state.userQuestionList.totalQuestionNum = num;
    },
    [types.SET_USERQUESTIONLIST]: (state, userQuestionList) => {
      state.userQuestionList = userQuestionList;
    },
    [types.SET_QUESTIONLIST]: (state, questionList) => {
      state.userQuestionList.questionList = questionList;
    },
    [types.SET_JUMPLOGIC]: (state, obj) => {
      state.userQuestionList.questionList[obj.qIndex].jumpLogic = obj.jumpLogic;
    },
    [types.ADD_QUESTIONLIST_OBJECT]: (state, obj) => {
      state.userQuestionList.questionList.push(obj);
    },
    [types.DELETE_QUESTIONLIST_OBJECT]: (state, index) => {
      state.userQuestionList.questionList.splice(index, 1);
    },
    // 拽拖更新questionList数组排序
    [types.UPDATE_QUESTIONLIST]: (state, value) => {
      let count = 1; // 题目计数
      let pageCount = 2; // 分页计数
      for (let q in value) {
        if (q.type == "pagination") {
          q.index = pageCount;
          pageCount++;
        } else if (q.type == "description") {
          q.index = -1;
        } else {
          q.index = count;
          count++;
        }
      }
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
        qList[obj.QIndex].content[obj.type][obj.iIndex] = obj.iString;
      }
      state.userQuestionList.questionList = qList;
    },
    [types.SET_ISPAGINATION]: (state, boolean) => {
      state.userQuestionList.pagination.isPagination = boolean;
    },
    [types.SET_TOTALPAGE]: (state, totalPageNum) => {
      state.userQuestionList.pagination.totalPage = totalPageNum;
    },
    // 设置题目是否必填
    [types.SET_ISREQUEIRED]: (state, obj) => {
      // console.log(obj.qIndex);
      state.userQuestionList.questionList[obj.qIndex].isRequired = obj.isRequired;
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
    isPagination: state => state.userQuestionList.pagination.isPagination,
    totalPage: state => state.userQuestionList.pagination.totalPage,
    totalQuestionNum: state => state.userQuestionList.totalQuestionNum
  }
}