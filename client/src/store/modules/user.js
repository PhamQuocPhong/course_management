import UserService from '@/services/user'
import CookieService from '@/services/cookie'

export  const getters = {
    users: state => state.users,
    user: state => state.user,
    currentUser: state => state.currentUser
};


export const getDefaultState = () => ({
    users: [],
    user: {},
    currentUser: CookieService.get("userInfo"),
})

const state = getDefaultState()

export  const actions = {

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
      const userId = payload.id;
      const res = await UserService.fetch(userId);
      if(res.data){
        commit("FETCH", res.data);
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

    FETCH_PAGING(state, users){
      state.users = users;
      state.pageCounts = data.pageCounts
    },

    FETCH(state, user){
      state.user = user;
    },

    // array
    UPDATE_CURRENT_USER(state, user)
    {
      CookieService.set("userInfo", user);
      state.currentUser = user;
    },

    // string
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
