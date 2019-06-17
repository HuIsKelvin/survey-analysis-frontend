
<template>
  <div>
    <el-tabs tab-position="left">
      <el-tab-pane label="交叉分析">
        <cross-analysis class="analysis-item" :meta="meta"></cross-analysis>
      </el-tab-pane>
      <el-tab-pane label="单样本T检验">
        <ttest1samp class="analysis-item" :meta="meta"></ttest1samp>
      </el-tab-pane>
      <el-tab-pane label="双独立样本T检验">
        <ttestind class="analysis-item" :meta="meta"></ttestind>
      </el-tab-pane>
      <el-tab-pane label="双独立样本非参数检验">
        <mannwhitneyu class="analysis-item" :meta="meta"></mannwhitneyu>
      </el-tab-pane>
      <el-tab-pane label="配对样本T检验">
        <ttestrel class="analysis-item" :meta="meta"></ttestrel>
      </el-tab-pane>
      <el-tab-pane label="正态性检验">
        <normaltest class="analysis-item" :meta="meta"></normaltest>
      </el-tab-pane>
      <el-tab-pane label="单因素方差分析">
        <foneway class="analysis-item" :meta="meta"></foneway>
      </el-tab-pane>
      <el-tab-pane label="回归分析">
        <regression-analysis class="analysis-item" :meta="meta"></regression-analysis>
      </el-tab-pane>
      <el-tab-pane label="因子分析">
        <factor-analysis class="analysis-item" :meta="meta"></factor-analysis>
      </el-tab-pane>
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
import CrossAaalysis from "../../components/report/CrossAnalysis";
import RegressionAnalysis from '../../components/report/RegressionAnalysis.vue';
import FactorAnalysis from '../../components/report/FactorAnalysis.vue';

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
        this.$message.error(error.response.data.error);
      });
  },
  components: {
    ttest1samp: Ttest1samp,
    ttestind: Ttestind,
    mannwhitneyu: Mannwhitneyu,
    ttestrel: Ttestrel,
    normaltest: Normaltest,
    foneway: Foneway,
    'cross-analysis': CrossAaalysis,
    'regression-analysis': RegressionAnalysis,
    'factor-analysis': FactorAnalysis,
  }
};
</script>

<style lang="scss">
.anlysis-item {
  margin: auto;
  max-width: 75%;
}
div {
  margin: 5px;
}

</style>

