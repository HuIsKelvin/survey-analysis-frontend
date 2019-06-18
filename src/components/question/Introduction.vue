<template>
<el-card class="question-edit-box" >
    <div class="intro-content-input title" contenteditable="true">
        <p
        @keyup="changeQuestionTitle($event)"
        >{{ questionnaireTitle }}</p>
    </div>
    <div class="intro-content-input intro" contenteditable="true">
        <p
        @keyup="changeQuestionIntro($event)"
        >{{ intro }}</p>
    </div>
</el-card>
</template>
<script>
// import "@/assets/css/override-element-ui.css"
import {mapMutations, mapGetters} from "vuex"

export default {
    name:"introduction",
    data() {
        return {
            title: this.get_title,
            introduction:"感谢您能抽出几分钟时间来参加本次答题，现在我们就马上开始吧！",
        }
    },
    created(){
    },
    computed: {
        ...mapGetters("questionnaire", {
            questionnaireTitle: "questionnaireTitle",
            intro: "introContents"
        })
    },
    methods:{
        changeQuestionTitle($event){
            this.set_title($event.target.textContent);
        },
        changeQuestionIntro($event){
            this.set_intro($event.target.textContent);
        },
        ...mapMutations("questionnaire", {
            set_intro: "set_questionnaire_intro",
            set_title: "set_questionnaire_title"

        }),

    }
}
</script>
<style lang="scss" scoped>
.title {
    font-size: 22px;
    font-weight: bold;
    line-height: 1.5;
    width: 100%;
    max-width: 100%;
    border-radius: .3rem;
    line-height: 2.4rem;

}
.intro {
    font-size: 14px;
    line-height: 1;
    width: 100%;
    max-width: 100%;
    border-radius: .3rem;
    line-height: 2.4rem;
}

.intro-content-input {
    line-height: 2.4rem;
    border: 1px solid transparent;
    margin: 0;
    outline: none;
    padding: 0 .2rem;
    border-radius: .3rem;
    text-align: left;
    outline:none;
}
.intro-content-input:hover{
    border-width: 1px solid transparent;
    border-style: dashed;
    border-color:#777;
    /* background-color: #e5e9f2; */
}
.intro-content-input p{
    outline: none;
}
</style>