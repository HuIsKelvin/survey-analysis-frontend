import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Sign from "./views/Sign.vue";
import User from "./views/User.vue";
import FindPwd from "./views/FindPwd.vue";
import UserInfo from "./views/user/UserInfo.vue";
import Preview from "./views/questionaire/Preview.vue";
import Survey from "./views/questionaire/Survey.vue";
import Manage from "./views/questionaire/Manage.vue";
import store from "./store/store";
import questionEdit from "./views/questionaire/questionEdit.vue";

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
          path: "/",
          name: "",
          // component: UserInfo
          redirect: { name: "questionireManage" }
        },
        {
          path: "info",
          name: "userInfo",
          component: UserInfo
        },
        {
          path: "manage",
          name: "questionireManage",
          component: Manage
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
    },
    {
      path: "/questionEdit",
      name: "questionEdit",
      component: questionEdit
    },
    {
      path: "/findPwd",
      name: "findPwd",
      component: FindPwd
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
