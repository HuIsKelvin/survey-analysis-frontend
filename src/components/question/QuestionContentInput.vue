<!--
* 作用于哪些页面:QuestionCard.vue根据不同的题型会选择调用本组件
* 功能说明: 问卷编辑页面中，用于每一个题型的标题输入的组件
* @liushi
* @2019/5/11
* @version
-->
<template>
  <div>
    <i class="el-icon-s-comment" v-if="description"></i>
    <div @keyup="changeOptionValue($event)" contenteditable="true" class="question-content-input">
      <p>{{this.qContent}}</p>
    </div>
    <!-- <el-input 
      class="question-content-input"
      type="textarea"
      autosize
      v-model="qContent"
      resize="none">
    </el-input> -->
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex"
export default {
  name:"question-content-input",
  props: {
    qContent:{
      type:String
    },
    qType:{
      type:String
    },
    qIndex:{
      type:Number
    }
  },
  data(){
    return {
    }
  },
  mounted: function(){
  },
  computed: {
    description: function() {
      this.type;
      return this.type == 'description';
    },

  },
  methods:{
    ...mapMutations("questionnaire", {
      change_value: "change_questionList_value"
    }),
    changeOptionValue: function($event) {
      let titleString = $event.target.outerText;
      let obj = {
        type: "title",
        index: this.qIndex,
        content: titleString
      }
      this.change_value(obj);
    },

  }
}
</script>
<style lang="scss" scoped>
.question-content-input {
    line-height: 2.4rem;
    border: 1px solid transparent;
    margin: 0;
    outline: none;
    padding: 0 .2rem;
    border-radius: .3rem;
    text-align: left;
    outline:none;
    min-height: 2.4rem;
}
.question-content-input:hover{
    border-width: 1px solid transparent;
    border-style: dashed;
    border-color:#777;
    /* background-color: #e5e9f2; */
}
.question-content-input p{
  outline: none;
}
.question-content-input .el-textarea__inner{ 
  /* resize: none; */
}

</style>