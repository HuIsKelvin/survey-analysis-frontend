<!--  <- 返回我问卷个人中心     问卷编辑 > 发布问卷 > 统计报表       保存 预览 发布     账号-->
<template>
    <div>
      <el-col :span="2">
      <div>
        <el-button type="text"><i class="el-icon-back"></i><span>返回个人问卷中心</span></el-button>   
      </div>
      </el-col>
      <el-col :span="16">
      <div>
        <el-button type="text" class="high-light-button">问卷编辑</el-button>
        <i class="el-icon-arrow-right"></i>
        <el-button type="text">发布问卷</el-button>
        <i class="el-icon-arrow-right"></i>
        <el-button type="text">统计报表</el-button>
      </div>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" size="mini">保存问卷</el-button>
        <el-button type="primary" size="mini">预览问卷</el-button>
        <el-button type="primary" size="mini">发布并分享</el-button>
      </el-col>
      <el-col :span="2">
        <el-dropdown>
          <el-button type="text">
            <img :src="userLogo" class="user-logo">
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item disabled><span class="user-id">用户账号名</span></el-dropdown-item>
            <el-dropdown-item divided>我的个人信息</el-dropdown-item>
            <el-dropdown-item divided><i class="el-icon-circle-close-outline"></i>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </el-col>
    </div>
</template>
<script>
export default {
  name: "bread-header",
  data() {
    return {
      userLogo: require("@/assets/image/user-logo.jpg")
    }
  }
}
</script>
<style lang="scss" scoped>
  .user-logo{
    height: 40px;
    width: 40px;
    border-radius:50%;
    -webkit-border-radius:50%;
    -moz-border-radius:50%;
    // margin-top: 10px;
  }
  .user-logo-button:hover >  {

  }
  .user-id {
    font-size: 14px;
  }
</style>