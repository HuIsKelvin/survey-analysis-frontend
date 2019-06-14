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
      <p>排序结果：</p>
      <ul class="result-list">
        <transition-group name="list-item" tag="div">
          <li
            class="result-item"
            v-for="(checkedIndex, index) in checkBox"
            :key="index">
            <span class="result-item-index">{{ index }}</span> 
            <span class="result-item-option">{{ options[checkedIndex - 1] }}</span>
          </li>
        </transition-group>
      </ul>
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
      list-style-position: outside;
    }

    ul {
      list-style-type: none;
      padding-inline-start: 10px;
    }

    .result-list {
      .result-item {
        .result-item-index {
          font-weight: bold;
          background-color: #339999;
          color: #fff;
          min-width: 10px;
          border-radius: 5px;
          padding: 5px;
          margin-right: 15px;
        }
      }
    }
  }
}
</style>
