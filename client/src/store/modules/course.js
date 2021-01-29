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

      const res = await CourseService.fetchPaging(query);
      if(res.data){
        commit("FETCH_PAGING", res.data);
      }
    },

    async fetch({ commit }, payload)
    {
      const courseId = payload.id;
      const res = await CourseService.fetch(courseId);
      if(res.data){
        commit("FETCH", res.data);
      }
    },

    async remove({ commit }, payload)
    {
      const course = payload;
      const res = await CourseService.remove(course.id);

      if(res.status === 200)
      {
        commit("REMOVE", course);
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

    FETCH_PAGING(state, data){
      state.courses = data.data;
      state.pageCounts = data.pageCounts
    },

    FETCH(state, course){
      state.course = course;
    },


    REMOVE(state, course)
    {
      var courses = state.courses;
      var index = courses.indexOf(course);
      if (index !== -1) {
          courses.splice(index, 1);
      }
      state.courses = courses;
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
