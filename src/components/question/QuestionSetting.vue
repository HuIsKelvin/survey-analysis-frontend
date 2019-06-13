<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>问卷设置</span>
      </div>
      <div>
        问卷起始时间设置
        <qDate :dateValue="dateValue" class="qdate-input"></qDate>
        <hr class="hr0">
      </div>
      <div>
        填写人数上限
        <num-limit :num="num" class="num-limit"></num-limit>
      </div>
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>Q{{question.index}}.题目设置</span>
      </div>
      <div>
        <el-checkbox 
          v-model="qSettingJson.isRequired" 
          @change="changeCheckedValue"
          >
          此题是否必答？
        </el-checkbox>
        <hr class="hr0">
      </div>
      
      <div v-if="question.type == 'radio' || question.type == 'checkbox'">
        逻辑设置
        <el-tooltip 
          placement="top" 
          content="根据答题者的选择，选择性地跳转到某些题目"
          >
          <el-button
            size="mini"
            icon="el-icon-share"
            @click="openJumpLogicDialog"
            circle>
            </el-button>
        </el-tooltip>
        <hr class="hr0">
      </div>
      <div v-if="question.type == 'rate' || question.type == 'scale'">
        最高分设置
          <el-select 
            v-model="qSettingJson.rateMax" 
            placeholder="请选择"
            class="el-select-maxScore"
            @change="changeMaxScore"
            >
            <el-option
              v-for="(item,itemIndex) in this.rateMaxScoreOptions"
              :label="item+''"
              :value="item">
            </el-option>
          </el-select>
      </div>
    </el-card>
    
    <!-- 跳转逻辑对话框 -->
    <el-dialog 
      :modal-append-to-body="false"
      title="跳转逻辑设置" 
      :visible.sync="dialogFormVisible" 
      width="65%">
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
  </div>
</template>
<script>
import {mapGetters, mapMutations} from "vuex";
export default {
  name: "question-setting-card",
  props: {
    qSettingJson: {
      type: Object,
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      rateMaxScoreOptions: [2,3,4,5,6,7,8,9,10],
      // rateMaxScoreOptions: ["2","3","4","5","6","7","8","9","10"]
      rateMaxScore: ''
    }
  },
  mounted(){
    console.log("this.qSettingJson")
    console.log(this.qSettingJson);
  },
  computed: {
    ...mapGetters({
      num: "numLimit",
      beginTime: "beginTime",
      endTime: "endTime",
      questionList: "questionList"
    }),
    dateValue() {
      let arr = [];
      arr[0] = this.beginTime;
      arr[1] = this.endTime;
      return arr;
    },
    question() {
      if (this.qSettingJson.activeClass !== -1) {
        return this.questionList[this.qSettingJson.activeClass]
      } else {
        return -1;
      }
    },
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
  },
  methods: {
    ...mapMutations({
      set_isRequired: "set_isRequired",
      set_jumpLogic: "set_jumpLogic",
      change_questionList_value: "change_questionList_value"
    }),
    // 是否必答选中状态改变
    changeCheckedValue(newValue) {
      let qIndex = this.qSettingJson.activeClass;
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
    changeMaxScore(newValue) {
      let obj = {}
      // console.log("changeMaxScore");
      // console.log(newValue);
      obj["type"] = "max";
      obj["QIndex"] = this.qSettingJson.activeClass;
      obj["maxScore"] = newValue;
      // console.log(obj);
      this.change_questionList_value(obj);
    }
  },
  components:{
    "qDate": () => import("@/components/question/QuestionDate.vue"),
    "num-limit": () => import("@/components/question/QuestionCounter.vue"),
  }
}
</script>
<style lang="scss" scoped>
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
  // .select-maxScore {
  //   border-radius: 4px;
  //   width: 10em;
  //   height: 2.5em;
  //   border-color: rgb(185, 185, 185);
  //   outline: none;
  // }
  // .select-maxScore:hover {
  //   border-color: rgb(0,128,128);
  // }
  .el-select-maxScore {

  }
</style>

