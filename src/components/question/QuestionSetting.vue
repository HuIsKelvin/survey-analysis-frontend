<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>问卷设置</span>
      </div>
      <div>
        问卷起始时间设置
        <qDate :dateValue="dateValue" class="qdate-input"></qDate>
      </div>
      <hr class="hr0">
      <div>
        填写人数上限
        <num-limit :num="num"></num-limit>
      </div>
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>Q{{currentQ}}.题目设置</span>
      </div>
      <div>
        此题必答
      </div>
      <hr class="hr0">
      <div>
        逻辑设置
      </div>
      <hr class="hr0">
    </el-card>
  </div>
</template>
<script>
import {mapGetters, mapMutations} from "vuex";
export default {
  name: "question-setting-card",
  props: {
    activeQindex: {
      type: Number
    }
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters({
      num: "numLimit",
      beginTime: "beginTime",
      endTime: "endTime",
    }),
    currentQ: function() {
      let currentQ = this.activeQindex;
      return currentQ + 1
    },
    dateValue() {
      let arr = [];
      arr[0] = this.beginTime;
      arr[1] = this.endTime;
      return arr;
    },

  },
  methods: {
    
  },
  components:{
    "qDate": () => import("@/components/question/QuestionDate.vue"),
    "num-limit": () => import("@/components/question/QuestionCounter.vue"),
  }
}
</script>
<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 22em;
    text-align: left;
    float:right;
  }
  .hr0{ 
    height:0px;
    border:none;
    border-top:1px solid rgba(184, 189, 188, 0.5);
    margin-top: 1em;
    margin-bottom: 1em;
  }  
  .qdate-input {
    width: 320px;
  }
</style>

