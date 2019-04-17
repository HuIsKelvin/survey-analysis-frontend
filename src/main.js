import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import "./plugins/element.js";
import axios from "./plugins/axios.js";
import "./plugins/vcharts";
import "@/assets/css/override-element-ui.css";
import "@/assets/css/questionEdit.css";
import "@/assets/font/font_4.15/iconfont.css";

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

//router.beforeEach((to, from, next) => {
//  // 拦截白名单
//  const whitePages = ["/sign", "/about", "/", "/404"];
//  console.log(!whitePages.includes(to.path));
//  console.log(!store.state.token);
//  if (!whitePages.includes(to.path) && !store.state.token) {
//    next("/sign");
//  } else {
//    next();
//  }
//});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
