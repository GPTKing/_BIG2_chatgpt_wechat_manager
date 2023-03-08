import request from '@/utils/request'

// 查询小程序用户聊天列列表
export function listUser(query) {
  return request({
    url: '/chatgpt/user/list',
    method: 'get',
    params: query
  })
}

// 查询小程序用户聊天列详细
export function getUser(answeUserId) {
  return request({
    url: '/chatgpt/user/' + answeUserId,
    method: 'get'
  })
}

// 新增小程序用户聊天列
export function addUser(data) {
  return request({
    url: '/chatgpt/user',
    method: 'post',
    data: data
  })
}

// 修改小程序用户聊天列
export function updateUser(data) {
  return request({
    url: '/chatgpt/user',
    method: 'put',
    data: data
  })
}

// 删除小程序用户聊天列
export function delUser(answeUserId) {
  return request({
    url: '/chatgpt/user/' + answeUserId,
    method: 'delete'
  })
}



// 查询小程序用户聊天列列表
export function listUsersys(query) {
  return request({
    url: '/chatgpt/user/sys/list',
    method: 'get',
    params: query
  })
}

// 查询小程序用户聊天列详细
export function getUsersys(answeUserId) {
  return request({
    url: '/chatgpt/user/sys/' + answeUserId,
    method: 'get'
  })
}

// 新增小程序用户聊天列
export function addUsersys(data) {
  return request({
    url: '/chatgpt/user/sys',
    method: 'post',
    data: data
  })
}

// 修改小程序用户聊天列
export function updateUsersys(data) {
  return request({
    url: '/chatgpt/user/sys',
    method: 'put',
    data: data
  })
}

// 删除小程序用户聊天列
export function delUsersys(answeUserId) {
  return request({
    url: '/chatgpt/user/sys/' + answeUserId,
    method: 'delete'
  })
}


