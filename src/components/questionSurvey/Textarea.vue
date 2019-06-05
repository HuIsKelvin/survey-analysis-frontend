<template>
  <div id="textarea">
    <div class="content">
      <el-input
        class="el-input"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 6}"
        placeholder="请输入内容"
        v-model="content"
        @change="handleTextChange">
      </el-input>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  name: "Textarea",
  props: {
    setting: Object
  },
  data() {
    return {
      text: "",
      index: null
    }
  },
  created() {
    this.text = this.setting.content.input;
    this.index = this.setting.index - 1;
  },
  computed: {
    content: {
      get() {
        let content = this.getContentByIndex(this.setting.index);
        return content ? content : " ";
        // return this.getContentByIndex(this.setting.index);
      },
      set(val) {
        this.updateValue({
          qindex: this.setting.index,
          value: val
        })
      }
    },
    ...mapGetters("survey", {
      "getContentByIndex": "getContentByIndex",
      // "answerSheet": "answerSheet"
    })
  },
  methods: {
    handleTextChange(val) {
    },
    ...mapActions("survey", {
      "updateValue": "updateValue"
    })
  },
}
</script>

<style lang="scss" scoped>
.content {
  .el-input {
    max-width: 600px;
  }
}
</style>
