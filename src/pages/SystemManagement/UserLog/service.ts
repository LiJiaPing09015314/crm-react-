import request from 'umi-request';
import { TableListParams } from './data';

export async function queryRule(params?: TableListParams) {
  const paramss={
    page:1,
    length:20,
    // ...params
  }
  return request('/server/admin/member_log', {
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
