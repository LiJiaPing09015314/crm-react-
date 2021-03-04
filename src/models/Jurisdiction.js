import {queryRule} from "../pages/SystemManagement/RightsManagement/service";

export  default  {
  namespace :'home', //namespace:是model的命名空间，用于区分model
  state:{   //state:当前model状态的厨师值，表示当前状态
    list:[],
  },
 
 //用于处理异步操作和业务逻辑，由action触发，但不能修改state
  effects:{
    *fetch({payload},{call,put}) {
      const response = yield call(queryRule,payload);
      yield put({
        type:'show',
        payload:response,
      });
    },
  },

//reducers:用于处理同步操作，由action触发,可修改state
reducers:{
//action:是reducers及effects的触发器，一般是一个对象，如：{type:'add',payload:todo}
  show(state,action){
    return{
      ...state,
      list:action.payload,
    };
  },
},
};
