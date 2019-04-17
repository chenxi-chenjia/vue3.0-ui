import Mock from 'mockjs'
import loginAPI from './login'
import cardAPI from './card'

Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function (){
    if ( this.custom.xhr ){
        this.custom.xhr.withCredentials = this.withCredentials || false
    }
    this.proxy_send(...arguments)
}

// 登录相关
Mock.mock(/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/getUserInfo/, 'get', loginAPI.getUserInfo)

Mock.mock(/\/card\/findByBatchId/, 'get', cardAPI.findByBatchId)
Mock.mock(/card/, 'get', cardAPI.findAllBatch)
Mock.mock(/card/, 'post', cardAPI.addCard)


export default Mock
