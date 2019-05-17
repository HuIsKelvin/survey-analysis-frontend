<template>
  <div id="text-input">
    <el-form-item :label="setting.title">
      <div class="content">
        <el-input
          class="el-input"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
          v-model="textArea"
          @change="handleTextChange">
        </el-input>
      </div>
    </el-form-item>
  </div>
</template>

<script>
import { mapActions } from "vuex"

export default {
  name: "TextInput",
  props: {
    setting: Object
  },
  data() {
    return {
      textArea: ""
    }
  },
  created() {
    this.textArea = this.setting.content.input;
  },
  computed: {
    // textArea: {
    //   get() {
    //     return this.setting.content.input;
    //   },
    //   set(val) {
    //     // this.store.dispatch("updateValue", {
    //     //   index: this.setting.index,
    //     //   value: val
    //     // })
    //     console.log(val)
    //     this.updateValue({
    //       index: this.setting.index,
    //       value: val
    //     })
    //   }
    // }
  },
  methods: {
    handleTextChange(val) {
      // 这个事件响应太慢了
      console.log("from textarea: "+val)
      // this.updateValue({
      //   index: this.setting.index,
      //   value: val
      // })
    },
    ...mapActions("survey", [
      "updateValue"
    ])
  },
  watch: {
    textArea() {
      // console.log(this.textArea)
      this.updateValue({
        index: this.setting.index,
        value: this.textArea
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  .el-input {
    max-width: 600px;
  }
}
</style>
