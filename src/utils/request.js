import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'


const requestCallBackHandel = res => {
    if (res.data.errorCode === 1 && res.data.action === 'login') {
        MessageBox.alert(res.data.errorMessage, '提示', {
            confirmButtonText: '确定',
            callback: action => {
                store.dispatch('FedLogOut').then(() => {
                    location.reload() // 为了重新实例化vue-router对象 避免bug
                })
            },
        })
        return false
    } else {
        return true
    }
}

// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // api 的 base_url
    timeout: 500000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['server-token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
        }
        return config
    },
    error => {
        // Do something with request error
        console.log(error) // for debug
        Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => response,
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)


export default service

export const get = (url, params) => new Promise((resolve, reject) => {
    service({
        url,
        method: 'get',
        params
    })
        .then(res => {
            if (requestCallBackHandel(res)) {
                resolve(res.data)
            }
        })
        .catch(err => reject(err))
})

export const post = (url, data) => new Promise((resolve, reject) => {
    service({
        url,
        method: 'post',
        data
    })
        .then(res => {
            if (requestCallBackHandel(res)) {
                resolve(res.data)
            }
        })
        .catch(err => reject(err))
})

export const put = (url, data) => new Promise((resolve, reject) => {
    service({
        url,
        method: 'put',
        data
    })
        .then(res => {
            if (requestCallBackHandel(res)) {
                resolve(res.data)
            }
        })
        .catch(err => reject(err))
})

export const del = (url, params) => new Promise((resolve, reject) => {
    service({
        url,
        method: 'put',
        params
    })
        .then(res => {
            if (requestCallBackHandel(res)) {
                resolve(res.data)
            }
        })
        .catch(err => reject(err))
})


