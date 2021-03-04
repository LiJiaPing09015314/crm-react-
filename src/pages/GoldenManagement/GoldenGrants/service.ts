import request from 'umi-request';
import { TableListParams } from './data.d';

// 列表展示
export async function queryRule(params) {
  const paramss ={
    system_menuid : 1,
  }
  return request('/server/admin/golden/grants_list', {
    method: "POST",
    data: paramss,
  });
}

// 修改状态
export async function statusRule(params: { id: "" }) {
  return request('/server/admin/golden/grants_status', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 修改 /添加
export async function addRule(params: TableListParams) {
  return request('/server/admin/golden/grants_add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
// 编辑时获取数据
export async function updateRule(params: TableListParams) {
  return request('/server/admin/golden/grants_updList', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
// 删除数据
export async function removeRule(params: TableListParams) {
  return request('/server/admin/golden/grants_del', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
