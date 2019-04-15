<template>
  <div class="info-board">
    <div class="info-base">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="avator"></div>
        </el-col>
        <el-col :span="16">
          <div class="infomation">
            <div id="name" class="info-item">name</div>
            <div id="job" class="info-item">job</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  
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