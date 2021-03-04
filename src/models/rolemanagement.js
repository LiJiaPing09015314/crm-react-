  //这里是刚刚编写的api接口，在model中调用
  import { firstApi } from "@/services/rolemanagement";

  export default {
	namespace: 'test',
	state: {
	//用来保存数据
	data : [],
	},
	effects: {
		//方法实现
		//payload 请求的参数
		*fetch({ payload }, { call, put }) {
			const response = yield call(firstApi, payload);
			yield put({
				//回调的方法 save
				type: 'save',
				payload: response,
			});
			console.log(response)
		},
	},
	reducers: {
		//这块应该是回调
		save(state, action) {
			return {
				...state,
				data: action.payload,
			};
		},
	},
};