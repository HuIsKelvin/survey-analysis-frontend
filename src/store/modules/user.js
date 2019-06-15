import * as types from "../types";

export default {
  state: {
    // userId: "5d04ffea0c34424e5660a13b", // xnuiui的userId
    userId: null,
    token: null,
    name: ""
  },
  mutations: {
    [types.SIGNIN]: (state, data) => {
      console.log(data);
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