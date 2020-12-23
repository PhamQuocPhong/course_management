

export default {
  BASE_URL: process.env.VUE_APP_ROOT,

  aspectRatio: {
    TABLE: 16/5,
   
  },
 
  pagination: {
    CURRENT_PAGE: 1,
    ITEMS_PER_PAGE: 25,
    ITEMS_PER_PAGE_LIST: [5, 10, 15],
    PAGE_COUNTS_DEFAULT: 0,
  },

  roles: {
    SUPER_ADMIN: 1,
    ADMIN: 2,
    MEMBER: 3,
    GUEST: 4,
  },

  sort: {
    DESC: "desc",
    ASC: "asc"
  },


};
