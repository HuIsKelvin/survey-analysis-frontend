<template>
  <div id="report">
    <el-container class="container">
      <el-header class="header">
        <el-menu
          :default-active="$route.name"
          class="header-nav"
          mode="horizontal"
          :background-color="headerNav.bgColor"
          :text-color="headerNav.textColor"
          :active-text-color="headerNav.textColorActive"
        >
          <el-menu-item index="user.manage">
            <router-link :to="{name: 'user'}" tag="div">返回个人问卷中心</router-link>
          </el-menu-item>
          <el-menu-item index="report.analysis">
            <router-link :to="{name: 'report.analysis'}" tag="div">统计分析</router-link>
          </el-menu-item>
          <el-menu-item index="report.adv-analysis">
            <router-link :to="{name: 'report.adv-analysis'}" tag="div">高级分析</router-link>
          </el-menu-item>
          <el-menu-item index="download">
            <el-button type="primary" @click="download_excel">下载答卷</el-button>
          </el-menu-item>
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
            activeIndex: null,
            headerNav: {
              bgColor: "#545C64",
              textColor: "#C0C4CC",
              textColorActive: "#76d7c4"
            }
        }
    },
    methods: {
      download_excel: function() {
        let options = {
          responseType: 'blob'
        }
        axiosVisual.get("excel/"+this.$route.params.qid, options)
        .then(response => {
          const content = response.data;
          const blob = new Blob([content])
          const filename = `${this.$route.params.qid}.xlsx`
          const elink = document.createElement("a");
          elink.download = filename;
          //elink.style.display = "none";
          elink.href =  URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink);
          document.body.removeChild(elink);
        })
        .catch(error => {
          this.$message.error(error.response.data.error)
        })
      }
    },
}
</script>

<style lang="scss" scoped>
.container {
  text-align: center;
  margin: auto;
}
div {
  margin: 5px;
}

#report {
  .header {
    margin: 0;
    padding: 0;
  }
}

</style>

