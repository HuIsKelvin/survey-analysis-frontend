<template>
<el-form class="question-edit-box" >
    <p 
    @keyup="changeQuestionTitle(qIndex, $event)"
    class="input title" contenteditable>{{question.title}}</p>
    <ol class="">
        <li 
        v-for="answer in question.answers"
        class=""
        >
        <i class="iconfont icon-xuanxiangkuang"></i>
        <div id="option" class="">
            <div id="option-input" class="">
              <p
                @keyup="changeOptionValue(qIndex, $index, $event)"
                @change="changeOptionValue(qIndex, $index, $event)"
                class="input"
                contenteditable>{{ answer }}</p>
            </div> 
            <!-- <ul id="option-tools" class="option-panel">
                <li>
                    <i 
                    class="el-icon-arrow-up" 
                    @click="optionPositionFront(qIndex, $index)"
                    ></i>
                </li>
                <li>
                    <i 
                    class="el-icon-arrow-up" 
                    @click="optionPositionFront(qIndex, $index)"
                    ></i>
                </li>
                <li>
                    <i 
                    class="el-icon-close" 
                    v-show="question.answers.length > 2"
                    @click="deleteOption(qIndex, $index)"
                    ></i>
                </li>
            </ul> -->
        </div>

        </li>
    
    </ol>
</el-form>
</template>
<script>
// import "@/assets/css/override-element-ui.css"
import {mapMutations} from "vuex"

export default {
    name:"multiple-answers-card",
    props: {
        question:{
            type:Object
        },
        qIndex:{
            type:Number
        }
    },
    data() {
        return {
        }
    },
    created(){
    },
    methods:{
        sendIntro(){
            this.introContents.title = this.title;
            this.introContents.introduction = this.introduction;
            // console.log(this.introContents);
            this.set_intro(this.introContents);
            // console.log("send intro succede!");
        },
        // changeQuestionTitle(qIndex, $event){
        //     // this.set_Intro()
        // },
        ...mapMutations({
            set_intro: "set_questionnaire_intro"

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

.title:hover {
    border-color: black;
    background-color: yellow;
}
@font-face {
  font-family: 'iconfont';

}
</style>