import request from 'umi-request';
import { TableListParams } from './data.d';

export async function queryRule(params?: TableListParams) {
  const userdata=JSON.parse(localStorage.getItem("userdata")) 
    const param={
      ...params,
      memberid:userdata.id,
      
    }
  return request('/server/admin/agency/withdraw_list', {
    method: 'post',
    data:param,
  });
}

// 获取单条用户信息

//出金获取单条信息  参数 id
export async function withdrawcontent(params) {
 return request('/server/admin/agency/withdraw_content', {
   method: 'post',
   data:params,
 });
}
