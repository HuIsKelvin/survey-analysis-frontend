<template>
  <div id="sign-in" class="sign-component">
    <el-form :model="loginForm">
      <el-form-item label="账号名">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(loginForm)"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SignIn"
};
</script>

<style>
#sign-in {
  height: 250px;
}
</style>
