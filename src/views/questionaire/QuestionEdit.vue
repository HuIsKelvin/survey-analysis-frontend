<!--
* 作用于哪些页面：
    1.第一种可能：由CreateQuestionnaire.vue跳转到本组件，即创建新问卷；
    2.第二种可能：由用户问卷管理页面点击“编辑”，然后跳转到本组件。
    3.本组件是问卷编辑页面的全体视图，包括: 
        (1) 顶部bread-header组件，就是一个导航栏；
        (1) 左侧题目栏，用于点击添加各种类型的题型；
        (2) 问卷主体的QuestionCard.vue组件，用于生成各种题型、分页、和备注说明；
        (3) 底部有4个button，“清空分页”是用于开发测试的button，“预览问卷”用于
        (4) 右侧有问卷时间输入组件QuestionDate.vue和限制人数输入栏QuestionCounter.vue组件。
        (5) 右侧展开收起功能仅仅所欲开发测试，请忽略。
* 功能说明: 
    1.点击左侧栏，向questionList添加问题、分页、注释等obj
    2.在draggable标签内部利用v-for生成questionCard组件，实现题目的生成和拽拖
    3.
* @liushi
* @2019/6/5
* @version
-->
<template>
  <el-container class="question-edit-container">
    <el-header class="question-edit-header">
      <!-- <el-button>预览</el-button>
      <el-button plain>保存编辑</el-button> -->
      <bread-header></bread-header>
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
                  <el-button type="text" @click="addQuestion({type: 'radio', title:'单选题'})">单选题</el-button>
                </el-menu-item>
                <el-menu-item>
                  <el-button type="text" @click="addQuestion({type: 'checkbox', title:'多选题'})">多选题</el-button>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <span>填空题</span>
              </template>
              <el-menu-item-group>
                <el-menu-item>
                  <el-button type="text" @click="addQuestion({type: 'textarea', title:'填空题'})">填空题</el-button>
                </el-menu-item>
                <el-menu-item>
                  <el-button type="text" @click="addQuestion({type: 'numInput', title:'数字输入题'})">数字输入题</el-button>
                </el-menu-item>
                <el-menu-item>
                  <el-button type="text" @click="addQuestion({type: 'textInput', title:'短文本输入题'})">短文本输入题</el-button>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <span>打分排序</span>
              </template>
              <el-menu-item-group>
                <el-menu-item>
                  <el-button type="text" @click="addQuestion({type: 'rate', title:'请给本项打分'})">评分题</el-button>
                </el-menu-item>
                <el-menu-item>
                  <el-button type="text" @click="addQuestion({type: 'scale', title:'您向朋友或同事推荐我们的可能性有多大？'})">量表题</el-button>
                </el-menu-item>
                <el-menu-item>
                  <el-button type="text" @click="addQuestion({type: 'sort', title:'请给以下选项排序'})">排序题</el-button>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <span>快速创建个人信息</span>
              </template>
              <el-menu-item-group>
                <el-menu-item>
                  <el-button type="text" @click="addQuestion({type:'textInput', title: '姓名'})">姓名</el-button>
                </el-menu-item>
                <el-menu-item>
                  <el-button type="text" @click="addQuestion({type: 'radio', title: '性别'})">性别</el-button>
                </el-menu-item>
                <el-menu-item>
                  <el-button type="text" @click="addQuestion({type: 'numInput', title: '年龄'})">年龄</el-button>
                </el-menu-item>
                <el-menu-item>
                  <el-button type="text" @click="addQuestion({type: 'textInput', title: '地址'})">地址</el-button>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>

        <el-container class="question-edit-main">
          <el-col :span="16" class>
            <div id="questionaire-wrapper" class>
              <!--问卷标题和说明-->
              <intro class="question-card"></intro>
              <!--问卷主体-->
              <pagination class="question-card" v-if="this.isPagination" :question="{isDraggable: false}"></pagination>
              <div id="questionList" v-if="this.qList.length !==0" class>

                <!--draggable拽拖盒子-->
                <draggable 
                :list="this.qList"
                :options="dragOption"
                @start="isDragging = true"
                @end="dragEnd"
                @change="dragChange"
                @update="dragUpdate"
                :move="dragMove">
                  <transition-group type="transition">
                    <qCard
                      v-for="(q, qIndex) in this.qList"
                      track-by="$index"
                      :qIndex="qIndex"
                      :question="q"
                      :key="qIndex"
                      class="question-card"
                    >
                    </qCard>
                  </transition-group>
                </draggable>
              </div>
              <!--测试查看qList-->
              {{this.qList}}
              <br/>
              <!--问卷底部-->
              <end class="question-card"></end>
            </div>
            <el-button type="primary" @click="emptyPage()">清空分页</el-button>
            <el-button type="primary">预览问卷</el-button>
            <el-button type="primary" @click="saveQuestionnaire">保存问卷</el-button>
            <el-button type="primary" @click="releaseAndShare">发布并分享</el-button>
          </el-col>

          <el-col :span="8" class>
            <qDate :dateValue="dateValue"></qDate>
            <num-limit :num="num"></num-limit>
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
// import MultipleChoice from "@/components/question/MultipleChoice.vue";
// import MultipleAnswers from "@/components/question/MultipleAnswers.vue";

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
      isCollapse: true,
    };
  },
  computed: {
    // 获取当前用户的id
    ...mapGetters({
      userQuestionList: "userQuestionList",
      intro: "introContents",
      isPagination: "isPagination",
      totalPage: "totalPage",
      totalQuestionNum: "totalQuestionNum",
      beginTime: "beginTime",
      endTime: "endTime",
      num: "numLimit",
      questionnaireId: "questionnaireId",
      qState: "q_state",
    }),
    dateValue() {
      let arr = [];
      arr[0] = this.beginTime;
      arr[1] = this.endTime;
      return arr;
    },
    qList: {
        get() {
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
    dragOption() {
      return {
        animation:300,
      }
    }
  },
  created() {},
  methods: {
    ...mapMutations({
      add_qList_obj: "add_questionList_object",
      set_qList: "set_questionList",
      set_pagination: "set_pagination",
      set_totalPage: "set_totalPage",
      set_isPagination: "set_isPagination",
      set_totalQNum: "set_totalQuestionNum",
      set_state: "set_state"
    }),
    // 获取初始化的问题对象
    get_init() {
      let initialType = {
        type: "",
        index: 0,
        currentPage: 0,
        title:"",
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
    // 添加问题
    addQuestion(obj) {
      let newNum = this.totalQuestionNum + 1;
      this.set_totalQNum(newNum);
      let qListObj = this.get_init();
      qListObj.type = obj.type;
      qListObj.index = newNum;
      qListObj.title = obj.title;

      if ((obj.type == "radio" || obj.type == "checkbox" || obj.type == "sort")) {
        if (obj.title !== "性别") {
          qListObj.content.options = ["选项1", "选项2"];
        } else {
          qListObj.content.options = ["男", "女"];
        }
      }

      this.add_qList_obj(qListObj);
    },
    // 添加分页组件
    addPagination() {
      let page = 0;
      let qListObj = this.get_init();
      qListObj.type = "pagination";
      if (this.totalPage == 0) {
        page = 2;
        this.set_isPagination(true);
        qListObj.currentPage = 2;
      } else {
        page = this.totalPage
        page += 1;
        qListObj.currentPage = page;
      }
      this.set_totalPage(page);
      this.add_qList_obj(qListObj);
    },
    // 添加备注说明组件
    addDescription() {
      let qListObj = this.get_init();
      qListObj.type = "description";
      qListObj.title = "这是一段段落说明";
    },
    // 保存问卷按钮
    saveQuestionnaire() {
      // patch是直接更新当前的数据
      axios.patch("/questionnaires/" + this.questionnaireId, this.userQuestionList)
      .then(response => {
        this.$message({
          message:'问卷已保存',
          type: "success"
        })
      })
      .then(error => {
        if (error) {
          this.$message.error("保存问卷失败，请重试");
        }
      })
    },
    // 发布并分享按钮
    releaseAndShare() {
      this.set_state(true);
      axios.patch("/questionnaires/" + this.questionnaireId, this.userQuestionList)
      .then(response => {
        //跳转到发布页面Release.vue
        let qid = response.data.id;
        this.$message({
          message: "成功保存并发布问卷",
          type: "success"
        })
        this.$router.push({name:"releaseQuestionnaire", params:{qid:qid}});
      })
      .then(error => {
        if (error) {
          console.log(error)
          this.$message({
            message: "发布问卷失败，请重试",
            type: "error"
          })
        }
      })
      

    },
    emptyPage() {
        this.set_isPagination(false);
        this.set_totalPage(0);
    },
    dragStart(evt) {
      // console.log("dragStart!");
      // console.log(evt);
    },
    dragEnd(evt) {
      console.log("drag end!");
      // console.log(evt);
      let qList = this.userQuestionList.questionList;
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
      console.log(qList);
      this.set_qList(qList);
    },
    dragChange(evt) {
      // console.log("drag change!");
      // console.log(evt)
    },
    dragMove(evt,originalEvent) {
      // console.log("drag move!");
      // console.log(evt);
      // console.log(originalEvent);
    },
    dragUpdate(evt) {
      // console.log(evt);
    },
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
    handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
  },
  components: {
    draggable,
    "intro": () => import("@/components/question/Introduction.vue"),
    "end": () => import("@/components/question/End.vue"),
    // radio: MultipleChoice,
    // checkbox: MultipleAnswers,
    "qCard": () => import("@/components/question/QuestionCard.vue"),
    "pagination": () => import("@/components/question/QuestionPagination.vue"),
    "qDate": () => import("@/components/question/QuestionDate.vue"),
    "bread-header": () => import("@/components/common/BreadHeader.vue"),
    "num-limit": () => import("@/components/question/QuestionCounter.vue")
  }
};
</script>
<style scoped>
.question-edit-main {
  background-color: #e5e9f2;
}

.question-edit-header {
  background-color:#45B39D;
  text-align: center;
}
.question-card {
  margin-left:2em;
  margin-right: 2em;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
}
body {
  margin: 0px;
}
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>