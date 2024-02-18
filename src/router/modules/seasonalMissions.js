export default [
  {
    path: "/dashboard/seasonal-mission",
    name: "main",
    component: () => import("../../../views/seasonal-mission/index.vue"),
    meta: {
      breadcrumb: "مجموعة المهام المدرسية",
    },
  },
  {
    path: "/dashboard/seasonal-mission/add",
    name: "main",
    component: () => import("../../../views/seasonal-mission/add-seasonal-mission/index.vue"),
    meta: {
      breadcrumb: "إضافة مهمة موسمية",
      preLabel: "مجموعة المهام المدرسية",
      preLink: "/dashboard/seasonal-mission",
    },
  },
  {
    path: "/dashboard/seasonal-mission/edit/:id",
    name: "main",
    component: () => import("../../../views/seasonal-mission/edit-seasonal-mission/index.vue"),
    meta: {
      breadcrumb: "إضافة مهمة موسمية",
      preLabel: "مجموعة المهام المدرسية",
      preLink: "/dashboard/seasonal-mission",
    },
  },
  {
    path: "/dashboard/seasonal-mission/show/:id",
    name: "main",
    component: () => import("../../../views/seasonal-mission/view-seasonal-mission/index.vue"),
    meta: {
      breadcrumb: "إضافة مهمة موسمية",
      preLabel: "مجموعة المهام المدرسية",
      preLink: "/dashboard/seasonal-mission",
    },
  },
];
