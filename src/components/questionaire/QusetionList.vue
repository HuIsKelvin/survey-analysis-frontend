<template>
  <div id="question-list">
    <div v-for="(qitem, index) in questionList" :key="index">{ qitem }</div>
  </div>
</template>

<script>
export default {
  name: "QuestionList",
  data() {
    return {
      qusetionList: [1,2,3]
    }
  }
}
</script>

<style>

</style>
