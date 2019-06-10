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
          <el-menu-item index="1">
            <router-link :to="{name: 'report.analysis'}" tag="div">统计分析</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link :to="{name: 'report.answer'}" tag="div">查看答卷</router-link>
          </el-menu-item>
          <!-- 头像 -->
        </el-menu>
      </el-header>
      <el-main class="main-content">
        <router-view class="main-content-view"></router-view>
      </el-main>
    </el-container>
  </div>
</template>


<script>
export default {
    name: "Report",
    data() {
        return {
            activeIndex: "1",
        }
    }
    
}
</script>

<style lang="scss" scoped>

</style>

