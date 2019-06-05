<template>
  <div id="create-guide">
      <el-form>
    <el-form-item label="问卷名称" prop="questionnaireName">
      <el-input v-model="questionnaireName"></el-input>
    </el-form-item>
    <el-button type="primary" @click="createQuestionnaire">立即创建</el-button>
      </el-form>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "CreateQuestionnaire",
  data: function() {
    return {
        questionnaireName: "",
    };
  },
  methods: {
      ...mapMutations({
        // setID: "set_userID",
        // setTitle: "set_questionnaire_title",
        // setQlist: "set_questionList",
        // setLogic: "set_jumplogic",
        set_uQL: "set_userQuestionList"
      }),
      createQuestionnaire: function() {
          if (this.questionnaireName === "") {
              this.$message.error("问卷名称不能为空");
          } else {
              axios.post("/questionnaires/empty", {
                  userId: this.$store.state.userId,
                  name: this.questionnaireName
              })
              .then(response => {
                // 返回问卷id
                  let qid = response.data;

                  let uQL = {
                    userId: this.$store.state.userId,
                    name: this.questionnaireName,
                    questionnaireId: qid,
                    comment: "",
                    endComment: "",
                    numLimit: 0,
                    beginTime: "",
                    endTime: "",
                    pagination: {
                      isPagination: false,
                      totalPage: 0,
                    },
                    totalQuestionNum: 0,
                    questionList: []
                  }
                  this.set_uQL(uQL); // 初始化问卷
                  this.$message.success("创建问卷成功,跳转到编辑页面");
                  this.$router.push({name:"questionEdit", params:{qid:qid}});
              })
              .then(error => {
                  if (error) {
                    this.$message.error("创建问卷失败，请重试");
                  }
              })
                  // 本地测试
                  // let uQL = {
                  //   userId: "1234",
                  //   questionnaireTitle: this.questionnaireName,
                  //   introContents: "",
                  //   endContents: "",
                  //   pagination: {
                  //     isPagination: false,
                  //     totalPage: 0,
                  //     index: []
                  //   },
                  //   totalQuestionNum: 0,
                  //   questionList: []
                  // }
                  // this.set_uQL(uQL); // 清空问卷
                  // this.$message.success("创建问卷成功,跳转到编辑页面");
                  // let qid = this.questionnaireName;
                  // this.$router.push({name:"questionEdit", params:{qid:qid}});
          }
      }

  }
};
</script>

<style lang="scss" scoped>
</style>


