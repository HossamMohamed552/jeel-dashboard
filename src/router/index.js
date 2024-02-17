import Vue from "vue";
import Router from "vue-router";
import protectedRoutes from "./protectedRoutes";
import publicRoutes from "./publicRoutes";
import store from "@/store";
// import { handleRouteNavigation } from "./routerGuard";
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
Vue.use(Router);
const router = new Router({
  mode: "history",
  base: process.env.VUE_APP_BASE_URL,
  routes: [
    ...publicRoutes,
    ...protectedRoutes,
    {
      path: "/",
      meta: {
        breadcrumb: "الصفحة الرئيسية",
      },
      redirect: {path: "/dashboard/home"}
    },
    {
      path: "/dashboard",
      meta: {
        breadcrumb: "الصفحة الرئيسية",
      },
      redirect: {
        path: "/dashboard/home",
        meta: {
          breadcrumb: "الرئيسية",
        },
      }
    },
  ],
});
router.beforeEach((to, from, next) => {
  let tokenFound = !!store.getters.token
  if (!["login", "user-verification", "forget-password"].includes(to.name) && !tokenFound) {
    next({name: "login"})
  } else {
    if (to.name === "login" && tokenFound) {
      next({name: "main"});
    } else {
      next();
    }
  }
});
router.afterEach((to, from) => {
  Vue.nextTick(() => {
    document.title = to.meta.breadcrumb || "Jeel dashBoard"
  })
})
export default router;
