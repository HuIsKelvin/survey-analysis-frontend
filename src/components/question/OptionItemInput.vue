<template>
  <div>
    <p 
    @keyup="changeOptionValue($event)"
    class="question-content-input"
    contenteditable>
    {{this.optionItem}}
    </p>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex"
export default {
  name:"question-content-input",
  props: {
    optionItem:{
      type:String
    },
    iIndex:{
      type:Number
    }
  },
  data(){
    return {
    }
  },
  mounted: function(){
  },
  computed: {
    description: function() {
      this.type;
      return this.type == 'description';
    },

  },
  methods:{
    ...mapMutations({
      change_value: "change_questionList_value"
    }),
    changeOptionValue: function($event) {
      let titleString = $event.target.outerText;
      let obj = {
        type: "title",
        index: this.qIndex,
        content: titleString
      }
      this.change_value(obj);
    },

  }
}
</script>
<style scoped>
.question-content-input {
    line-height: 2.4rem;
    border: 1px solid transparent;
    margin: 0;
    outline: none;
    padding: 0 .2rem;
    border-radius: .3rem;
    text-align: left;
}
.question-content-input:hover{
    border-width: 1px solid transparent;
    border-style: dashed;
    border-color:#777;
    /* background-color: #e5e9f2; */
}


</style>