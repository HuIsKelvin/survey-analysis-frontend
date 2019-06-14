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
                {{ index + 1 }}
              </span>
              <!-- <span class="q-info">
                ID:
                <span>{{qitem.id}}</span>
              </span> -->
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
                <span class="status">{{ qitem.peopleNum }}</span>
              </span>
              <span class="title q-info">
                发布日期:
                <span class="status">{{qitem.createTime}}</span>
              </span>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-row 
        type="flex"
        justify="end"
        class="q-control"
      >
        <el-button class="control-button" type="primary" plain size="small" @click="editQuestionnaire(qitem.id)">
          <i class="el-icon-edit"></i>
          编辑
        </el-button>
        <el-button class="control-button" type="primary" plain size="small">
          <i class="el-icon-check"></i>
          发布
        </el-button>
        <el-button class="control-button" type="primary" plain size="small">
          <i class="el-icon-close"></i>
          停止
        </el-button>
        <el-button class="control-button" type="primary" plain size="small">
          <i class="el-icon-document"></i>
          分析
        </el-button>
        <el-button class="control-button" type="primary" plain size="small">
          <i class="el-icon-download"></i>
          查看下载
        </el-button>
        <el-popover
          placement="bottom"
          width="250"
          trigger="hover"
        >
          <!-- popover content -->
          <div class="popover-content">
            <p>链接：</p>
            <el-input 
              readonly="readonly"
              :value="shareBaseUrl + qitem.id"
            ></el-input>
            <p>二维码</p>
            <qrcode :value="shareBaseUrl + qitem.id" :options="{ width: 150 }"></qrcode>
          </div>
          <!-- popover trigger -->
          <el-button 
            class="control-button button-share"
            type="primary"
            plain
            size="small"
            slot="reference"
          >
            <i class="el-icon-share"></i>
            分享
          </el-button>
        </el-popover>
        <el-button class="control-button" type="danger" plain size="small">
          <i class="el-icon-delete"></i>
          删除
        </el-button>
      </el-row>
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
  computed: {
    shareBaseUrl() {
      const baseUrl = document.location.origin;
      return (baseUrl + "/survey/");
    }
  },
  methods : {
    editQuestionnaire(qid) {
      this.$router.push({name: "questionEdit", params:{qid:qid}});
    }
  },
  created: function() {
    axios.get("/questionnaires/search/userId?userId="+this.$store.state.user.userId)
    .then(response => {
      // TODO: 对数据进行处理已获得更好的展示效果
      this.questionnaires = response.data._embedded.questionnaires;
      console.log(this.questionnaires);
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
        font-weight: bold;
        font-size: 1.2rem;
      }

      .q-sub-info {
        text-align: right;
      }
    }
    .q-control {
      // float: right;
      // margin: 20px;
      // &after {
      //   content: " ";
      //   display: block;
      // }

      .control-button {
        // float: left;
      }

      .button-share {
        margin: 0 10px;
      }
    }
  }
}
</style>
