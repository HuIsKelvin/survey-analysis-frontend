<!--
* 作用于哪些页面：
    1.由QuestionEdit.vue调用本组件
    2.本组件调用题型小组件,包括: 
        (1) 题目内容输入框：QuestionContentInput.vue,
        (2) 单选、多选和排序题的选项列表组件：QuestionChoiceList.vue,
        (3) 打分题的星星组件：QuestionRate.vue
        (4) 分页组件QuestionpPagination.vue
        (5) 
* 功能说明: 
    1.接受QuestionEdit.vue父组件的props对象，props对象包括question对象和qIndex对象
    2.所有的题型都会需要一个"题目内容输入组件",其余根据question对象中的type字段来判刑需要显示哪一个题型小组件。
    3.通过v-if控制题型小组件的显示
* @liushi
* @2019/6/6
* @version
-->
<template>
  <!-- <el-card :class="this.activeClass == 0 ? 'active':''"> -->
  <el-card @click="changeStyle(qIndex)"
    :class="qIndex == this.activeClass ? 'active': ''">
    <!--如果是分页则显示调用分页组件-->
    <div v-if="question.type == 'pagination'">
      <pagination :question="question" :qIndex="qIndex"></pagination>
    </div>
    
    <!--如果不是分页，则显示以下内容-->
    <div v-on:click="changeClass" v-if="question.type !== 'pagination'">
      <div>{{this.question.index}}</div>
      <!--题目内容组件-->
      <div>
        <!--题目内容输入组件-->
        <q-content
        :qContent="question.title"
        :qType="question.type"
        :qIndex="qIndex">
        </q-content>
        <!-- <el-button style="float: right; padding: 3px 0" type="text"><i class="el-icon-delete"></i></el-button> -->
      </div>

      <!--单选、多选、排序组件-->
      <div v-if="question.type == 'radio' || question.type == 'checkbox' || question.type == 'sort'">
        <!--调用选项组件-->
        <choiceList
        :choiceType="question.type"
        :listContent="question.content"
        :qIndex="qIndex">
        </choiceList>
      </div>

      <!--文字输入组件-->
      <div v-if="question.type == 'textarea'">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          disabled>
        </el-input>
      </div>

      <!--短文字输入textInput || 数字输入numInput-->
      <div v-if="question.type == 'textInput' || question.type == 'numInput'">
        <el-input type="text"
          :placeholder="question.type == 'textInput' ? '请输入一段文字' : '请输入一个数字（只能输入数字的输入框）'"
          disabled>
        </el-input>
      </div>

      <!--评分星星组件-->
      <div v-if="question.type == 'rate'">
        <!-- <el-rate>
        </el-rate> -->
        <q-rate
        :qIndex="qIndex">
        </q-rate>
      </div>

      <!--量尺组件-->
      <div v-if="question.type == 'scale'">
        <el-slider
        :step="10">
        </el-slider>
      </div>

    </div>

    <!--工具栏-->
    <el-button @click="deleteCard">删除本题</el-button>
    <el-checkbox v-model="question.isRequired" @change="changeCheckedValue">此题是否必答？</el-checkbox>
    <el-tooltip 
      content="设置跳转逻辑"
      placement="top"
      v-if="question.type == 'radio' || question.type == 'checkbox'">
        <el-button 
          icon="el-icon-share" 
          @click="openJumpLogicDialog" 
          circle>
        </el-button>
    </el-tooltip>

    <!-- 跳转逻辑对话框 -->
    <el-dialog title="跳转逻辑设置" :visible.sync="dialogFormVisible" width="65%">
      <el-button
        v-if="question.jumpLogic.length == 0"
        type="primary" 
        icon="el-icon-circle-plus-outline"
        @click="addJumpLogic()">
        新增跳转逻辑
        </el-button>

      <el-form :model="question" ref="question" v-if="question.jumpLogic.length !== 0">
        <el-form-item 
          v-for="(jumpLogicObj, jIndex) in question.jumpLogic"
          label="如果本题中选" label-width="100px">
          <el-col :span="7">

            <el-form-item>
              <el-select 
                v-model="question.jumpLogic[jIndex].startValue" 
                placeholder="请选择一个选项" 
                clearable filterable>
                <el-option
                  v-for="(item, index) in question.content.options"
                  :label="(index + 1)+ '.' + item"
                  :value="index">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="4">则跳转到</el-col>

          <el-col :span="7">
            <el-form-item>
              <el-select 
                v-model="question.jumpLogic[jIndex].endValue" 
                placeholder="请选择一个题目" 
                clearable filterable>
                <el-option
                  v-for="(q, qIndex) in subQLIST"
                  :label="'Q' + q.index + ':' + q.title"
                  :value="q.index">
                </el-option>
              </el-select>
            </el-form-item>    
          </el-col>

          <el-col :span="4">
            <el-button icon="el-icon-minus" size="mini" @click="deleteJump(jIndex)" circle></el-button>
            <el-button icon="el-icon-plus" size="mini" @click="addJumpLogic()" circle></el-button>
          </el-col>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelJumpLogicDialog">取 消</el-button>
        <el-button type="primary" @click="saveJumpLogicDialog('question')">保存</el-button>
      </div>
    </el-dialog>
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
      value1:'',
      value2:'',
      activeClass: -1,
      dialogFormVisible: false,
      // dynamicValidateForm:
      // rules: {
      //   'jumpLogic[0].startValue': [{required: true, message: '选项不能为空', trigger: 'blur'}],
      //   'jumpLogic[0].endValue': [{required: true, message: '题目不能为空', trigger: 'blur'}]
      // }
    }
  },
  created: function() {
    // this.select = this.jumpLogic;
  },
  mounted: function() {
    
  },
  watch: {
  },
  computed: {
    ...mapGetters({
      isClick:"isClick",
      totalPage: "totalPage",
      questionList: "questionList",
      totalQuestionNum: "totalQuestionNum"
    }),
    // 除去pagination和description的部分问题列表
    subQLIST: function() {
      let qList = [];
      let indexCount = 0;
      let cutPoint = 0;
      for (let i in this.questionList) {
        // 记录当前题的下标
        if (this.qIndex == parseInt(i)) {
          cutPoint = indexCount;
        }
        // 除去所有的分页和备注obj，得到包含所有题目的qList
        if (this.questionList[i].type !== "pagination" && this.questionList[i].type !== "description") {
          qList[indexCount] = this.questionList[i];
          indexCount++;
        }
      }
      // 删掉包含本题的之前所有题
      qList.splice(0,cutPoint+1);
      return qList;       
    },
    // 返回表单验证规则
    // rules: function() {
    //   let rules = {};
    //   for (let i in this.question.jumpLogic) {
    //     rules['jumpLogic[' + i + '].startValue'] = [{required: true, message: '选项不能为空', trigger: 'blur'}];
    //     rules['jumpLogic[' + i + '].endValue'] = [{required: true, message: '题目不能为空', trigger: 'blur'}];
    //   }
    //   console.log(rules);
    //   return rules;
      
    // }
   },
  methods: {
    ...mapMutations({
      del_obj: "delete_questionList_object",
      set_isClick: "set_isClick",
      set_isPagination: "set_isPagination",
      set_totalPage: "set_totalPage",
      set_isRequired: "set_isRequired",
      set_jumpLogic: "set_jumpLogic",
      set_totalQNum: "set_totalQuestionNum",
      set_qList: "set_questionList"
      
    }),
    deleteCard() {
      if (this.question.type == "pagination") {
        // 如果当前只有两页
        if (this.totalPage == 2) {
          this.set_isPagination(false); // 取消置顶分页卡
          this.set_totalPage(0); // 归零总页数
        } else {
          this.set_totalPage(this.totalPage - 1);// 总页数-1
        }
      } else if (this.question.type == "description") {
        // 也许这里将来会需要做点什么
      } else {
        // 如果是删除题目则总题数-1
        this.set_totalQNum(this.totalQuestionNum - 1);
      }
        // 删除qList里面的obj对象
        this.del_obj(this.qIndex);
        let qList = this.questionList;
        // 更新题号和currentPage
        let update_qList = this.update_index_currentPage(qList);
        this.set_qList(update_qList);
    },
    // 删除跳转逻辑
    deleteJump(jIndex) {
      let jumpLogic = this.question.jumpLogic;
      jumpLogic.splice(jIndex,1);
      let qIndex = this.qIndex;
      this.set_jumpLogic({qIndex: qIndex, jumpLogic: jumpLogic});
    },
    // 增加跳转逻辑
    addJumpLogic() {
      let jumpLogic = this.question.jumpLogic;
      jumpLogic.push({startValue: "", endValue: ""});
      let qIndex = this.qIndex;
      this.set_jumpLogic({qIndex: qIndex, jumpLogic: jumpLogic});
    },
    changeClass() {
      // console.log("change class");
      // this.activeClass = 0;
    },
    changeStyle(qIndex) {
      console.log("click qCard!")
      this.activeClass = qIndex;
    },
    changeCheckedValue(newValue) {
      let qIndex = this.qIndex;
      this.set_isRequired({"isRequired": newValue, "qIndex": qIndex});
    },
    openJumpLogicDialog() {
      this.dialogFormVisible = true;
    },
    cancelJumpLogicDialog() {
      // this.$alert('检测到未保存的内容，是否在离开窗口前保存修改？', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //   });
      this.dialogFormVisible = false;
    },
    // 表单验证，如果验证成功则发送表单数据，失败就提示请选择选项
    // saveJumpLogicDialog(formName) {
    //   this.set_jump  
    //   console.log(formName);
    //   this.$refs[formName].validate((boolean) => {
    //     console.log(boolean);
    //     console.log()
    //       if (boolean) {
    //         this.set_jumpLogic({qIndex: this.qIndex, jumpLogic: this.question.jumpLogic});
    //         this.dialogFormVisible = false;
    //         this.$message({
    //         message: '跳转逻辑设置成功！',
    //         type: 'success'
    //         });
    //       } else {
    //         console.log('error submit!!');
    //         return false;
    //       }
    //     }); 
    // },
    saveJumpLogicDialog() {
      for (let i in this.question.jumpLogic) {
        if (this.question.jumpLogic[i].startValue === "" || this.question.jumpLogic[i].endValue === "") {
          this.$message({
            message: '跳转逻辑不能为空',
            type: 'error'
          });
          this.dialogFormVisible = true;
        } else {
          let jumpLogic = this.question.jumpLogic;
          let qIndex = this.qIndex;
          this.set_jumpLogic({qIndex: qIndex, jumpLogic: jumpLogic});
          this.dialogFormVisible = false;
          this.$message({
            message: '跳转逻辑设置成功！',
            type: 'success'
          });
        }
      }
    },
    update_index_currentPage(questionList) {
      let qList = questionList;
      let pCount = 2;
      let qCount = 1;
      for (let i in qList) {
        if (qList[i].type === "pagination") {
          qList[i].currentPage = pCount;
          pCount++;
        } else if (qList[i].type === "description"){
            
        } else {
          qList[i].index = qCount;
          qCount++;
        }
      }
      return qList
    }
  },
  components: {
    "q-content": () => import("@/components/question/QuestionContentInput.vue"),
    "choiceList": () => import("@/components/question/QuestionChoiceList.vue"),
    "q-rate": () => import("@/components/question/QuestionRate.vue"),
    "pagination": () => import("@/components/question/QuestionPagination.vue"),
  }
}
</script>
<style scoped>

.question-card {
  margin-left:2em;
  margin-right: 2em;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
}
.active {
  border-color:royalblue;
  border-width: 5px;
}
</style>