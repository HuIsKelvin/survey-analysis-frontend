<template>
  <div id="sign">
    <div class="logo">
      <router-link :to="{name: 'about'}">
        <img alt="Vue logo" src="../assets/logo.png" />
      </router-link>
    </div>
    <el-card class="sign-card">
      <template v-if="hasAccount">
        <sign-in></sign-in>
        <div>
        <br />
        <p>忘记密码？
          <router-link 
            :to="{name: 'findPwd'}"
            tag="span"
            class="sign-container-switch">找回密码</router-link>
        </p>
        <p>
          没有账号？<span
            class="sign-container-switch"
            @click="hasAccount = false"
            >注册</span
          >
        </p>
        </div>
      </template>
      <template v-else>
        <sign-up></sign-up>
        <div>
        <br />
        <br />
        <p>
          已有账号？<span class="sign-container-switch" @click="hasAccount = true"
            >登录</span
          >
        </p>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script>
import SignIn from "../components/sign/SignIn.vue";
import SignUp from "../components/sign/SignUp.vue";

export default {
  name: "Sign",
  data: function() {
    return {
      hasAccount: true
    };
  },
  components: {
    "sign-in": SignIn,
    "sign-up": SignUp
  }
};
</script>

<style>
.sign-container-switch {
  cursor: pointer;
  color: #41b883;
}

.sign-card {
  width: 350px;
  margin: auto;
}
</style>
