import Vue from "vue";
import VueAuth from "@websanova/vue-auth";
import router from "../router.js";

Vue.router = router;

Vue.use(VueAuth, {
  auth: require("@websanova/vue-auth/drivers/auth/bearer.js"),
  http: require("@websanova/vue-auth/drivers/http/axios.1.x.js"),
  router: require("@websanova/vue-auth/drivers/router/vue-router.2.x.js")
});
