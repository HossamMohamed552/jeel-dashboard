export default [
  {
    path: "/dashboard/jeel-library",
    name: "jeel-library",
    component: () => import("../../../views/jeel-library/index.vue"),
    meta: {
      breadcrumb: "مكتبة جيل",
      breadcrumbEn: "jeel library",
      preLabel: "",
      preLink: "",
    },
  },
  {
    path: "/dashboard/jeel-library/add",
    name: "add-jeel-library",
    component: () => import("../../../views/jeel-library/add-jeel-library/index.vue"),
    meta: {
      breadcrumb: "إضافة عنصر للمكتبة",
      breadcrumbEn: "add jeel library",
      preLabel: "مكتبة جيل",
      preLabelEn: "jeel library",
      preLink: "/dashboard/jeel-library",
    },
  },
  {
    path: "/dashboard/jeel-library/edit/:id",
    name: "edit-jeel-library",
    component: () => import("../../../views/jeel-library/edit-jeel-library/index.vue"),
    meta: {
      breadcrumb: "تعديل عنصر من المكتبة",
      breadcrumbEn: "edit jeel library",
      preLabel: "مكتبة جيل",
      preLabelEn: "jeel library",
      preLink: "/dashboard/power-up-boxes",
    },
  },
  {
    path: "/dashboard/jeel-library/show/:id",
    name: "show-jeel-library",
    component: () => import("../../../views/jeel-library/view-jeel-library/index.vue"),
    meta: {
      breadcrumb: "تفاصيل عنصر من المكتبة",
      breadcrumbEn: "show jeel library",
      preLabel: "مكتبة جيل",
      preLabelEn: "jeel library",
      preLink: "/dashboard/jeel-library",
    },
  },


]
