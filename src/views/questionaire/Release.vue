<!--发布问卷界面-->
<template>
<el-container>
  <el-header>
    <bread-header :view="{viewType: 'release'}"></bread-header>
  </el-header>
</el-container>
</template>
<script>
export default {
  name: "release-view",
  data() {
    return {

    }
  },
  components: {
    "bread-header": () => import("@/components/common/BreadHeader.vue"),
  }
}
</script>
<style lang="scss" scoped>
  .el-header{
    // background-color: #D3DCE6;
    background-color: rgb(84, 92, 100);
    // color: #333;
    text-align: center;
    border-bottom: 1px solid ;
    // border-bottom:rgb(216, 232, 252);
    line-height: 60px;
    position: sticky;
    top:0;
    z-index:1002;
  }
</style>