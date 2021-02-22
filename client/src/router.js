import Vue from "vue";
import VueRouter from "vue-router";
import AuthService from "./services/auth";

import Login from "@/views/web/pages/auth/Login";
import Register from "@/views/web/pages/auth/Register";
import Logout from "@/views/web/pages/auth/Logout";



import AuthLayout from "@/views/web/layouts/AuthLayout";
import MainLayout from "@/views/web/layouts/MainLayout";


import NotFoundPage from "@/views/web/pages/errors/404.vue";
import ForbiddenPage from "@/views/web/pages/errors/403.vue";

// pages
import Home from "@/views/web/pages/home/Index.vue";

import Course from "@/views/web/pages/course/Course.vue";
import CourseIndex from "@/views/web/pages/course/Index.vue";
import CourseSearch from "@/views/web/pages/course/Search.vue";
import CourseDetail from "@/views/web/pages/course/Detail.vue";

import StudentProfile from "@/views/web/pages/student/Profile.vue";
import StudentProfileInfo from "@/views/web/pages/student/Info.vue";
import StudentProfileMyCourse from "@/views/web/pages/student/MyCourse.vue";
import StudentProfileFavoriteCourse from "@/views/web/pages/student/FavoriteCourse.vue";
import StudentProfileCourseDetail from "@/views/web/pages/student/CourseDetail.vue";

import TeacherProfile from "@/views/web/pages/teacher/Profile.vue";
import TeacherProfileInfo from "@/views/web/pages/teacher/Info.vue";
import TeacherProfileCreateCourse  from "@/views/web/pages/teacher/CreateCourse.vue";
import TeacherProfileCourse from "@/views/web/pages/teacher/MyCourse.vue";
import TeacherProfileCourseDetail from "@/views/web/pages/teacher/CourseDetail.vue";



/* ---- ADMIN --- */
import AuthAdminLayout from "@/views/admin/layouts/AuthLayout";
import MainAdminLayout from "@/views/admin/layouts/MainLayout";

import AdminLogin from "@/views/admin/pages/auth/Login";


import AdminCategory from "@/views/admin/pages/category/Category";
import AdminCategoryIndex from "@/views/admin/pages/category/Index";
import AdminCategoryCreate from "@/views/admin/pages/category/Create";
import AdminCategoryEdit from "@/views/admin/pages/category/Edit";

import AdminUser from "@/views/admin/pages/user/User";
import AdminUserIndex from "@/views/admin/pages/user/Index";
import AdminUserCreate from "@/views/admin/pages/user/Create";
import AdminUserEdit from "@/views/admin/pages/user/Edit";

import AdminCourse from "@/views/admin/pages/course/Course";
import AdminCourseIndex from "@/views/admin/pages/course/Index";

import store from "./store/index";

Vue.use(VueRouter);

const routes = [

  {
    path: "/admin",
    component: AuthAdminLayout,
    children: [
      {
        path: "login",
        component: AdminLogin,
        name: "adminLogin",
      },
    ]
  },


  {
    path: "/admin",
    component: MainAdminLayout,
    children: [
      {
        path: "categories",
        component: AdminCategory,
        children: [
          {
            path: "/",
            component: AdminCategoryIndex,
            name: "adminCategoryIndex"
          },

          
          {
            path: "create",
            component: AdminCategoryCreate,
            name: "adminCategoryCreate"
          },

          {
            path: ":id",
            component: AdminCategoryEdit,
            name: "adminCategoryEdit"
          },
        ]
      },

      {
        path: "courses",
        component: AdminCourse,
        children: [
          {
            path: "/",
            component: AdminCourseIndex,
            name: "adminCourseIndex"
          },

        ]
      },

      {
        path: "users",
        component: AdminUser,
        children: [
          {
            path: "/",
            component: AdminUserIndex,
            name: "adminCategoryIndex"
          },

          
          {
            path: "create",
            component: AdminUserCreate,
            name: "adminUserCreate"
          },

          {
            path: ":id",
            component: AdminUserEdit,
            name: "adminUserEdit"
          },
        ]
      },

    ],
  },

  {
        path: "",
        component: Home,
  },

  {
    path: "/",
    component: AuthLayout,
    name: "auth",
    children: [

      {
        path: "login",
        component: Login,
        name: "login"
      },
      {
        path: "register",
        component: Register,
        name: "register"
      },
      {
        path: "logout",
        component: Logout,
        name: "logout"
      }
    ]
  },

  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "courses",
        component: Course,

        children: [
          {
            path: "category/:categoryId",
            component: CourseIndex,
            name: "courseIndex",
          },

           {
            path: "search/",
            component: CourseSearch,
            name: "courseSearch",
          },

          {
            path: ":id",
            component: CourseDetail,
            name: "courseDetail"
          }
        ]
      },

      {
        path: "student/profile",
        component: StudentProfile,
        meta: {
          requireAuth: true,
          roleId: 3 // student
        },
        children: [
          {
            path: "info",
            component: StudentProfileInfo,
            name: "studentProfile",
          },
          {
            path: "my_courses",
            component: StudentProfileMyCourse,
            name: "studentCourse"
          },
          {
            path: "favorite_courses",
            component: StudentProfileFavoriteCourse,
            name: "studentFavoriteCourse"
          },
           {
            path: "my_courses/:id",
            component: StudentProfileCourseDetail,
            name: "studentProfileCourseDetail"
          }
        ]
      },

      {
        path: "teacher/profile",
        component: TeacherProfile,
         meta: {
          requireAuth: true,
          roleId: 2 // teacher
        },
        children: [
          {
            path: "info",
            component: TeacherProfileInfo,
            name: "teacherProfileInfo",
          },
          {
            path: "create_course",
            component: TeacherProfileCreateCourse,
            name: "teacherProfileCreateCourse",
          },
          {
            path: "my_courses",
            component: TeacherProfileCourse,
            name: "teacherProfileCourse"
          },
          {
            path: "my_courses/:id",
            component: TeacherProfileCourseDetail,
            name: "teacherProfileCourseDetail"
          }
        ]
      }
    ]
  },

  {
    path: "/forbidden",
    component: ForbiddenPage,
    name: "forbidden"
  },

  { path: "*", component: NotFoundPage }
];

const router = new VueRouter({
  routes,
  mode: "history",
  linkActiveClass: "active",
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

import CookieService from "@/services/cookie";

router.beforeEach((to, from, next) => {

  const accessToken = CookieService.get("accessToken");
  const userInfo = CookieService.get("userInfo");

  if (to.matched.some(m => m.meta.requireAuth)) {
    if (to.name !== "login" && !accessToken) {
      next({ name: "login" });
    } else {
        
      if(to.matched.some(m => m.meta.roleId === userInfo.roleId))
      {
          next();
      }else{
        next({ name: "forbidden"})
      }

      next();
    }
    return next();
  }
  return next();
});

export default router;
