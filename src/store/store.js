import Vue from "vue";
import Vuex from "vuex";
import * as types from "./types";
import survey from "./modules/survey";
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    survey
  },
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
      state.name = data.name;
    },
    [types.SIGNOUT]: state => {
      state.token = null;
      state.userId = null;
      state.name = null;
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
