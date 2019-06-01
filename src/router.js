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
import CreateQuestionnaire from "./views/questionaire/CreateQuestionnaire.vue";
// import store from "./store/store";
import QuestionEdit from "./views/questionaire/QuestionEdit.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Sign
    },
    {
      path: "/user",
      component: User,
      children: [
        {
          path: "/",
          name: "user",
          redirect: { name: "user.manage" }
        },
        {
          path: "info",
          name: "user.info",
          component: UserInfo
        },
        {
          path: "manage",
          name: "user.manage",
          component: Manage
        },
        {
          path: "createQuestionnaire",
          name: "createQuestionnaire",
          component: CreateQuestionnaire
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
      path: "/survey/:qid",
      name: "survey",
      component: Survey
    },
    {
      path: "/questionEdit/:qid",
      name: "questionEdit",
      component: QuestionEdit
    },
    {
      path: "/findPwd",
      name: "findPwd",
      component: FindPwd
    },
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
