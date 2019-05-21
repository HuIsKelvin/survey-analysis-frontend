<template>
    <el-divider content-position="left">页码：{{this.currentPage}}/{{this.totalPage}}</el-divider>
</template>
<script>
export default {
  name:"dvider",
  data() {
    return {
      currentPage:1,
      totalPage:2
    }
  }
}
</script>
<style>
/* .pagination-bar {

}
.pagination-bar::before {
  content: "";
  position: absolute;
  top:0;
  right:0;
  height:0;
  width:0;
  border-top-left-radius: 4px;
  border-top: solid 5px #2672ff;
  border-right: solid 5px transparent;
  border-bottom: solid 5px transparent;
  border-left: solid 5px #2672ff;
} */
</style>