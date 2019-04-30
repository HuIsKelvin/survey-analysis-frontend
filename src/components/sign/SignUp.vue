<template>
  <div id="sign-up" class="sign-component">
    <el-form status-icon :model="signUpForm" :rules="rules" ref="signUpForm" class="signUpForm">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="signUpForm.name"></el-input>
      </el-form-item>
      <el-form-item label="账号名" prop="username">
        <el-input v-model="signUpForm.username"></el-input>
      </el-form-item>
      <el-form-item label="电子邮件地址" type="email" prop="email">
        <el-input v-model="signUpForm.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="signUpForm.pass" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="signUpForm.checkPass" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('signUpForm')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data: function() {
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
    var validPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        var re = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,32}$/;
        if (!re.test(value)) {
          callback(new Error("密码不能为纯数学或纯字母"));
        } else {
          if (this.signUpForm.checkPass !== "") {
            this.$refs.signUpForm.validateField("checkPass");
          }
        }
        callback();
      }
    };
    var validCheckPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再输入密码"));
      } else if (value !== this.signUpForm.pass) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      signUpForm: {
        username: "",
        name: "",
        email: "",
        pass: "",
        checkPass: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        username: [
          { required: true, message: "请输入账号名", trigger: "blur" },
          {
            min: 4,
            max: 16,
            message: "用户名长度需为3-16个字符",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            validator: validEmail,
            trigger: "blur"
          }
        ],
        pass: [
          {
            min: 6,
            max: 32,
            message: "密码长度需为6-32个字符",
            trigger: "blur"
          },
          { required: true, validator: validPass, trigger: "blur" }
        ],
        checkPass: [
          { required: true, validator: validCheckPass, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .post("/auth/register", {
              username: this.signUpForm.username,
              name: this.signUpForm.name,
              email: this.signUpForm.email,
              password: this.signUpForm.pass
            })
            .then(response => {
              console.log(response)
              this.$message.success("注册成功，请前往登录!");
            })
            .catch(error => {
              this.$message.error("注册失败，请修改账号名或Email之后重新注册");
            });
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },
  }
};
</script>

<style>
#sign-up {
  height: 550px;
}
</style>
