import request from '@/utils/request'

export function getMenuByRoleId(id) {
  return request({
    url: 'roles/getMenuByRoleId?id=' + id,
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'roles/' + id,
    method: 'delete'
  })
}

export function add(data) {
  return request({
    url: 'roles/saveOrUpdate',
    method: 'post',
    data
  })
}

export function editMenu(data) {
  return request({
    url: 'roles/saveMenus',
    method: 'post',
    data
  })
}