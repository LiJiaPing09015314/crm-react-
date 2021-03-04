import request from 'umi-request';
import Qs from "qs";
import { TableListParams } from './data.d';

// 角色列表展示
export async function queryRule(params) {
  const paramss={
    system_menuid: 1,
    ...params
  }
  return request('/server/admin/role_list', {
    method: 'POST',
    data:paramss,
  });
}
// 添加/编辑权限列表展示
export async function addlist(params) {
  return request('/server/admin/role_addlist', {
    method: 'post',
    params,
  });
}
// 编辑时角色列表展示
export async function updateRule(params: TableListParams) {
  return request('/server/admin/role_edit', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
// 删除角色
export async function removeRule(params: { key: number[] }) {
  return request('/server/admin/role_delete', {
    method: 'POST',
    data:params
  });
}

// 添加角色 或修改角色
export async function addRule(params: TableListParams) {
  return request('/server/admin/role_add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
