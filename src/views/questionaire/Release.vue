<!--发布问卷界面-->
<template>
  <div>
    <el-container>
      <el-header>
        <bread-header :view="{viewType: 'release'}"></bread-header>
      </el-header>
      <el-main>
        <h2>问卷发布成功！</h2>
        <div class="share">
          <div class="share-item">
            <p>链接</p>
            <el-input class="link" v-model="shareUrl" readonly></el-input>
          </div>
          <div class="share-item">
            <p>二维码</p>
            <qrcode :value="shareUrl" :options="qrcodeOptions"></qrcode>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  export default {
    name: "release-view",
    components: {
      "bread-header": () => import("@/components/common/BreadHeader.vue"),
    },
    data() {
      return {
        qid: "",
        shareUrl: "",
        qrcodeOptions: {
          width: 250
        }
      }
    },
    created() {
      this.qid = this.$route.params.qid;
      const baseUrl = document.location.origin;
      this.shareUrl = baseUrl + "/survey/" + this.qid;
    }
  }
</script>
<style lang="scss" scoped>
  .el-header {
    // background-color: #D3DCE6;
    background-color: rgb(84, 92, 100);
    // color: #333;
    text-align: center;
    border-bottom: 1px solid;
    // border-bottom:rgb(216, 232, 252);
    line-height: 60px;
    position: sticky;
    top: 0;
    z-index: 1002;
  }
</style>