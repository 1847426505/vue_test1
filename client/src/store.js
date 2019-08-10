import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types={
  SET_AUTHENTICATED:"SET_AUTHENTICATED", //判断是否认证通过
  SET_USER:'SET_USER' //设置用户
}
const state={
  isAuthenticated:false, //是否授权
  user:{}
}
const getters={
   isAuthentivated:state=>state.isAuthenticated, //获取状态信息
   user:state => state.user
}
const mutations={//设置状态类型
  [types.SET_AUTHENTICATED](state,isAuthenticated){ //isAuthenticated 是否授权
    if(isAuthenticated) state.isAuthenticated = isAuthenticated;
    else state.isAuthenticated = false;
  } ,
  [types.SET_USER] (state,user){
    if(user) state.user =user;
    else state.user = {};
  }
}
const actions={
  setAuthentivated:({commit},isAuthenticated)=>{
    commit(types.SET_AUTHENTICATED,isAuthenticated)
  },
  setUser:({commit},user)=>{
    commit(types.SET_USER,user)
  },
  clearCurrentState:({commit}) =>{ //退出
    commit(types.SET_AUTHENTICATED,false);
    commit(types.SET_USER,null)
  }

}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
