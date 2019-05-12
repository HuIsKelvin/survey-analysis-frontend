<!--
* 作用于哪些页面:QuestionCard.vue根据不同的题型会选择调用本组件
* 功能说明: 问卷编辑页面中，用于每一个题型的选项输入的组件。
*          本组件包括了单选和多选两种情况，通过props获得String类型的ChoiceType变量进行判断。
           通过props获得Array类型的ChoiceItem变量来生成所有的选项。
* @liushi
* @2019/5/11
* @version
-->
<template>
<p contenteditable><p>
</template>
<script>
export default {
  name:"question-choice-input",
  props: {
    ChoiceType:{
      type:String
    },
    ChoiceItem:{
      type:Array
    },
    qIndex:{
      type:Number
    }
  },
  data(){
    return {

    }
  },
  methods:{

  }
}
</script>
<style>
</style>