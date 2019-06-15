
<template>
    <div class="analysis-container">
        <div v-for="(question, index) in questionnaire" :key="index">
            <dynamic-report :report="question">
            </dynamic-report>
        </div>
        <el-dialog
            title="警告"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
            >
            <span>当前该问卷的填写结果过少，无法进行分析</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleClose">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import DynamicReport from "../../components/report/DynamicReport.vue";
export default {
    data() {
        return {
            dialogVisible: false,
            questionnaire: null,
        }
    },
    methods: {
        handleClose(done) {
            this.$router.push({path: "/user"});

        }

    },
    created() {
        axiosVisual.get("base_report/"+this.$route.params.qid)
        .then(response => {
            this.questionnaire = response.data;
            if (this.questionnaire.length === 0) {
                this.dialogVisible = true;
            }
            console.log(this.questionnaire)
        })
        .catch(error => {
            this.$message.error(error.response.data.error);
        })
    },
    components: {
        "dynamic-report": DynamicReport,
    }

    
}
</script>

<style lang="scss" scoped>

</style>

