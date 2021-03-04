import request from 'umi-request';
import { TableListParams } from './data.d';

// 查询入金列表数据
export async function queryRule(params?: TableListParams) {
  const userdata=JSON.parse(localStorage.getItem("userdata")) 
    const param={
      ...params,
      memberid:userdata.id
    }
  return request('/server/admin/agency/golden', {
    method: "POST",
    data: param, 
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

//出金获取单条信息  参数 id
export async function withdrawcontent(params) {
  return request('/server/admin/agency/withdraw_content', {
    method: 'post',
    data:params,
  });
 }

