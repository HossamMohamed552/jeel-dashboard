const protectedRoutes = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../layouts/dashboard/index.vue"),
    children: [
      {
        path: "/dashboard/home",
        name: "main",
        component: () => import("../../views/home/index.vue"),
      },
      {
        path: "/dashboard/role",
        name: "role",
        component: () => import("../../views/role/index.vue"),
      },
      {
        path: "/dashboard/role/add",
        name: "add-role",
        component: () => import("../../views/role/add-role/index.vue"),
      },
      {
        path: "/dashboard/role/show/:id",
        name: "show-role",
        component: () => import("../../views/role/view-role/index.vue"),
      },
      {
        path: "/dashboard/role/edit/:id",
        name: "edit-role",
        component: () => import("../../views/role/edit-role/index.vue"),
      },
      {
        path: "/dashboard/users",
        name: "users",
        component: () => import("../../views/users/index.vue"),
      },
      {
        path: "/dashboard/users/add",
        name: "add-users",
        component: () => import("../../views/users/add-user/index.vue"),
      },
      {
        path: "/dashboard/country",
        name: "country",
        component: () => import("../../views/country/index.vue"),
      },
      {
        path: "/dashboard/country/add",
        name: "add-country",
        component: () => import("../../views/country/add-country/index.vue"),
      },
      {
        path: "/dashboard/country/edit/:id",
        name: "edit-country",
        component: () => import("../../views/country/edit-country/index.vue"),
      },
      {
        path: "/dashboard/country/show/:id",
        name: "show-country",
        component: () => import("../../views/country/view-country/index.vue"),
      },
      {
        path: "/dashboard/school-group",
        name: "school-group",
        component: () => import("../../views/school-group/index.vue"),
      },
      {
        path: "/dashboard/school-group/add",
        name: "add-school-group",
        component: () => import("../../views/school-group/add-school-group/index.vue"),
      },
      {
        path: "/dashboard/school-group/edit/:id",
        name: "edit-school-group",
        component: () => import("../../views/school-group/edit-school-group/index.vue"),
      },
      {
        path: "/dashboard/school-group/show/:id",
        name: "show-school-group",
        component: () => import("../../views/school-group/view-school-group/index.vue"),
      },
      {
        path: "/dashboard/schools",
        name: "schools",
        component: () => import("../../views/schools/index.vue"),
      },
      {
        path: "/dashboard/schools/add",
        name: "add-schools",
        component: () => import("../../views/schools/add-schools/index.vue"),
      },
      {
        path: "/dashboard/schools/edit/:id",
        name: "edit-schools",
        component: () => import("../../views/schools/edit-schools/index.vue"),
      },
      {
        path: "/dashboard/schools/show/:id",
        name: "edit-schools",
        component: () => import("../../views/schools/view-schools/index.vue"),
      },
      {
        path: "/dashboard/levels",
        name: "levels",
        component: () => import("../../views/levels/index.vue"),
      },
      {
        path: "/dashboard/levels/add",
        name: "add-levels",
        component: () => import("../../views/levels/add-level/index.vue"),
      },
      {
        path: "/dashboard/levels/edit/:id",
        name: "edit-levels",
        component: () => import("../../views/levels/edit-level/index.vue"),
      },
      {
        path: "/dashboard/levels/show/:id",
        name: "show-levels",
        component: () => import("../../views/levels/view-level/index.vue"),
      },
      {
        path: "/dashboard/terms",
        name: "terms",
        component: () => import("../../views/terms/index.vue"),
      },
      {
        path: "/dashboard/terms/add",
        name: "add-terms",
        component: () => import("../../views/terms/add-terms/index.vue"),
      },
      {
        path: "/dashboard/terms/edit/:id",
        name: "edit-terms",
        component: () => import("../../views/terms/edit-terms/index.vue"),
      },
      {
        path: "/dashboard/terms/show/:id",
        name: "show-terms",
        component: () => import("../../views/terms/view-terms/index.vue"),
      },
      {
        path: "/dashboard/video",
        name: "videos",
        component: () => import("../../views/videos/index.vue"),
      },
      {
        path: "/dashboard/videos/add",
        name: "add-videos",
        component: () => import("../../views/videos/add-video/index.vue"),
      },
      {
        path: "/dashboard/videos/edit/:id",
        name: "edit-videos",
        component: () => import("../../views/videos/edit-video/index.vue"),
      },
      {
        path: "/dashboard/videos/show/:id",
        name: "show-video",
        component: () => import("../../views/videos/view-video/index.vue"),
      },
      {
        path: "/dashboard/path",
        name: "paths",
        component: () => import("../../views/paths/index.vue"),
      },
      {
        path: "/dashboard/path/add",
        name: "add-path",
        component: () => import("../../views/paths/add-path/index.vue"),
      },
      {
        path: "/dashboard/path/edit/:id",
        name: "edit-path",
        component: () => import("../../views/paths/edit-path/index.vue"),
      },
      {
        path: "/dashboard/path/show/:id",
        name: "show-path",
        component: () => import("../../views/paths/view-path/index.vue"),
      },
      {
        path: "/dashboard/paper-work",
        name: "paper-work",
        component: () => import("../../views/paper-work/index.vue"),
      },
      {
        path: "/dashboard/paper-work/add",
        name: "add-paper-work",
        component: () => import("../../views/paper-work/add-paper-work/index.vue"),
      },
      {
        path: "/dashboard/paper-work/edit/:id",
        name: "edit-paper-work",
        component: () => import("../../views/paper-work/edit-paper-work/index.vue"),
      },
      {
        path: "/dashboard/paper-work/show/:id",
        name: "show-paper-work",
        component: () => import("../../views/paper-work/view-paper-work/index.vue"),
      },
      {
        path: "/dashboard/missions",
        name: "missions",
        component: () => import("../../views/missions/index.vue"),
      },
      {
        path: "/dashboard/missions/add",
        name: "add-missions",
        component: () => import("../../views/missions/add-missions/index.vue"),
      },
      {
        path: "/dashboard/missions/edit/:id",
        name: "edit-missions",
        component: () => import("../../views/missions/edit-missions/index.vue"),
      },
      {
        path: "/dashboard/missions/show/:id",
        name: "show-missions",
        component: () => import("../../views/missions/view-missions/index.vue"),
      },
      {
        path: "/dashboard/questions",
        name: "questions",
        component: () => import("../../views/questions/index.vue"),
      },
      {
        path: "/dashboard/questions/add",
        name: "add-questions",
        component: () => import("../../views/questions/add-questions/index.vue"),
      },
      {
        path: "/dashboard/questions/show/:id",
        name: "show-questions",
        component: () => import("../../views/questions/view-questions/index.vue"),
      },
      {
        path: "/dashboard/questions/edit/:id",
        name: "edit-questions",
        component: () => import("../../views/questions/edit-questions/index.vue"),
      },
      {
        path: "/dashboard/practices",
        name: "practices",
        component: () => import("../../views/practices/index.vue"),
      },
      {
        path:"/dashboard/practice/add",
        name:"add-practices",
        component: ()=> import('../../views/practices/add-practices/index.vue')
      },
      {
        path:"/dashboard/practices/edit/:id",
        name:"edit-practices",
        component: ()=> import('../../views/practices/edit-practices/index.vue')
      },
      {
        path:"/dashboard/practices/show/:id",
        name:"show-practices",
        component: ()=> import('../../views/practices/view-practices/index.vue')
      },
      {
        path:"/dashboard/package",
        name:"package",
        component: ()=> import('../../views/package/index.vue')
      {
        path: "/dashboard/package/add",
        name: "add-package",
        component: () => import("../../views/package/add-package/index.vue"),
      },
      {
        path: "/dashboard/package/edit/:id",
        name: "edit-package",
        component: () => import("../../views/package/edit-package/index.vue"),
      },
      {
        path: "/dashboard/package/show/:id",
        name: "show-package",
        component: () => import("../../views/package/view-package/index.vue"),
      },
      {
        path: "/dashboard/school-type",
        name: "school-type",
        component: () => import("../../views/school-type/index.vue"),
      },
      {
        path: "/dashboard/school-type/add",
        name: "add-school-type",
        component: () => import("../../views/school-type/add-school-type/index.vue"),
      },
      {
        path: "/dashboard/school-type/edit/:id",
        name: "edit-school-type",
        component: () => import("../../views/school-type/edit-school-type/index.vue"),
      },
      {
        path: "/dashboard/school-type/show/:id",
        name: "show-school-type",
        component: () => import("../../views/school-type/view-school-type/index.vue"),
      },
      {
        path: "/dashboard/bloom",
        name: "bloom",
        component: () => import("../../views/bloom/index.vue"),
      },
      {
        path: "/dashboard/bloom/add",
        name: "add-bloom",
        component: () => import("../../views/bloom/add-bloom/index.vue"),
      },
      {
        path: "/dashboard/bloom/edit/:id",
        name: "edit-bloom",
        component: () => import("../../views/bloom/edit-bloom/index.vue"),
      },
      {
        path: "/dashboard/bloom/show/:id",
        name: "show-bloom",
        component: () => import("../../views/bloom/view-bloom/index.vue"),
      },
      {
        path: "/dashboard/class/add",
        name: "add-class",
        component: () => import("../../views/class/add-class/index.vue"),
      },
      {
        path: "/dashboard/class/edit/:id",
        name: "edit-class",
        component: () => import("../../views/class/edit-class/index.vue"),
      },
      {
        path: "/dashboard/class/show/:id",
        name: "show-class",
        component: () => import("../../views/class/view-class/index.vue"),
      },
      {
        path: "/dashboard/staff-enroll/add",
        name: "add-staff-enroll",
        component: () => import("../../views/staff-enroll/add-staff-enroll/index.vue"),
      },
      {
        path: "/dashboard/staff-enroll/edit/:id",
        name: "edit-staff-enroll",
        component: () => import("../../views/staff-enroll/edit-staff-enroll/index.vue"),
      },
      {
        path: "/dashboard/staff-enroll/show/:id",
        name: "show-staff-enroll",
        component: () => import("../../views/staff-enroll/view-staff-enroll/index.vue"),
      },
      {
        path: "/dashboard/student-enroll/add",
        name: "add-student-enroll",
        component: () => import("../../views/student-enroll/add-student-enroll/index.vue"),
      },
      {
        path: "/dashboard/student-enroll/edit/:id",
        name: "edit-student-enroll",
        component: () => import("../../views/student-enroll/edit-student-enroll/index.vue"),
      },
      {
        path: "/dashboard/student-enroll/show/:id",
        name: "show-student-enroll",
        component: () => import("../../views/student-enroll/view-student-enroll/index.vue"),
      },
    ],
  },
];

export default protectedRoutes;
