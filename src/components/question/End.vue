<template>
<el-form class="question-edit-box">
    <p
    @keyup="changeQuestionEnd($event)"
    class="input title" contenteditable>{{this.endContents}}</p>
</el-form>
</template>
<script>
import {mapMutations} from "vuex"

export default {
    name:"end",
    data() {
        return{
            endContents:"您已完成本次问卷，感谢您的帮助与支持!"
        }
    },
    methods:{
        changeQuestionEnd($event){
            this.set_end($event.target.textContent);
        },
        ...mapMutations({
            set_end: "set_questionnaire_end",
        })
    },
}
</script>
<style>
.input {
    line-height: 2.4rem;
    border: 1px solid transparent;
    background-color: transparent;
    margin: 0;
    outline: none;
    padding: 0 .2rem;
    border-radius: .3rem;
    color: #777;
    text-align: left;
}
.title {
    font-size: font-size-default;
    line-height: 1.5;
    width: 100%;
    max-width: 100%;
    border-radius: .3rem;
    line-height: 2.4rem;

}
.intro {
    /* font-size: font-size-default; */
    line-height: 1;
    width: 100%;
    max-width: 100%;
    border-radius: .3rem;
    line-height: 2.4rem;
}
.input:hover{
    border-color: black;
    background-color: #e5e9f2;
}
</style>