import request from 'umi-request';
import { TableListParams } from './data.d';

// 获取列表
export async function queryRule(params) {
  const paramss={
    system_menuid: 1,
    // ...params
  }
  return request('/server/admin/golden/list', {
    method: "POST",
    data: paramss,
  });
}
// 删除
export async function removeRule(params: { id: '' }) {
  return request('/server/admin/golden/del', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
// 修改 / 添加
export async function addRule(params: TableListParams) {
  return request('/server/admin/golden/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
// 编辑时获取列表
export async function updateRule(params: TableListParams) {
  return request('/server/admin/golden/updList', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
// 修改状态
export async function statusRule(params: TableListParams) {
  return request('/server/admin/golden/status', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
