<template>
  <div id="survey">
    <survey-questionire 
      :questionList="questionList">
    </survey-questionire>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SurveyQuestionire from "@/components/questionSurvey/SurveyQuestionire";

export default {
  name: "Survey",
  components: {
    "survey-questionire": SurveyQuestionire
  },
  computed: {
    ...mapGetters("survey", {
      "questionList": "surveyQuestionList"
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
    ...mapActions("survey", {
      gerAnswerSheet: "generateAnsSheet",
      prepareQuestionList: "prepareQuestionList"
    })
  }
}
</script>

<style lang="scss" scoped>
#survey {
  height: 100%;
  background-color: #e0e0e0;
}
</style>
