import request from '@/utils/request'

export function login(username, password, code, uuid) {
  return request({
    url: '/syslogin/login',
    method: 'post',
    data: {
      username,
      password,
      code,
      uuid
    }
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function getCodeImg() {
  return request({
    url: '/syslogin/code',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/syslogin/logout',
    method: 'delete'
  })
}
