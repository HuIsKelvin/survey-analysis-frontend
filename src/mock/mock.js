import Mock from 'mockjs'
import signApi from './sign'


Mock.mock(/\/sign\/\signin/, 'post', signApi.signin)
Mock.mock(/\/sign\/\signout/, 'post', signApi.signout)

export default Mock