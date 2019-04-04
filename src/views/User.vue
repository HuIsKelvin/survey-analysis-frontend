<template>
  <div id="user">
    <el-container>
      <el-header class="header">
        <span>logo</span>
      </el-header>
      <el-container class="main">
        <el-aside class="aside">
          <el-menu
            :default-active="activeIndex"
            class="aside-menu"
            mode="vertical"
            @select="handleSelect"
          >
            <el-menu-item index="1"><span>问卷管理</span></el-menu-item>
            <el-menu-item index="2">
              <router-link 
                :to="{name: 'userInfo'}"
                tag="span">个人信息</router-link>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="main-content">
          <router-view></router-view>
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

<style scoped>
#user {
  height: calc(100%);
}

.header {
  width: 100%;
  height: 40px;
  line-height: 40px;
}

.main {
  height: calc(100% - 40px);
}

.aside {
  width: 200px;
  height: 100%;
}

.main-content {
  height: 100%;
  width: calc(100% -200px);
}
</style>
