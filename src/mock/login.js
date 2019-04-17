import { param2Obj } from '@/utils'

const userMap = {
    admin: {
        roles: [ 'admin' ],
        token: 'admin',
        introduction: '我是超级管理员',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
    },
    editor: {
        roles: [ 'editor' ],
        token: 'editor',
        introduction: '我是编辑',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Normal Editor'
    }
}

export default {
    loginByUsername: config => {
        const { username } = JSON.parse(config.body)
        return {
            errorCode: 0,
            errorMessage: '登录成功',
            data: userMap[ username ]
        }
    },
    getUserInfo: config => {
        const { token } = param2Obj(config.url)
        if ( userMap[ token ] ){
            return {
                errorCode: 0,
                errorMessage: '获取信息成功',
                data: userMap[ token ]
            }
        } else {
            return false
        }
    },
    logout: () => 'success'
}
