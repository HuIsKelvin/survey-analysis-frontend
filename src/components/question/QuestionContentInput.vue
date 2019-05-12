<!--
* 作用于哪些页面:QuestionCard.vue根据不同的题型会选择调用本组件
* 功能说明: 问卷编辑页面中，用于每一个题型的标题输入的组件
* @liushi
* @2019/5/11
* @version
-->
<template>
<p @keyup="changeOptionValue(qIndex,$event)" contenteditable>{{content}}</p>
</template>
<script>
export default {
  name:"question-content-input",
  props: {
    content:{
      type:String
    }
  },
  data(){
    return {

    }
  },
  methods:{
    send_question_content() {

    }
  }
}
</script>
<style>
</style>