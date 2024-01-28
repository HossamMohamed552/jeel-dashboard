export default [
  {
    path: "/dashboard/jeel-badge",
    name: "jeel-badge",
    component: () => import("../../../views/badge/index.vue"),
    meta: {
      breadcrumb: "شارات جيل",
      preLabel: "",
      preLink: "",
    },
  },
  {
    path: "/dashboard/jeel-badge/add",
    name: "add-badge",
    component: () => import("../../../views/badge/add-badge/index.vue"),
    meta: {
      breadcrumb: "إضافة شارة جيل",
      preLabel: "شارات جيل",
      preLink: "/dashboard/jeel-badge",
    },
  },
  {
    path: "/dashboard/jeel-badge/edit/:id",
    name: "edit-badge",
    component: () => import("../../../views/badge/edit-badge/index.vue"),
    meta: {
      breadcrumb: "تعديل شارة جيل",
      preLabel: "شارات جيل",
      preLink: "/dashboard/jeel-badge",
    },
  },
  {
    path: "/dashboard/jeel-badge/show/:id",
    name: "show-badge",
    component: () => import("../../../views/badge/view-badge/index.vue"),
    meta: {
      breadcrumb: "تفاصيل شارة جيل",
      preLabel: "شارات جيل",
      preLink: "/dashboard/jeel-badge",
    },
  },


]
