<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Q{{}}</span>
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </el-card>
  </div>
</template>
<script>

export default {
  name: "question-setting-card",
  props: {

  },
  data() {
    return {

    }
  },
  computed: {
  },
  methods: {
    
  },
  components:{

  }
}
</script>
<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 15em;
  }
</style>

