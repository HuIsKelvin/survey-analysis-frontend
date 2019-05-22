<template>
  <div id="multible-chioce">
    <div class="content">
      <el-checkbox-group 
        v-model="checkBox"
        @change="handleCheckedOptionsChange">
        <el-checkbox
          v-for="(option, index) in options"
          :key="index"
          :label="index+1">{{option}}
        </el-checkbox> 
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"

export default {
  name: "MultibleChioce",
  props: {
    setting: Object
  },
  data() {
    return {
      checkBox: []
    }
  },
  computed: {
    options() {
      return this.setting.content.options;
    },
    // checkBox: {
    //   get() {
    //     return this.$store.state.survey.answerSheet[this.setting.index-1]["content"];
    //   },
    //   set(val) {
    //     console.log(val)
    //   }
    // }
  },
  methods: {
    handleCheckedOptionsChange(val) {
      // value 应该为已选中选项的数组
      this.checkBox = val;
      this.updateValue({
        qindex: this.setting.index,
        value: val
      })
    },
    ...mapActions("survey", {
      "updateValue": "updateValue"
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
