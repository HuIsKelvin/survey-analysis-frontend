<!--
* 作用于哪些页面：
    1.由QuestionEdit.vue调用本组件
    2.本组件调用题型小组件,包括: 
        (1) 题目内容输入框：QuestionContentInput.vue,
        (2) 单选、多选和排序题的选项列表组件：QuestionChoiceList.vue,
        (3) 打分题的星星组件：QuestionRate.vue
        (4)       
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
    // "qIndex": {
    //   handler(newVal,oldVal) {
    //     console.log(newVal);
    //     console.log(oldVal);
    //     // let indexArray = this.index
    //     // this.removeByValue(indexArray, oldVal.toString());
    //     // indexArray.push(newVal.toString());
    //     // indexArray.sort(this.sortNumber);// 升序排列
    //     // this.set_index(indexArray);
    //   },
    //   immediate: true,
    //   deep: true
    // }
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
        return this.question.index;
      }
    },
    QIndex: function() {
      return this.qIndex;
    }
  },
  mounted() {

  },
  methods: {
    ...mapMutations({
      set_index: "set_pagination_index"
    }),
    removeByValue(arr, value) {
      for (let i in arr) {
        if (arr[i] = value) {
          arr.slice(i,1);
        }
      }
    },
    sortNumber(a,b) {
      return a - b;
    }

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