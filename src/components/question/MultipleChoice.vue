<template>
  <div>
    <div class="view">
      <div class="question_title view">
        <p>{{ title }}</p>
      </div>
      <div class="multiple_choices view">
        <el-radio-group v-model="select">
          <el-radio v-for="(choice, no) in choices" :key="no" v-bind:label="no">{{ choice }}</el-radio>
        </el-radio-group>
        <div v-if="isOperate" class="edit_panel">
        <!-- 编辑问卷的时候要用到的工具面板，但预览和发布后的问卷不需要显示 -->
        <el-button v-on:click="editPanel=true">编辑</el-button>
        </div>
      </div>
    </div>
    <div v-if="editPanel" class="edit">
      <div class="question_title edit">
        <el-input v-model="title" placeholder="请输入标题"></el-input>
      </div>
      <div class="multiple_choices edit">
        <p>选项文字</p>
        <div v-for="(choice, no) in choices" :key="no">
        <el-input :key="no" v-model="choices[no]"></el-input>
        <el-button v-on:click="addChoice(no)" icon="el-icon-plus"  circle></el-button>
        <el-button v-on:click="removeChoice(no)" icon="el-icon-minus" circle></el-button>
        </div>
        <el-button v-on:click="addChoice()">添加选项</el-button>
        <el-button v-on:click="editPanel=false">完成编辑</el-button>
        
      </div>
    </div>
  </div>
</template>

<script>
import { truncate } from 'fs';
export default {
  name: "MultipleChoice",
  data: function() {
    return {
      title: "标题",
      choices: ["选项1", "选项2"],
      select: null,
      isOperate: true,
      editPanel: true
    };
  },
  methods: {
      "addChoice": function (no) {
          if (typeof(no) == "undefined") {
            this.choices.push("")
          } else {
            this.choices.splice(no+1, 0, "")
          }
      },
      "removeChoice": function (no) {
        this.choices.splice(no, 1)
      }
  }
};
</script>
