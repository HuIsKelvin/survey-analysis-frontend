<template>
  <div id="survey">
    <survey-questionnaire
      :questionnaire="questionnaire"
      :isSubmit="true"
      :key="questionnaire.id">
    </survey-questionnaire>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SurveyQuestionnaire from "@/components/questionSurvey/SurveyQuestionnaire";

export default {
  name: "Survey",
  data: {
    isShow: false
  },
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
    axios.get("/questionnaires/getQuesById?qid=" + qid)
      .then(res => {
        console.log("get questionnaire by qid!");

        // console.log(res);
        const statusCode = res.status;
        const data = res.data;
        console.log(data);

        // 判断网络状态码
        switch(statusCode) {
          case 404:
            this.$router.push({
              path: "/error"
            });
            break;

          case 200:
            this.setQuestionnaire({
              questionnaire: data
            });
            this.isShow = true;
            break;
        }

      })
      .catch(err => {
        let msg = err.response.data;
        this.$router.push({ name: "error", query: {msg: msg} });
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
  min-height: 100vh;
  background-color: #e0e0e0;
}
</style>
