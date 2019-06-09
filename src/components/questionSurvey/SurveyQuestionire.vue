<template>
  <div id="survey-questionire">
    <div class="survey-container">
      <el-card shadow="always">
        <!-- 问卷标题 -->
        <h1 class="survey-title">{{ questionName }}</h1>
        <!-- 问卷题目 -->
        <div class="survey-questions">
          <el-form 
            label-position="top"
            ref="answerForm"
            @submit.native.prevent>
            <div
              class="question-item"
              v-for="(setting, index) in questionList"
              :key="index">
              <dynamic-question :setting="setting"></dynamic-question>
            </div>
          </el-form>
        </div>
        <!-- 问卷操作 -->
        <div class="survey-operation">
          <el-button 
            type="primary"
            @click="submitQuestionire"
            :disabled="isSubmit === false">提交问卷
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DynamicQueation from "@/components/questionSurvey/DynamicQuestion";

export default {
  name: "SurveyQuestionire",
  components: {
    "dynamic-question": DynamicQueation
  },
  props: {
    questionire: {
      type: Object
    },
    isSubmit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      questionList: this.questionire.questionList,
      questionName: this.questionire.name,
      validateRules: {},
      // isSubmit: false
    }
  },
  methods: {
    submitQuestionire() {
      console.log("from button: click to submit answer");
      this.submitAnswerSheet({
        qid: this.questionire.id
      });
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
          this.validateRules[el.title] = [rule];
        });
    },
    ...mapActions("survey", {
      "submitAnswerSheet": "submitAnswerSheet"
    })
  }
}
</script>

<style lang="scss" scoped>
#survey-questionire {
  width: 100%;

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
        margin: 0 20px;
        padding: 20px 0;
        border-top: 1px solid #e0e0e0;

        &:last-of-type {
          border-bottom: 1px solid #e0e0e0;
        }
      }
    }

    .survey-operation {
      margin: 20px auto;
    }
  }
}
</style>
