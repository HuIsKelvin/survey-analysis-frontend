<template>
<el-form class="question-edit-box" ref="form" :model="form" label-width="40px">
      <el-form-item label="1">
        <el-input 
        v-model="titleContents">
        </el-input>
      </el-form-item>
      <div>
        <el-input v-model="input" placeholder="请输入内容" prefix-icon="el-icon-search"></el-input>
        
      </div>

</el-form>
</template>
<script>
  export default {
    data() {
      return {
        titleContents: '多选题',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        checked1:"选项1",
        checked2:"选项2"
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
<style>
</style>