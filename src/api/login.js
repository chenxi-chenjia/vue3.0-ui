import request, { get, post } from '@/utils/request'

export const login = data => post('login', data)

export const getInfo = data => get('getUserInfo', data)

