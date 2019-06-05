<template>
  <div id="text-input">
    <div class="content">
      <el-input
        class="el-input"
        placeholder="请输入内容"
        v-model="content">
      </el-input>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  name: "TextInput",
  props: {
    setting: Object
  },
  data() {
    return {
      // text: "",
      // index: null
    }
  },
  created() {
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
    // handleEnter(e) {
    //   e.prevent();
    // },
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
