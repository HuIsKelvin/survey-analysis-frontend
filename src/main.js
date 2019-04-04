import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import "./plugins/element.js";
import "./plugins/axios.js";
import "./plugins/vcharts";

Vue.config.productionTip = false;

// router.beforeEach((to, from, next) => {
//   // 拦截白名单
//   const whitePages = ["/sign", "/about", "/", "/404"];
//   console.log(!whitePages.includes(to.path));
//   console.log(!store.state.token);
//   if (!whitePages.includes(to.path) && !store.state.token) {
//     next("/sign");
//   } else {
//     next();
//   }
// });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
