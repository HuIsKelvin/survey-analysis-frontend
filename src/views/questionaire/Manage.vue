<template>
  <div id="manage">
    <div id="new-question">
      <el-button type="primary" @click="$router.push({name: 'createQuestionnaire'})">新建问卷</el-button>
    </div>
    <question-list></question-list>
  </div>
</template>

<script>
import QuestionList from "./../../components/questionaire/QusetionList";
export default {
  components: {
    "question-list": QuestionList
  }
};
</script>

<style lang="scss" scoped>
#manage {
  text-align: left;
}
</style>
