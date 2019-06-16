<template>
  <div>
    <!--解决props异步问题-->

    <h3>单因素方差分析</h3>
    <div>
      <div v-if="meta">
        <div v-if="options_group.length > 0 && options_number.length > 0">
          <el-select v-model="column_group" placeholder="请选择因子题目（仅支持单选题）">
            <el-option v-for="option in options_group" :key="option" :label="option" :value="option"></el-option>
          </el-select>
          <el-select v-model="column_number" placeholder="请选择因变量题目">
            <el-option v-for="option in options_number" :key="option" :label="option" :value="option"></el-option>
          </el-select>
          <el-button type="primary" @click="commit(column_group, column_number)">分析</el-button>
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
        <p>注: 返回-1, -1说明没有通过Levene检验</p>
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
      column_group: "",
      column_number: "",
      result: null
    };
  },
  computed: {
    options_number: function() {
      let arr = [];
      this.meta.map(function(value, key) {
        if (["scale", "rate", "numInput"].indexOf(value.type) != -1) {
          arr.push(value.index + ". " + value.title);
        }
      });
      return arr;
    },
    options_group: function() {
      let arr = [];
      this.meta.map(function(value, key) {
        if (["radio"].indexOf(value.type) != -1) {
          arr.push(value.index + ". " + value.title);
        }
      });
      return arr;
    }
  },
  methods: {
    commit: function(column_group, column_number) {
        this.result = null;
        axiosVisual
          .get("f_oneway/" + this.$route.params.qid, {
            params: {
              column_group: column_group,
              column_number: column_number
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