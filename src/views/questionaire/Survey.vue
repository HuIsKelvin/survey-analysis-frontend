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
      // "questionList": "surveyQuestionList",
      "questionire": "surveyQuestionire"
    })
  },
  created() {
    // 获取问卷数据
    // axios.get()
    let qid = this.$route.params.qid;
    axios.get("/questionnaires/" + qid)
      .then(res => {
        console.log("get questionire by qid!");
        // console.log(res);
        const statusCode = res.status;
        const questionnaire = res.data;

        // 判断状态码
        switch(statusCode) {
          case 404:
            this.$router.push({
              path: "/error"
            });
            break;

          case 200:
            this.setQuestionire({
              questionire: questionnaire
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
      "setQuestionire": "setQuestionire"
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
