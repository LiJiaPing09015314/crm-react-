import request from 'umi-request';

// export async function queryCurrent() {
//   return request('/api/currentUser');
// }
// 个人信息展示
export async function queryCurrent() {
  const params={
    memberid:1
  }
  return request('/server/admin/agency/user',{
    method: 'POST',
    data: params
  });
}
// 双重密保
export async function queryGoogle(params) {
  return request('/server/index/api/obtain_google',{
    method: 'POST',
    data: params
  });
}
export async function queryProvince() {
  return request('/api/Province');
}
export async function queryCity(province) {
  return request(`/api/geographic/city/${province}`);
}
export async function query() {
  return request('/api/users');
}
