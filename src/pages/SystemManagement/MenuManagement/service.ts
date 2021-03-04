import request from 'umi-request';
import { TableListParams } from './data.d';

export async function queryRule(params?: TableListParams) {
  const paramss={
    ...params
  }
  return request('/server/admin/menu_list', {
    method: 'POST',
    data:paramss,
  });
}

export async function addRule(params:  TableListParams) {
  return request('/server/admin/menu_add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/server/admin/menu_edit', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function menuRule(params: TableListParams) {
  return request('/server/admin/menu_type', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeRule(params: {id: ''}) {
  return request('/server/admin/menu_delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
