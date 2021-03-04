import request from 'umi-request';
import { TableListParams } from './data.d';

// 消息列表展示
export async function queryRule(params?: TableListParams) {
  const paramss = {
    ...params,
    system_menuid: 1
  }
  return request('/server/admin/message', {
    method: 'POST',
    data:paramss,
  });
}

// 查看列表内容
export async function searchRule(params: { id: '' }) {
  return request('/server/admin/message_content', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
