<!--  <- 返回我问卷个人中心     问卷编辑 > 发布问卷 > 统计报表       保存 预览 发布     账号-->
<template>
    <div class="bread-header">
      <el-col :span="2">
      <div>
        <el-button type="text" @click="backToManage" style="color='#A3E4D7'"><i class="el-icon-back"></i><span>返回个人问卷中心</span></el-button>   
      </div>
      </el-col>
      <el-col :span="16">
      <div id="prograss-bar">
        <el-button type="text" class="high-light-button" :disabled="view.viewType === 'question-edit'? false : true">问卷编辑</el-button>
        <i class="el-icon-arrow-right"></i>
        <el-button type="text" :disabled="view.viewType === 'release'? false : true">发布问卷</el-button>
        <i class="el-icon-arrow-right"></i>
        <el-button type="text" :disabled="view.viewType === 'report'? false : true">统计报表</el-button>
      </div>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" size="mini" v-if="view.viewType==='question-edit'" @click="saveQuestionnaire">保存问卷</el-button>
        <el-button type="primary" size="mini" v-if="view.viewType==='question-edit'" @click="previewQuestionnaire">预览问卷</el-button>
        <el-button type="primary" size="mini" v-if="view.viewType==='question-edit'" @click="releaseAndShare">发布并分享</el-button>
      </el-col>
      <el-col :span="2">
        <el-dropdown>
          <el-button type="text">
            <img :src="userLogo" class="user-logo">
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item disabled><span class="user-id">用户账号名</span></el-dropdown-item> -->
            <el-dropdown-item><router-link :to="{name: 'user.info'}" tag="span">我的个人信息</router-link></el-dropdown-item>
            <el-dropdown-item divided><span @click="signout"><i class="el-icon-circle-close-outline"></i>退出登录</span></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </el-col>
    <el-dialog
      title="确认信息"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      width="30%"
      >
      <span>检测到未保存的内容，是否在离开页面前保存修改？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveAndJumpToManage">保存</el-button>
        <el-button @click="jumpToManage">放弃修改</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
    </div>
</template>
<script>
import {mapGetters, mapMutations, mapActions} from "vuex";
import * as types from "@/store/types.js";

export default {
  name: "bread-header",
  props: {
    view: {
      type: Object
    }
  },
  data() {
    return {
      userLogo: require("@/assets/image/user-logo.jpg"),
      dialogVisible: false,
    }
  },
  computed: {
    ...mapGetters("questionnaire", {
      userQuestionList: "userQuestionList",
      questionnaireId: "questionnaireId",
      isPagination: "isPagination",
    })
  },
  methods: {
    ...mapMutations("questionnaire", {
        set_state: "set_state",
        set_qList: "set_questionList"
    }),
    ...mapActions("survey", {
      "setQuestionnairePreview": "setQuestionnaire"
    }),
    saveAndJumpToManage() {
      this.saveQuestionnaire();
      this.jumpToManage();
    },
    backToManage() {
      // console.log(this.view.viewType)
      if (this.view.viewType == 'question-edit') {
        this.dialogVisible = true;
        // console.log(this.dialogVisible)
      } else if (this.view.viewType === 'release') {
        this.jumpToManage()
      }
    },
    // 直接跳转到问卷管理页面
    jumpToManage() {
      this.$router.push({path:"/user/manage"});
      this.dialogVisible = false;
    },
    saveQuestionnaire() {
        this.set_update_currentPage();
        // put是直接替换当前的数据
        console.log(this.questionnaireId);
        console.log(this.userQuestionList);
        axios.put("/questionnaires/" + this.questionnaireId, this.userQuestionList)
        .then(response => {
          console.log(this.userQuestionList);
          this.$message({
            message:'问卷已保存',
            type: "success"
          })
        })
        .catch(error => {
            this.$message.error("保存问卷失败，请重试");
        })
    },
    // 发布并分享按钮
    releaseAndShare() {
      this.set_state(true);
      this.set_update_currentPage();
      console.log(this.userQuestionList)
      axios.put("/questionnaires/" + this.questionnaireId, this.userQuestionList)
      .then(response => {
        //跳转到发布页面Release.vue
        let qid = response.data.id;
        this.$message({
          message: "成功保存并发布问卷",
          type: "success"
        })
        this.$router.push({name:"releaseQuestionnaire", params:{qid:qid}});
      })
      .catch(error => {
          console.log(error)
          this.$message({
            message: "发布问卷失败，请重试",
            type: "error"
          })
      })
      

    },
    // 预览问卷
    previewQuestionnaire() {
      // 预览前更新currentPage
      this.set_update_currentPage();
      
      this.setQuestionnairePreview({
        questionnaire: this.userQuestionList
      });
      this.$router.push({
        name: "preview"
      })
    },

    // 退出登录
    signout: function() {
      this.$store.commit(types.SIGNOUT);
      this.$router.push({name:"sign"});
    },
    // 预览和保存前更新currentPage到state
    set_update_currentPage() {
      let qList = this.userQuestionList.questionList;
      qList = this.update_currentPage(qList)
      this.set_qList(qList);
    },
    // 更新一个qList中的currentPage，返回一个qList
    update_currentPage(questionList){
      if (this.isPagination) {
        let counter = 1;
        for (let i in questionList) {
          if (questionList[i].type == "pagination") {
            counter++;
          } else {
            questionList[i].currentPage = counter;
          }
        }

      } else {
        // do nothing so far
      }
      return questionList;
    }
  },

}
</script>
<style lang="scss" scoped>
  .user-logo{
    height: 40px;
    width: 40px;
    border-radius:50%;
    -webkit-border-radius:50%;
    -moz-border-radius:50%;
    // margin-top: 10px;
  }
  .user-logo-button:hover >  {

  }
  .user-id {
    font-size: 14px;
  }
  .bread-header .el-button--text:hover{
    color: rgb(163, 228, 215)
  }
  .bread-header .el-button--text {
    color: rgb(118, 215, 196);
  }

  .bread-header .el-button.is-disabled, .el-button.is-disabled:hover, .el-button.is-disabled:focus {
    color: #C0C4CC;
  }
  #prograss-bar i{
    color: white;;
  }
</style>