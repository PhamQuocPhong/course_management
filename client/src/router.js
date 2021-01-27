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
import CourseDetail from "@/views/web/pages/course/Detail.vue";

import StudentProfile from "@/views/web/pages/student/Profile.vue";
import StudentProfileInfo from "@/views/web/pages/student/Info.vue";
import StudentProfileCourse from "@/views/web/pages/student/Course.vue";

import TeacherProfile from "@/views/web/pages/teacher/Profile.vue";
import TeacherProfileInfo from "@/views/web/pages/teacher/Info.vue";
import TeacherProfileCreateCourse  from "@/views/web/pages/teacher/CreateCourse.vue";
import TeacherProfileCourse from "@/views/web/pages/teacher/Course.vue";



/* ---- ADMIN --- */
import AuthAdminLayout from "@/views/admin/layouts/AuthLayout";
import MainAdminLayout from "@/views/admin/layouts/MainLayout";

import AdminLogin from "@/views/admin/pages/auth/Login";


import Category from "@/views/admin/pages/category/Category";
import CategoryIndex from "@/views/admin/pages/category/Index";
import CategoryCreate from "@/views/admin/pages/category/Create";
import CategoryEdit from "@/views/admin/pages/category/Edit";

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
        component: Category,
        name: "adminCategory",
        children: [
          {
            path: "/",
            component: CategoryIndex,
            name: "adminCategoryIndex"
          },

          
          {
            path: "create",
            component: CategoryCreate,
            name: "adminCategoryCreate"
          },

          {
            path: ":id",
            component: CategoryEdit,
            name: "adminCategoryEdit"
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
            path: ":id",
            component: CourseDetail,
            name: "courseDetail"
          }
        ]
      },

      {
        path: "student/profile",
        component: StudentProfile,

        children: [
          {
            path: "info",
            component: StudentProfileInfo,
            name: "studentProfile",
          },
          {
            path: "my_courses",
            component: StudentProfileCourse,
            name: "studentCourse"
          },
          {
            path: "favorite_courses",
            component: StudentProfileCourse,
            name: "studentFavoriteCourse"
          }
        ]
      },

      {
        path: "teacher/profile",
        component: TeacherProfile,

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

router.beforeEach((to, from, next) => {

  if (to.matched.some(m => m.meta.requireAuth)) {
    if (to.name !== "login" && !tokenUser) {

      next({ name: "login" });
    } else {
      next();
    }
    return next();
  }
  return next();
});

export default router;
