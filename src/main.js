import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import store from "./store/store.js";
import store from "./store/index.js"; // 用index.js替换了原来的store.js
import "./plugins/element.js";
import "./plugins/VueQrcode.js";
import axios from "./plugins/axios.js";
import "@/assets/css/override-element-ui.css";
// 过渡动画css
import "@/assets/css/v-animate.css";

// Font Awesome图标字体库 只安装了regular样式
// https://fontawesome.com/icons?d=gallery&q=square&s=regular&m=free 查询想要的图标
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeLayers,
  FontAwesomeLayersText
} from "@fortawesome/vue-fontawesome";
library.add(far);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("font-awesome-layers", FontAwesomeLayers);
Vue.component("font-awesome-layers-text", FontAwesomeLayersText);

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
