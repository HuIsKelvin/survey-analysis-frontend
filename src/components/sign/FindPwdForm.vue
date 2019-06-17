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
      <el-form-item label="新密码" type="password" prop="newPassword">
        <el-input type="password" v-model="findPwdForm.newPassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('findPwdForm')">提交</el-button>
      </el-form-item>
    </el-form>
    <p>返回登录？ <router-link :to="{name: 'sign'}" tag="span" class="sign-container-switch">登录</router-link></p>
  </div>
</template>

<script>
export default {
  name: "FindPwdForm",
  data() {
    var validPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        var re = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,32}$/;
        if (!re.test(value)) {
          callback(new Error("密码不能为纯数学或纯字母"));
        } else {
          if (this.findPwdForm.newPassword !== "") {
            this.$refs.findPwdForm.validateField("checkPass");
          }
        }
        callback();
      }
    };
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
        email: "",
        newPassword: ""
      },
      // TODO: 增加密码的校验规则
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "change" }
        ],
        email: [
          {
            required: true,
            validator: validEmail,
            trigger: "change"
          }
        ],
        newPassword: [
          {
            min: 6,
            max: 32,
            message: "密码长度需为6-32个字符",
            trigger: "blur"
          },
          { required: true, validator: validPass, trigger: "change" }
        ],
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let { name, email, newPassword } = this.findPwdForm;
          console.log(name);
          console.log(email);
          console.log(newPassword);
          axios.post("/auth/forget/password?email=" + email + "&uname=" + name, { password: newPassword })
            .then(res => {
              console.log("find pwd success!");
              console.log(res);
              this.$message({ message: "找回密码成功！", type: "success" });
            })
            .then(res => {
              this.$message({ message: "请返回登录！", type: "info" });
            })
            .catch(err => { console.log(err); });
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
#find-pwd-form {
  .sign-container-switch {
    cursor: pointer;
    color: #41b883;
  }
}
</style>
