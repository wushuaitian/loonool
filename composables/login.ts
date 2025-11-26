//接口
import request from '../plugins/api'


interface RequestParams {
    [key: string]: any
}

/**
 * 注册
 */
export function loonoolUserRegister(data: RequestParams) {
    return request({
        url: '/loonool/user/register',
        method: 'post',
        data,
    })
}

/**
 * 登录
 */

export function loonoolUserLogin(data: RequestParams) {
    return request({
        url: '/loonool/user/login',
        method: 'post',
        data,
    })
}