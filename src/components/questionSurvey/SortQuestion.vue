<template>
  <div id="sort-question">
    <div class="content">
      <el-checkbox-group 
        v-model="checkBox"
        @change="handleCheckedChange">
        <el-checkbox
          v-for="(option, index) in options"
          :key="index"
          :label="index+1">{{option}}
        </el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="sort-result">
      <p>已选：</p>
      <ol class="result-list">
        <li
          class="result-item"
          v-for="(checkedIndex, index) in checkBox"
          :key="index">
          {{ options[checkedIndex - 1] }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"

export default {
  name: "SortQuestion",
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
    }
  },
  methods: {
    handleCheckedChange(val) {
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
#sort-question {
  .sort-result {
    ol {
      list-style-position: outside
    }
  }
}
</style>
