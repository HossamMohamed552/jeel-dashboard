const publicRoutes = [
  {
    path: "/LoginAdmin",
    name: "login",
    meta:{
      breadcrumb: "تسجيل الدخول"
    },
    component: () => import("../../views/login/index.vue"),
  },
  {
    path: "/user-verification",
    name: "user-verification",
    meta:{
      breadcrumb: "تحقيق الهوية"
    },
    component: () => import("../../views/verify/index.vue"),
  },
  {
    path: "/forget-password",
    name: "forget-password",
    meta:{
      breadcrumb: "تغير كلمه المرور"
    },
    component: () => import("../../views/forget-password/index.vue"),
  },
];
export const publicRoutesPaths = publicRoutes.map((route) => route.path);
export default publicRoutes;
