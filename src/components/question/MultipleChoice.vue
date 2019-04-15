<template>
  <div class="question-edit-box">
      <el-form>
      <el-form-item :label="getNoTitle" :required="required" class="question_title view">
        <el-radio-group v-model="select">
          <el-radio v-for="(choice, no) in choices" :key="no" :label="no">{{ choice }}</el-radio>
        </el-radio-group>
      </el-form-item>
      </el-form>
    <div class="multiple_choices view">
      <div v-if="isOperate" class="edit_panel">
        <!-- 编辑问卷的时候要用到的工具面板，但预览和发布后的问卷不需要显示 -->
        <el-button v-on:click="editPanel=true">编辑</el-button>
      </div>
    </div>
    <div v-if="editPanel" class="edit">
      <el-input v-model="title" placeholder="请输入标题"></el-input>
      <el-checkbox v-model="required">必填</el-checkbox>
      <div class="multiple_choices edit">
        <p>选项文字</p>
        <div v-for="(choice, no) in choices" :key="no">
          <el-input :key="no" v-model="choices[no]"></el-input>
          <el-button v-on:click="addChoice(no)" icon="el-icon-plus" circle></el-button>
          <el-button v-on:click="removeChoice(no)" icon="el-icon-minus" circle></el-button>
        </div>
        <el-button v-on:click="addChoice()">添加选项</el-button>
        <el-button v-on:click="editPanel=false">完成编辑</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MultipleChoice",
  data: function() {
    return {
      title: "标题",
      no : -1,
      type: "MultipleChoice",
      required: false,
      choices: ["选项1", "选项2"],
      select: null,
      isOperate: true,
      editPanel: false
    };
  },
  computed: {
    // 根据题目序号和标题生成显示结果
    getNoTitle: function() {
      return this.no == -1 ? this.title : this.no + ". " + this.title;
    }
  },
  methods: {
    addChoice: function(no) {
      if (typeof no == "undefined") {
        this.choices.push("");
      } else {
        this.choices.splice(no + 1, 0, "");
      }
    },
    removeChoice: function(no) {
      this.choices.splice(no, 1);
    }
  }
};
</script>

<style>

</style>
