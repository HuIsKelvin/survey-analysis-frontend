<template>
  <div id="change-pwd">
    <p>修改密码</p>
    <el-form ref="changePwd">
      <el-input v-model="newPwd"></el-input>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form>
    <el-form status-icon :model="password" :rules="rules" ref="changePwdForm" class="change-pwd-form">
      <el-form-item label="新密码" prop="newPwd">
        <el-input v-model="password.newPwd"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPwd">
        <el-input v-model="password.checkPwd" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('changePwdForm')">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "ChangePwd",
  data() {
    var validPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        var re = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,32}$/;
        if (!re.test(value)) {
          callback(new Error("密码不能为纯数学或纯字母"));
        } else {
          if (this.changePwdForm.checkPwd !== "") {
            this.$refs.changePwdForm.validateField("checkPwd");
          }
        }
        callback();
      }
    };
    var validCheckPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再输入密码"));
      } else if (value !== this.changePwdForm.newPwd) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      newPwd: "",
      password: {
        newPwd: "",
        checkPwd: ""
      },
      rules: {
        newPwd: [
          {
            min: 6,
            max: 32,
            message: "密码长度需为6-32个字符",
            trigger: "blur"
          },
          { required: true, validator: validPwd, trigger: "blur" }
        ],
        checkPwd: [
          { required: true, validator: validCheckPwd, trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      console.log("new pwd: " + this.newPwd);
      axios.post("/auth/update/password?uid=" + this.$store.state.user.userId,
      {
        password: this.newPwd
      })
        .then(res => {
          console.log("change success!");
        })
        .catch(err => { console.log(err); })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // axios
          console.log("submit pwd");
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
