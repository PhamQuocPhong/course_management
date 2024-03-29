import CategoryService from '@/services/category'

import ComponentStore from './component';
import lang from "@/config/lang";

export  const getters = {
    categories: state => state.categories,
    noParentCategories: state => state.categories.filter(item => item.parentId !== null),
    category: state => state.category,

    currentPage: state => state.currentPage,
    pageCounts: state => state.pageCounts,
    itemsPerPage: state => state.itemsPerPage

};

export const getDefaultState = () => ({
    categories: [],
    category: {},
    currentPage: 1,
    itemsPerPage: 20,
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
      const res = await CategoryService.remove(category.id);

      if(res.status === 200)
      {
        commit("REMOVE", category);
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
      var categories = state.categories;
      var index = categories.indexOf(category);
      if (index !== -1) {
          categories.splice(index, 1);
      }
      state.categories = categories;
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
