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
    <el-header>
      <bread-header :view="{viewType: 'question-edit'}"></bread-header>
    </el-header>
    <el-container>
      <el-aside width="210px">
        <el-menu class="question-edit-nav" 
          :default-openeds="['1', '2', '3', '4', '5']"
          >
          <el-submenu index="1">
            <template slot="title">
              <span>分页说明</span>
            </template>
            <el-menu-item-group>
              <el-menu-item @click="addDescription()">
                <el-button type="text">备注说明</el-button>
              </el-menu-item>
              <el-menu-item  @click="addPagination()">
                <el-button type="text">设置分页</el-button>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <span>选择题</span>
            </template>
            <el-menu-item-group>
              <el-menu-item  @click="addQuestion({type: 'radio', title:'单选题'})">
                <el-button type="text">单选题</el-button>
              </el-menu-item>
              <el-menu-item  @click="addQuestion({type: 'checkbox', title:'多选题'})">
                <el-button type="text">多选题</el-button>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <span>填空题</span>
            </template>
            <el-menu-item-group>
              <el-menu-item  @click="addQuestion({type: 'textarea', title:'填空题'})">
                <el-button type="text">填空题</el-button>
              </el-menu-item>
              <el-menu-item  @click="addQuestion({type: 'numInput', title:'数字输入题'})">
                <el-button type="text">数字输入题</el-button>
              </el-menu-item>
              <el-menu-item  @click="addQuestion({type: 'textInput', title:'短文本输入题'})">
                <el-button type="text">短文本输入题</el-button>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <span>打分排序</span>
            </template>
            <el-menu-item-group>
              <el-menu-item  @click="addQuestion({type: 'rate', title:'请给本项打分'})">
                <el-button type="text">评分题</el-button>
              </el-menu-item>
              <el-menu-item  @click="addQuestion({type: 'scale', title:'您向朋友或同事推荐我们的可能性有多大？'})">
                <el-button type="text">量表题</el-button>
              </el-menu-item>
              <el-menu-item  @click="addQuestion({type: 'sort', title:'请给以下选项排序'})">
                <el-button type="text">排序题</el-button>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <span>快速创建个人信息</span>
            </template>
            <el-menu-item-group>
              <el-menu-item  @click="addQuestion({type:'textInput', title: '姓名'})">
                <el-button type="text">姓名</el-button>
              </el-menu-item>
              <el-menu-item  @click="addQuestion({type: 'radio', title: '性别'})">
                <el-button type="text">性别</el-button>
              </el-menu-item>
              <el-menu-item  @click="addQuestion({type: 'numInput', title: '年龄'})">
                <el-button type="text">年龄</el-button>
              </el-menu-item>
              <el-menu-item  @click="addQuestion({type: 'textInput', title: '地址'})">
                <el-button type="text">地址</el-button>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
    <el-main>
      <el-row>
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
                      ref="qCard"
                      v-for="(q, qIndex) in this.qList"
                      track-by="$index"
                      :qIndex="qIndex"
                      :question="q"
                      :key="qIndex"
                      :class="activeClass == qIndex ? 'active': ''"
                      @click.native="changeClass(qIndex)"
                    >
                    </qCard>
                  </transition-group>
                </draggable>
              </div>
              <!--测试查看qList-->
              <!-- {{this.qList}} -->
              <br/>
              <!--问卷底部-->
              <end class="question-card"></end>
            </div>
            <!-- <el-button type="primary" @click="emptyPage">清空分页</el-button> -->
            <!-- <el-button type="primary" @click="previewQuestionnaire">预览问卷</el-button>
            <el-button type="primary" @click="saveQuestionnaire">保存问卷</el-button>
            <el-button type="primary" @click="releaseAndShare">发布并分享</el-button> -->
          </el-col>

          <el-col :span="8" class>

            <!--问卷题目设置-->
            <transition name="question-setting">
              <question-setting
                ref="qSetting"
                v-if="pageManage.isClick"
                :class="navBarFixed == true ? 'navBarWrap' :''"
                :qSettingJson="qSettingJson"
              ></question-setting> 
            </transition>

          </el-col>
        </el-container>
      </el-row>
    </el-main>
    </el-container>
  </el-container>
