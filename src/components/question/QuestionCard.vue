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
  <el-card class="question-card" shadow="hover">
    <el-row>
      <!--如果是分页则显示调用分页组件-->
      <div v-if="question.type == 'pagination'">
        <el-col :span="22">
          <pagination :question="question" :qIndex="qIndex" style="line-heigth:18px"></pagination>
        </el-col>
        <el-col :span="2" class="tool-col">
            <el-tooltip class="item" effect="dark" content="删除分页" placement="top">
              <el-button type="text" style="font-size:18px;" size="mini" @click="deleteCard"><i class="el-icon-close"></i></el-button>
            </el-tooltip>
        </el-col>
      </div>
    
      <!--如果不是分页，则显示以下内容-->
      <div v-if="question.type !== 'pagination'">

        <!--题目序号or备注符号-->
        <el-col :span="1">
          <div v-if="question.type !== 'description'" style="line-height:2.4rem">{{this.question.index}}.</div>
          <div v-if="question.type == 'description'" style="line-height:2.4rem"><i class="el-icon-info"></i></div>
        </el-col>

        <!--题目主体部分-->
        <el-col :span="17">
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
        </el-col>

        <!--工具栏-->
        <el-col :span="6" class="tool-col">
          <div style="line-height:2.4rem">
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <el-button type="text" style="font-size:18px;" @click="deleteCard">
                <font-awesome-icon class="far-icon" :icon="['far', 'trash-alt']"/>
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="复制" placement="top">
              <el-button type="text" style="font-size:18px;" @click="copyCard">
                <font-awesome-icon class="far-icon" :icon="['far', 'copy']"/>
              </el-button>
            </el-tooltip>
          </div>
        </el-col>
      </div>
    </el-row>

    <el-row>
    </el-row>
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
      set_qList: "set_questionList",
      add_question: "add_questionList_object"
      
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
    copyCard() {
      // 不能直接copyQuestion = this.question
      let copyQuestion = {
        type: this.question.type,
        index: 0,
        currentPage: 0,
        title:this.question.title,
        isRequired: this.question.isRequired,
        isDraggable: true,
        content:this.question.content,
        // 添加时默认没有逻辑跳转
        jumpLogic: []
      };
      if (copyQuestion.type == 'description') {
        // nothing 
      } else {
        let tQN = this.totalQuestionNum;
        copyQuestion.index = tQN + 1;
        this.set_totalQNum(tQN+1);
      }
      this.add_question(copyQuestion);
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
.question-card:hover .tool-col {
  display:block;
}
.tool-col {
  display:none
}
.far-icon {
  color:rgb(0,128,128);
}
</style>