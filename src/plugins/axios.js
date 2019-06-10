"use strict";

import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import store from "../store/store";
import * as types from "../store/types";
import router from "../router";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: "http://localhost:8080",
  baseURL: "http://47.103.9.83:8080",
  timeout: 5000
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    if (store.state.token) {
      config.headers.Authorization = `token ${store.state.token}`;
    }

    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          store.commit(types.SIGNOUT);
          router.currentRoute.path !== "sign" &&
            router.replace({
              path: "sign",
              query: { redirect: router.currentRoute.path }
            });
      }
    }
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    }
  });
};

Vue.use(Plugin, VueAxios);

export default Plugin;
