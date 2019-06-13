<!--
* 作用于哪些页面：
    1.由QuestionEdit.vue调用本组件
    2.本组件调用题型小组件,包括: 
        (1) 题目内容输入框：QuestionContentInput.vue,
        (2) 单选、多选和排序题的选项列表组件：QuestionChoiceList.vue,
        (3) 打分题的星星组件：QuestionRate.vue
        (4) 分页组件QuestionpPagination.vue
        (5) 
* 功能说明: 
    1.接受QuestionEdit.vue父组件的props对象，props对象包括question对象和qIndex对象
    2.所有的题型都会需要一个"题目内容输入组件",其余根据question对象中的type字段来判刑需要显示哪一个题型小组件。
    3.通过v-if控制题型小组件的显示
* @liushi
* @2019/6/6
* @version
-->
<template>
  <el-card class="question-card">
    <!--如果是分页则显示调用分页组件-->
    <div v-if="question.type == 'pagination'">
      <pagination :question="question" :qIndex="qIndex"></pagination>
    </div>
    
    <!--如果不是分页，则显示以下内容-->
    <div v-if="question.type !== 'pagination'">
      <div>{{this.question.index}}</div>
      <!--题目内容组件-->
      <div>
        <!--题目内容输入组件-->
        <q-content
        :qContent="question.title"
        :qType="question.type"
        :qIndex="qIndex">
        </q-content>
        <!-- <el-button style="float: right; padding: 3px 0" type="text"><i class="el-icon-delete"></i></el-button> -->
      </div>

      <!--单选、多选、排序组件-->
      <div v-if="question.type == 'radio' || question.type == 'checkbox' || question.type == 'sort'">
        <!--调用选项组件-->
        <choiceList
        :choiceType="question.type"
        :listContent="question.content"
        :qIndex="qIndex">
        </choiceList>
      </div>

      <!--文字输入组件-->
      <div v-if="question.type == 'textarea'">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          disabled>
        </el-input>
      </div>

      <!--短文字输入textInput || 数字输入numInput-->
      <div v-if="question.type == 'textInput' || question.type == 'numInput'">
        <el-input type="text"
          :placeholder="question.type == 'textInput' ? '请输入一段文字' : '请输入一个数字（只能输入数字的输入框）'"
          disabled>
        </el-input>
      </div>

      <!--评分星星组件-->
      <div v-if="question.type == 'rate'">
        <!-- <el-rate>
        </el-rate> -->
        <q-rate
        :qIndex="qIndex"
        :question="question">
        </q-rate>
      </div>

      <!--量尺组件-->
      <div v-if="question.type == 'scale'">
        <el-slider
        :step="1" 
        :max="question.content.max"
        show-stops>
        </el-slider>
      </div>

    </div>

    <!--工具栏-->
    <el-button @click="deleteCard">删除本题</el-button>

  </el-card>
</template>
<script>
import { mapMutations, mapGetters } from "vuex"


export default {
  name: "question-card",
  props: {
    question:{
      type:Object,
    },
    qIndex:{
      type:Number
    }
  },
  data() {
    return {
      activeClass: -1,
    }
  },
  created: function() {
    // this.select = this.jumpLogic;
  },
  mounted: function() {
    
  },
  watch: {
  },
  computed: {
    ...mapGetters({
      isClick:"isClick",
      totalPage: "totalPage",
      questionList: "questionList",
      totalQuestionNum: "totalQuestionNum"
    }),
   },
  methods: {
    ...mapMutations({
      del_obj: "delete_questionList_object",
      set_isClick: "set_isClick",
      set_isPagination: "set_isPagination",
      set_totalPage: "set_totalPage",
      set_isRequired: "set_isRequired",
      set_totalQNum: "set_totalQuestionNum",
      set_qList: "set_questionList"
      
    }),
    deleteCard() {
      if (this.question.type == "pagination") {
        // 如果当前只有两页
        if (this.totalPage == 2) {
          this.set_isPagination(false); // 取消置顶分页卡
          this.set_totalPage(0); // 归零总页数
        } else {
          this.set_totalPage(this.totalPage - 1);// 总页数-1
        }
      } else if (this.question.type == "description") {
        // 也许这里将来会需要做点什么
      } else {
        // 如果是删除题目则总题数-1
        this.set_totalQNum(this.totalQuestionNum - 1);
      }
        // 删除qList里面的obj对象
        this.del_obj(this.qIndex);
        let qList = this.questionList;
        // 更新题号和currentPage
        let update_qList = this.update_index_currentPage(qList);
        this.set_qList(update_qList);
    },
    update_index_currentPage(questionList) {
      let qList = questionList;
      let pCount = 2;
      let qCount = 1;
      for (let i in qList) {
        if (qList[i].type === "pagination") {
          qList[i].currentPage = pCount;
          pCount++;
        } else if (qList[i].type === "description"){
            
        } else {
          qList[i].index = qCount;
          qCount++;
        }
      }
      return qList
    }
  },
  components: {
    "q-content": () => import("@/components/question/QuestionContentInput.vue"),
    "choiceList": () => import("@/components/question/QuestionChoiceList.vue"),
    "q-rate": () => import("@/components/question/QuestionRate.vue"),
    "pagination": () => import("@/components/question/QuestionPagination.vue"),
  }
}
</script>
<style scoped>

.question-card {
  margin-left:2em;
  margin-right: 2em;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
}

</style>