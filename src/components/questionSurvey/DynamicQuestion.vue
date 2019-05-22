<template>
  <div id="dynamic-question">
    <el-row :gutter="20">
      <el-col :span="2">
        <div class="question-prefix">
          <span 
            class="question-index"
            v-if="setting.index">{{setting.index}}
          </span>
          <span 
            class="question-alarm"
            v-if="isRequired === true">*(必填)
          </span>
        </div>
      </el-col>
      <el-col :span="22">
        <el-form-item 
          :label="setting.title">
          <div v-if="setting.type === 'radio'">
            <single-chioce :setting="setting"></single-chioce>
          </div>
          <div v-if="setting.type === 'checkBox'">
            <multible-chioce :setting="setting"></multible-chioce>
          </div>
          <div v-if="setting.type === 'text'">
            <text-input :setting="setting"></text-input>
          </div>
          <div v-if="setting.type === 'scale'">
            <scale-question :setting="setting"></scale-question>
          </div>
        </el-form-item>
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
    "text-input": () => import("./TextInput.vue"), //多选题
    "scale-question": () => import("./ScaleQuestion"),  //量表题
  },
  data() {
    return {
      isRequired: this.setting.isRequired
    }
  },
  computed: {

  },
}
</script>

<style lang="scss">
#dynamic-question {
  text-align: left;

  .question-prefix {
    .question-alarm {
      color: red;
    }

    .question-alarm,
    .question-index {
      float: right;
      margin-top: 10px;
      margin-right: 5px;
    }
  }

}
</style>
