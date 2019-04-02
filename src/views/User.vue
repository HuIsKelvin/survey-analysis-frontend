<template>
  <div id="user">
    <el-container>
      <el-header class="header">
        <span>logo</span>
      </el-header>
      <el-container>
        <el-aside class="aside">
          <el-menu :default-active="activeIndex" class="aside-menu" mode="vertical" @select="handleSelect">
            <el-menu-item index="1"><span>问卷管理</span></el-menu-item>
            <el-menu-item index="2"><span>个人信息</span></el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="main">main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 1,
    }
  }
}
</script>

<style scoped>
.header {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: aquamarine;
}

.aside {
  width: 200px;
  height: 100%;
  background-color: aqua;
}

.main {
  height: 100%;
  width: calc(100% -200px);
  background-color: blue;
}
</style>
