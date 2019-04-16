<template>
<el-form class="question-edit-box" ref="form" :model="form" label-width="40px">
  <el-row>
    <el-col :span="10">
      <el-form-item label="1">
        <el-input 
        type="textarea" autosize=true 
        v-model="titleContents">
        </el-input>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      
    </el-col>
  </el-row>
  <el->

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
        desc: ''
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