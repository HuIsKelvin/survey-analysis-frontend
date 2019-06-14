<template>
    <div id="preview">
        <h3>预览页面</h3>
        <el-button type="primary" @click="backToEdit">返回编辑</el-button>
        <survey-questionnaire 
            :questionnaire="questionnaire">
        </survey-questionnaire>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SurveyQuestionnaire from "@/components/questionSurvey/SurveyQuestionnaire";

export default {
    name: "Preview",
    data: function() {
        return {};
    },
    components: {
        "survey-questionnaire": SurveyQuestionnaire
    },
    computed: {
        ...mapGetters("survey", {
            "questionnaire": "surveyQuestionnaire"
        })
    },
    methods: {
        backToEdit() {
            this.$router.push({name: "questionEdit"})
        }
    }

}
</script>

