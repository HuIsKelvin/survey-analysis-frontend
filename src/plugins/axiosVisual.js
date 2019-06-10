"use strict";

import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: "http://localhost:8080",
  baseURL: "http://47.103.9.83:4000",
  timeout: 5000
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);


Plugin.install = function(Vue) {
  Vue.axiosVisual = _axios;
  window.axiosVisual = _axios;
  Object.defineProperties(Vue.prototype, {
    axiosVisual: {
      get() {
        return _axios;
      }
    },
    $axiosVisual: {
      get() {
        return _axios;
      }
    }
  });
};

Vue.use(Plugin, VueAxios);

export default Plugin;