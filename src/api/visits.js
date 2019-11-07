import request from '@/utils/request'

export function count() {
  return request({
    url: 'api/visitsCount',
    method: 'post'
  })
}

export function get() {
  return request({
    url: 'api/visits',
    method: 'get'
  })
}

export function getChartData() {
  return request({
    url: 'api/chartData',
    method: 'get'
  })
}
