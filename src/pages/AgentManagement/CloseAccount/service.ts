import request from 'umi-request';
import { TableListParams } from './data.d';

// 恢复列表展示
export async function queryRule(params?: TableListParams) {
  const paramss= {
    ...params ,
    system_menuid: 1,
    type:1
  }
  return request('/server/admin/agency_listdelete', {
    method: 'POST',
    data: paramss,
  });
}

// 彻底删除
export async function removeRule(params: { key: number[] }) {
  return request('/server/admin/agency_listdeletes', {
    method: 'POST',
    data: {
      ...params,
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

// 彻底恢复
export async function updateRule(params: TableListParams) {
  return request('/server/admin/agency_listupdates', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
