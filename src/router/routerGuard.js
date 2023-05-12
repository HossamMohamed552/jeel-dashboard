import { publicRoutesPaths } from "./publicRoutes";
import store from "@/store";

console.log(store.getters.token)
// export const handleRouteNavigation = (to, from, next) => {
//   if (publicRoutesPaths.includes(to.path)) {
//     (!store.getters.token) ? next() : next({ name: "login" });
//   }
//
//   if (store.getters.token) {
//     return next()
//   }else {
//     store.dispatch("removeUser");
//     next({ name: "login" });
//   }
//
// };
