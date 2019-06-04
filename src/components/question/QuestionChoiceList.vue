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
  <div>
    <ul>
        <li v-for="(item, index) in listContent.options">
          <p 
            @keyup="changeOptionValue($event, index)"
            class="question-choice-input"
            contenteditable>
            {{item}}  
            </p>
        </li>
      </ul>
    <!-- <draggable :list="this.listContent.options">
      <item-input
      v-for="(item, index) in this.listContent.options"
      :optionItem="item"
      :iIndex="index">

      </item-input>
    </draggable> -->
    <!-- <draggable :list="this.listdata">
      <li v-for="(item, index) in this.listdata">
      {{item}}
      </li>
    </draggable> -->
    <el-button icon="el-icon-plus" @click="addItem()" circle></el-button>
    
    <!-- <p contenteditable><p> -->
  </div>
</template>
<script>
import { mapMutations } from "vuex"
import draggable from "vuedraggable"

export default {
  name:"question-choice-input",
  props: {
    choiceType:{
      type:String
    },
    listContent:{
      type:Object
    },
    qIndex:{
      type:Number
    }
  },
  data(){
    return {
      option: this.listContent.options,
      listdata:[
        {
          id: 1,
          name: '叶落森1'
        },
        {
          id: 2,
          name: '叶落森2'
        },
        {
          id: 3,
          name: '叶落森3'
        },
        {
          id: 4,
          name: '叶落森4'
        },
        {
          id: 5,
          name: '叶落森5'
        }
      ]
    }
  },
  methods:{
    ...mapMutations({
      add_item: "add_question_option_item",
      change_value: "change_questionList_value"
    }),
    addItem: function() {
      this.add_item(this.qIndex);
    },
    changeOptionValue: function($event,index) {
      // console.log($event);
      // console.log(index);
      let obj = {
        type: "options",
        iIndex: index,
        QIndex: this.qIndex,
        iString: $event.target.outerText
      }
      this.change_value(obj);
    }
  },
  components: {
    draggable,
    "item-input": () => import("@/components/question/OptionItemInput.vue")
  }
}
</script>
<style scoped>
li {
  text-align:left;
}
.question-choice-input {
    line-height: 2.4rem;
    border: 1px solid transparent;
    margin: 0;
    outline: none;
    padding: 0 .2rem;
    border-radius: .3rem;
    text-align: left;
}
.question-choice-input:hover{
    border-width: 1px solid transparent;
    border-style: dashed;
    border-color:#777;
    /* background-color: #e5e9f2; */
}
</style>