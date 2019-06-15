<!--发布问卷界面-->
<template>
<div>
  <bread-header></bread-header>
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
<style>
</style>