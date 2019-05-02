<template>
  <div id="question-list">
    <el-card
      v-for="(qitem, index) in questionnaires"
      :key="index"
      class="box-card list-item"
      shadow="hover"
    >
      <div slot="header" class="list-item-header">
        <el-row>
          <el-col :span="12">
            <div class="q-main-info">
              <span class="q-info">
                ID:
                <span>{{qitem.id}}</span>
              </span>
              <span class="q-info">
                问卷名:
                <span>{{qitem.name}}</span>
              </span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="q-sub-info">
              <span class="title q-info">
                ·
                <span class="status">运行状态: {{qitem.state}}</span>
              </span>
              <span class="title q-info">
                答卷:
                <span class="status">130</span>
              </span>
              <span class="title q-info">
                发布日期:
                <span class="status">{{qitem.createTime}}</span>
              </span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="q-controll">
        <el-button class="controll-button" type="primary" size="small" @click="editQuestionnaire(qitem.id)">编辑</el-button>
        <el-button class="controll-button" type="primary" size="small">发布</el-button>
        <el-button class="controll-button" type="primary" size="small">停止</el-button>
        <el-button class="controll-button" type="danger" size="small">删除</el-button>
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
      questionnaires: []
    };
  },
  methods : {
    editQuestionnaire(qid) {
      this.$router.push({name: "questionEdit", params:{qid:qid}});
    }

  },
  created: function() {
    axios.get("/questionnaires/search/userId?userId="+this.$store.state.userId)
    .then(response => {
      // TODO: 对数据进行处理已获得更好的展示效果
      this.questionnaires = response.data._embedded.questionnaires;
    })
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
