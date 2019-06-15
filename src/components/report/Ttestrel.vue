<template>
  <div>
    <!--解决props异步问题-->

    <h3>配对样本T检验</h3>
    <div>
      <div v-if="meta">
        <div v-if="options.length > 0">
          <el-select v-model="column1" placeholder="请选择题目1">
            <el-option v-for="option in options" :key="option" :label="option" :value="option"></el-option>
          </el-select>
          <el-select v-model="column2" placeholder="请选择题目2">
            <el-option v-for="option in options" :key="option" :label="option" :value="option"></el-option>
          </el-select>
          <el-button type="primary" @click="commit(column1, column2)">分析</el-button>
        </div>
      </div>
      <div v-else>
        <p>没有可进行该高级分析功能的题目</p>
      </div>
      <div v-if="result">
        <el-table :data="[result]">
          <el-table-column prop="statistic" label="检验值"></el-table-column>
          <el-table-column prop="pvalue" label="P值"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    meta: Array
  },
  data() {
    return {
      column1: "",
      column2: "",
      result: null
    };
  },
  computed: {
    options: function() {
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
    same_column: function() {
      this.result = null;
      this.$message({
        message: "不能选择同一个题目进行检验",
        type: "error"
      });
    },
    commit: function(column1, column2) {
      this.result = null;
      if (column1 === column2) {
        this.same_column();
      } else {
        axiosVisual
          .get("ttest_rel/" + this.$route.params.qid, {
            params: {
              column1: column1,
              column2: column2
            }
          })
          .then(response => {
            this.result = response.data;
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>