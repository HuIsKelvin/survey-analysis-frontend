<!--
* 作用于哪些页面：
    1.由QuestionCard.vue调用本组件
    2.本组件不调用其他组件。
        (1) 题目内容输入框：QuestionContentInput.vue,
        (2) 单选、多选和排序题的选项列表组件：QuestionChoiceList.vue,
        (3) 打分题的星星组件：QuestionRate.vue
* 功能说明: 
    1.
* @liushi
* @2019/5/29
* @version
-->
<template>
  <div>
    <span class="">页码：{{currentPage}}/{{totalPage}}</span>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex"
export default {
  name:"dvider",
  props: {
    question: {
      type: Object
    },
    qIndex: {
      type: Number
    }
  },
  data() {
    return {

    }
  }, 
  watch: {
  },
  computed: {
    ...mapGetters({
      totalPage: "totalPage",
      index: "index"
    }),
    currentPage: function() {
      if (this.question.isDraggable==false) {
        return 1
      } else {
        return this.question.currentPage;
      }
    },
    QIndex: function() {
      return this.qIndex;
    }
  },
  mounted() {

  },
  methods: {
  }
}
</script>
<style>
.pagination-bar {

}
.pagination-bar::before {
  content: "";
  position: absolute;
  top:0;
  right:0;
  height:0;
  width:0;
  border-top-left-radius: 4px;
  border-top: solid 5px #2672ff;
  border-right: solid 5px transparent;
  border-bottom: solid 5px transparent;
  border-left: solid 5px #2672ff;
}
</style>