import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import store from "./store/store.js";
import store from "./store/index.js";// 用index.js替换了原来的store.js
import "./plugins/element.js";
import "./plugins/VueQrcode.js";
import axios from "./plugins/axios.js";
import "@/assets/css/override-element-ui.css";
import "@/assets/font/font_4.15/iconfont.css";
// 过渡动画css
import "@/assets/css/v-animate.css";

//Vue.prototype.$http = axios;

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
  axios,
  render: h => h(App)
}).$mount("#app");
