import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const count = Math.ceil(Math.random() * 100)


const createList = (count) => {
    const List = []
    for ( let i = 0 ; i < count ; i ++ ) {
        List.push(Mock.mock({
            id: '@increment',
            created_at: Mock.Random.date('yyyy-MM-dd HH:mm'),
            batchCode: '@natural',
            totalNum: Mock.Random.natural(50, 500),
            user: '@cname',
        }))
    }
    return List
}

const createByBatchIdList = (count) => {
    const List = []
    for ( let i = 0 ; i < count ; i ++ ) {
        List.push(Mock.mock({
            id: '@increment',
            created_at: Mock.Random.date('yyyy-MM-dd HH:mm'),
            cardNum: '@natural',
            internalCode: '@natural',
            status: '已分发',
        }))
    }
    return List
}

export default {
    findAllBatch: config => {
        const { startNum = 0, limit = 10 } = param2Obj(config.url)
        return {
            errorCode: 0,
            errorMessage: '查询成功',
            data: {
                count,
                list: createList(limit)
            }
        }
    },
    addCard: config => {
        const { num } = config.body
        return {
            errorCode: 0,
            errorMessage: '添加成功',
        }
    },
    findByBatchId: config => {

        const {
            batchId,
            startNum,
            limit = count,
        } = param2Obj(config.url)
        return {
            errorCode: 0,
            errorMessage: '查询成功',
            data: {
                count,
                list: createByBatchIdList(limit)
            }
        }
    }
}
