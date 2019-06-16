<template>
<el-card>
    <div class="end-input" contenteditable="true">
        <p
        @keyup="changeQuestionEnd($event)"
        >{{endContents}}</p>
    </div>
</el-card>
</template>
<script>
import {mapMutations , mapGetters} from "vuex"

export default {
    name:"end",
    data() {
        return{
        }
    },
    computed: {
        ...mapGetters({
            endContents: "endContents"
        })
    },
    methods:{
        changeQuestionEnd($event){
            this.set_end($event.target.textContent);
        },
        ...mapMutations({
            set_end: "set_end_contents",
        })

    },
}
</script>
<style>
.end-input {
    line-height: 2.4rem;
    border: 1px solid transparent;
    margin: 0;
    outline: none;
    padding: 0 .2rem;
    border-radius: .3rem;
    text-align: center;
    outline:none;
}
.end-input:hover{
    border-width: 1px solid transparent;
    border-style: dashed;
    border-color:#777;
    /* background-color: #e5e9f2; */
}
.end-input p{
    outline: none;
}
</style>