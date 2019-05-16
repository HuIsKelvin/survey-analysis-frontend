<template>
  <div id="multible-chioce">
    <el-form-item :label="setting.title">
      <div class="content">
        <el-checkbox-group 
          v-model="checkList"
          @change="handleCheckedOptionsChange">
          <el-checkbox
            v-for="(option, index) in options"
            :key="index"
            :label="option">
          </el-checkbox> 
        </el-checkbox-group>
      </div>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: "MultibleChioce",
  props: {
    setting: Object
  },
  data() {
    return {
      checkList: []
    }
  },
  computed: {
    options() {
      return this.setting.content.options;
    }
  },
  methods: {
    handleCheckedOptionsChange(value) {
      // value 应该为已选中选项的数组
      this.checkList = value;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
