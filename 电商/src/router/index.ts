import { createRouter, createWebHashHistory } from "vue-router";
import useStore from "@/stores";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/center",
      name: "center",
      meta: { isShow: true, isAllow: false },
      component: () => import("../views/Center/index.vue"),
      children: [
        {
          path: "myorder",
          name: "myorder",
          meta: { isAllow: false },
          component: () => import("../views/Center/MyOrder/index.vue"),
        },
        {
          path: "grouporder",
          name: "grouporder",
          meta: { isAllow: false },
          component: () => import("../views/Center/GroupOrder/index.vue"),
        },
        {
          meta: { isAllow: false },
          path: "/center",
          redirect: "/center/myorder",
        },
      ],
    },
    {
      path: "/paysuccess",
      name: "paysuccess",
      meta: { isShow: true, isAllow: false },
      component: () => import("../views/PaySuccess/index.vue"),
    },
    {
      path: "/pay",
      name: "pay",
      meta: { isShow: true, isAllow: false },
      component: () => import("../views/Pay/index.vue"),
    },
    {
      path: "/trade",
      name: "trade",
      meta: { isShow: true, isAllow: false },
      component: () => import("../views/Trade/index.vue"),
    },
    {
      path: "/shopcart",
      name: "shopcart",
      meta: { isShow: true, isAllow: false },
      component: () => import("../views/ShopCart/index.vue"),
    },
    {
      path: "/addcartsuccess",
      name: "addcartsuccess",
      meta: { isShow: true, isAllow: false },
      component: () => import("../views/AddCartSuccess/index.vue"),
    },
    {
      path: "/detail/:skuId",
      name: "detail",
      meta: { isShow: true, isAllow: true },
      component: () => import("../views/Detail/index.vue"),
    },
    {
      path: "/home",
      name: "home",
      meta: { isShow: true, isAllow: true },
      component: () => import("../views/HomeView/index.vue"),
    },
    {
      path: "/search/:keyword?",
      name: "search",
      meta: { isShow: true, isAllow: true },
      component: () => import("../views/SearchView/index.vue"),
    },
    {
      path: "/login",
      name: "login",
      meta: { isShow: false, isAllow: true },
      component: () => import("../views/LoginView/index.vue"),
    },
    {
      path: "/register",
      name: "register",
      meta: { isShow: false, isAllow: true },
      component: () => import("../views/RegisterView/index.vue"),
    },
    { path: "/", redirect: "/home" },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  const store = useStore();
  let token = store.user.token;
  let name = store.user.userInfo.name;
  if (token) {
    if (to.path == "/login") {
      next("/home");
    } else {
      if (name) {
        next();
      } else {
        try {
          await store.user.getUserInfo();
          next();
        } catch (error) {
          await store.user.getLogout();
          next("/login");
        }
      }
    }
  } else {
    let toPath = to.path;
    if (!to.meta.isAllow) {
      next(`/login?redirect=${toPath}`);
    } else {
      next();
    }
  }
});

export default router;
