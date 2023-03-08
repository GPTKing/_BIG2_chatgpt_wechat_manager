import request from '@/utils/request'

// 查询平台信息列表
export function listInfo(query) {
  return request({
    url: '/system/info/list',
    method: 'get',
    params: query
  })
}

// 查询平台信息详细
export function getInfo(platformId) {
  return request({
    url: '/system/info/' + platformId,
    method: 'get'
  })
}

// 新增平台信息
export function addInfo(data) {
  return request({
    url: '/system/info',
    method: 'post',
    data: data
  })
}

// 修改平台信息
export function updateInfo(data) {
  return request({
    url: '/system/info',
    method: 'put',
    data: data
  })
}

// 删除平台信息
export function delInfo(platformId) {
  return request({
    url: '/system/info/' + platformId,
    method: 'delete'
  })
}





// 处理某个平台藏品你
export function catchTaskInfo(tokenRecordId) {
  return request({
    url: '/system/info/platform/' + tokenRecordId,
    method: 'get'
  })
}
