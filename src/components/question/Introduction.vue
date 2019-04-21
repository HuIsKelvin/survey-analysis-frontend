<template>
<div class="question-edit-box" >
    <el-input v-model="title"></el-input>
    <el-input v-model="introduction" ></el-input>
</div>
</template>
<script>
import "@/assets/css/questionEdit.css"
// import "@/assets/css/override-element-ui.css"

export default {
    data() {
        return {
            title:"问卷标题",
            introduction:"感谢您能抽出几分钟时间来参加本次答题，现在我们就马上开始吧！"
        }
    }
}
</script>
<style>
/* .question-edit-box .el-input__inner {
    border:0px;
} */
</style>