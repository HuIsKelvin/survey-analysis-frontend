<template>
  <div id="manage">
    <div id="new-question">
      <router-link :to="{name:'createQuestionnaire'}" tag="div">
        <el-button type="primary" @click="newQuestionire">新建问卷</el-button>
      </router-link>
    </div>
    <question-list></question-list>
  </div>
</template>

<script>
import QuestionList from "./../../components/questionaire/QusetionList";
export default {
  components: {
    "question-list": QuestionList
  },
  methods: {
    
  }
};
</script>

<style lang="scss" scoped>
#manage {
  text-align: left;
}
</style>
