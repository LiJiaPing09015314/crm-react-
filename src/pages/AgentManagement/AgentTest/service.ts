import request from '@/utils/request';
// 获取列表
export async function queryRule(params) {
  const paramss = {
    system_menuid: 1,
    current: 1,
    pageSize: 20,
    ...params,
    test: 1
  };
  return request('/server/admin/agency_list', {
    method: 'POST',
    data: paramss,
  });
}
// 删除
export async function removeRule(params) {
  return request('/server/admin/del', {
    method: 'POST',
    data: params,
  });
}
// 添加 / 修改
export async function addRule(params) {
  return request('/server/admin/agency_add', {
    method: 'POST',
    data: params,
  });
}
// 编辑时获取列表
export async function editRule(params) {
  return request('/server/admin/agency_content', {
    method: 'POST',
    data: params,
  });
}
// 修改状态
export async function statusRule(params) {
  return request('/server/admin/agency_status', {
    method: 'POST',
    data: params,
  });
}
// 编辑赠金
export async function grantsEditRule(params) {
  return request('/server/admin/member/grants_list', {
    method: 'POST',
    data: params,
  });
}

// 修改赠金
export async function grantsRule(params) {
  return request('/server/admin/member/grants_add', {
    method: 'POST',
    data: params,
  });
}
// 修改返佣
export async function rebateRule(params) {
  return request('/server/admin/rebate', {
    method: 'POST',
    data: params,
  });
}
// 上级菜单
export async function menuRule(params) {
  return request('/server/admin/member/memberid', {
    method: 'POST',
    data: params,
  });
}
