import request from 'umi-request';
import { TableListParams } from './data.d';
import { Row } from 'antd';

// 获取节点列表
export async function queryRule(params) {
  const paramss={
    system_menuid: 1,
    ...params
  }
  return request('/server/admin/node_list', {
    method:"POST",
    data: paramss,
  });
}
// 编辑时所有的菜单列表
export async function menulist(params) {
  return request('/server/admin/system_menulist', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeRule(params: { id: '' }) {
  return request('/server/admin/node_delete', {
    method: 'POST',
    data:params
  });
}

// 添加
export async function addRule(params: TableListParams) {
  return request('/server/admin/node_add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 修改
export async function updateRule(params: TableListParams) {
  return request('/server/admin/node_add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

