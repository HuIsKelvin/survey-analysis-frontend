<template>
    <div id="preview">
        <el-container>
            <el-header class="header">
                <el-row>
                    <h3>预览页面</h3>
                    <span class="back-to-edit" @click="backToEdit"><i class="el-icon-back"></i> 返回编辑</span>
                </el-row>
            </el-header>
            <el-main>
                <survey-questionnaire 
                    :questionnaire="questionnaire">
                </survey-questionnaire>
            </el-main>
        </el-container>
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
            "questionnaire": "surveyQuestionnaire",
        }),
        ...mapGetters("questionnaire", {
            "qid":"questionnaireId"
        })
    },
    methods: {
        backToEdit() {
            // FIXME: 需判断 url 历史
            // this.$router.push({name:"questionEdit", params:{qid:this.$store.state.questionnaire.userQuestionList.id,id:"preview"}});
            this.$router.push({name:"questionEdit", params:{qid:this.qid,id:"preview"}});
            
            // this.$router.back(-1);
        }
    }

}
</script>

<style lang="scss" scoped>
$header-bg-color: #545C64;
$header-text-color: #C0C4CC;

#preview {
    background-color: #e5e9f2;
    min-height: 100vh;

    .header {
        height: 60px;
        line-height: 60px;
        background-color: $header-bg-color;
        color: $header-text-color;

        h3 {
            display: inline-block;
            left: 50%;
            transform: translateX(-50%);
        }

        .back-to-edit {
            color: #76d7c4;
            float: left;
            height: 60px;
            line-height: 60px;
            cursor: pointer;
        }
    }
}
</style>
