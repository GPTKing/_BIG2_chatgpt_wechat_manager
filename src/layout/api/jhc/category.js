import request from '@/utils/request'

// 查询货品分类列表
export function listCategory(query) {
  return request({
    url: '/jhc/category/list',
    method: 'get',
    params: query
  })
}

// 查询货品分类详细
export function getCategory(id) {
  return request({
    url: '/jhc/category/' + id,
    method: 'get'
  })
}

// 新增货品分类
export function addCategory(data) {
  return request({
    url: '/jhc/category',
    method: 'post',
    data: data
  })
}

// 修改货品分类
export function updateCategory(data) {
  return request({
    url: '/jhc/category',
    method: 'put',
    data: data
  })
}

// 删除货品分类
export function delCategory(id) {
  return request({
    url: '/jhc/category/' + id,
    method: 'delete'
  })
}



// 查询货品分类列表
export function listCategorysys(query) {
  return request({
    url: '/jhc/category/sys/list',
    method: 'get',
    params: query
  })
}

// 查询货品分类详细
export function getCategorysys(id) {
  return request({
    url: '/jhc/category/sys/' + id,
    method: 'get'
  })
}

// 新增货品分类
export function addCategorysys(data) {
  return request({
    url: '/jhc/category/sys',
    method: 'post',
    data: data
  })
}

// 修改货品分类
export function updateCategorysys(data) {
  return request({
    url: '/jhc/category/sys',
    method: 'put',
    data: data
  })
}

// 删除货品分类
export function delCategorysys(id) {
  return request({
    url: '/jhc/category/sys/' + id,
    method: 'delete'
  })
}


