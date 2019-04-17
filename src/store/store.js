import Vue from "vue";
import Vuex from "vuex";
import * as types from "./types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    token: null,
    userQuestionList: {
      questionnaireTitle: "",
      introContents: "",
      questionList: [],
      endContents: ""
    }
  },
  mutations: {
    [types.SIGNIN]: (state, data) => {
      localStorage.token = data;
      state.token = data;
    },
    [types.SIGNOUT]: state => {
      localStorage.removeItem("token");
      state.token = null;
    },
    // [types.SET_USER_QUESTIONLIST]: (state, questionList) => {
    //   state.userQuestionList.questionList = questionList;
    // },
    [types.SET_INTROCONTENTS]: (state, introContents) => {
      state.userQuestionList.introContents = introContents;
    },
    [types.SET_QUESTIONAIRETITLE]: (state, questionnaireTitle) => {
      state.userQuestionList.questionnaireTitle = questionnaireTitle;
    },
    [types.SET_QUESTIONAIREEND]: (state, endContents) => {
      state.userQuestionList.endContents = endContents;
    }
  },
  actions: {},
  getters: {
    introContents: state => state.userQuestionList.introContents
  }
});
