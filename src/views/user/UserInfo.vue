<template>
  <div class="info-board">
    <div class="info-base">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="avator"></div>
        </el-col>
        <el-col :span="16">
          <div class="infomation">
            <div id="name" class="info-item">{{ name }}</div>
            <div id="mail" class="info-item">邮箱地址: {{ email }}</div>
            <div id="mail" class="info-item">用户ID: {{ userId }}</div>
            <div id="mail" class="info-item">账号名: {{ username }}</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data : function() {
    return {
      name: "",
      username: "",
      userId: "",
      email: "",
    }
  },
  created: function() {
    axios.get("/users/"+this.$store.state.userId)
    .then(response => {
      let data = response.data;
      this.name = data.name;
      this.username = data.username;
      this.email = data.email;
      this.userId = data.id;
    })
  }
}
</script>

<style lang="scss" scoped>
$border-side: 1px solid #e0e0e0;
@mixin row-spacing {
  padding: 1em 0 ;
}

.info-board {
  margin: 0 auto;
  text-align: left;

  .info-item {
    padding: 10px 20px;
  }
}

.info-base {
  border-bottom: $border-side;
  @include row-spacing;

  .avator {
    margin: 0 auto;
    width: 200px;
    height: 200px;
    background-color: grey;
    border-radius: 50%; 
  }

  .infomation {
    #name {
      font-size: 2em;
      font-weight: bold;
    }
  }
}
</style>