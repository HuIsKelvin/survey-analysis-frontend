<template>
<el-container class="question-edit-container">
  <el-header class="">
  this is header area
  </el-header>
  <el-main>
    <el-row>
      <el-col :span="4" class="">
        <el-menu
          default-active="2">
            <el-button size="small" @click="addQuestion('radio')">单选题</el-button><br>
            <el-button size="small" @click="addQuestion('checkbox')">多选题</el-button><br>
            <el-button size="small" @click="addQuestion('textarea')">填空题</el-button><br>
            <el-button size="small" @click="addQuestion('slider')">量表题</el-button><br>
            <el-button size="small" @click="addQuestion('rate')">评分题</el-button><br>
        </el-menu>
      </el-col>

      <el-container class="question-edit-main">
        <el-col :span="16" class="">
          这里是问卷编辑处
          <introduction></introduction>
          <multiple-choice></multiple-choice>
          <multiple-answers></multiple-answers>

          <end></end>
        </el-col>
        <el-col :span="5" class="">
          这里是逻辑功能的设置
        </el-col>
      </el-container>

    </el-row>
  </el-main>
</el-container>
</template>
<script>
import introduction from "@/components/question/introduction.vue";
import MultipleChoice from "@/components/question/MultipleChoice.vue";
import end from "@/components/question/end.vue";
import MultipleAnswers from "@/components/question/MultipleAnswers.vue";

export default {
  name:"question-edit-view",
  data(){
    return{
      userId:"1234", // 根据userId来确定questionList的存储字段
      questionList:[], // 本地存储问卷数据
      userQuestionList:{} // 发送给vuex的数据
    }
  },
  computed:{
    // 获取当前用户的id
  },
  methods:{
    addQuestion(type){
      let option = {
        title: '问题题目',
        type: type
      }
      if (type !== 'textarea') {
        option.answers = ['选项1', '选项2']
        // option.answersData = [this.getRandomNumber(), this.getRandomNumber()]
      } else {
        // option.required = false
        option.text = ''
      }
      this.questionList.push(option)
    }
  },
  components:{
    "introduction":introduction,
    "multiple-choice": MultipleChoice,
    "end":end,
    "multiple-answers":MultipleAnswers
  }
}
</script>
<style scoped>
.question-edit-main {
  background-color:#E5E9F2;

}
body {
    margin:0px;
}
</style>