<template>
    <div id="preview">
        <h3>预览页面</h3>
        <survey-questionire 
            :questionire="questionire">
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
            "questionire": "surveyQuestionire"
        })
    }

}
</script>

