import request from '@/utils/request'

// 查询用户激活列表
export function listKey(query) {
  return request({
    url: '/chatgpt/key/list',
    method: 'get',
    params: query
  })
}

// 查询用户激活详细
export function getKey(id) {
  return request({
    url: '/chatgpt/key/' + id,
    method: 'get'
  })
}

// 新增用户激活
export function addKey(data) {
  return request({
    url: '/chatgpt/key',
    method: 'post',
    data: data
  })
}

// 激活激活码
export function activecode(data) {
  return request({
    url: '/chatgpt/key/activecode',
    method: 'post',
    data: data
  })
}


// 修改用户激活
export function updateKey(data) {
  return request({
    url: '/chatgpt/key',
    method: 'put',
    data: data
  })
}

// 删除用户激活
export function delKey(id) {
  return request({
    url: '/chatgpt/key/' + id,
    method: 'delete'
  })
}



// 查询用户激活列表
export function listKeysys(query) {
  return request({
    url: '/chatgpt/key/sys/list',
    method: 'get',
    params: query
  })
}

// 查询用户激活详细
export function getKeysys(id) {
  return request({
    url: '/chatgpt/key/sys/' + id,
    method: 'get'
  })
}

// 新增用户激活
export function addKeysys(data) {
  return request({
    url: '/chatgpt/key/sys',
    method: 'post',
    data: data
  })
}

// 修改用户激活
export function updateKeysys(data) {
  return request({
    url: '/chatgpt/key/sys',
    method: 'put',
    data: data
  })
}

// 删除用户激活
export function delKeysys(id) {
  return request({
    url: '/chatgpt/key/sys/' + id,
    method: 'delete'
  })
}


