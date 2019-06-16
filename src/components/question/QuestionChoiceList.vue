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
    <div v-for="(item,iIndex) in listContent.options" :key="iIndex">
      <el-row class="question-item-row">
        <el-col :span="1">
          <div class="line-height">
            <font-awesome-icon v-if="choiceType == 'checkbox' || choiceType == 'sort'" class="far-icon" :icon="['far', 'square']"/>
          </div>
          <div class="line-height">
            <font-awesome-icon v-if="choiceType == 'radio'" class="far-icon" :icon="['far', 'circle']"/>
          </div>
        </el-col>
        <!--选项主体栏-->
        <el-col :span="19">
          <div contenteditable="true" class="question-choice-input">
            <p
              @keyup="changeOptioinValue($event, index)"
              >
              {{item}}
            </p>
          </div>
        </el-col>

        <!--删除增加选项按钮栏-->
        <el-col :span="4" class="item-tool-col">
          <el-tooltip class="item" effect="dark" content="增加选项" placement="top">
            <el-button type="text" style="font-size:18px;" @click="addItem()"><i class="el-icon-circle-plus"></i></el-button>
          </el-tooltip>
          <el-tooltip v-if="listContent.options.length > 1" class="item" effect="dark" content="删除选项" placement="top">
            <el-button type="text"  style="font-size:18px;" @click="deleteItem(iIndex)"><i class="el-icon-remove"></i></el-button>
          </el-tooltip>
        </el-col>
      </el-row>
    </div>
    
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
    }
  },
  methods:{
    ...mapMutations({
      add_item: "add_question_option_item",
      delete_item: "delete_question_option_item",
      change_value: "change_questionList_value"
    }),
    addItem: function() {
      this.add_item(this.qIndex);
    },
    deleteItem: function(iIndex) {
      let qIndex = this.qIndex;
      this.delete_item({qIndex: qIndex, iIndex: iIndex});
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
<style lang="scss" scoped>
li {
  text-align:left;
}
// .el-row {
//   padding-left: 2rem;
// }
.question-choice-input {
    line-height: 2.4rem;
    border: 1px solid transparent;
    margin: 0;
    outline: none;
    padding: 0 .2rem;
    border-radius: .3rem;
    text-align: left;
    outline:none;
}
.question-choice-input:hover{
    border-width: 1px solid transparent;
    border-style: dashed;
    border-color:#777;
    /* background-color: #e5e9f2; */
}
.question-item-row:hover .item-tool-col{
  display: block;
}
.item-tool-col {
  display: none;
}
.far-icon {
  color: #777;
}
.line-height {
  line-height: 2.4rem;
}
</style>