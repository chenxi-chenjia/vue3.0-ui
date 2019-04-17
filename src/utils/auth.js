const TokenKey = 'server-session'

export function getToken(){
    const result = sessionStorage.getItem(TokenKey)
    return result
}

export function setToken(token){
    return sessionStorage.setItem(TokenKey, token)
}

export function removeToken(){
    return sessionStorage.clear()
}
