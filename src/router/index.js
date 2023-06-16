import Vue from "vue";
import Router from "vue-router";
import protectedRoutes from "./protectedRoutes";
import publicRoutes from "./publicRoutes";
import store from "@/store";
// import { handleRouteNavigation } from "./routerGuard";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    ...publicRoutes,
    ...protectedRoutes,
    {path: '/', redirect: {name: 'main'}},
    {path: '/dashboard', redirect: {path: '/dashboard/home'}}],
});
router.beforeEach((to, from, next) => {
  let tokenFound = !!store.getters.token
  if (to.name !== "login" && !tokenFound) {
    next({name: "login"})
  } else {
    if (to.name === "login" && tokenFound) {
      next({name: "main"})
    }
    next()
  }

});
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
export default router;
