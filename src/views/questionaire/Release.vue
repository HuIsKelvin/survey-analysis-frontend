<!--发布问卷界面-->
<template>
  <div id="release">
    <el-container>
      <el-header>
        <bread-header :view="{viewType: 'release'}"></bread-header>
      </el-header>
      <el-main>
        <el-card class="share">
          <h2>问卷发布成功！</h2>
          <el-divider></el-divider>
          <div class="share-item">
            <h3>问卷ID: {{ qid }}</h3>
          </div>
          <el-divider></el-divider>
          <div class="share-item">
            <h3>链接</h3>
            <!-- <el-input class="link" v-model="shareUrl" readonly></el-input> -->
            <a :href="shareUrl">{{ shareUrl }}</a>
          </div>
          <el-divider></el-divider>
          <div class="share-item">
            <h3>二维码</h3>
            <qrcode :value="shareUrl" :options="qrcodeOptions"></qrcode>
          </div>
        </el-card>
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
    background-color: rgb(84, 92, 100);
    text-align: center;
    border-bottom: 1px solid;
    line-height: 60px;
    position: sticky;
    top: 0;
    z-index: 1002;
  }

  .el-main {
    background-color: #e5e9f2;
    min-height: calc(100vh - 60px);
  }

  #release {
    .share {
      margin: 20px auto;
      max-width: 600px;

      h2 {
        padding-bottom: 20px;
      }

      .share-item {
        padding: 20px 0;
        border-top: 1px solid #e0e0e0;
      }
    }
  }
</style>