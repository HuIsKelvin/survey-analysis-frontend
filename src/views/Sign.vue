<template>
  <div id="sign">
    <div class="logo">
      <img alt="Vue logo" src="../assets/logo.png" />
    </div>
    <el-card class="sign-card">
      <template v-if="hasCount">
        <sign-in></sign-in>
        <p>忘记密码？
          <router-link 
            :to="{name: 'findPwd'}"
            tag="span"
            class="sign-container-switch">找回密码</router-link>
        </p>
        <p>
          没有账号？<span
            class="sign-container-switch"
            @click="hasCount = false"
            >注册</span
          >
        </p>
      </template>
      <template v-else>
        <sign-up></sign-up>
        <p>
          已有账号？<span class="sign-container-switch" @click="hasCount = true"
            >登录</span
          >
        </p>
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
      hasCount: true
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
