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
    <div class="pagination-bar">页码：{{currentPage}}/{{totalPage}}</div>
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
    ...mapGetters("questionnaire", {
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
  line-height:2.4rem;
  color: rgb(0,128,128);
}
</style>