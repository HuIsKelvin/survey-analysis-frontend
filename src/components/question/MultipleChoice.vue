<template>
  <div>
    <div v-if="isView" class="view">
      <div class="question_title view">
        <p>{{ title }}</p>
      </div>
      <div class="multiple_choices view">
        <el-radio-group v-model="select">
          <el-radio v-for="(choice, no) in choices" :key="no" v-bind:label="no">{{ choice }}</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div v-if="isEdit" class="edit">
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
      choices: ["选项1", "选项2"],
      select: null,
      isView: true,
      isEdit: true
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
