//接口
import request from '../plugins/api'

interface RequestParams {
    [key: string]: any
}

/**
 * 导航栏消息列表（HTTP 接口）
 */
export function msgList(data: RequestParams) {
    return request({
        url: `/loonool/notifications`,
        method: 'get',
    })
}

