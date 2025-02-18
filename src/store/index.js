/**
 * 在main.js导入本文件并注册
 * 用于组装getters.js questionnaire.js,
 */
import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import questionnaire from "./modules/questionnaire.js";
import getters from "./getters.js";
import survey from "./modules/survey.js";
import user from "./modules/user.js";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  getters,
  modules: {
    questionnaire,
    survey,
    user
  }
});
