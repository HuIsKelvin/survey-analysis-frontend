<template>
  <div>
    <!--解决props异步问题-->
    <h3>因子分析</h3>
    <div>
      <div v-if="meta">
        <div v-if="options.length > 0">
          <p>请选择进行因子分析的题目</p>
          <div>
          <el-select v-model="column_list" multiple placeholder="请选择题目">
            <el-option v-for="option in options" :key="option" :label="option" :value="option"></el-option>
          </el-select>
          </div>
          <div>
          <p>因子数</p>
          <el-input-number v-model="n_factor" :min="1" :max="column_list.length" label="因子数"></el-input-number>
          </div>
          


          <el-button type="primary" @click="commit(column_list, n_factor)">分析</el-button>
        </div>
      </div>
      <div v-else>
        <p>没有可进行该高级分析功能的题目</p>
      </div>
      <div v-if="result">
        <div>
          <p>公因子方差</p>
          <el-table border :data="result.communalities">
            <el-table-column prop="column" label="指标"></el-table-column>
            <el-table-column prop="extract" label="提取率"></el-table-column>
          </el-table>
        </div>
        <div>
          <p>成分矩阵</p>
          <el-table border :data="result.component_matrix ">
            <el-table-column v-for="key in Object.keys(result.component_matrix[0])" :key="key" :prop="key" :label="key"></el-table-column>
          </el-table>
        </div>
        <div>
          <p>解释的总方差</p>
          <el-table border :data="result.factor_variance">
            <el-table-column v-for="key in Object.keys(result.factor_variance[0])" :key="key" :prop="key" :label="key"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Charts from "./Charts.vue";
export default {
  props: {
    meta: Array
  },
  data() {
    return {
      column_list: [],
      n_factor: null,
      result: null,
    };
  },
  computed: {
    options: function() {
      let arr = [];
      this.meta.map(function(value, key) {
        if (["radio", "numInput", "scale", "rate"].indexOf(value.type) != -1) {
          arr.push(value.index + ". " + value.title);
        }
      });
      return arr;
    }
  },
  methods: {
    transpose: m => m[0].map((x, i) => m.map(x => x[i])),
    commit: function(column_list, n_factor) {
      this.result = null;
      if (column_list.length > 0) {
        let params = {};
        column_list.forEach((element, index) => {
          params["columnx" + (index + 1)] = element;
        });
        params["n_factor"] = n_factor
        axiosVisual
          .get("factor_analysis/" + this.$route.params.qid, {
            params: params
          })
          .then(response => {
            let result = response.data;
            const communalities = result.communalities.map((value, index) => ({
              column: column_list[index],
              extract: value
            }));
            const component_matrix = result.component_matrix.map((value, index) => {
              let item = {};
              item['指标'] = column_list[index];
              item = value.reduce((arr, val, ind) => ({...arr, ["因子"+(ind+1)]:val}), item);
              return item;
            });
            const factor_variance_t = this.transpose(result.factor_variance)
            const factor_variance = factor_variance_t.map((value) => ({
              "初始特征值": value[0],
              "方差": value[1],
              "累计方差": value[2]
            }))
            this.result = {
              communalities: communalities,
              component_matrix: component_matrix,
              factor_variance: factor_variance
            };
          })
          .catch(error => {
            this.$message.error(error.response.data.error);
          });
      }
    }
  },
  components: {
    charts: Charts
  }
};
</script>
<style lang="scss" scoped>
</style>