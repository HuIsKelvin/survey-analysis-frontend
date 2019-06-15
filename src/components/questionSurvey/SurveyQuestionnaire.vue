<template>
  <div id="survey-questionnaire">
    <div class="survey-container">
      <el-card shadow="always">

        <!-- 问卷标题 -->
        <h1 class="survey-title">{{ questionName }}</h1>

        <!-- 问卷欢迎语 -->
        <p>{{ questionComment }}</p>

        <!-- 问卷题目 -->
        <div class="survey-questions">
          <el-form
            class="answerForm"
            label-position="top"
            ref="answerForm"
            @submit.native.prevent>
            <transition-group name="list-item" tag="div"
          >
              <div
                class="question-item"
                v-for="(setting, index) in questionList"
                :key="index + setting.title"
              >
                  <dynamic-question
                    class="dynamic-question"
                    v-if="setting.isShow === true && setting.type !== 'pagination'"
                    :setting="setting"
                  >
                  </dynamic-question>
              </div>
            </transition-group>
          </el-form>
        </div>

        <!-- 分页 -->
        <div
          v-if="isPagination"
          class="survey-pagination"
        >
          <el-pagination
            background
            layout="prev, pager, next"
            prev-text="上一页"
            next-text="下一页"
            :page-size="pagination.pageSize"
            :total="totalPage"
            @current-change="handlePageChange"
          >
          </el-pagination>
        </div>

        <!-- 问卷操作 -->
        <div class="survey-operation">
          <el-button 
            type="primary"
            @click="submitQuestionnaire"
            :disabled="isSubmit === false">提交问卷
          </el-button>
        </div>

      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DynamicQueation from "@/components/questionSurvey/DynamicQuestion";

export default {
  name: "SurveyQuestionnaire",
  components: {
    "dynamic-question": DynamicQueation
  },
  props: {
    questionnaire: {
      type: Object
    },
    isSubmit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // questionList: this.questionnaire.questionList,
      questionName: this.questionnaire.name,
      questionComment: this.questionnaire.comment,
      pagination: {
        // 每页显示条目数，不要改
        pageSize: 1,
        currentPage: 1
      }
    }
  },
  computed: {
    // FIXME: 判断没有分页的情况
    questionList() {
      return this.questionnaire.questionList.filter(el => {
        if(this.isPagination) {
          return (el.isShow === true) && (el.currentPage === this.pagination.currentPage) && (el.type !== "pagination");
        } else {
          return (el.isShow === true) && (el.type !== "pagination");
        }
      });
    },
    isPagination() {
      if(this.questionnaire.pagination.isPagination === 'true') {
        return true
      } else {
        return false
      }
      // return this.questionnaire.pagination.isPagination === 'true' ? true : false;
    },
    totalPage() {
      if(this.questionnaire.pagination.totalPage) {
        return parseInt(this.questionnaire.pagination.totalPage);
      } else {
        return 1;
      }
    }
  },
  mounted() {
    console.log("is pagi? " + this.isPagination);
  },
  methods: {
    ...mapActions("survey", {
      "submitAnswerSheet": "submitAnswerSheet"
    }),
    
    // 提交答卷
    submitQuestionnaire() {
      this.submitAnswerSheet({
        qid: this.questionnaire.id
      });
    },

    // 页码变化事件
    handlePageChange(curPage) {
      console.log("当前页：" + curPage);
      this.pagination.currentPage = curPage;
      // this.setCurrentPage({ page: curPage });
    },

  }
}
</script>

<style lang="scss" scoped>
#survey-questionnaire {
  width: 100%;

  .survey-container {
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 20px;
    padding-top: 50px; 
    padding-bottom: 50px;

    .survey-title {
      margin: 30px auto;
    }

    .survey-questions{
      margin: 30px 0;

      .question-item {
        .dynamic-question {
          margin: 0 20px;
          padding: 20px 0;
          border-top: 1px solid #e0e0e0;
        }
        
        &:last-of-type {
          .dynamic-question {
            border-bottom: 1px solid #e0e0e0;
          }
        }
      }
    }

    .survey-pagination {
      .el-pagination {
        button > span {
          padding: 10px;
        }
      }
    }

    .survey-operation {
      margin: 20px auto;
    }
  }
}

</style>
