<template>
<el-form class="question-edit-box" >
    <!-- <el-form-item> -->
        <!-- <el-input v-model="title"></el-input>
        <el-input v-model="introduction" ></el-input> -->
        <p
        @keyup="changeQuestionTitle($event)"
        class="input title" contenteditable>{{this.title}}</p>
        <p
        @keyup="changeQuestionIntro($event)"
        class="input intro" contenteditable>{{ this.introduction }}</p>

    <!-- </el-form-item> -->
    <!-- <el-button @click="sendIntro">send Intro</el-button> -->
</el-form>
</template>
<script>
import "@/assets/css/questionEdit.css"
// import "@/assets/css/override-element-ui.css"
import {mapMutations} from "vuex"

export default {
    name:"introduction",
    data() {
        return {
            title:"问卷标题",
            introduction:"感谢您能抽出几分钟时间来参加本次答题，现在我们就马上开始吧！",
        }
    },
    created(){
    },
    methods:{
        changeQuestionTitle($event){
            this.set_title($event.target.textContent);
        },
        changeQuestionIntro($event){
            this.set_intro($event.target.textContent);
        },
        ...mapMutations({
            set_intro: "set_intro_contents",
            set_title: "set_questionaire_title"

        })
    }
}
</script>
<style>
/* .question-edit-box .el-input__inner {
    border:0px;
} */
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
    background-color: yellow;
}
</style>