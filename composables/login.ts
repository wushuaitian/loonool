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

/**
 * 创建空间
 */


export function loonoolWorkspaces(data: RequestParams) {
    return request({
        url: '/loonool/workspaces',
        method: 'post',
        data,
    })
}

/**
 * 创建任务
 */
export function tasksuploadImage(data: RequestParams) {
    return request({
        url: `/api/workspaces/${data.workspaceId}/tasks/upload-image`,
        method: 'post',
        data,
         headers: {
            'Content-Type': 'multipart/form-data'
        }   
    })
}

//获取工作空间任务列表

export function workspacesTasks(data: RequestParams) {
    return request({
        url: `/api/workspaces/${data.workspaceId}/tasks`,
        method: 'get',
        params: data
    })
}

// 获取任务详情
export function tasksgetTaskDetail(data: RequestParams) {
    return request({
        url: `/api/workspaces/${data.workspaceId}/tasks/${data.taskId}`,
        method: 'get',
        data,
    })
}