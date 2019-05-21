<!--
* 作用于哪些页面：
    1.由QuestionEdit.vue调用本组件
    2.本组件调用题型小组件,包括: 
        (1) 题目内容输入框：QuestionContentInput.vue,
        (2) 单选、多选和排序题的选项列表组件：QuestionChoiceList.vue,
        (3) 打分题的星星组件：QuestionRate.vue
        (4)       
* 功能说明: 
    1.接受QuestionEdit.vue父组件的props对象，props对象包括question对象和qIndex对象
    2.所有的题型都会需要一个"题目内容输入组件",其余根据question对象中的type字段来判刑需要显示哪一个题型小组件。
    3.通过v-if控制题型小组件的显示
* @liushi
* @2019/5/17
* @version
-->
<template>
  <el-card :class="this.activeClass == 0 ? 'active':''">
    <div v-if="pagination">
      <!-- <divider></divider> -->
      <el-divider :direction="horizontal">页码</el-divider>
      <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
    </div>
    <div v-on:click="changeClass" v-if="pagination==false">
      <div>
        <!--题目内容输入组件-->
        <q-content
        :qContent="question.title"
        :qType="question.type"
        :qIndex="qIndex">
        </q-content>
        <!-- <el-button style="float: right; padding: 3px 0" type="text"><i class="el-icon-delete"></i></el-button> -->
      </div>
      <div v-if="radio_checkbox_sort">
        <!--调用选项组件-->
        <choiceList
        :choiceType="question.type"
        :listContent="question.content"
        :qIndex="qIndex">
        </choiceList>
      </div>
      <div v-if="qTextArea">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          disabled>
        </el-input>
      </div>
      <div v-if="rate">
        <!-- <el-rate>
        </el-rate> -->
        <q-rate
        :qIndex="qIndex">
        </q-rate>
      </div>
      <div v-if="scale">
        <el-slider
        :step="10">
        </el-slider>
      </div>
      <div v-if="name_sex_age_addr">
        <el-input
          placeholder="请输入内容"
          disabled>
        </el-input>
      </div>
    </div>
    <el-button @click="deleteCard">删除本题</el-button>
  </el-card>
</template>
<script>
import { mapMutations, mapGetters } from "vuex"
export default {
  name: "question-card",
  props: {
    question:{
      type:Object,
    },
    qIndex:{
      type:Number
    }
  },
  data() {
    return {
      value:3.7,
      activeClass: -1,
    }
  },
  mounted: function() {
  },
  computed: {
    ...mapGetters({
      isClick:"isClick"
    }),
    radio_checkbox_sort: function() {
      this.question.type;
      return this.question.type === 'radio' || this.question.type === 'checkbox' || this.question.type === 'sort';
    },
    qTextArea: function() {
      this.question.type;
      return this.question.type === 'textarea';
    },
    rate: function() {
      this.question.type;
      return this.question.type === 'rate';
    },
    scale: function() {
      this.question.type;
      return this.question.type === 'scale';
    },
    name_sex_age_addr: function() {
      this.question.type;
      return this.question.type === 'name' || this.question.type === 'sex' || this.question.type === 'age' || this.question.type === 'address'
    },
    pagination: function() {
      return this.question.type === 'pagination';
    }
   },
  methods: {
    ...mapMutations({
      del_obj: "delete_questionList_object",
      set_isClick: "set_isClick"
    }),
    deleteCard() {
      this.del_obj(this.qIndex);
    },
    changeClass() {
      console.log("change class");
      this.activeClass = 0;
    }
  },
  components: {
    "q-content": () => import("@/components/question/QuestionContentInput.vue"),
    "choiceList": () => import("@/components/question/QuestionChoiceList.vue"),
    "q-rate": () => import("@/components/question/QuestionRate.vue"),
    // "divider": () => import("@/components/question/QuestionDivider.vue"),
  }
}
</script>
<style scoped>
.active {
  border-color:royalblue;
  border-width: 5px;
}


</style>