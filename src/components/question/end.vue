<template>
<el-form class="question-edit-box">
    <el-form-item>
        <el-input v-model="endWords"></el-input>
        <el-button type="primary">发布并分享</el-button>
    </el-form-item>
</el-form>
</template>
<script>
export default {
    name:"end",
    data() {
        return{
            endWords:"您已完成本次问卷，感谢您的帮助与支持!"
        }
    }
}
</script>
<style>
</style>