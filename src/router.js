import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Sign from "./views/Sign.vue";
import User from "./views/User.vue";
import UserInfo from "./views/user/UserInfo.vue";
import Preview from "./views/questionaire/Preview.vue";
import Survey from "./views/questionaire/Survey.vue";
import store from "./store/store";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/user",
      name: "user",
      component: User,
      children: [
        {
          path: "info",
          name: "userInfo",
          component: UserInfo
        }
      ]
    },
    {
      path: "/sign",
      name: "sign",
      component: Sign
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/preview",
      name: "preview",
      component: Preview
    },
    {
      path: "/survey",
      name: "survey",
      component: Survey
    }
  ]
  /*
  beforeEach: (to, from, next) => {
    // 拦截白名单
    const whitePages = ["/sign", "/about", "/", "/404"];
    console.log(!whitePages.includes(to.path));
    console.log(!store.state.token);
    if (!whitePages.includes(to.path) && !store.state.token) {
      next("/sign");
    } else {
      next();
    }
  }
  */
});
