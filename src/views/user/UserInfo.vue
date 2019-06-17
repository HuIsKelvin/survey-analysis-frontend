<template>
  <div class="info-board">
    <div class="info-base">
      <el-row :gutter="20">
        <el-col :sm="24" :md="8">
          <div class="avator">
            <span class="avator-icon">
              <font-awesome-icon :icon="['far', 'user-circle']" size="10x"/>
            </span>
          </div>
        </el-col>
        <el-col :sm="24" :md="16">
          <div class="infomation">

            <!-- 展示个人信息 -->
            <div v-if="!isEditInfo">
              <div id="name" class="info-item">{{ userInfo.name }}</div>
              <div id="mail" class="info-item">账号名: {{ userInfo.username }}</div>
              <div id="mail" class="info-item">邮箱地址: {{ userInfo.email }}</div>
              <div id="mail" class="info-item">用户ID: {{ userInfo.userId }}</div>
            </div>

            <!-- 修改个人信息 form -->
            <div v-else>
              <el-form 
                status-icon
                :model="userInfoChange"
                :rules="rules"
                ref="userInfoChangeForm"
                class="user-info-change-form"
              >
                <el-form-item label="用户名" prop="name">
                  <el-input v-model="userInfoChange.name"></el-input>
                </el-form-item>
                <el-form-item label="账号名" prop="username">
                  <el-input v-model="userInfoChange.username"></el-input>
                </el-form-item>
                <el-form-item label="电子邮件地址" type="email" prop="email">
                  <el-input v-model="userInfoChange.email"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('userInfoChangeForm')">确认</el-button>
                  <el-button type="primary" @click="setEditState(false)">取消</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <router-link :to="{ path: 'ChangePwd' }" tag="span">
      <el-button type="primary">修改密码</el-button>
    </router-link>
    <el-button
      type="primary"
      @click="toEditInfo"
    >
      修改个人信息
    </el-button>
  </div>
</template>

<script>
import { userInfo } from 'os';

export default {
  data : function() {
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
      // TODO: 将展示的信息和修改信息的对象分离
      userInfo: {
        name: "",       // 用户名
        username: "",   // 账号名
        userId: "",     // 用户 id
        email: "",      // 用户邮箱
      },
      // 修改的用户信息
      userInfoChange: {},
      isEditInfo: false,
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "change" }
        ],
        username: [
          { required: true, message: "请输入账号名", trigger: "change" },
          {
            min: 4,
            max: 16,
            message: "用户名长度需为3-16个字符",
            trigger: "change"
          }
        ],
        email: [
          {
            required: true,
            validator: validEmail,
            trigger: "change"
          }
        ]
      }
    }
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    
    // 根据 userId 获取 用户信息
    getUserInfo() {
      axios.get("/users/"+this.$store.state.user.userId)
        .then(response => {
          let data = response.data;
          console.log("user info");
          console.log(data);
          this.userInfo = {
            name: data.name,
            username: data.username,
            email: data.email,
            userId: data.id
          }
          this.userInfoChange = {...this.userInfo};
        })
    },

    // 控制编辑状态
    // bool 为 true 时，在编辑信息；false时，展示信息
    setEditState(bool) {
      this.isEditInfo = bool;
    },

    // 到信息编辑界面
    toEditInfo() {
      this.userInfoChange = {...this.userInfo};
      this.setEditState(true);
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {

          // 修改密码
          axios.patch("/users/" + this.$store.state.user.userId, this.userInfoChange)
            .then(res => {
              this.$message({ message: "修改成功！",type: "success" });
              this.getUserInfo();
              this.setEditState(false);
            })
            .catch(err => { console.log(err); })
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
$border-side: 1px solid #e0e0e0;
@mixin row-spacing {
  padding: 1em 0 ;
}

.info-board {
  margin: 0 auto;
  text-align: left;

  .info-item {
    padding: 10px 20px;
  }
}

.info-base {
  border-bottom: $border-side;
  @include row-spacing;

  .avator {
    margin: 0 auto;
    width: 200px;
    height: 200px;
    
    .avator-icon {
      margin: 0 auto;
    }
  }

  .infomation {
    #name {
      font-size: 2em;
      font-weight: bold;
    }
  }
}

.info-board {
  .infomation {
    .user-info-change-form {
      max-width: 600px;
    }
  }
}
</style>