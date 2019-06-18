<template>
  <div>
    <el-input-number 
      :value="num" 
      @change="numLimitChange" 
      :min="1" 
      label="描述文字"
      size="mini"
      ></el-input-number>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"

export default {
  name: "questionnaire-counter",
  props: {
    num: {
      type: Number
    }
  },
  data() {
    return {

    }
  },
  computed: {
    // ...mapGetters({
    //   numLimit: "numLimit",
    // })
  },
  methods: {
    ...mapMutations("questionnaire", {
      set_numLimit: "set_numLimit"
    }),
    numLimitChange(newValue) {
      // console.log(newValue);
      this.set_numLimit(newValue);
    }
  }

}
</script>
<style scoped>

</style>
