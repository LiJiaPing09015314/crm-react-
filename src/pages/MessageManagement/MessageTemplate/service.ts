import request from 'umi-request';
import { TableListParams } from './data.d';
// 消息模板展示
export async function queryRule(params?: TableListParams) {
  const paramss={
    system_menuid: 1,
    ...params
  }
  return request('/server/admin/template', {
    method:"POST",
    data: paramss,
  });
}


export async function removeRule(params: { id: '' }) {
  return request('/server/admin/template_delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 消息模板添加
export async function addRule(params: TableListParams) {
  return request('/server/admin/template_add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 消息模板编辑
export async function editRule(params: TableListParams) {
  return request('/server/admin/template_content', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
