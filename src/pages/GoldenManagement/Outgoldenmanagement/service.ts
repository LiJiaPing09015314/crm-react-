import request from 'umi-request';
import { TableListParams } from './data.d';

// 查询出金列表数据
export async function queryRule(params?: TableListParams) {
  const paramss={
    system_menuid:1,
    // ...params
  }
  return request('/server/admin/withdraw/type_list', {
    method:'POST',
    data:paramss,
  });
}

// 编辑时列表展示
export async function updateRule(params: { id: '' }) {
  return request('/server/admin/withdraw/type_updList', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

// 添加 / 修改
export async function addRule(params: TableListParams) {
  return request('/server/admin/withdraw/type_add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeRule(params: TableListParams) {
  return request('/server/admin/withdraw/del', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
// 修改状态
export async function statusRule(params: TableListParams) {
  return request('/server/admin/withdraw/status', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
