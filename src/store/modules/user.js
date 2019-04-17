import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
    state: {
        token: getToken(),
        name: '',
        avatar: '',
        roles: []
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_USERINFO: (state, userInfo) => {
            state.userInfo = userInfo
        }
    },

    actions: {
        // 登录
        Login({ commit, state }, userInfo) {
            const username = userInfo.username.trim()
            return new Promise(async (resolve, reject) => {
                try {
                    const result = await login({
                        username,
                        password: userInfo.password,
                    })
                    if (result.errorCode != 0) {
                        Message.error(result.errorMessage)
                        reject()
                        return
                    }
                    setToken(result.data.token)
                    commit('SET_TOKEN', result.data.token)
                    resolve()
                } catch (e) {
                    reject(e.message)
                }
            })
        },

        // 获取用户信息
        GetInfo({ commit, state }) {
            return new Promise(async (resolve, reject) => {
                try {
                    const result = await getInfo({ token: state.token })
                    if (result.errorCode != 0) {
                        reject(result.errorMessage)
                        this.$store.dispatch('FedLogOut').then(() => {
                            location.reload() // 为了重新实例化vue-router对象 避免bug
                        })
                        return
                    }
                    if (result.data.roles && result.data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                        commit('SET_ROLES', result.data.roles)
                    } else {
                        reject('getInfo: roles must be a non-null array !')
                    }
                    commit('SET_NAME', result.data.name)
                    commit('SET_AVATAR', result.data.avatar)
                    commit('SET_USERINFO', result.data)
                    resolve(result)
                } catch (e) {
                    reject(e.message)
                }
            })
        },
        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        }
    }
}

export default user
