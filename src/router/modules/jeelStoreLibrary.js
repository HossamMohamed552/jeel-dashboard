export default [
  {
    path: "/dashboard/jeel-store-library",
    name: "jeel-store-library",
    component: () => import("../../../views/jeel-store-library/index.vue"),
    meta: {
      breadcrumb: "مكتبة الشراء",
      breadcrumbEn: "jeel store library",
      preLabel: "",
      preLink: "",
    },
  },
  {
    path: "/dashboard/jeel-store-library/add",
    name: "add-jeel-store-games",
    component: () => import("../../../views/jeel-store-library/add-jeel-store-library/index.vue"),
    meta: {
      breadcrumb: "إضافة المحتوى",
      breadcrumbEn: "add jeel store games",
      preLabel: "مكتبة الشراء",
      preLabelEn: "jeel store library",
      preLink: "/dashboard/jeel-store-library",
    },
  },
  {
    path: "/dashboard/jeel-store-library/edit/:id",
    name: "edit-jeel-store-games",
    component: () => import("../../../views/jeel-store-library/edit-jeel-store-library/index.vue"),
    meta: {
      breadcrumb: "تعديل المحتوى",
      breadcrumbEn: "edit jeel store games",
      preLabel: "مكتبة الشراء",
      preLabelEn: "jeel store library",
      preLink: "/dashboard/jeel-store-library",
    },
  },
  {
    path: "/dashboard/jeel-store-library/show/:id",
    name: "show-jeel-store-games",
    component: () => import("../../../views/jeel-store-library/view-jeel-store-library/index.vue"),
    meta: {
      breadcrumb: "تفاصيل المحتوى",
      breadcrumbEn: "show jeel store games",
      preLabel: "مكتبة الشراء",
      preLabelEn: "jeel store library",
      preLink: "/dashboard/jeel-store-library",
    },
  },
]
