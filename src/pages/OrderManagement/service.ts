import request from 'umi-request';
import { TableListParams } from './data.d';

// 列表展示
export async function queryRule(params?: TableListParams) {
  const paramss= {
    ...params,
    system_menuid: 1,
    page: 1,
    length: 20,
    type:'crm'
  }
  return request('/server/admin/orderslist', {
    method: 'POST',
    data: paramss,
  });
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
