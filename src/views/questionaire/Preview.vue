<template>
    <div id="preview">
        <h3>预览页面</h3>
        <el-button type="primary" @click="backToEdit">返回编辑</el-button>
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
    },
    methods: {
        backToEdit() {
            this.$router.push({name: "questionEdit"})
        }
    }

}
</script>

