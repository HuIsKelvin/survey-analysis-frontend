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
            // FIXME: 需判断 url 历史
            // this.$router.push({name: "questionEdit"});
            this.$router.back(-1);
        }
    }

}
</script>

<style lang="scss" scoped>
#preview {
    background-color: #e5e9f2;
}
</style>
