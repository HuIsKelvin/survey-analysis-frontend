<template>
  <div id="question-list">
    <!-- 问卷管理条目 -->
    <el-card
      v-for="(qitem, qindex) in questionnaires"
      :key="qindex + qitem.name"
      class="box-card list-item"
      shadow="hover"
    >

      <!-- 问卷管理条目 header -->
      <div slot="header" class="list-item-header">
        <el-row>
          <el-col :sm="24" :md="12">
            <div class="q-main-info">
              <span class="q-info">{{ qindex + 1 }}</span>
              <span class="q-info">
                <!-- 问卷名: -->
                <span>{{qitem.name}}</span>
              </span>
            </div>
          </el-col>
          <el-col :sm="24" :md="12">
            <div class="q-sub-info">
              <span class="title q-info">
                ·
                <!-- 运行状态:  -->
                <span v-if="qitem.state === true" class="status">运行中</span>
                <span v-else class="status">暂停中</span>
              </span>
              <span class="title q-info">
                答卷数量:
                <span v-if="qitem.peopleNum === null" class="status">0</span>
                <span v-else class="status">{{ qitem.peopleNum }}</span>
              </span>
              <span class="title q-info">
                发布日期:
                <span class="status">{{ (qitem.createTime.split("."))[0].replace("T", " ") }}</span>
              </span>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-row class="q-control">
        <!-- 编辑-按钮 -->
        <el-button class="control-button" type="primary" plain size="small" @click="editQuestionnaire(qitem.id, qindex)">
          <i class="el-icon-edit"></i>
          编辑
        </el-button>

        <!-- 发布 或 停止-按钮 -->
        <el-button class="control-button" type="primary" plain size="small" @click="changeQuestionnaireState(qitem.id, true)">
          <i class="el-icon-check"></i>
          发布
        </el-button>
        <el-button class="control-button" type="primary" plain size="small" @click="changeQuestionnaireState(qitem.id, false)">
          <i class="el-icon-close"></i>
          停止
        </el-button>

        <!-- 分析-按钮 -->
        <el-button 
          class="control-button" type="primary" plain size="small"
          @click="$router.push({path:'/report/'+qitem.id})"
          :disabled="qitem.peopleNum <= 1"
        >
          <i class="el-icon-document"></i>
          分析
        </el-button>

        <!-- 下载-按钮 -->
        <el-button class="control-button" type="primary" plain size="small" @click="download_excel(qitem.id)" :disabled="qitem.peopleNum<=0">
          <i class="el-icon-download"></i>
          下载答卷
        </el-button>

        <!-- 分享-按钮 -->
        <el-popover placement="bottom" width="250" trigger="click">
          <!-- popover content -->
          <div class="popover-content">
            <p>链接：</p>
            <!-- <el-link type="primary" :href="shareBaseUrl + qitem.id" target="_blank">{{ shareBaseUrl + qitem.id }}</el-link> -->
            <a :href="shareBaseUrl + qitem.id" target="_blank">{{ shareBaseUrl + qitem.id }}</a>
            <!-- <el-divider></el-divider> -->
            <br/>
            <p>二维码</p>
            <qrcode :value="shareBaseUrl + qitem.id" :options="{ width: 150 }"></qrcode>
          </div>
          <!-- popover trigger -->
          <el-button class="control-button button-share" type="primary" plain size="small" slot="reference">
            <i class="el-icon-share"></i>
            分享
          </el-button>
        </el-popover>

        <!-- 删除-按钮 -->
        <el-button class="control-button" type="danger" plain size="small" @click="deleteQuestionnaire(qitem.id)">
          <i class="el-icon-delete"></i>
          删除
        </el-button>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "QuestionList",
  data() {
    return {
      questionnaires: []
    };
  },
  created: function() {
    this.getQuestionnaires();
  },
  computed: {
    shareBaseUrl() {
      const baseUrl = document.location.origin;
      return baseUrl + "/survey/";
    },
    
  },
  methods: {
    ...mapMutations({
      set_uQL: "set_userQuestionList"
    }),

    // 获得当前 user 所拥有的问卷
    getQuestionnaires() {
      axios
        .get(
          "/questionnaires/search/userId?userId=" +
            this.$store.state.user.userId
        )
        .then(response => {
          // TODO: 对数据进行处理已获得更好的展示效果
          this.questionnaires = response.data._embedded.questionnaires;
          console.log("get questionnaire by id");
          console.log(this.questionnaires);
        })
        .catch(err => {
          console.log(err);
        });
    },

    download_excel(qid) {
      console.log(qid)
      let options = {
        responseType: "blob"
      };
      axiosVisual
        .get("excel/" + qid, options)
        .then(response => {
          const content = response.data;
          const blob = new Blob([content]);
          const filename = `${qid}.xlsx`;
          const elink = document.createElement("a");
          elink.download = filename;
          //elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink);
          document.body.removeChild(elink);
        })
        .catch(error => {
          // this.$message.error(error.response.data.error);
          // this.$message.error(error.data.error);
          console.log(error);
          console.log(error.response);
          if(error.response.status === 500) { this.$message.error("暂无答卷报告！"); }
        });
    },
    // 编辑问卷
    editQuestionnaire(qid, qindex) {
      // this.$router.push({ name: "questionEdit", params:{ qid: qid } });
      this.$confirm(
        "已发布的问卷再次编辑后，会丢失以前的答卷数据。是否确认编辑？",
        "提示",
        { type: "warning" }
      )
        .then(res => {
          this.changeQuestionnaireState(qid, false);
          axios.post("/answerSheet/deleteByQuesId/?qid="+qid)
            .then(res => { console.log("empty"); })
            .catch(err => { console.log(err); })
          this.$router.push({ name: "questionEdit", params: { qid: qid } });
          console.log(qid);
        })
        .catch(err => {});
    },

    // 发布问卷
    releaseQuestionnaire(qid) {
      axios.patch("/questionnaires/" + qid, { state: true });
    },

    // 修改问卷状态
    // qid：问卷id；
    // qstate：发布状态；true为发布中，false为暂停中
    changeQuestionnaireState(qid, qState) {
      axios
        .patch("/questionnaires/" + qid, { state: qState })
        .then(res => {
          console.log("change questionnaire state! " + qState);
          this.getQuestionnaires();
        })
        .catch(err => console.log(err));
    },

    // 删除问卷
    deleteQuestionnaire(qid) {
      this.$confirm("此操作将永久删除该问卷, 是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .delete("/questionnaires/" + qid)
            .then(res => {
              console.log("delete: " + qid);
              // 更新页面问卷列表
              this.getQuestionnaires();
              this.$message({ type: "success", message: "删除成功!" });
            })
            .catch(err => {
              console.log(err);
              this.$message({ type: "error", message: "删除出现错误！" });
            });
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消删除" });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
#question-list {
  text-align: left;

  .list-item {
    margin: 20px auto;

    .list-item-header {
      .q-info {
        margin: 10px;
        display: inline-block;
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
      float: right;
      margin-bottom: 10px;
      // &after {
      //   content: " ";
      //   display: block;  
      // }

      .control-button {
        // float: left;
        margin-bottom: 10px;
      }

      .button-share {
        margin: 0 10px;
      }
    }
  }
}
</style>
