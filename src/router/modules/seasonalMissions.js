export default [
  {
    path: "/dashboard/seasonal-mission",
    name: "seasonal-mission",
    component: () => import("../../../views/seasonal-mission/index.vue"),
    meta: {
      breadcrumb: "المهام الموسمية",
      breadcrumbEn: "seasonal missions",
    },
  },
  {
    path: "/dashboard/seasonal-mission/add",
    name: "add-seasonal-mission",
    component: () => import("../../../views/seasonal-mission/add-seasonal-mission/index.vue"),
    meta: {
      breadcrumb: "إضافة مهمة موسمية",
      breadcrumbEn: "add seasonal mission",
      preLabel: "المهام الموسمية",
      preLabelEn: "seasonal missions",
      preLink: "/dashboard/seasonal-mission",
    },
  },
  {
    path: "/dashboard/seasonal-mission/edit/:id",
    name: "edit-seasonal-mission",
    component: () => import("../../../views/seasonal-mission/edit-seasonal-mission/index.vue"),
    meta: {
      breadcrumb: "تعديل المهمة الموسمية",
      breadcrumbEn: "edit seasonal mission",
      preLabel: "المهام الموسمية",
      preLabelEn: "seasonal missions",
      preLink: "/dashboard/seasonal-mission",
    },
  },
  {
    path: "/dashboard/seasonal-mission/show/:id",
    name: "view-seasonal-mission",
    component: () => import("../../../views/seasonal-mission/view-seasonal-mission/index.vue"),
    meta: {
      breadcrumb: "تفاصيل المهمة الموسمية",
      breadcrumbEn: "show seasonal mission",
      preLabel: "المهام الموسمية",
      preLabelEn: "seasonal missions",
      preLink: "/dashboard/seasonal-mission",
    },
  },
];
