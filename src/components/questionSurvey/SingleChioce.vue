<template>
  <div id="single-chioce">
    <el-form-item :label="setting.title">
      <div class="content">
        <el-radio-group 
          v-model="radio"
          @change="handleRadioChange">
          <el-radio 
            v-for="(option, index) in options"
            :key="index"
            :label="index+1">{{ option }}
          </el-radio>
        </el-radio-group>
      </div>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: "SingleChioce",
  props: {
    setting: Object
  },
  data() {
    return {
      radio: 0
    }
  },
  computed: {
    options() {
      return this.setting.content.options;
    }
  },
  methods: {
    handleRadioChange(val) {
      // console.log(val);
    }
  }
}
</script>

<style lang="scss" scoped> 

</style>
