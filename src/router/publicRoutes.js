const publicRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../../views/login/index.vue"),
  },
  {
    path: "/user-verification",
    name: "user-verification",
    component: () => import("../../views/verify/index.vue"),
  },
  {
    path: "/forget-password",
    name: "forget-password",
    component: () => import("../../views/forget-password/index.vue"),
  },
];
export const publicRoutesPaths = publicRoutes.map((route) => route.path);
export default publicRoutes;
