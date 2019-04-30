import Vue from "vue";
import Vuex from "vuex";
import * as types from "./types";
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    userId: null,
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
      state.token = data.token;
      state.userId = data.userId;
    },
    [types.SIGNOUT]: state => {
      state.token = null;
      state.userId = null;
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
