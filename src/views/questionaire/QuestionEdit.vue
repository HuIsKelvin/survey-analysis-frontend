<template>
  <el-container class="question-edit-container">
    <el-header class="question-edit-header">
      <el-button>预览</el-button>
      <el-button plain>保存编辑</el-button>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="4" class>
          <el-menu class="question-edit-nav" :default-openeds="['1', '2', '3', '4', '5']">
            <el-submenu index="1">
              <template slot="title">
                <span>分页说明</span>
              </template>
              <el-menu-item-group>
                <el-menu-item>
                  <el-button type="text" @click="addDescription()">备注说明</el-button>
                </el-menu-item>
                <el-menu-item>
                  <el-button type="text" @click="addPagination()">设置分页</el-button>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <span>选择题</span>
              </template>
              <el-menu-item-group>
                <el-menu-item>
                  <el-button type="text" @click="addQuestion('radio')">单选题</el-button>
                </el-menu-item>
                <el-menu-item>
                  <el-button type="text" @click="addQuestion('checkbox')">多选题</el-button>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <span>填空题</span>
              </template>
              <el-menu-item-group>
                <el-menu-item>
                  <el-button type="text" @click="addQuestion('textarea')">填空题</el-button>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <span>打分排序</span>
              </template>
              <el-menu-item-group>
                <el-menu-item>
                  <el-button type="text" @click="addQuestion('rate')">评分题</el-button>
                </el-menu-item>
                <el-menu-item>
                  <el-button type="text" @click="addQuestion('scale')">量表题</el-button>
                </el-menu-item>
                <el-menu-item>
                  <el-button type="text" @click="addQuestion('sort')">排序题</el-button>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <span>个人信息</span>
              </template>
              <el-menu-item-group>
                <el-menu-item>
                  <el-button type="text" @click="addQuestion('name')">姓名</el-button>
                </el-menu-item>
                <el-menu-item>
                  <el-button type="text" @click="addQuestion('sex')">性别</el-button>
                </el-menu-item>
                <el-menu-item>
                  <el-button type="text" @click="addQuestion('age')">年龄</el-button>
                </el-menu-item>
                <el-menu-item>
                  <el-button type="text" @click="addQuestion('address')">地址</el-button>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>

        <el-container class="question-edit-main">
          <el-col :span="16" class>
            <div id="questionaire-wrapper" class>
              <!--问卷标题和说明-->
              <intro></intro>
              <!--问卷主体-->
              <pagination v-if="this.isPagination" :question="{isDraggable: false}"></pagination>
              <div id="questionList" v-if="this.qList.length !==0" class>

                <!--draggable拽拖盒子-->
                <draggable 
                :list="this.qList"
                @start="isDragging=true"
                @end="isDragging=false">
                  <qCard
                    v-for="(q, qIndex) in this.qList"
                    track-by="$index"
                    :qIndex="qIndex"
                    :question="q"
                    :key="qIndex"
                  >
                  </qCard> 
                </draggable>
              </div>
              <!--测试查看qList-->
              {{this.qList}}
              <br/>
              <!--问卷底部-->
              <end></end>
            </div>
            <el-button type="primary" @click="emptyPage()">清空分页</el-button>
            <el-button type="primary">保存问卷</el-button>
            <el-button type="primary">发布并分享</el-button>
          </el-col>
          <el-col :span="8" class>
                      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
  <el-radio-button :label="false">展开</el-radio-button>
  <el-radio-button :label="true">收起</el-radio-button>
</el-radio-group>
<el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
  <el-submenu index="1">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span slot="title">导航一</span>
    </template>
    <el-menu-item-group>
      <span slot="title">分组一</span>
      <el-menu-item index="1-1">选项1</el-menu-item>
      <el-menu-item index="1-2">选项2</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group title="分组2">
      <el-menu-item index="1-3">选项3</el-menu-item>
    </el-menu-item-group>
    <el-submenu index="1-4">
      <span slot="title">选项4</span>
      <el-menu-item index="1-4-1">选项1</el-menu-item>
    </el-submenu>
  </el-submenu>
  <el-menu-item index="2">
    <i class="el-icon-menu"></i>
    <span slot="title">导航二</span>
  </el-menu-item>
  <el-menu-item index="3" disabled>
    <i class="el-icon-document"></i>
    <span slot="title">导航三</span>
  </el-menu-item>
  <el-menu-item index="4">
    <i class="el-icon-setting"></i>
    <span slot="title">导航四</span>
  </el-menu-item>
</el-menu>
          </el-col>
        </el-container>

        


      </el-row>
    </el-main>
  </el-container>
