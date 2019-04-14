<template>
<div class="question-edit-box">
    <el-input v-model="endWords"></el-input>
    <el-button type="primary">发布并分享</el-button>
</div>
</template>
<script>
export default {
    data() {
        return{
            endWords:"您已完成本次问卷，感谢您的帮助与支持"
        }
    }
}
</script>
<style>
</style>