</template>
<script>
// import MultipleChoice from "@/components/question/MultipleChoice.vue";
// import MultipleAnswers from "@/components/question/MultipleAnswers.vue";

// 拽拖组件
import draggable from 'vuedraggable';
// vuex组件
import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "question-edit-view",
  data() {
    return {
      userId: "1234", // 根据userId来确定questionList的存储字段
      isDragging:false,
      isCollapse: true,
      activeClass:-1,
      navBarFixed: false,
    };
  },
  mounted() {

  },
  computed: {
    // 获取当前用户的id
    ...mapGetters("questionnaire", {
      userQuestionList: "userQuestionList",
      intro: "introContents",
      isPagination: "isPagination",
      totalPage: "totalPage",
      totalQuestionNum: "totalQuestionNum",
      questionnaireId: "questionnaireId",
      qState: "q_state",
      // isClick: "isClick",
      pageManage: "pageManage",
      numLimit: "numLimit",
    }),
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
    },
    activeQindex() {
      if (this.activeClass !== -1) {
        return this.qList[this.activeClass].index
      } else {
        return -1;
      }
    },
    isRequired() {
      if (this.activeClass !== -1) {
        console.log(this.qList[this.activeClass].isRequired);
        return this.qList[this.activeClass].isRequired;
      } else {
        return true; // 给个默认值true
      }
    },
    qSettingJson() {
      let qSettingJson = {};
      qSettingJson["activeClass"] = this.activeClass;
      if (this.activeClass !== -1) {
        qSettingJson["isRequired"] = this.qList[this.activeClass].isRequired;
        qSettingJson["rateMax"] = this.qList[this.activeClass].content.max;
        qSettingJson["numLimit"] = this.numLimit;
      }
      return qSettingJson;
    }
  },
  mounted() {
    // console.log(this.$store.state.questionnaire);
    this.set_pageManage({type: "isClick", boolean: false}); 
    window.addEventListener('scroll', this.watchScroll);
    
  },
  created() {
    if (this.$route.params.id !== "preview") {
      this.getUserQuestionList();
    } else {
      // nothing so far
    }
    this.clickListener();
},
  methods: {
    ...mapMutations("questionnaire", {
      add_qList_obj: "add_questionList_object",
      set_qList: "set_questionList",
      set_pagination: "set_pagination",
      set_totalPage: "set_totalPage",
      set_isPagination: "set_isPagination",
      set_totalQNum: "set_totalQuestionNum",
      set_state: "set_state",
      set_pageManage: "set_pageManage",
      set_uQL: "set_userQuestionList",
    }),
    ...mapActions("survey", {
      "setQuestionnairePreview": "setQuestionnaire"
    }),
    // 获取当前id问卷的内容,更新state
    getUserQuestionList() {
      let qid = this.$route.params.qid;
      // console.log(qid)
      axios.get( "/questionnaires/editQuesbyId?qid=" + qid)
      .then(response => {
        console.log(response.data);
        this.set_uQL(response.data);
      })
      .catch(error => {
        console.log(error);
      })
    },
    // 问题的原始obj
    get_init() {
      let initialType = {
        type: null,
        index: 0,
        currentPage: 0,
        title:null,
        isRequired: true,
        isDraggable: true,
        content:{
          options:[],
          max:5,
          min:1,
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
    // 添加备注说明组件
    addDescription() {
      let qListObj = this.get_init();
      qListObj.type = "description";
      qListObj.title = "这是一段段落说明";
      this.add_qList_obj(qListObj);
      this.scrollTo(this.qList_length - 1);
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
      // console.log(qListObj);
      this.set_totalPage(page);
      this.add_qList_obj(qListObj);
    },
    // 点击改变问题卡片的高亮样式
    changeClass(qIndex) {
      console.log(this.qList[qIndex].type)
      if (qIndex>=0
        && this.qList[qIndex].type !== "pagination"
        && this.qList[qIndex].type !== "description") {
        // console.log("click qCard!");
        // console.log(qIndex);
        this.activeClass = qIndex;
        this.set_pageManage({type: "isClick", boolean: true});   
      } else {
        this.activeClass = -1;
        this.set_pageManage({type: "isClick", boolean: false});   
      }
    },
    // 监听页面点击事件
    clickListener() {
      document.addEventListener('click', (e) => {
        // console.log(this.pageManage.isClick)
        if (this.pageManage.isClick == true) {
          let isContains = false;

          if(this.pageManage.addJumpLogicIsClick == false 
            && this.pageManage.iconMinusIsClick == false) 
            {
              if(this.$refs.qSetting.$el.contains(e.target)) {
                isContains = true;
              }
              for (let i in this.$refs.qCard) {
                if(this.$refs.qCard[i].$el.contains(e.target)) {
                  isContains = true;
                }
              }

            } else {
              isContains = true;
              this.set_pageManage({type: "all", pageManage:{
                isClick: true,
                addJumpLogicIsClick: false,
                iconMinusIsClick: false
              }})
            }
          // console.log(isContains);
          if (!isContains) {
            this.set_pageManage({type: "isClick", boolean: false}); 
            this.activeClass = -1;
          } else {
            this.set_pageManage({type: "isClick", boolean: true}); 
          }
        }
      })
    },
    watchScroll () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        //  当滚动超过 50 时，实现吸顶效果
        if (scrollTop > 49) {
          this.navBarFixed = true
        } else {
          this.navBarFixed = false
        }
    },

    // 添加新qCard时实现滚动到对应位置
    scrollTo(qIndex) {
      // console.log("this.$refs.qCard[qIndex].scrollTop");
      // console.log(this.$refs.qCard[qIndex]);
      // document.documentElement.scrollTop = this.$refs.qCard[qIndex].scrollTop;
      // this.$refs.qCard[qIndex].scrollTop;
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
      // console.log("drag end!");
      // console.log(evt);
      let qList = this.userQuestionList.questionList;
      // 每次拖动结束之后，更新所有的题号和分页的页码（普通题目、备注说明页码不更新）
      let update_qList = this.update_index_currentPage(qList); 
      this.set_qList(update_qList);
    },
    dragChange(evt) {
      // console.log("drag change!");
      // console.log(evt)
      let newIndex = evt.moved.newIndex;
      let oldIndex = evt.moved.oldIndex;
      if (oldIndex == this.activeClass) {
        this.activeClass = newIndex; // 拖动之后高亮card的index改变，activeClass改变
      } else {
        // do nothing so far
      }
    },
    dragMove(evt,originalEvent) {
      // console.log("drag move!");
      // console.log(evt);
      // console.log(originalEvent);
    },
    dragUpdate(evt) {
      // console.log(evt);
    },
    // dragEnd更新题号和当前页
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
    draggable,
    "intro": () => import("@/components/question/Introduction.vue"),
    "end": () => import("@/components/question/End.vue"),
    // radio: MultipleChoice,
    // checkbox: MultipleAnswers,
    "qCard": () => import("@/components/question/QuestionCard.vue"),
    "pagination": () => import("@/components/question/QuestionPagination.vue"),
    "bread-header": () => import("@/components/common/BreadHeader.vue"),
    "question-setting": () => import("@/components/question/QuestionSetting.vue")
  }
};
</script>
<style lang="scss" scoped>
.question-edit-main {
  background-color: #e5e9f2;
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
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.question-setting-enter-active {
  transition: all .3s ease;
}
.question-setting-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.question-setting-enter, .question-setting-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.active {
  border-color:rgb(0,128,128);
  border-width:2px;
}
.navBarWrap {
    position:fixed;
    top:60px;
    z-index:999;
  }
  .el-header{
    // background-color: #D3DCE6;
    background-color: rgb(84, 92, 100);
    // color: #333;
    text-align: center;
    border-bottom: 1px solid ;
    // border-bottom:rgb(216, 232, 252);
    line-height: 60px;
    position: sticky;
    top:0;
    z-index:1002;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    // background-color: white;
    color: #333;
    text-align: center;
    position: -webkit-sticky;
    position: sticky;
    left: 0;
    top: 60px;
    height: 550px;
    overflow-x: auto;
    overflow-y: auto;

  }
  .el-aside::-webkit-scrollbar {
    width: 3px; //滚动条的宽度
  }
  .el-aside::-webkit-scrollbar-thumb {
      background-color: #8899A7;//滚动条的颜色
      border-radius: 3px;//滚动条的边框倒角
  }

</style>