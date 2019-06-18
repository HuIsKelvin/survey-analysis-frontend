import * as types from "../types";
// import createPersistedState from 'vuex-persistedstate'

export default {
  namespaced: true,
  // plugins: [createPersistedState()],
  state: {
    pageManage: {
      isClick: false,
      addJumpLogicIsClick: false,
      iconMinusIsClick: false
    },
    userQuestionList: {
      userId: "5d03933f0c34420825f479ed",
      id: "5cfd22309a9f101ca60a5686",
      state: false, // false未发布 || true已发布
      name: "问卷标题",
      comment: "问卷头部说明",
      endComment: "您已完成本次问卷，感谢您的帮助与支持！",
      numLimit: 0,
      beginTime: "Sun May 05 2019 23:52:45 GMT+0800 (中国标准时间)",
      endTime: "Tue Jun 04 2019 23:52:45 GMT+0800 (中国标准时间)",
      pagination: {
        isPagination: false,
        totalPage: 0
      },
      totalQuestionNum: 0,
      questionList: [
        {
          // 题目类型，单选radio || 多选checkbox || 排序sort || 填空textarea
          // 打分rate || 量表scale || 段落说明description || 短文字填空textInput ||
          // 数字填空numInput
          type: "radio",
          index: 1, // 题号，从1开始，pagination和description类型都为0
          currentPage: 2, // 分页编号，从2开始
          title: "单选题", // 题目标题
          isRequired: true, // 是否必填 true || false， 默认true
          content: {
            // 题目内容
            options: ["item1", "item2"], // radio，checkbox，sort类型有意义
            max: 5, // rate，scale有意义
            min: 1 // rate，scale有意义
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
    [types.SET_PAGEMANAGE]: (state, obj) => {
      if (obj.type == "all") {
        state.pageManage = obj.pageManage;
      } else {
        state.pageManage[obj.type] = obj.boolean;
      }
    },
    [types.SET_USERID]: (state, userID) => {
      state.userQuestionList.userID = userID;
    },
    [types.SET_STATE]: (state, boolean) => {
      state.userQuestionList.state = boolean;
    },
    [types.SET_QUESTIONNAIREID]: (state, questionnaireId) => {
      state.userQuestionList.id = questionnaireId;
    },
    [types.SET_QUESTIONNAIRE_TITLE]: (state, questionnaireTitle) => {
      state.userQuestionList.name = questionnaireTitle;
    },
    [types.SET_QUESTIONNAIRE_INTRO]: (state, introContents) => {
      state.userQuestionList.comment = introContents;
    },
    [types.SET_QUESTIONNAIRE_END]: (state, endContents) => {
      state.userQuestionList.endComment = endContents;
    },
    [types.SET_TOTALQUESTIONNUM]: (state, num) => {
      state.userQuestionList.totalQuestionNum = num;
    },
    [types.SET_USERQUESTIONLIST]: (state, userQuestionList) => {
      state.userQuestionList = userQuestionList;
    },
    [types.SET_BEGINANDENDTIME]: (state, arr) => {
      state.userQuestionList.beginTime = arr[0];
      state.userQuestionList.endTime = arr[1];
    },
    [types.SET_NUMLIMIT]: (state, num) => {
      state.userQuestionList.numLimit = num;
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
      state.userQuestionList.questionList = value;
    },
    [types.ADD_QUESTION_OPTION_ITEM]: (state, index) => {
      state.userQuestionList.questionList[index].content.options.push("选项");
    },
    [types.DELETE_QUESTION_OPTION_ITEM]: (state, obj) => {
      state.userQuestionList.questionList[obj.qIndex].content.options.splice(obj.iIndex, 1);
    },
    [types.CHANGE_QUESTIONLIST_VALUE]: (state, obj) => {
      let qList = state.userQuestionList.questionList;
      if (obj.type == "title") {
        qList[obj.index][obj.type] = obj.content;
      }
      if (obj.type == "options") {
        qList[obj.QIndex].content[obj.type][obj.iIndex] = obj.iString;
      }
      if (obj.type == "max") {
        qList[obj.QIndex].content[obj.type] = obj.maxScore;
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
    userQuestionList: state => state.userQuestionList,
    // isClick: state => state.pageManage.isClick,
    pageManage: state => state.pageManage,
    q_userID: state => state.userQuestionList.userID,
    q_state: state => state.userQuestionList.state,
    questionnaireId: state => state.userQuestionList.id,
    questionnaireTitle: state => state.userQuestionList.name,
    introContents: state => state.userQuestionList.comment,
    endContents: state => state.userQuestionList.endComment,
    beginTime: state => state.userQuestionList.beginTime,
    endTime: state => state.userQuestionList.endTime,
    numLimit: state => state.userQuestionList.numLimit,
    questionList: state => state.userQuestionList.questionList,
    isPagination: state => state.userQuestionList.pagination.isPagination,
    totalPage: state => state.userQuestionList.pagination.totalPage,
    totalQuestionNum: state => state.userQuestionList.totalQuestionNum
  }
}