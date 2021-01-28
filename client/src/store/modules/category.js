import CategoryService from '@/services/category'

import ComponentStore from './component';

export  const getters = {
    categories: state => state.categories,
    category: state => state.category,

    currentPage: state => state.currentPage,
    pageCounts: state => state.pageCounts,

};

export const getDefaultState = () => ({
    categories: [],
    category: {},
    currentPage: 1,
    itemPerPage: 20,
    pageCounts: 1,

})

const state = getDefaultState()

export  const actions = {

    async fetchAll({ commit }, payload) {
      var query = payload;
      const res = await CategoryService.fetchAll();
      if(res.status === 200){
        var data = res.data;
        commit("FETCH_ALL", data);
      }
    },

    async fetchPaging({ commit }, payload) {

      const currentPage = payload.page;
      const searchkey = payload.searchkey || null;
      var query = payload;
      const res = await CategoryService.fetchPaging(query);
      if(res.data){
        var data = res.data;
        commit("FETCH_PAGING", data);
      }
    },

    async fetch({ commit }, payload)
    {
      const res = await CategoryService.fetch(payload.id);
      if(res.data){
        commit("FETCH", res.data.data);
      }
    },

    async remove({ commit }, payload)
    {
      const category = payload;
      const res = await CategoryService.fetch(category.id);
      if(res.status === 200){
        commit("REMOVE", res);
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
      state.categories = data.data;
    },

    FETCH_PAGING(state, data){
      state.categories = data.data;
      state.pageCounts = data.pageCounts
    },

    FETCH(state, category){
      state.category = category;
    },

    REMOVE(state, category)
    {
      console.log(category)
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
