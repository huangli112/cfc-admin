import request from '@/utils/request'

export function getUsers(params) {
  return request.get(`/users?_sort=updateTime&_order=desc&_page=${params.current}&_limit=${params.pageSize}`)
}

export function deleteAccount(id) {
  return request.delete(`/users/${id}`)
}

export function createAccount(params) {
  params.createTime = Date.now()
  params.updateTime = Date.now()
  return request.post('/users', params)
}

export function modifyAccount(params) {
  params.updateTime = Date.now()
  const { id, ...user } = params
  return request.patch(`/users/${id}`, user)
}

export function getRoles() {
  return request.get('/roles')
}

export function getModule() {
  return request.get('/soft')
}

export function deleteModule(id) {
  return request.delete(`/soft/${id}`)
}

export function createModule(params) {
  params.createTime = Date.now()
  params.updateTime = Date.now()
  return request.post('/soft', params)
}

export function modifyModule(params) {
  params.updateTime = Date.now()
  const { id, ...user } = params
  return request.patch(`/soft/${id}`, user)
}
