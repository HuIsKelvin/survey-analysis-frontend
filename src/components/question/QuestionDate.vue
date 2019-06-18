<template>
<div class="input-date">
    <el-date-picker
      v-model="dateValue"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right"
      size="mini"
      @change="changeDate">
    </el-date-picker>
</div>
</template>
<script>
import {mapGetters, mapMutations} from "vuex"

export default {
  name: "questionnaire-date",
  props:{
    dateValue:{
      type: Array
    }
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
    };
  },
  methods: {
    ...mapMutations("questionnaire", {
      set_time: "set_begin_end_time"
    }),
    changeDate() {
      let date = this.dateValue;
      this.set_time(date);
    }
  }
};
</script>
<style lang="scss" scoped>

// .input-date .el-date-editor--datetimerange.el-input, 
// .el-date-editor--datetimerange.el-input__inner {
//   width: 320px;
// }
.input-date {
  .el-date-editor--datetimerange.el-input,
  .el-date-editor--datetimerange.el-input__inner {
    width: 320px;
  }

}
</style>