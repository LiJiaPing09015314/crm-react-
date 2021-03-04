import { stringify } from 'querystring';
import { history } from 'umi';
import { fakeAccountLogin ,fakeAgentLogin,fakeLoginOut} from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);

      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully
      if(response.token){
        localStorage.setItem('x-auth-token',response.token)
        localStorage.setItem('userdata',JSON.stringify(response.data))
        localStorage.setItem('type',response.type)
      }
      if (response.code === 200) {
        const urlParams = new URL(window.location.href);

        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/welcome';
            window.location.reload();
            return;
          }
        }
        history.replace(redirect || '/welcome');
        window.location.reload();
      }else{
        message.error(response.msg)
      }
    },
    *loginagent({ payload }, { call, put }) {
      const response = yield call(fakeAgentLogin, payload);

      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully
      if(response.token){
        localStorage.setItem('x-auth-token',response.token)
        localStorage.setItem('userdata',JSON.stringify(response.data))
        localStorage.setItem('type',response.type)
      }

      if (response.code === 200) {
        const urlParams = new URL(window.location.href);
        // return window.location.href = 'http://192.168.5.2:8000/welcome'
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        history.replace(redirect || '/');
      }else{
        history.replace('/user/agentlogin');
      }
    },
    // 登出
    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note
      let id=JSON.parse(localStorage.getItem('userdata'))
      let params={
        id:id.id
      }
      //
      fakeLoginOut(params).then(res=>{
        localStorage.clear()
        // 跳转到登录页
        if (window.location.pathname !== '/user/login' && !redirect) {
          history.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          });
        }
      })


    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
