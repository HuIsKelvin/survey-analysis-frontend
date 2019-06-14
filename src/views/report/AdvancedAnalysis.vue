
<template>
  <div>
    <el-tabs tab-position="left">
      <el-tab-pane label="交叉分析"></el-tab-pane>
      <el-tab-pane label="单样本T检验">
        <ttest1samp :meta="meta"></ttest1samp>
      </el-tab-pane>
      <el-tab-pane label="双独立样本T检验">
        <ttestind :meta="meta"></ttestind>
      </el-tab-pane>
      <el-tab-pane label="双独立样本非参数检验">
        <mannwhitneyu :meta="meta"></mannwhitneyu>
      </el-tab-pane>
      <el-tab-pane label="配对样本T检验">
        <ttestrel :meta="meta"></ttestrel>
      </el-tab-pane>
      <el-tab-pane label="正态性检验">
        <normaltest :meta="meta"></normaltest>
      </el-tab-pane>
      <el-tab-pane label="单因素方差分析">
        <foneway :meta="meta"></foneway>
      </el-tab-pane>
      <el-tab-pane label="回归分析">回归分析</el-tab-pane>
      <el-tab-pane label="因子分析">因子分析</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Ttest1samp from "../../components/report/Ttest1samp";
import Ttestind from "../../components/report/Ttestind";
import Mannwhitneyu from "../../components/report/Mannwhitneyu";
import Ttestrel from "../../components/report/Ttestrel";
import Normaltest from "../../components/report/Normaltest";
import Foneway from "../../components/report/Foneway.vue";

export default {
  data() {
    return {
      meta: null
    };
  },
  created() {
    axiosVisual
      .get("survey/" + this.$route.params.qid)
      .then(response => {
        this.meta = response.data.meta;
      })
      .catch(error => {
        console.log(error);
      });
  },
  components: {
    ttest1samp: Ttest1samp,
    ttestind: Ttestind,
    mannwhitneyu: Mannwhitneyu,
    ttestrel: Ttestrel,
    normaltest: Normaltest,
    foneway: Foneway
  }
};
</script>

<style lang="scss" scoped>
</style>

