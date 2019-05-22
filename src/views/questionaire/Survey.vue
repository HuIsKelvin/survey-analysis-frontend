<template>
  <div id="survey">
    <div class="survey-container">
      <el-card shadow="always">
        <!-- 问卷标题 -->
        <h1 class="survey-title">标题</h1>
        <!-- 问卷题目 -->
        <div class="survey-questions">
          <el-form 
            label-position="top"
            ref="answerForm">
            <div
              class="question-item"
              v-for="(setting, index) in questionList"
              :key="index">
              <el-card shadow="never">
                <dynamic-question :setting="setting"></dynamic-question>
              </el-card>
            </div>
          </el-form>
        </div>
        <!-- 问卷操作 -->
        <div class="survey-operation">
          <el-button type="primary" @click="submitQuestionire">提交问卷</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DynamicQueation from "@/components/questionSurvey/DynamicQuestion";

export default {
  name: "Survey",
  components: {
    "dynamic-question": DynamicQueation
  },
  data() {
    return {
      // questionList: []
      validateRules: {},
    }
  },
  computed: {
    ...mapGetters("survey", {
      "questionList": "surveyQuestionList",
      // "answerSheet": "answerSheet"
    })
  },
  created() {
    // 获取问卷数据
    // axios.get()
    this.gerAnswerSheet();
    this.prepareQuestionList();
    // this.generateValidateRules();
    console.log("create survey");
    console.log(this.$store.state.survey.questionList);
  },
  methods: {
    submitQuestionire() {
      console.log("submit answer");
      // this.$refs["answerForm"].validate((valid) => {
      //   if (valid) {
      //     alert('submit!');
      //   } else {
      //     console.log('error submit!!');
      //     return false;
      //   }
      // });
    },
    // 生成校验规则
    generateValidateRules() {
      let rule = { required: true, message: "此项为必填", trigger: "change" }
      this.questionList
        .filter(el=> el.isRequired == true)
        .forEach(el => {
          // this.Vue.set(this.validateRules, el.title, rule)
          this.validateRules[el.title] = [rule]
        });
    },
    ...mapActions("survey", {
      gerAnswerSheet: "generateAnsSheet",
      prepareQuestionList: "prepareQuestionList"
    })
  }
}
</script>

<style lang="scss" scoped>
#survey {
  width: 100%;
  height: 100%;
  // background-color: #e0e0e0;
  background-color: #A7D75F;

  .survey-container {
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 20px;
    padding-top: 50px; 
    padding-bottom: 50px;

    .survey-title {
      margin: 30px auto;
    }

    .survey-questions{
      .question-item {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
