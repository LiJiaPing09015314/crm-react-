import request from 'umi-request';
import { TableListParams } from './data.d';

// 查询入金列表数据
export async function queryRule(params?: TableListParams) {
  return request('/server/admin/golden/golden_list', {
    method: "POST",
    data: params
  });
}

// 查询手工入金
export async function manualRule(params) {
  return request('/server/admin/golden/manual_list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addRule(params: TableListParams) {
  return request('/api/GoldenQuery', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/GoldenQuery', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
