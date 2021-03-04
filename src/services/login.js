import request from '@/utils/request';

// 总部后台
export async function fakeAccountLogin(params) {
  return request('/server/admin_login', {
    method: 'POST',
    data: params,
  });
}
// 代理
export async function fakeAgentLogin(params) {
  return request('/server/agency/signin', {
    method: 'POST',
    data: params,
  });
}
//退出
export async function fakeLoginOut(params) {
  return request('/server/agency/Logout', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
