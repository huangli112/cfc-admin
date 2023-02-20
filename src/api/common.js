/*
* 获取首页轮播图列表
* 获取合作伙伴列表
*
*
*
* */
import request from '../utils/request'

export async function getSliderList (code) {
  const resp = await request.post('/type/info', { requestData: { code } })
  return resp.data.attachment
}

/*
* 获取留言板列表 /onlineMessage/list 不传参数
*
* */
export async function getMessageList () {
  const resp = await request.post('/onlineMessage/list')
  return resp.data
}

/*
获取留言模块下拉菜单
*/
export async function getModuleList () {
  const resp = await request.post('/onlineMessage/findMouderList')
  return resp.data
}

/*
* 删除留言
* */
export async function deleteMessage () {
  const resp = await request.post('/onlineMessage/delete')
  return resp.data
}

/*
* 获取联系我们列表 /info/list 获取第一条数据  不用传参
* 根据Id去修改记录
*
* */

export async function getContactInfo () {
  const resp = await request.post('/info/list', { page: { pageNumber: 1, pageSize: -1 }, requestData: {} })
  return resp.data.list
}

/*
* 修改每个子模块的banner图  对应的父级ID拿到 /type/update
* */

export async function editModuleImg () {
  const resp = await request.post('/type/update')
  return resp.data
}
