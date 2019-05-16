<template>
  <div id="dynamic-question">
    <el-row :gutter="20">
      <el-col :span="2">
        <span class="question-index">{{setting.index}}</span>
      </el-col>
      <el-col :span="22">
        <div v-if="setting.type === 'radio'">
          <single-chioce :setting="setting"></single-chioce>
        </div>
        <div v-if="setting.type === 'checkBox'">
          <multible-chioce :setting="setting"></multible-chioce>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "DynamicQuestion",
  props: {
    setting: Object
  },
  components: {
    "single-chioce": () => import("./SingleChioce.vue"), //单选题
    "multible-chioce": () => import("./MultibleChioce.vue"), //多选题
  }
}
</script>

<style lang="scss">
#dynamic-question {
  text-align: left;

  .question-index {
    float: right;
    margin-top: 10px;
  }
}
</style>
