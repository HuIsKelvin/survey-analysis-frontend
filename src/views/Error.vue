// 显示错误页面

<template>
  <div id="error">
    <el-card>
      <div class="msg">
        <h1>error!</h1>
        <p>{{ alertMsg }}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Error",
  data() {
    return {
      defaultMsg: "页面走丢啦！"
    }
  },
  computed: {
    alertMsg() {
      let msgRoute = this.$route.query.msg;
      // console.log(msgRoute);
      if(msgRoute) { return msgRoute; }
      else { return this.defaultMsg; }
    }
  }
}
</script>

<style lang="scss" scoped>
$bg-color: #e5e9f2;
$header-text-color: #C0C4CC;

#error {
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

      h1 {
        color: #F56C6C;
      }
    }
  }
}
</style>
