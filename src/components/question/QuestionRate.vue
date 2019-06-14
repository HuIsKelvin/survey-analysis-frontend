<template>
  <div class="question-rate">
    <el-rate 
      :max="question.content.max"
      >
    </el-rate>
    <!-- <span>设置最大值</span><el-input v-model="max"></el-input> -->
  </div>
</template>
<script>
export default {
  name:"question-choice-input",
  props: {
    question: {
      type: Object
    },
    qIndex:{
      type:Number
    }
  },
  data(){
    return {
      QIndex: this.qIndex,
      max:10,

    }
  },
  computed: {

  },
  methods:{
    send_choiceItems: function() {

    }
  }
}
</script>
<style scoped>
.question-rate {
  text-align:left;
}
/* .question-rate:hover {
    border-width: 1px solid transparent;
    border-style: dashed;
    border-color:#777;
} */
.question-rate:focus {

}
</style>