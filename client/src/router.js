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
import Detail from '@/views/web/pages/home/Detail';


// ADMIN 
import AuthAdminLayout from "@/views/admin/layouts/AuthLayout";
import MainAdminLayout from "@/views/admin/layouts/MainLayout";


import Category from "@/views/admin/category/Category";
import CategoryIndex from "@/views/admin/category/Index";
import CategoryCreate from "@/views/admin/category/Create";
import CategoryEdit from "@/views/admin/category/Edit";

import store from "./store/index";

Vue.use(VueRouter);

const routes = [

  {
    path: "/admin",
    component: AdminLayout,
    children: [
      {
        path: "login",
        component: AdminLogin,
        name: "adminLogin",
      },
      {
        path: "register",
        component: AdminRegister,
        name: "adminRegister"
      }

    ]
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
    path: "/chat",
    component: ChatLayout,
    name: "chat",
    children: [
      {
        path: "message",
        component: Message,
        name: "message"
      }
    ]
  },

  // {
  //   path: "/",
  //   component: Home,
  // },

  {
    path: "/",
    component: MainLayout,
    children: [
      {

        path: "",
        component: Home,
        name: "home",
      },
      {
        path: "motels",
        component: Motel, 

        children: [
          {
            path: "/",
            component: MotelIndex,
            name: "motelIndex",
          },
          {
            path: ":id",
            component: MotelDetail,
            name: "motelDetail"
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

  // { path: "*", component: NotFoundPage }
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
