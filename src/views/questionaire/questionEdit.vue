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
                  <el-button type="text" @click="addQuestion('rate')">编辑段落说明</el-button>
                </el-menu-item>
                <el-menu-item>
                  <el-button type="text" @click="addQuestion('rate')">设置分页</el-button>
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
                  <el-button type="text" @click="addQuestion('rate')">量表题</el-button>
                </el-menu-item>
                <el-menu-item>
                  <el-button type="text" @click="addQuestion('rate')">排序题</el-button>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <span>个人信息</span>
              </template>
              <el-menu-item-group>
                <el-menu-item>
                  <el-button type="text" @click="addQuestion('rate')">姓名</el-button>
                </el-menu-item>
                <el-menu-item>
                  <el-button type="text" @click="addQuestion('rate')">性别</el-button>
                </el-menu-item>
                <el-menu-item>
                  <el-button type="text" @click="addQuestion('rate')">年龄</el-button>
                </el-menu-item>
                <el-menu-item>
                  <el-button type="text" @click="addQuestion('rate')">地址</el-button>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>

        <el-container class="question-edit-main">
          <el-col :span="16" class>
            <div id="questionaire-wrapper" class>
              <intro></intro>
              <div id="questionList" v-if="this.questionList.length !==0" class>
                <div
                  :is="q.type"
                  v-for="(q, qIndex) in questionList"
                  track-by="$index"
                  :qIndex="qIndex"
                  :question="q"
                  :key="qIndex"
                ></div>
              </div>
              <end></end>
            </div>
            <el-button type="primary">保存问卷</el-button>
            <el-button type="primary">发布并分享</el-button>
          </el-col>
          <el-col :span="4" class>这里是逻辑功能的设置</el-col>
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
import TextInput from "@/components/question/TextInput.vue";
// vuex组件
import { mapGetters } from "vuex";

export default {
  name: "question-edit-view",
  data() {
    return {
      userId: "1234", // 根据userId来确定questionList的存储字段
      introContents: {},
      questionList: [], // 本地存储问卷数据
      endwords: "",
      userQuestionList: {} // 发送给vuex的数据
    };
  },
  computed: {
    // 获取当前用户的id
    ...mapGetters({
      intro: "introContents"
    })
  },
  created() {},
  methods: {
    addQuestion(type) {
      let option = {
        // title: '问题题目',
        type: type
      };
      if (type == "textarea") {
        option.title = "文字输入题";
        option.text = "";
        // option.answersData = [this.getRandomNumber(), this.getRandomNumber()]
      }
      if ((type = "radio")) {
        option.title = "单选题";
        option.answers = ["选项1", "选项2"];
      }
      if ((type = "checkbox")) {
        option.title = "多选题";
        option.answers = ["选项1", "选项2"];
      }

      this.questionList.push(option);
      // console.log(this.questionList);
    }
    // getters(){
    //   console.log(this.intro);
    // }
  },
  components: {
    intro: Introduction,
    end: End,
    radio: MultipleChoice,
    checkbox: MultipleAnswers,
    textarea: TextInput
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
</style>