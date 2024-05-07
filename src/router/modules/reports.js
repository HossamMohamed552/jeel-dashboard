export default [
  {
    path: "/dashboard/reports",
    name: "reports",
    component:()=> import("../../../views/reports/index.vue"),
    meta: {
      breadcrumb: "التقارير",
      breadcrumbEn: "reports",
    },
  },
  {
    path: "/dashboard/reports/general-report",
    name: "general-report",
    component:()=> import("../../../views/reports/general-report/index.vue"),
    meta: {
      breadcrumb: "تقرير عام المنصة",
      breadcrumbEn: "Platform general report",
      preLabel: "التقارير",
      preLabelEn: "reports",
      preLink: "/dashboard/reports",
    },
  },
  {
    path: "/dashboard/reports/subscriptions",
    name: "subscription-report",
    component:()=> import("../../../views/reports/subscription-report/index.vue"),
    meta: {
      breadcrumb: "الإشتراكات",
      breadcrumbEn: "subscriptions",
      preLabel: "التقارير",
      preLabelEn: "reports",
      preLink: "/dashboard/reports",
    },
  },
  {
    path: "/dashboard/reports/missions",
    name: "missions-report",
    component:()=> import("../../../views/reports/missions-report/index.vue"),
    meta: {
      breadcrumb: "المهام",
      breadcrumbEn: "missions",
      preLabel: "التقارير",
      preLabelEn: "reports",
      preLink: "/dashboard/reports",
    },
  },
]
