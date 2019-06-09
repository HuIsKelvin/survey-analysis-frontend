<template>
  <div id="survey">
    <survey-questionire 
      :questionire="questionire"
      :isSubmit="true">
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
      "questionList": "surveyQuestionList",
      "questionire": "surveyQuestionire"
    })
  },
  created() {
    // 获取问卷数据
    // axios.get()
    console.log("qestion id: " + this.$route.params.qid);
    let qid = this.$route.params.qid;
    // axios.get("..." + qid)
    //   .then(res => {
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })
    // this.gerAnswerSheet();
    this.prepareQuestionList();
  },
  methods: {
    ...mapActions("survey", {
      // gerAnswerSheet: "generateAnsSheet",
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
