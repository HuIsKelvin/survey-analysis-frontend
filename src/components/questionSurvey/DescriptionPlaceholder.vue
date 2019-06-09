<template>
  <div id="description-placeholder">
    <div class="content">
      <el-alert
        :title="content"
        type="info">
      </el-alert>
    </div>
  </div>  
</template>

<script>
export default {
  name: "DescriptionPlaceholder",
  props: {
    setting: Object
  },
  data() {
    return {
      content: this.setting.title
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
