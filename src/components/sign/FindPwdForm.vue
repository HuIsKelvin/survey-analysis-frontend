<template>
  <div id="find-pwd-form">
    <p>输入您的账户名和邮箱，以找回账号。</p>
    <el-form status-icon :model="findPwdForm" :rules="rules" ref="findPwdForm" class="find-pwd-form">
      <el-form-item label="账号名" prop="name">
        <el-input v-model="findPwdForm.name"></el-input>
      </el-form-item>
      <el-form-item label="电子邮件地址" type="email" prop="email">
        <el-input v-model="findPwdForm.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('findPwdForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "FindPwdForm",
  data() {
    var validEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("电子邮件地址不能为空"));
      } else {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(value)) {
          callback(new Error("电子邮件格式错误"));
        } else {
          callback();
        }
      }
    };
    return {
      findPwdForm: {
        name: "",
        email: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        email: [
          {
            required: true,
            validator: validEmail,
            trigger: "blur"
          }
        ],
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!");
          return false;
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
