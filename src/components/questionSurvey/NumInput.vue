<template>
  <div id="num-input">
    <div class="content">
      <el-input-number
        v-model="content">
      </el-input-number>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  name: "NumInput",
  props: {
    setting: Object
  },
  data() {
    return {
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
#num-input {
  .content {

  }
}
</style>
