import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Sign from "./views/Sign.vue";
import User from "./views/User.vue";
import Store from "./store/store";

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
      component: User
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
    }
  ],
  beforeEach: (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!Store.state.token) {
        next({
          path: "/sign",
          query: { redirect: to.fullPath }
        });
      } else {
        next();
      }
    } else {
      next();
    }
  }
});
