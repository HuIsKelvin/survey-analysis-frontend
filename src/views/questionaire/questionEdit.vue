<template>
<el-row>
  <el-col :span="4" class="">
    <el-menu
      default-active="2">
        <el-button size="small" @click="addMutipleChoie()">单选题</el-button><br>
        <el-button size="small" @click="addMutipleAnswers()">多选题</el-button><br>
        <el-button size="small" @click="addTextInput()">填空题</el-button><br>
        <el-button size="small" @click="addTextInput()">量尺题</el-button><br>
    </el-menu>
  </el-col>
  <el-container class="question-edit-main">
    <el-col :span="16" class="">
      这里是问卷编辑处
      <introduction></introduction>
      <multiple-choice></multiple-choice>
      <end></end>
    </el-col>
    <el-col :span="4" class="">
      这里是逻辑功能的设置
    </el-col>
  </el-container>
</el-row>
</template>
<script>
import introduction from "@/components/question/introduction.vue";
import MultipleChoice from "@/components/question/MultipleChoice.vue"
import end from "@/components/question/end.vue"

export default {
  data(){
    return{

    }
  },
  components:{
    "introduction":introduction,
    "multiple-choice": MultipleChoice,
    "end":end
  }
}
</script>
<style>
.question-edit-main {
  background-color:#E5E9F2;
}
</style>