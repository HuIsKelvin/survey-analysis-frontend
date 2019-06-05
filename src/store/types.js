export const SIGNIN = "signin";
export const SIGNOUT = "signout";
export const SET_USERID = "set_userID";

// 点击设置
export const SET_ISCLICK = "set_isClick";

//设置userQuestionList：一般用于创建新问卷时初始化情况列表
export const SET_USERQUESTIONLIST = "set_userQuestionList";

// 设置问卷id
export const SET_QUESTIONNAIREID = "set_questionnaireId";

// 设置问卷状态
export const SET_STATE = "set_state";

// 设置问卷的开始和结束时间
export const SET_BEGINANDENDTIME = "set_begin_end_time";

// 设置问卷的人数限制
export const SET_NUMLIMIT = "set_numLimit";

// 设置总题数
export const SET_TOTALQUESTIONNUM = "set_totalQuestionNum";

// **问卷题目questionList相关设置**
// 设置问卷标题
export const SET_QUESTIONNAIRE_TITLE = "set_questionnaire_title";
// 设置问卷说明
export const SET_QUESTIONNAIRE_INTRO = "set_questionnaire_intro";
// 设置问卷结束语
export const SET_QUESTIONNAIRE_END = "set_end_contents";
// 设置问题列表：一般是用于创建新问卷时初始化清空问题列表
export const SET_QUESTIONLIST = "set_questionList";
// 添加题目
export const ADD_QUESTIONLIST_OBJECT = "add_questionList_object";
// 拽拖时更新问卷列表顺序
export const UPDATE_QUESTIONLIST = "update_questionList";
// 删除题目
export const DELETE_QUESTIONLIST_OBJECT = "delete_questionList_object";
// 改变题目内容（题目、选项等）：将用户输入的内容更新到vuex
export const CHANGE_QUESTIONLIST_VALUE = "change_questionList_value";
// 添加选项
export const ADD_QUESTION_OPTION_ITEM = "add_question_option_item";
// 设置此题是否必答
export const SET_ISREQUEIRED = "set_isRequired";

// 分页卡相关设置
// 设置当前分页状态：分页或者不分页
export const SET_ISPAGINATION = "set_isPagination";
// 设置总页数
export const SET_TOTALPAGE = "set_totalPage";
// 设置跳转逻辑
export const SET_JUMPLOGIC = "set_jumpLogic";
