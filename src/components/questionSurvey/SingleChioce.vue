<template>
  <div id="single-chioce">
    <div class="content">
      <el-radio-group 
        v-model="content"
        @change="handleRadioChange">
        <el-radio 
          v-for="(option, index) in options"
          :key="index"
          :label="index+1">{{ option }}
        </el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  name: "SingleChioce",
  props: {
    setting: Object
  },
  data() {
    return {
      // radio: 0,
      qindex: this.setting.index - 1 
    }
  },
  computed: {
    options() {
      return this.setting.content.options;
    },
    content: {
      get() {
        return this.getContentByIndex(this.setting.index)
        // return this.$store.state.survey.answerSheet;
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
      "answerSheet": "answerSheet"
    })
  },
  methods: {
    handleRadioChange(val) {
      // console.log(val);
      // this.radio = val;
      // this.updateValue({
      //   qindex: this.setting.index,
      //   value: val
      // })
    },
    ...mapActions("survey", {
      "updateValue": "updateValue"
    })
  }
}
</script>

<style lang="scss" scoped> 

</style>
