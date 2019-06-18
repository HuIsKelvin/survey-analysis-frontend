<template>
  <div id="find-pwd">
    <el-card class="find-pwd-form">
      <find-pwd-form></find-pwd-form>
    </el-card>
  </div>
</template>

<script>
import FindPwdForm from "./../components/sign/FindPwdForm";
export default {
  name: "FindPwd",
  components: {
    "find-pwd-form": FindPwdForm
  }
}
</script>

<style lang="scss" scoped>
#find-pwd {
  .find-pwd-form {
    width: 350px;
    // margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
}
</style>
