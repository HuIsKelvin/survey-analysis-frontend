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
                  userId: this.$store.state.user.userId,
                  name: this.questionnaireName
              })
              .then(response => {
                // 返回问卷id
                  let qid = response.data;
                  // let uQL = {
                  //   userId: this.$store.state.user.userId,
                  //   name: this.questionnaireName,
                  //   id: qid,
                  //   comment: "感谢您能抽出几分钟时间来参加本次答题，现在我们就马上开始吧！",
                  //   endComment: "您已完成本次问卷，感谢您的帮助与支持！",
                  //   numLimit: 0,
                  //   beginTime: "",
                  //   endTime: "",
                  //   pagination: {
                  //     isPagination: false,
                  //     totalPage: 0,
                  //   },
                  //   totalQuestionNum: 0,
                  //   questionList: []
                  // }
                  // console.log("user id" + this.$store.state.user.userId);
                  // this.set_uQL(uQL); // 初始化问卷
                  this.$message.success("创建问卷成功,跳转到编辑页面");
                  this.$router.push({name:"questionEdit", params:{qid:qid}});
              })
              .then(error => {
                  if (error) {
                    this.$message.error("创建问卷失败，请重试");
                  }
              })

          }
      }

  }
};
</script>

<style lang="scss" scoped>
</style>


