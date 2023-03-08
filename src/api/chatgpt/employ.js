import request from '@/utils/request'

// 查询回答收录列列表
export function listEmploy(query) {
  return request({
    url: '/chatgpt/employ/list',
    method: 'get',
    params: query
  })
}

// 查询回答收录列详细
export function getEmploy(anserId) {
  return request({
    url: '/chatgpt/employ/' + anserId,
    method: 'get'
  })
}

// 新增回答收录列
export function addEmploy(data) {
  return request({
    url: '/chatgpt/employ',
    method: 'post',
    data: data
  })
}

// 修改回答收录列
export function updateEmploy(data) {
  return request({
    url: '/chatgpt/employ',
    method: 'put',
    data: data
  })
}

// 删除回答收录列
export function delEmploy(anserId) {
  return request({
    url: '/chatgpt/employ/' + anserId,
    method: 'delete'
  })
}



// 查询回答收录列列表
export function listEmploysys(query) {
  return request({
    url: '/chatgpt/employ/sys/list',
    method: 'get',
    params: query
  })
}

// 查询回答收录列详细
export function getEmploysys(anserId) {
  return request({
    url: '/chatgpt/employ/sys/' + anserId,
    method: 'get'
  })
}

// 新增回答收录列
export function addEmploysys(data) {
  return request({
    url: '/chatgpt/employ/sys',
    method: 'post',
    data: data
  })
}

// 修改回答收录列
export function updateEmploysys(data) {
  return request({
    url: '/chatgpt/employ/sys',
    method: 'put',
    data: data
  })
}

// 删除回答收录列
export function delEmploysys(anserId) {
  return request({
    url: '/chatgpt/employ/sys/' + anserId,
    method: 'delete'
  })
}


