
<template>
    <div class="analysis-container">
        <div v-for="(question, index) in questionnaire" :key="index">
            <div class="question-title">
               {{ question.title }}
            </div>
            <dynamic-report :report="question">
            </dynamic-report>
        </div>
    </div>
</template>

<script>
import DynamicReport from "../../components/report/DynamicReport.vue";
export default {
    data() {
        return {
            questionnaire: null,
        }
    },
    created() {
        axiosVisual.get("base_report/"+this.$route.params.qid)
        .then(response => {
            this.questionnaire = response.data;
        })
        .catch(error => {
            console.log(error);
        })
    },
    components: {
        "dynamic-report": DynamicReport,
    }

    
}
</script>

<style lang="scss" scoped>

</style>

