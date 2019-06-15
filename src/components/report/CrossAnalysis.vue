<template>
  <div>
    <!--解决props异步问题-->
    <h3>交叉分析</h3>
    <div>
      <div v-if="meta">
        <div v-if="options.length > 0">
          <el-select v-model="index" placeholder="请选择行题目">
            <el-option v-for="option in options" :key="option" :label="option" :value="option"></el-option>
          </el-select>
          <el-select v-model="column" placeholder="请选择列题目">
            <el-option v-for="option in options" :key="option" :label="option" :value="option"></el-option>
          </el-select>
          <el-button type="primary" @click="commit(index, column)">分析</el-button>
        </div>
      </div>
      <div v-else>
        <p>没有可进行该高级分析功能的题目</p>
      </div>
      <div v-if="result">
        <div v-if="result.chi2_contingency">
        <div>
          <p>卡方检验结果</p>
          <el-table :data="[result.chi2_contingency]">
            <el-table-column prop="statistic" label="检验值"></el-table-column>
            <el-table-column prop="pvalue" label="P值"></el-table-column>
          </el-table>
        </div>
        </div>
        <div>
          <charts :options="JSON.parse(result.num_bar)"></charts>
        </div>
        <div>
          <el-table :data="result.crosstab['data']">
            <el-table-column
              v-for="field in result.crosstab['schema']['fields']"
              :key="field['name']"
              :prop="field['name']"
              :label="field['name']"
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
      index: "",
      column: "",
      result: null
    };
  },
  computed: {
    options: function() {
      let arr = [];
      this.meta.map(function(value, key) {
        if (["radio", "checkbox", "sort"].indexOf(value.type) != -1) {
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
        message: "不能选择同一个题目进行分析",
        type: "error"
      });
    },
    replaceKeys: function(object) {
      var that = this;
      Object.keys(object).forEach(function(key) {
        var key_list = key.split(" ");
        var newKey =  key_list[key_list.length - 1];
        if (object[key] && typeof object[key] === "object") {
          that.replaceKeys(object[key]);
        }
        if (key !== newKey) {
          object[newKey] = object[key];
          delete object[key];
        }
      });
    },
    commit: function(index, column) {
      this.result = null;
      if (index === column) {
        this.same_column();
      } else {
        axiosVisual
          .get("cross_analysis/" + this.$route.params.qid, {
            params: {
              index: index,
              column: column
            }
          })
          .then(response => {
            this.result = response.data;
            let crosstab = JSON.parse(this.result.crosstab);
            this.replaceKeys(crosstab);
            this.result.crosstab = crosstab;
            let fields = this.result.crosstab.schema.fields;
            fields = fields.map(function(item) {
                var value_list = item.name.split(" ");
                item.name = value_list[value_list.length - 1];
                return item
            })
          })
          .catch(error => {
              console.log(error);
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