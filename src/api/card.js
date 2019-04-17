import {
    get,
    put,
    post,
    del
} from '@/utils/request'

export const findAllBatch = (data) => get('findAllBatch', data)

export const findByBatchId = (data) => get('findAllCard', data)

export const addCard = (data) => post('addBatch', data)

export const updateNoByBatchId = (data) => put('updateNoByBatchId', data)
