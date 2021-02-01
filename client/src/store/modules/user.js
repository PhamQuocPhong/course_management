import UserService from '@/services/user'

import ComponentStore from './component';
import lang from "@/config/lang";

export  const getters = {
    users: state => state.users,
    user: state => state.user,

    currentPage: state => state.currentPage,
    pageCounts: state => state.pageCounts,
    itemsPerPage: state => state.itemsPerPage
};

export const getDefaultState = () => ({
    users: [],
    user: {},
    currentPage: 1,
    itemsPerPage: 20,
    pageCounts: 1,

})

const state = getDefaultState()

export  const actions = {

    async fetchAll({ commit }, payload) {
      var query = payload;
      const res = await UserService.fetchAll();
      if(res.status === 200){
        var data = res.data;
        commit("FETCH_ALL", data);
      }
    },

    async fetchPaging({ commit }, payload) {

      const currentPage = payload.page;
      const searchkey = payload.searchkey || null;
      var query = payload;
      const res = await UserService.fetchPaging(query);
      if(res.data){
        var data = res.data;
        commit("FETCH_PAGING", data);
      }
    },

    async fetch({ commit }, payload)
    {
      const res = await UserService.fetch(payload.id);
      if(res.data){
        commit("FETCH", res.data.data);
      }
    },

    async remove({ commit }, payload)
    {
      const user = payload;
      const res = await UserService.remove(user.id);

      if(res.status === 200)
      {
        commit("REMOVE", user);
        toastr.success(lang.REMOVE_SUCCESS, lang.SUCCESS, { timeOut: 1000 });
      }else{
        toastr.error(lang.REMOVE_FAIL, lang.ERROR, { timeOut: 1000 });
      }

    },

    updateCurrentPage({commit}, payload)
    {
      commit("UPDATE_CURRENT_PAGE", payload.currentPage);
    },

    reset({commit}){
      commit('RESET')
    }
 }

export  const mutations = {

    FETCH_ALL(state, data){
      state.users = data.data;
    },

    FETCH_PAGING(state, data){
      state.users = data.data;
      state.pageCounts = data.pageCounts
    },

    FETCH(state, user){
      state.user = user;
    },

    REMOVE(state, user)
    {
      var users = state.users;
      var index = users.indexOf(user);
      if (index !== -1) {
          users.splice(index, 1);
      }
      state.users = users;
    },

    UPDATE_CURRENT_PAGE(state, page){
      state.currentPage = page;
    },


    RESET(state){
      Object.assign(state, getDefaultState())
    }
}


export default{
    namespaced: true,
    getters,
    state,
    actions,
    mutations
}
