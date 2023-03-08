import request from '@/utils/request'

// 查询激活码列表
export function listCodes(query) {
  return request({
    url: '/chatgpt/codes/list',
    method: 'get',
    params: query
  })
}

// 查询激活码详细
export function getCodes(id) {
  return request({
    url: '/chatgpt/codes/' + id,
    method: 'get'
  })
}

// 新增激活码
export function addCodes(data) {
  return request({
    url: '/chatgpt/codes',
    method: 'post',
    data: data
  })
}

// 修改激活码
export function updateCodes(data) {
  return request({
    url: '/chatgpt/codes',
    method: 'put',
    data: data
  })
}

// 删除激活码
export function delCodes(id) {
  return request({
    url: '/chatgpt/codes/' + id,
    method: 'delete'
  })
}



// 查询激活码列表
export function listCodessys(query) {
  return request({
    url: '/chatgpt/codes/sys/list',
    method: 'get',
    params: query
  })
}

// 查询激活码详细
export function getCodessys(id) {
  return request({
    url: '/chatgpt/codes/sys/' + id,
    method: 'get'
  })
}

// 新增激活码
export function addCodessys(data) {
  return request({
    url: '/chatgpt/codes/sys',
    method: 'post',
    data: data
  })
}

// 修改激活码
export function updateCodessys(data) {
  return request({
    url: '/chatgpt/codes/sys',
    method: 'put',
    data: data
  })
}

// 删除激活码
export function delCodessys(id) {
  return request({
    url: '/chatgpt/codes/sys/' + id,
    method: 'delete'
  })
}


