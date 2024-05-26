export default [
  {
    path: "/dashboard/power-up-boxes",
    name: "power-up-boxes",
    component: () => import("../../../views/power-up-boxes/index.vue"),
    meta: {
      breadcrumb: "صناديق الطاقة",
      breadcrumbEn: "power up boxes",
      preLabel: "",
      preLink: "",
    },
  },
  {
    path: "/dashboard/power-up-boxes/add",
    name: "add-power-up-box",
    component: () => import("../../../views/power-up-boxes/add-power-up-boxes/index.vue"),
    meta: {
      breadcrumb: "إضافة صندوق الطاقة",
      breadcrumbEn: "add power up box",
      preLabel: "صناديق الطاقة",
      preLabelEn: "power up boxes",
      preLink: "/dashboard/power-up-boxes",
    },
  },
  {
    path: "/dashboard/power-up-boxes/edit/:id",
    name: "edit-power-up-box",
    component: () => import("../../../views/power-up-boxes/edit-power-up-box/index.vue"),
    meta: {
      breadcrumb: "تعديل صندوق الطاقة",
      breadcrumbEn: "edit power up box",
      preLabel: "صناديق الطاقة",
      preLabelEn: "power up boxes",
      preLink: "/dashboard/power-up-boxes",
    },
  },
  {
    path: "/dashboard/power-up-boxes/show/:id",
    name: "show-power-up-box",
    component: () => import("../../../views/power-up-boxes/view-power-up-box/index.vue"),
    meta: {
      breadcrumb: "تفاصيل صندوق الطاقة",
      breadcrumbEn: "show power up box",
      preLabel: "صناديق الطاقة",
      preLabelEn: "power up boxes",
      preLink: "/dashboard/power-up-boxes",
    },
  },
]
