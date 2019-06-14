// 问卷填写成功页面

<template>
  <div id="answer-success">
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: "AnswerSuccess",
  data() {
    return {
      msg: "您的问卷已填写完成！感谢您的作答！"
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
