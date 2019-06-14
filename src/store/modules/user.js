import * as types from "../types";

export default {
  state: {
    userId: null,
    token: null,
    name: ""
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
  }
}