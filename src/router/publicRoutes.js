const publicRoutes = [
  {
    path:"/login",
    name:"login",
    component: ()=> import("../../views/login/index.vue")
  }
];
export const publicRoutesPaths = publicRoutes.map((route) => route.path);
export default publicRoutes;
