import request from '@/utils/request'

// 查询机器人配置列表
export function listRcq(query) {
  return request({
    url: '/system/rcq/list',
    method: 'get',
    params: query
  })
}

// 查询机器人配置详细
export function getRcq(rcqId) {
  return request({
    url: '/system/rcq/' + rcqId,
    method: 'get'
  })
}

// 新增机器人配置
export function addRcq(data) {
  return request({
    url: '/system/rcq',
    method: 'post',
    data: data
  })
}

// 修改机器人配置
export function updateRcq(data) {
  return request({
    url: '/system/rcq',
    method: 'put',
    data: data
  })
}

// 删除机器人配置
export function delRcq(rcqId) {
  return request({
    url: '/system/rcq/' + rcqId,
    method: 'delete'
  })
}
