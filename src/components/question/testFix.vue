<template>
<el-container>
  <el-header>
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
  </el-header>
  <el-container>
    <el-aside width="210px">

      <el-menu
        :default-openeds="['1', '2', '3', '4', '5']"
        >
          <el-submenu index="1">
            <template slot="title">
              <span>分页说明</span>
            </template>
            <el-menu-item-group>
              <el-menu-item>
                <el-button type="text">备注说明</el-button>
              </el-menu-item>
              <el-menu-item>
                <el-button type="text">设置分页</el-button>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <span>选择题</span>
            </template>
            <el-menu-item-group>
              <el-menu-item>
                <el-button type="text">单选题</el-button>
              </el-menu-item>
              <el-menu-item>
                <el-button type="text">多选题</el-button>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <span>填空题</span>
            </template>
            <el-menu-item-group>
              <el-menu-item>
                <el-button type="text">填空题</el-button>
              </el-menu-item>
              <el-menu-item>
                <el-button type="text">数字输入题</el-button>
              </el-menu-item>
              <el-menu-item>
                <el-button type="text">短文本输入题</el-button>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <span>打分排序</span>
            </template>
            <el-menu-item-group>
              <el-menu-item>
                <el-button type="text">评分题</el-button>
              </el-menu-item>
              <el-menu-item>
                <el-button type="text">量表题</el-button>
              </el-menu-item>
              <el-menu-item>
                <el-button type="text">排序题</el-button>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <span>快速创建个人信息</span>
            </template>
            <el-menu-item-group>
              <el-menu-item>
                <el-button type="text">姓名</el-button>
              </el-menu-item>
              <el-menu-item>
                <el-button type="text">性别</el-button>
              </el-menu-item>
              <el-menu-item>
                <el-button type="text">年龄</el-button>
              </el-menu-item>
              <el-menu-item>
                <el-button type="text">地址</el-button>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
      </el-menu>

    </el-aside>
    <el-main>
      <p
        v-for="(q,qIndex) in options"
      >{{qIndex}}</p>
    </el-main>
  </el-container>
</el-container>

</template>
<script>
export default {
  name: "testFix",
  data() {
    return {
      options:[1,2,3,4,5,6,7,8,9,10,11,1,1,1,1,1,1,1,1,1],
      userLogo: require("@/assets/image/user-logo.jpg")
    }
  }
}
</script>
<style lang="less" scoped>
  .el-header{
    // background-color: #B3C0D1;
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    border-bottom: 1px solid ;
    border-bottom:rgb(216, 232, 252);
    line-height: 60px;
    // height: 10%;
    position: sticky;
    top:0;
    z-index:999;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    // line-height: 200px;
    position: -webkit-sticky;
    position: sticky;
    left: 0;
    top: 60px;
    height: 550px;
    overflow-x: auto;
    overflow-y: auto;

  }
  .el-aside::-webkit-scrollbar {
    width: 3px; //滚动条的宽度
  }
  .el-aside::-webkit-scrollbar-thumb {
      background-color: #8899A7;//滚动条的颜色
      border-radius: 3px;//滚动条的边框倒角
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
    position: -webkit-sticky;
    position: sticky;
    top: 60px;

  }
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
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

