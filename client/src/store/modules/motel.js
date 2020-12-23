import MotelService from '@/services/motel'

export  const getters = {
    motels: state => state.motels,
    motel: state => state.motel,

    currentPage: state => state.currentPage,
    pageCounts: state => state.pageCounts,
};


export const getDefaultState = () => ({
    motels: [],
    motel: {},
    currentPage: 1,
    itemPerPage: 20,
    pageCounts: 1,

})

const state = getDefaultState()

export  const actions = {

    async fetchPaging({ commit }, payload) {
      const currentPage = state.currentPage;
      const res = await MotelService.fetchPaging(currentPage);
      if(res.data){
        var data = res.data;
        commit("FETCH_PAGING", data);
      }
    },

    async fetch({ commit }, payload) {
      const id = payload.id;
      const res = await MotelService.fetch(id);
      if(res.data){
        var data = res.data[0];
        commit("FETCH", data);
      }
    },

    reset({commit}){
      commit('RESET')
    }
 }

export  const mutations = {

    FETCH_PAGING(state, data){
      state.motels = data.data;
      state.pageCounts = data.pageCounts
    },

    FETCH(state, motel){
      state.motel = motel;
      if(motel.Users) {
        state.motel.user = motel.Users[0]
        delete motel.Users[0];
      }
    },

    UPDATE_CURRENT_PAGE(state, page){
      state.currentPage = page;
    },

    DESTROY_MOTEL(){
      this.state.motel = {}
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
