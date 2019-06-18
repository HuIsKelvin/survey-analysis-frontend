<template>
  <div id="user">
    <el-container>
      <el-header class="header">
        <el-row>
          <el-col :span="20">
              <el-menu 
                :default-active="activeIndex"
                class="header-nav-left"
                mode="horizontal"
                :background-color="headerNav.bgColor"
                :text-color="headerNav.textColor"
                :active-text-color="headerNav.textColorActive"
              >
                <!-- <el-menu-item>
                  <span>LOGO</span>
                </el-menu-item> -->
                <el-menu-item index="1">
                  <router-link :to="{name: 'user.manage'}" tag="div">问卷管理</router-link>
                </el-menu-item>
                <el-menu-item index="2">
                  <router-link :to="{name: 'user.info'}" tag="div">个人信息</router-link>
                </el-menu-item>
              </el-menu>
          </el-col>
          <el-col :span="4">
            <div class="header-nav-right">
              <span class="username">{{username}}</span>
              <el-dropdown class="avator-dropdown">
                <el-button type="text">
                  <img :src="userLogo" class="user-logo">
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <router-link :to="{name: 'user.info'}" tag="span">我的个人信息</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item divided><span @click="signout">退出登录</span></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main class="main-content">
        <router-view class="main-content-view"></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import * as types from "@/store/types.js";

export default {
  name: "User",
  data() {
    return {
      activeIndex: "1",
      username: this.$store.state.user.name,
      userLogo: require("@/assets/image/user-logo.jpg"),
      headerNav: {
        bgColor: "#545C64",
        textColor: "#C0C4CC",
        textColorActive: "#76d7c4"
      }
    };
  },
  methods: {
    signout: function() {
      this.$store.commit(types.SIGNOUT);
      this.$router.push({name:"sign"});
    }
  }
};
</script>

<style lang="scss" scoped>
$box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
$header-bg-color: #545C64;
$header-text-color: #C0C4CC;

.el-header {
  padding: 0;
}

#user {
  height: 100vh;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.header {
  text-align: left;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: $header-bg-color;
  color: $header-text-color;

  .header-nav-right {
    text-align: right;
    background-color: $header-bg-color;

    span {
      margin-right: 10px;
    }

    .avator-dropdown {
      float: right;
      margin-right: 20px;
    }
  }

}

.main-content {
  height: 100%;
  background-color: #e5e9f2;
  position: relative;

  .main-content-view {
    // min-height: calc(100vh - 200px);
    background-color: #fff;
    position: absolute;
    top: 2em;
    right: 1.5rem;
    margin-bottom: 1em;
    left: 1.5rem;
    min-height: calc(90vh - 150px);
    box-shadow: $box-shadow;
    padding: 3em 2em;
  }
}

.user-logo{
  height: 40px;
  width: 40px;
  border-radius:50%;
  -webkit-border-radius:50%;
  -moz-border-radius:50%;
  // margin-top: 10px;
  float: right;
}
</style>
