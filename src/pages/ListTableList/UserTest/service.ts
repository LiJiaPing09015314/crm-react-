import request from '@/utils/request';

// 用户列表展示
export async function queryRule(params) {
  const paramss = {
    system_menuid: 1,
    ...params,
    test: 1
  };
  return  request('/server/admin/member/list', {
    method: 'POST',
    data: paramss,
  });
}

// 删除用户数据
export async function removeRule(params) {
  return request('/server/admin/member/del', {
    method: 'POST',
    data: { ...params },
  });
}

// 添加/修改用户数据
export async function addRule(params) {
  return request('/server/admin/member/add', {
    method: 'POST',
    data: params,
  });
}

// 修改时用户数据展示
export async function updateRule(params) {
  const paramss = {
    ...params,
  };
  return request('/server/admin/member/updList', {
    method: 'POST',
    data: paramss,
  });
}

// 修改状态
export async function statusRule(params) {
  return request('/server/admin/agency_status', {
    method: 'POST',
    data: params,
  });
}

// 编辑时赠金列表展示
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
// 上级菜单
export async function menuRule(params) {
  return request('/server/admin/member/memberid', {
    method: 'POST',
    data: params,
  });
}
