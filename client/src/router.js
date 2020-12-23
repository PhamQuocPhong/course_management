import Vue from "vue";
import VueRouter from "vue-router";
import AuthService from "./services/auth";

import Login from "./views/pages/auth/Login";
import Register from "./views/pages/auth/Register";
import Logout from "./views/pages/auth/Logout";

import AuthLayout from "./views/layouts/AuthLayout";
import MainLayout from "./views/layouts/MainLayout";

import ChatLayout from './views/layouts/ChatLayout';

import Message from "./views/pages/chat/Message";

import NotFoundPage from "./views/pages/errors/404.vue";
import ForbiddenPage from "./views/pages/errors/403.vue";

// pages
import Home from "./views/pages/home/Index.vue";
import Detail from './views/pages/home/Detail';

import Motel from "./views/pages/motel/Motel.vue";
import MotelIndex from "./views/pages/motel/Index.vue";
import MotelDetail from "./views/pages/motel/Detail.vue";

import store from "./store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/auth",
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
