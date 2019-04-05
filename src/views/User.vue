<template>
  <div id="user">
    <el-container>
      <el-header class="header">
        <el-menu
            :default-active="activeIndex"
            class="header-nav"
            @select="handleSelect"
            mode="horizontal"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="1"><span>LOGO</span></el-menu-item>
        </el-menu>
      </el-header>
      <el-container class="main">
        <el-aside class="aside">
          <el-menu
            :default-active="activeIndex"
            class="aside-nav"
            mode="vertical"
            @select="handleSelect"
          >
            <el-menu-item index="1"><span>问卷管理</span></el-menu-item>
            <el-menu-item index="2">
              <router-link 
                :to="{name: 'userInfo'}"
                tag="div">个人信息</router-link>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="main-content">
          <router-view class="main-content-view"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 1
    };
  }
};
</script>

<style lang="scss" scoped>
$box-shadow: 0 15px 30px rgba(0,0,0,0.1);

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
  height: 40px;
  line-height: 40px;
  .header-nav {
    // width: 100%;
  }
}

.main {
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: row;

  .aside {
    width: 200px;
    height: 100%;
    .aside-nav {
      height: 100%;
    }
  }

  .main-content {
    height: 100%;
    background-color: #E5E9F2;
    position: relative;
    flex-grow: 1;

    .main-content-view {
      // min-height: calc(100vh - 200px);
      background-color: #fff;
      position: absolute;
      top: 2em;
      right: 1em;
      bottom: 1em;
      left: 1em;
      box-shadow: $box-shadow;
    }
  }

}



</style>
