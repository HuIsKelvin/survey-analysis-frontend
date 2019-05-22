<template>
  <div id="rate-question">
    <div class="content">
      <el-rate
        v-model="content"
        :show-score="true"
        :max="max">
      </el-rate>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  name: "RateQuestion",
  props: {
    setting: Object
  },
  data() {
    return {
      max: this.setting.content.top
    }
  },
  created() {

  },
  computed: {
    content: {
      get() {
        return this.getContentByIndex(this.setting.index);
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

  }
}
</style>
