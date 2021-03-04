import request from '@/utils/request';
   //param为参数
   export async function firstApi(params) {
    return request('/server/admin/role_list', {
      method: 'POST',
      data: params,
    });
//   return request('/api/login/account', {
//     method: 'POST',
//     body: params,
// });
  }
  