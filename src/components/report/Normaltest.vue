<template>
  <div>
    <!--解决props异步问题-->
    <h3>正态性检验</h3>
    <div>
      <div v-if="meta">
        <div v-if="options.length > 0">
          <div>
          <el-select v-model="column" placeholder="请选择题目">
            <el-option v-for="option in options" :key="option" :label="option" :value="option"></el-option>
          </el-select>
          </div>
          <el-button type="primary" @click="commit(column, popmean)">分析</el-button>
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
  </div>
</template>

<script>
export default {
  props: {
    meta: Array
  },
  data() {
    return {
      column: "",
      result: null,
      popmean: null
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
    commit: function(column, popmean) {
      this.result = null;
      axiosVisual
        .get("normaltest/" + this.$route.params.qid, {
          params: {
            column: column,
          }
        })
        .then(response => {
          this.result = response.data;
        })
        .catch(error => {
          this.$message.error(error.response.data.error);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>