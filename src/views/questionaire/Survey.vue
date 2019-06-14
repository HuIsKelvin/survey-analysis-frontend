<template>
  <div id="survey">
    <survey-questionnaire 
      :questionnaire="questionnaire"
      :isSubmit="true">
    </survey-questionnaire>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SurveyQuestionnaire from "@/components/questionSurvey/SurveyQuestionnaire";

export default {
  name: "Survey",
  components: {
    "survey-questionnaire": SurveyQuestionnaire
  },
  computed: {
    ...mapGetters("survey", {
      // "questionList": "surveyQuestionList",
      "questionnaire": "surveyQuestionnaire"
    })
  },
  created() {
    // 获取问卷数据
    // axios.get()
    let qid = this.$route.params.qid;
    axios.get("/questionnaires/" + qid)
      .then(res => {
        console.log("get questionnaire by qid!");
        // console.log(res);
        const statusCode = res.status;
        const questionnaire = res.data;

        // 判断网络状态码
        switch(statusCode) {
          case 404:
            this.$router.push({
              path: "/error"
            });
            break;

          case 200:
            this.setQuestionnaire({
              questionnaire: questionnaire
            });
            break;
        }

      })
      .catch(err => {
        console.log(err);
        // this.$router.push({ path: "/error" });
      })
    this.prepareQuestionList();
  },
  methods: {
    ...mapActions("survey", {
      "prepareQuestionList": "prepareQuestionList",
      "setQuestionnaire": "setQuestionnaire"
    })
  }
}
</script>

<style lang="scss" scoped>
#survey {
  height: 100vh;
  background-color: #e0e0e0;
}
</style>
