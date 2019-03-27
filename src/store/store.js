import Vue from "vue";
import Vuex from "vuex";
import * as types from "./types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    token: null
  },
  mutations: {
    [types.SIGNIN]: (state, data) => {
      localStorage.token = data;
      state.token = data;
    },
    [types.SIGNOUT]: state => {
      localStorage.removeItem("token");
      state.token = null;
    }
  },
  actions: {}
});
