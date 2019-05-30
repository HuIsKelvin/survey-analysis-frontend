<template>
    <div id="preview">
        <h3>预览界面</h3>
        <survey-questionire 
            :questionList="questionList">
        </survey-questionire>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SurveyQuestionire from "@/components/questionSurvey/SurveyQuestionire";

export default {
    name: "Preview",
    data: function() {
        return {};
    },
    components: {
        "survey-questionire": SurveyQuestionire
    },
    computed: {
        ...mapGetters("survey", {
            "questionList": "surveyQuestionList"
        })
    }

}
</script>

