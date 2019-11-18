import request from '@/utils/request'

//菜单
export function buildMenus() {
  return request({
    url: 'menus/build',
    method: 'get'
  })
}

//删除
export function del(id) {
  return request({
    url: 'menus/' + id,
    method: 'delete'
  })
}

// 获取所有的菜单树
export function getMenusTree() {
  return request({
    url: 'menus/tree',
    method: 'get'
  })
}



export function add(data) {
  return request({
    url: 'menus/saveOrUpdate',
    method: 'post',
    data
  })
}



export function edit(data) {
  return request({
    url: 'api/menus',
    method: 'put',
    data
  })
}

export function downloadMenu(params) {
  return request({
    url: 'api/menus/download',
    method: 'get',
    params,
    responseType: 'blob'
  })
}