</template>
<script>
// 问卷开头和结尾组件
import Introduction from "@/components/question/Introduction.vue";
import End from "@/components/question/End.vue";
// 问卷题型组件
import MultipleChoice from "@/components/question/MultipleChoice.vue";
import MultipleAnswers from "@/components/question/MultipleAnswers.vue";
// 拽拖组件
import draggable from 'vuedraggable';
// vuex组件
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "question-edit-view",
  data() {
    return {
      userId: "1234", // 根据userId来确定questionList的存储字段
      isDragging:false,
      isCollapse: true
    };
  },
  computed: {
    // 获取当前用户的id
    ...mapGetters({
      intro: "introContents",
      isPagination: "isPagination",
      totalPage: "totalPage",
      totalQuestionNum: "totalQuestionNum"
    }),
    qList: {
        get() {
          // return this.changeQJump(this.$store.state.questionnaire.userQuestionList.questionList);
          return this.$store.state.questionnaire.userQuestionList.questionList;
        },
        set(value) {
          this.$store.commit('update_questionList', value);
        }
      },
    qList_length: function() {
      if(this.qList.length !== null){
        return this.qList.length;
      }else{
        return 0;
      }
    },
  },
  created() {},
  methods: {
    ...mapMutations({
      add_qList_obj: "add_questionList_object",
      update_qList: "update_questionList",
      set_pagination: "set_pagination",
      set_totalPage: "set_totalPage",
      set_isPagination: "set_isPagination",
      set_totalQNum: "set_totalQuestionNum"
    }),
    get_init() {
      let initialType = {
        type: "",
        title:"",
        index: 0,
        isRequired: true,
        isDraggable: true,
        content:{
          options:[],
          max:5,
          min:1,
          input: ""
        },
        // 添加时默认没有逻辑跳转
        jumpLogic: [
          {
            startValue: "",
            endValue: ""
          }
        ]
      };
      return initialType;
    },
    addQuestion(type) {
      let newNum = this.totalQuestionNum + 1;
      this.set_totalQNum(newNum);
      let qListObj = this.get_init();
      qListObj.type = type;
      qListObj.index = newNum;
      if (type == "textarea") {
        qListObj.title = "文字输入题";
      }
      if ((type == "radio")) {
        qListObj.title = "单选题";
        qListObj.content.options = ["选项1", "选项2"];
      }
      if ((type == "checkbox")) {
        qListObj.title = "多选题";
        qListObj.content.options = ["选项1", "选项2"];
      }
      if ((type == "description")) {
        qListObj.title = "请阅读本项说明，然后回答问题";
      }
      if ((type == "rate")) {
        qListObj.title = "请给本项打分";
      }
      if ((type == "scale")) {
        qListObj.title = "您向朋友或同事推荐我们的可能性有多大？";
      }
      if ((type == "sort")) {
        qListObj.title = "请给以下选项排序";
        qListObj.content.options = ["item1", "item2"];
      }
      if ((type == "name")) {
        qListObj.title = "名字";
      }
      if ((type == "sex")) {
        qListObj.title = "性别";
      }
      if ((type == "age")) {
        qListObj.title = "年龄";
      }
      if ((type == "address")) {
        qListObj.title = "地址";
      }
      this.add_qList_obj(qListObj);
    },
    addPagination() {
      let page = 0;
      let qListObj = this.get_init();
      qListObj.type = "pagination";
      if (this.totalPage == 0) {
        page = 2;
        this.set_isPagination(true);
        qListObj.index = 2;
      } else {
        page = this.totalPage
        page += 1;
        qListObj.index = page;
      }
      this.set_totalPage(page);
      this.add_qList_obj(qListObj);
    },
    addDescription() {
      let qListObj = this.get_init();
      qListObj.type = "description";
      qListObj.title = "这是一段段落说明";
    },
    // 用于将vuex的jumpLogic转换成组件需要的字段格式，返回修改过jumpLogic的整个qList
    // changeQJump(qList_simple) {
    //   // console.log(originQList);
    //   for (let q in qList_simple) {
    //     if ( Object.keys(q.jumpLogic).length == 0 ) {
    //       q.jumpLogic = []; 
    //     } else {
    //       let jumpLogic = [];
    //       for (let i in q.jumpLogic) {
    //         // console.log(i);
    //         // console.log(this.question.jumpLogic[i]);
    //         // 转化成数字类型
    //         let j = parseInt(i);
    //         let k = j + 1; // 选项号，这个信息对其他有些功能非常重要，必须存在。
    //         let startValue = k + "." + q.content.options[j];
    //         let endValue = "Q" + q.index + ":" + q.title;
    //         jumpLogic.push({
    //           "startValue": startValue,
    //           "endValue": endValue,
    //         })
    //       }
    //       q.jumpLogic = jumpLogic;
    //       jumpLogic = [];
    //     }
    //   }
    //   // console.log(jumpLogic);
    //   return qList_simple;
    // },
    emptyPage() {
        this.set_isPagination(false);
        this.set_totalPage(0);
    },
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
    handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
  },
  components: {
    intro: Introduction,
    end: End,
    radio: MultipleChoice,
    checkbox: MultipleAnswers,
    qCard: () => import("@/components/question/QuestionCard.vue"),
    draggable,
    "pagination": () => import("@/components/question/QuestionPagination.vue")
  }
};
</script>
<style scoped>
.question-edit-main {
  background-color: #e5e9f2;
}

.question-edit-header {
  background-color: #009a61;
}

body {
  margin: 0px;
}
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>