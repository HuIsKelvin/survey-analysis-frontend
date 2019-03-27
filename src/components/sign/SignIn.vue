<template>
  <div id="sign-in" class="sign-component">
    <el-form status-icon :model="signInForm" :rules="rules" ref="signInForm" class="signInForm">
      <el-form-item label="账号名" prop="name">
        <el-input v-model="signInForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="signInForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('signInForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SignIn",
  data : () => {
    return {
      signInForm: {
        name: "",
        password: ""
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      console.log("login processing" + formName);
    }
  }
};
</script>

<style>
#sign-in {
  height: 250px;
}
</style>
