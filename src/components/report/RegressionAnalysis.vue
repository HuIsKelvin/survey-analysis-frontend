<template>
  <div>
    <!--解决props异步问题-->
    <h3>回归分析</h3>
    <div>
      <div v-if="meta">
        <div v-if="options_x.length > 0 && options_y.length > 0">
          <el-select v-model="columnx_list" multiple placeholder="请选择自变量题目"> 
            <el-option v-for="option in options_x" :key="option" :label="option" :value="option"></el-option>
          </el-select>
          <el-select v-model="columny" placeholder="请选择因变量题目">
            <el-option v-for="option in options_y" :key="option" :label="option" :value="option"></el-option>
          </el-select>
          <el-button type="primary" @click="commit(columnx_list, columny)">分析</el-button>
        </div>
      </div>
      <div v-else>
        <p>没有可进行该高级分析功能的题目</p>
      </div>
      <div v-if="result">
        <div>
          <p>模型摘要</p>
          <el-table border :data="result.summary">
            <el-table-column prop="type" label="类型"></el-table-column>
            <el-table-column prop="value" label="值"></el-table-column>
          </el-table>
        </div>
        <div>
          <p>回归系数检验</p>
          <el-table border :data="result.coeff">
            <el-table-column
              v-for="label in Object.keys(result.coeff[0])"
              :key="label"
              :prop="label"
              :label="label"
            ></el-table-column>
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
      columnx_list: [],
      columny: "",
      result: null,
      explanation: {
        DW: "Durbin-Waston检验量",
        condition_number: "条件数",
        f_pvalue: "回归方程整体显著性p值",
        fvalue: "回归方程整体显著性检验统计量",
        rsquared: "拟合优度R",
        rsquared_adj: "调整后拟合优度",
        params: "回归系数",
        pvalues: "回归系数显著性p值",
        tvalues: "回归系数显著性检验统计量"
      }
    };
  },
  computed: {
    options_x: function() {
      let arr = [];
      this.meta.map(function(value, key) {
        if (["radio", "scale", "rate", "numInput"].indexOf(value.type) != -1) {
          arr.push(value.index + ". " + value.title);
        }
      });
      return arr;
    },
    options_y: function() {
      let arr = [];
      this.meta.map(function(value, key) {
        if (["scale", "rate", "numInput"].indexOf(value.type) != -1) {
          arr.push(value.index + ". " + value.title);
        }
      });
      return arr;
    }
  },
  methods: {
    include_column: function() {
      this.$message({
        message: "因变量不能出现在自变量列表中",
        type: "error"
      });
    },
    commit: function(columnx_list, columny) {
      this.result = null;
      const that = this;
      console.log(that.explanation);
      if (columnx_list.length > 0 && columny !== "") {
        if (columnx_list.indexOf(columny) != -1) {
          this.include_column();
        } else {
          let params = {};
          columnx_list.forEach((element, index) => {
            params["columnx" + (index + 1)] = element;
          });
          params["columny"] = columny;
          axiosVisual
            .get("regression_analysis/" + this.$route.params.qid, {
              params: params
            })
            .then(response => {
              let result = response.data;
              const summary = Object.keys(result)
                .filter(key => typeof result[key] !== "object")
                .map(x => ({ type: this.explanation[x], value: result[x] }));

              let column_label = columnx_list.map(x => x);
              column_label.unshift("常数项");
              const coeff = column_label.map((value, index) => ({
                factor: column_label[index],
                [that.explanation.params]: result.params[index],
                [that.explanation.pvalues]: result.pvalues[index],
                [that.explanation.tvalues]: result.tvalues[index]
              }));
              this.result = {
                summary: summary,
                coeff: coeff
              };
              console.log(this.result);
            })
            .catch(error => {
              this.$message.error(error.response.data.error)
            });
        }
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