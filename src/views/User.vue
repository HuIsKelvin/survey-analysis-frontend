<template>
  <div id="user">
    <el-container>
      <el-header class="header">
        <el-menu
          :default-active="activeIndex"
          class="header-nav"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item>
            <span>LOGO</span>
          </el-menu-item>
          <el-menu-item index="1">
            <router-link :to="{name: 'user.manage'}" tag="div">问卷管理</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link :to="{name: 'user.info'}" tag="div">个人信息</router-link>
          </el-menu-item>
          <!-- 头像 -->
          <div class="avator"></div>
          <el-menu-item>
            <el-button type="danger" @click="signout">登出</el-button>
          </el-menu-item>
          <el-menu-item>
            <span>{{ name }}</span>
          </el-menu-item>
        </el-menu>
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
      name: this.$store.state.name
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
  height: 3em;
  line-height: 3em;

  .avator {
    position: absolute;
    right: 1.5em;
    top: 1.5em;
    background-color: #fff;
    width: 2em;
    height: 2em;
    border-radius: 50%;
  }

  .header-nav {
    // width: 100%;
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
</style>
