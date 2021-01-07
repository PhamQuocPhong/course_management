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
      const price = payload.price || null;
      const searchKey = payload.searchKey || null;
      const city = payload.city || null;
      const district = payload.district || null;
      const area = payload.area || null;
      const filterPrice = payload.sort || null;


      const res = await CourseService.fetchPaging(currentPage, searchKey, price, city, district, area, filterPrice);
      if(res.data){
        var data = res.data;
        commit("FETCH_PAGING", data);
      }
    },

    async fetch({ commit }, payload) {
      const id = payload.id;
      const res = await CourseService.fetch(id);
      if(res.data){
        var data = res.data[0];
        commit("FETCH", data);
      }
    },

    async store ({commit}, payload)
    {
      const id = payload.id;
      const res = await CourseService.store(payload);
      
      console.log(res);
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
      if(course.Users) {
        state.course.user = course.Users[0]
        delete course.Users;
      }
      if(course.Ratings) {
        state.course.ratings = course.Ratings
        delete course.Ratings;
      }


    },

    UPDATE_CURRENT_PAGE(state, page){
      state.currentPage = page;
    },

    DESTROY_course(){
      this.state.course = {}
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
