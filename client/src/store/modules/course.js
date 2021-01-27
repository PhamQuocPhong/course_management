import CourseService from '@/services/course'

export  const getters = {
    courses: state => state.courses,
    course: state => state.course,
    currentPage: state => state.currentPage,
    pageCounts: state => state.pageCounts,

};

export const getDefaultState = () => ({
    courses: [],
    course: {},
    currentPage: 1,
    itemPerPage: 20,
    pageCounts: 1,

})

const state = getDefaultState()

export  const actions = {

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
      const courseId = payload.id;
      const res = await CourseService.fetch(courseId);
      if(res.data){
        commit("FETCH", res.data);
      }
    }

    updateCurrentPage({commit}, payload)
    {
      commit("UPDATE_CURRENT_PAGE", payload.currentPage);
    },

    updateRatings({commit}, payload){
      commit("UPDATE_RATINGS", payload);
    },

    reset({commit}){
      commit('RESET')
    }
 }

export  const mutations = {

    FETCH_PAGING(state, courses){
      state.courses = courses;
      state.pageCounts = data.pageCounts
    },

    FETCH(state, course){
      state.course = course;
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
