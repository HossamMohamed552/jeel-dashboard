export default [
  {
    path: "/dashboard/achievements",
    name: "achievements",
    component: () => import("../../../views/achievements/index.vue"),
    meta: {
      breadcrumb: "الإنجازات",
      breadcrumbEn: "achievements",
      preLabel: "",
      preLink: "",
    },
  },
  {
    path: "/dashboard/achievement/add",
    name: "add-achievement",
    component: () => import("../../../views/achievements/add-achievement/index.vue"),
    meta: {
      breadcrumb: "إضافة إنجاز",
      breadcrumbEn: "add achievement",
      preLabel: "الإنجازات",
      preLabelEn: "achievements",
      preLink: "/dashboard/achievements",
    },
  },
  {
    path: "/dashboard/achievement/show/:id",
    name: "show-achievement",
    component: () => import("../../../views/achievements/view-achievement/index.vue"),
    meta: {
      breadcrumb: "تفاصيل الإنجاز",
      breadcrumbEn: "show achievement",
      preLabel: "الإنجازات",
      preLabelEn: "achievements",
      preLink: "/dashboard/achievements",
    },
  },
  {
    path: "/dashboard/achievement/edit/:id",
    name: "edit-achievement",
    component: () => import("../../../views/achievements/edit-achievement/index.vue"),
    meta: {
      breadcrumb: "تعديل الإنجاز",
      breadcrumbEn: "edit achievement",
      preLabel: "الإنجازات",
      preLabelEn: "achievements",
      preLink: "/dashboard/achievements",
    },
  },
]
