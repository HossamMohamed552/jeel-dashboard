const protectedRoutes = [
  {
    path:"/dashboard",
    name:"dashboard",
    component: () => import('../layouts/dashboard/index.vue'),
    children:[
      {
        path: "/dashboard/home",
        name:"main",
        component: () => import('../../views/home/index.vue')
      },
      {
        path:"/dashboard/users",
        name:"users",
        component: ()=> import('../../views/users/index.vue')
      },
      {
        path:"/dashboard/country",
        name:"country",
        component: ()=> import('../../views/country/index.vue')
      },
      {
        path:"/dashboard/school-group",
        name:"school-group",
        component: ()=> import('../../views/school-group/index.vue')
      },
      {
        path:"/dashboard/schools",
        name:"schools",
        component: ()=> import('../../views/schools/index.vue')
      },
      {
        path:"/dashboard/levels",
        name:"levels",
        component: ()=> import('../../views/levels/index.vue')
      },
      {
        path:"/dashboard/terms",
        name:"terms",
        component: ()=> import('../../views/terms/index.vue')
      }
    ]
  }
];

export default protectedRoutes;
