<template>
  <div id="dynamic-question">
    <!-- <div 
      class="queston-tip"
      v-if="setting.tipMsg">
      {{ setting.tipMsg }}
    </div> -->
    <el-row :gutter="20">
      <el-col :span="2">
        <div 
          class="question-prefix"
          v-if="setting.index">
          <span class="question-index">{{setting.index}}</span>
          <span 
            class="question-alarm"
            v-if="isRequired === true">
            *
          </span>
        </div>
      </el-col>
      <el-col :span="22">
        <el-form-item 
          :label="setting.title">
          <div v-if="setting.type === 'radio'">
            <single-chioce :setting="setting"></single-chioce>
          </div>
          <div v-if="setting.type === 'checkbox'">
            <multible-chioce :setting="setting"></multible-chioce>
          </div>
          <div v-if="setting.type === 'textarea'">
            <text-area :setting="setting"></text-area>
          </div>
          <div v-if="setting.type === 'textInput'">
            <text-input :setting="setting"></text-input>
          </div>
          <div v-if="setting.type === 'numInput'">
            <num-input :setting="setting"></num-input>
          </div>
          <div v-if="setting.type === 'scale'">
            <scale-question :setting="setting"></scale-question>
          </div>
          <div v-if="setting.type === 'rate'">
            <rate-question :setting="setting"></rate-question>
          </div>
          <div v-if="setting.type === 'sort'">
            <sort-question :setting="setting"></sort-question>
          </div>
          <div v-if="setting.type === 'description'">
            <!-- <description-holder :setting="setting"></description-holder> -->
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
    "single-chioce": () => import("./SingleChioce"), // 单选题
    "multible-chioce": () => import("./MultibleChioce"), // 多选题
    "text-area": () => import("./Textarea"), // 文字输入题-多行
    "text-input": () => import("./TextInput"), // 文字输入题-单行
    "num-input": () => import("./NumInput"), // 数字输入题
    "scale-question": () => import("./ScaleQuestion"),  // 量表题
    "rate-question": () => import("./RateQuestion"),  // 评分题
    "sort-question": () => import("./SortQuestion"),  // 排序题
    "description-holder": () => import("./DescriptionPlaceholder"), // 段落描述
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
