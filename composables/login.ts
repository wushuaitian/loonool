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
 * 获取用户信息
 */
export function loonoolUserInfo(data: RequestParams) {
    return request({
        url: '/loonool/user/info',
        method: 'get',
        params: data,
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
export function loonoolUploadImage(data: RequestParams) {
    return request({
        url: `/loonool/workspaces/tasks/upload-image`,
        method: 'post',
        data,
         headers: {
            'Content-Type': 'multipart/form-data'
        }   
    })
}

//获取工作空间任务列表

export function loonoolWorkspacesTasks(data: RequestParams) {
    return request({
        url: `/loonool/workspaces/tasks/${data.workspaceId}`,
        method: 'get',
        params: data,
    })
}

// 获取任务详情
export function tasksgetTaskDetail(data: RequestParams) {
    return request({
        url: `/api/workspaces/${data.workspaceId}/tasks/${data.taskId}`,
        method: 'get',
        params: data,
    })
}


// 分页获取任务评论列表
export function tasksgetTaskComments(data: RequestParams) {
    return request({
        url: `/loonool/workspaces/${data.workspaceId}/tasks/${data.taskId}/comments`,
        method: 'get',
        params: data,
    })
}

// 创建任务评论
export function taskscreateTaskComment(data: RequestParams) {
    return request({
        url: `/loonool/workspaces/${data.workspaceId}/tasks/${data.taskId}/comments`,
        method: 'post',
        data,
    })
}






// 获取用户的所有工作空间
export function loonoolWorkspacesMyAll(data: RequestParams) {
    return request({
        url: `/loonool/workspaces/my/all`,
        method: 'get',
        params: data,
    })
}

// 获取工作空间成员列表
export function loonoolWorkspacesMembers(data: RequestParams) {
    return request({
        url: `/loonool/workspaces/${data.workspaceId}/members`,
        method: 'get',
        params: data,
    })
}
// 邀请成员进入工作空间
export function tasksMembersinvite(data: RequestParams) {
    return request({
        url: `/loonool/workspaces/${data.workspaceId}/invite`,
        method: 'post',
        data,
    })
}
// 删除工作空间成员
export function tasksMembersinviteDelete(data: RequestParams) {
    return request({
        url: `/loonool/workspaces/${data.workspaceId}/${data.memberId}/delete`,
        method: 'delete',
    })
}