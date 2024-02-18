export default [
  {
    path: "/dashboard/seasonal-mission",
    name: "seasonal-mission",
    component: () => import("../../../views/seasonal-mission/index.vue"),
    meta: {
      breadcrumb: "المهام الموسيمية",
    },
  },
  {
    path: "/dashboard/seasonal-mission/add",
    name: "add-seasonal-mission",
    component: () => import("../../../views/seasonal-mission/add-seasonal-mission/index.vue"),
    meta: {
      breadcrumb: "إضافة مهمة موسمية",
      preLabel: "المهام الموسيمية",
      preLink: "/dashboard/seasonal-mission",
    },
  },
  {
    path: "/dashboard/seasonal-mission/edit/:id",
    name: "edit-seasonal-mission",
    component: () => import("../../../views/seasonal-mission/edit-seasonal-mission/index.vue"),
    meta: {
      breadcrumb: "تعديل المهمة الموسمية",
      preLabel: "المهام الموسيمية",
      preLink: "/dashboard/seasonal-mission",
    },
  },
  {
    path: "/dashboard/seasonal-mission/show/:id",
    name: "view-seasonal-mission",
    component: () => import("../../../views/seasonal-mission/view-seasonal-mission/index.vue"),
    meta: {
      breadcrumb: "تفاصيل المهمة الموسمية",
      preLabel: "المهام الموسيمية",
      preLink: "/dashboard/seasonal-mission",
    },
  },
];
