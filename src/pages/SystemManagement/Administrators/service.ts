import request from 'umi-request';
import { TableListParams } from './data.d';

export async function queryRule(params?:TableListParams) {
  const paramss={
    system_menuid: 1,
    ...params
  }
  return request('/server/admin/account', {
    method: 'POST',
    data:paramss,
  });
}

export async function addlist(params) {
  const paramss={
    system_menuid: 1,
    ...params
  }
  return request('/server/admin/role_list', {
    method: 'POST',
    data:paramss,
  });
}

export async function removeRule(params: { id: '' }) {
  return request('/server/admin/account_delete', {
    method: 'POST',
    data: params,
  });
}

export async function addRule(params: TableListParams) {
  return request('/server/admin/account_add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/server/admin/account_add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 修改状态
export async function statusRule(params: { id: "" }) {
  return request('/server/admin/account_status', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 编辑时显示数据
export async function editRule(params: { id: "" }) {
  return request('/server/admin/account_role', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
