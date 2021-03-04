import request from 'umi-request';
import { TableListParams } from './data.d';

// 账户数据列表展示
export async function queryRule(params?: TableListParams) {
  const paramss={
    system_menuid: 1,
    ...params
  }
  return request('/server/admin/email_list', {
    method:"POST",
    data: paramss,
  });
}

// 账户数据删除
export async function removeRule(params: { key: number[] }) {
  return request('/server/admin/email_delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 添加/修改数据
export async function addRule(params: TableListParams) {
  return request('/server/admin/email_add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 编辑时数据展示
export async function editRule(params) {
  return request('/server/admin/email_edit', {
    method: 'POST',
    data:params,
  });
}
