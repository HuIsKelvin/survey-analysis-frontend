<template>
  <div id="question-list">
    <el-card
      v-for="(qitem, index) in qusetionList"
      :key="index"
      class="box-card list-item"
      shadow="hover"
    >
      <div slot="header" class="list-item-header">
        <el-row>
          <el-col :span="12">
            <div class="q-main-info">
              <span class="q-info">
                id:
                <span>{{qitem.id}}</span>
              </span>
              <span class="q-info">
                title:
                <span>{{qitem.title}}</span>
              </span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="q-sub-info">
              <span class="title q-info">
                ·
                <span class="status">运行中</span>
              </span>
              <span class="title q-info">
                答卷:
                <span class="status">130</span>
              </span>
              <span class="title q-info">
                发布日期:
                <span class="status">4月20日 20:20</span>
              </span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="q-controll">
        <el-button class="controll-button" type="primary" size="small">编辑</el-button>
        <el-button class="controll-button" type="primary" size="small">发布</el-button>
        <el-button class="controll-button" type="primary" size="small">停止</el-button>
        <el-button class="controll-button" type="primary" size="small">删除</el-button>
        <el-button class="controll-button" type="primary" size="small">分析</el-button>
        <el-button class="controll-button" type="primary" size="small">查看下载</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "QuestionList",
  data() {
    return {
      qusetionList: [
        {
          id: 123,
          title: "第一"
        },
        {
          id: 123,
          title: "第二"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
#question-list {
  text-align: left;

  .list-item {
    margin: 10px auto;

    .list-item-header {
      .q-info {
        margin: 10px;
      }

      .q-main-info {
        // text-align: left;
      }

      .q-sub-info {
        text-align: right;
      }
    }
    .q-controll {
      float: right;
      .controll-button {
        float: left;
      }
    }
  }
}
</style>
