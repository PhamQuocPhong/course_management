export  const getters = {
    progressHeader: state => state.progressHeader,
    progressLoading: state => state.progressLoading,
    progressInput: state => state.progressInput,
    progressSelect: state => state.progressSelect,

    currentPageUser: state => state.pagination.currentPageUser,
    currentPagePost: state => state.pagination.currentPagePost
  };


export const getDefaultState = () => ({
    progressHeader: false,
    progressLoading: false,
    progressInput: false,
    progressSelect: false,

    pagination: {
      currentPageUser: 1,
      currentPagePost: 1,
    },
})

const state = getDefaultState()

export  const actions = {

    actionProgressHeader({ commit }, data) {
      commit("ACTION_PROGRESS_HEADER", data);
    },

    progressLoading({ commit }, data) {
      commit("ACTION_PROGRESS_LOADING", data);
    },

    actionProgressInput({commit}, data){
      commit("ACTION_PROGRESS_INPUT", data);
    },

    actionProgressSelect({commit}, data){
      commit("ACTION_PROGRESS_SELECT", data);
    },


    actionCurrentPageUser({commit}, data){
      commit('ACTION_CURRENT_PAGE_USER', data);
    },

    actionCurrentPagePost({commit}, data){
      commit('ACTION_CURRENT_PAGE_POST', data);
    },

    reset({commit}){
      commit('RESET')
    }
 }

export  const mutations = {
    ACTION_PROGRESS_HEADER(state, payload) {
      var option = payload.option;
      if (option === "show") {
        state.progressHeader = true;
        return;
      }
      state.progressHeader = false;
    },

    ACTION_PROGRESS_LOADING(state, payload) {
      var option = payload.option;
      if (option === "show") {
        state.progressLoading = true;
        return;
      }
      state.progressLoading = false;
    },

    ACTION_PROGRESS_INPUT(state, payload) {
      var option = payload.option;
      if (option === "show") {
        state.progressInput = true;
        return;
      }
      state.progressInput = false;
    },

    ACTION_PROGRESS_SELECT(state, payload){
      var option = payload.option;
      if (option === "show") {
        state.progressSelect = true;
        return;
      }
      state.progressSelect = false;
    },

    ACTION_CURRENT_PAGE_USER(state, payload){
      state.pagination.currentPageUser = payload.currentPage;
    },

    ACTION_CURRENT_PAGE_POST(state, payload){
      state.pagination.currentPagePost = payload.currentPage;
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
