<template>
  <div id="sign-up" class="sign-component">
    <el-form :model="loginForm">
      <el-form-item label="账号名">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="电子邮件地址">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(loginForm)">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SignUp"
};
</script>

<style>
#sign-up{
    height: 450px;
}
</style>
