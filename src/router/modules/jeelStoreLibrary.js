export default [
  {
    path: "/dashboard/jeel-store-library",
    name: "jeel-store-library",
    component: () => import("../../../views/jeel-store-library/index.vue"),
    meta: {
      breadcrumb: "مكتبة الشراء",
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
      preLabel: "مكتبة الشراء",
      preLink: "/dashboard/jeel-store-library",
    },
  },
  {
    path: "/dashboard/jeel-store-library/edit/:id",
    name: "edit-jeel-store-games",
    component: () => import("../../../views/jeel-store-library/edit-jeel-store-library/index.vue"),
    meta: {
      breadcrumb: "تعديل المحتوى",
      preLabel: "مكتبة الشراء",
      preLink: "/dashboard/jeel-store-library",
    },
  },
  {
    path: "/dashboard/jeel-store-library/show/:id",
    name: "show-jeel-store-games",
    component: () => import("../../../views/jeel-store-library/view-jeel-store-library/index.vue"),
    meta: {
      breadcrumb: "تفاصيل المحتوى",
      preLabel: "مكتبة الشراء",
      preLink: "/dashboard/jeel-store-library",
    },
  },


]
