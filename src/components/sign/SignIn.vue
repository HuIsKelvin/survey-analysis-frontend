<template>
  <div id="sign-in" class="sign-component">
    <el-form status-icon :model="signInForm" :rules="rules" ref="signInForm" class="signInForm">
      <el-form-item label="账号名" prop="username">
        <el-input v-model="signInForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="signInForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('signInForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as types from "@/store/types.js"

export default {
  name: "SignIn",
  data : () => {
    return {
      signInForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      axios.post('/auth/login', {
        username: this.signInForm.username,
        password: this.signInForm.password
      })
      .then(response => {
        console.log(response);
        this.$message.success("登录成功!");
        let data = response.data;
        this.$store.commit(types.SIGNIN, data);
        this.$router.push({path:"user"})
      })
      .catch(error => {
        this.$message.error("登录失败，请重新输入账号和密码!");
      });
    }
  }
};
</script>

<style>
#sign-in {
  height: 250px;
}
</style>
