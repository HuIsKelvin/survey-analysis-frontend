(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-338727d8"],{"0f36":function(e,t,i){},8810:function(e,t,i){"use strict";i.r(t);var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"bread-header"},[i("el-col",{attrs:{span:2}},[i("div",[i("el-button",{staticStyle:{},attrs:{type:"text"},on:{click:e.backToManage}},[i("i",{staticClass:"el-icon-back"}),i("span",[e._v("返回个人问卷中心")])])],1)]),i("el-col",{attrs:{span:16}},[i("div",{attrs:{id:"prograss-bar"}},[i("el-button",{staticClass:"high-light-button",attrs:{type:"text",disabled:"question-edit"!==e.view.viewType}},[e._v("问卷编辑")]),i("i",{staticClass:"el-icon-arrow-right"}),i("el-button",{attrs:{type:"text",disabled:"release"!==e.view.viewType}},[e._v("发布问卷")]),i("i",{staticClass:"el-icon-arrow-right"}),i("el-button",{attrs:{type:"text",disabled:"report"!==e.view.viewType}},[e._v("统计报表")])],1)]),i("el-col",{attrs:{span:4}},["question-edit"===e.view.viewType?i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.saveQuestionnaire}},[e._v("保存问卷")]):e._e(),"question-edit"===e.view.viewType?i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.previewQuestionnaire}},[e._v("预览问卷")]):e._e(),"question-edit"===e.view.viewType?i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.releaseAndShare}},[e._v("发布并分享")]):e._e()],1),i("el-col",{attrs:{span:2}},[i("el-dropdown",[i("el-button",{attrs:{type:"text"}},[i("img",{staticClass:"user-logo",attrs:{src:e.userLogo}})]),i("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[i("el-dropdown-item",[i("router-link",{attrs:{to:{name:"user.info"},tag:"span"}},[e._v("我的个人信息")])],1),i("el-dropdown-item",{attrs:{divided:""}},[i("span",{on:{click:e.signout}},[i("i",{staticClass:"el-icon-circle-close-outline"}),e._v("退出登录")])])],1)],1)],1),i("el-dialog",{attrs:{title:"确认信息",visible:e.dialogVisible,"modal-append-to-body":!1,width:"30%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[i("span",[e._v("检测到未保存的内容，是否在离开页面前保存修改？")]),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:e.saveAndJumpToManage}},[e._v("保存")]),i("el-button",{on:{click:e.jumpToManage}},[e._v("放弃修改")]),i("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取消")])],1)])],1)},n=[],a=i("a98d"),o=i("52c1"),r=i("6e87"),u={name:"bread-header",props:{view:{type:Object}},data:function(){return{userLogo:i("d64e"),dialogVisible:!1}},computed:Object(a["a"])({},Object(o["c"])({userQuestionList:"userQuestionList",questionnaireId:"questionnaireId"})),methods:Object(a["a"])({},Object(o["d"])({set_state:"set_state"}),Object(o["b"])("survey",{setQuestionnairePreview:"setQuestionnaire"}),{saveAndJumpToManage:function(){this.saveQuestionnaire(),this.jumpToManage()},backToManage:function(){"question-edit"==this.view.viewType?this.dialogVisible=!0:"release"===this.view.viewType&&this.jumpToManage()},jumpToManage:function(){this.$router.push({path:"/user/manage"}),this.dialogVisible=!1},saveQuestionnaire:function(){var e=this,t=1,i=this.userQuestionList.questionList,s=this.userQuestionList;if(this.isPagination)for(var n in i)"pagination"==i[n].type?t++:i[n].currentPage=t;s.questionList=i,console.log(this.questionnaireId),console.log(s),axios.patch("/questionnaires/"+this.questionnaireId,s).then(function(t){e.$message({message:"问卷已保存",type:"success"})}).catch(function(t){e.$message.error("保存问卷失败，请重试")})},releaseAndShare:function(){var e=this;this.set_state(!0),axios.patch("/questionnaires/"+this.questionnaireId,this.userQuestionList).then(function(t){var i=t.data.id;e.$message({message:"成功保存并发布问卷",type:"success"}),e.$router.push({name:"releaseQuestionnaire",params:{qid:i}})}).catch(function(t){console.log(t),e.$message({message:"发布问卷失败，请重试",type:"error"})})},previewQuestionnaire:function(){this.setQuestionnairePreview({questionnaire:this.userQuestionList}),this.$router.push({name:"preview"})},signout:function(){this.$store.commit(r["z"]),this.$router.push({name:"sign"})}})},c=u,l=(i("d7c3"),i("17cc")),p=Object(l["a"])(c,s,n,!1,null,"7218f502",null);t["default"]=p.exports},d7c3:function(e,t,i){"use strict";var s=i("0f36"),n=i.n(s);n.a}}]);
//# sourceMappingURL=chunk-338727d8.bd1d027c.js.map