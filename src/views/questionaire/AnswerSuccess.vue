// 问卷填写成功页面

<template>
  <div id="answer-success">
    <el-card >
      <div class="msg">
        <h1>问卷已填写完成！</h1>
        <h1>感谢您的作答！</h1>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "AnswerSuccess",
}
</script>

<style lang="scss" scoped>
$bg-color: #e5e9f2;
$header-text-color: #C0C4CC;

#answer-success {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: $bg-color;
  color: $header-text-color;

  .el-card {
    position: absolute;
    width: 100%;
    max-width: 600px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .msg {
      text-transform: uppercase;
      padding: 150px 30px;
    }
  }
}
</style>
