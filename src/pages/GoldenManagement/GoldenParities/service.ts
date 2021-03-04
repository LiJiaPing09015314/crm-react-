import request from 'umi-request';
import { TableListParams } from './data.d';

// 入金汇率列表展示
export async function queryRule(params?: TableListParams) {
  const paramss = {
    // ...params,
    system_menuid: 1
  }
  return request('/server/admin/golden/parities_list', {
    method: "POST",
    data: paramss
  });
}
// 修改时用户数据展示
export async function updateRule(params) {
  const paramss = {
    ...params,
  };
  return request('/server/admin/golden/parities_updList', {
    method: 'POST',
    data: paramss,
  });
}

// 添加/修改入金基准汇率
export async function addRule(params: TableListParams) {
  return request('/server/admin/golden/parities_add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
// 修改状态
export async function statusRule(params: TableListParams) {
  return request('/server/admin/golden/parities_status', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
