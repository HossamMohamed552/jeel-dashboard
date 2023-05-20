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
        path:"/dashboard/role",
        name:"role",
        component: ()=> import('../../views/role/index.vue')
      },
      {
        path:"/dashboard/role/add",
        name:"add-role",
        component: ()=> import('../../views/role/add-role/index.vue')
      },
      {
        path:"/dashboard/role/show/:id",
        name:"show-role",
        component: ()=> import('../../views/role/view-role/index.vue')
      },
      {
        path:"/dashboard/role/edit/:id",
        name:"edit-role",
        component: ()=> import('../../views/role/edit-role/index.vue')
      },
      {
        path:"/dashboard/users",
        name:"users",
        component: ()=> import('../../views/users/index.vue')
      },
      {
        path:"/dashboard/users/add",
        name:"add-users",
        component: ()=> import('../../views/users/add-user/index.vue')
      },
      {
        path:"/dashboard/country",
        name:"country",
        component: ()=> import('../../views/country/index.vue')
      },
      {
        path:"/dashboard/country/add",
        name:"add-country",
        component: ()=> import('../../views/country/add-country/index.vue')
      },
      {
        path:"/dashboard/country/edit/:id",
        name:"edit-country",
        component: ()=> import('../../views/country/edit-country/index.vue')
      },
      {
        path:"/dashboard/country/show/:id",
        name:"show-country",
        component: ()=> import('../../views/country/view-country/index.vue')
      },
      {
        path:"/dashboard/school-group",
        name:"school-group",
        component: ()=> import('../../views/school-group/index.vue')
      },
      {
        path:"/dashboard/school-group/add",
        name:"add-school-group",
        component: ()=> import('../../views/school-group/add-school-group/index.vue')
      },
      {
        path:"/dashboard/school-group/edit/:id",
        name:"edit-school-group",
        component: ()=> import('../../views/school-group/edit-school-group/index.vue')
      },
      {
        path:"/dashboard/school-group/show/:id",
        name:"show-school-group",
        component: ()=> import('../../views/school-group/view-school-group/index.vue')
      },
      {
        path:"/dashboard/schools",
        name:"schools",
        component: ()=> import('../../views/schools/index.vue')
      },
      {
        path:"/dashboard/schools/add",
        name:"add-schools",
        component: ()=> import('../../views/schools/add-schools/index.vue')
      },
      {
        path:"/dashboard/levels",
        name:"levels",
        component: ()=> import('../../views/levels/index.vue')
      },
      {
        path:"/dashboard/levels/add",
        name:"add-levels",
        component: ()=> import('../../views/levels/add-level/index.vue')
      },
      {
        path:"/dashboard/levels/edit/:id",
        name:"edit-levels",
        component: ()=> import('../../views/levels/edit-level/index.vue')
      },
      {
        path:"/dashboard/levels/show/:id",
        name:"show-levels",
        component: ()=> import('../../views/levels/view-level/index.vue')
      },
      {
        path:"/dashboard/terms",
        name:"terms",
        component: ()=> import('../../views/terms/index.vue')
      },
      {
        path:"/dashboard/terms/add",
        name:"add-terms",
        component: ()=> import('../../views/terms/add-terms/index.vue')
      },
      {
        path:"/dashboard/terms/edit/:id",
        name:"edit-terms",
        component: ()=> import('../../views/terms/edit-terms/index.vue')
      },
      {
        path:"/dashboard/terms/show/:id",
        name:"show-terms",
        component: ()=> import('../../views/terms/view-terms/index.vue')
      },
      {
        path:"/dashboard/video",
        name:"videos",
        component: ()=> import('../../views/videos/index.vue')
      },
      {
        path:"/dashboard/videos/add",
        name:"add-videos",
        component: ()=> import('../../views/videos/add-video/index.vue')
      },
      {
        path:"/dashboard/videos/edit/:id",
        name:"edit-videos",
        component: ()=> import('../../views/videos/edit-video/index.vue')
      },
      {
        path:"/dashboard/videos/show/:id",
        name:"show-video",
        component: ()=> import('../../views/videos/view-video/index.vue')
      },
      {
        path:"/dashboard/path",
        name:"paths",
        component: ()=> import('../../views/paths/index.vue')
      },
      {
        path:"/dashboard/path/add",
        name:"add-path",
        component: ()=> import('../../views/paths/add-path/index.vue')
      },
      {
        path:"/dashboard/path/edit/:id",
        name:"edit-path",
        component: ()=> import('../../views/paths/edit-path/index.vue')
      },
      {
        path:"/dashboard/path/show/:id",
        name:"show-path",
        component: ()=> import('../../views/paths/view-path/index.vue')
      },
      {
        path:"/dashboard/paper-work",
        name:"paper-work",
        component: ()=> import('../../views/paper-work/index.vue')
      },
      {
        path:"/dashboard/paper-work/add",
        name:"add-paper-work",
        component: ()=> import('../../views/paper-work/add-paper-work/index.vue')
      },
      {
        path:"/dashboard/paper-work/edit/:id",
        name:"edit-paper-work",
        component: ()=> import('../../views/paper-work/edit-paper-work/index.vue')
      },
      {
        path:"/dashboard/paper-work/show/:id",
        name:"show-paper-work",
        component: ()=> import('../../views/paper-work/view-paper-work/index.vue')
      }
    ]
  }
];

export default protectedRoutes;
