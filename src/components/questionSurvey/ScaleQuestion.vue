<template>
  <div id="scale-question">
    <div class="content">
      <el-slider
        class="el-slider"
        v-model="content"
        :step="sliderSetting.step"
        :max="sliderSetting.max"
        :min="sliderSetting.min"
        show-stops
        :marks="sliderSetting.marks">
      </el-slider>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import Vue from "vue"

export default {
  name: "ScaleQuestion",
  props: {
    setting: Object
  },
  data() {
    return {
      sliderSetting: {
        max: this.setting.content.top,
        min: 1,
        step: 1,
        marks: {}
      }
    }
  },
  created() {
    if(this.setting.content.top >= 1) {
      for(let i=1; i<=this.setting.content.top; i++) {
        // let tmpObj = { ... this.sliderSetting.marks };
        // this.sliderSetting.marks = { tmpObj, i: (i+"")};
        Vue.set(this.sliderSetting.marks, i, i+"");
      }
    };
  },
  computed: {
    content: {
      get() {
        let content = this.getContentByIndex(this.setting.index);
        if(content === null) { content = 0; }
        return content;
      },
      set(val) {
        this.updateValue({
          qindex: this.setting.index,
          value: val
        })
      }
    },
    ...mapGetters("survey", {
      "getContentByIndex": "getContentByIndex"
    })
  },
  methods: {
    ...mapActions("survey", {
      "updateValue": "updateValue"
    })
  }
}
</script>

<style lang="scss" scoped>
#scale-question {
  .content {
    .el-slider {
      max-width: 600px;
    }
  }
}
</style>
