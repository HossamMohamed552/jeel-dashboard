export default [
  {
    path: "/dashboard/reports/school-admin/general-report",
    name: "general-report",
    component:()=> import("../../../views/reports/school-admin/general-report/index.vue"),
    meta: {
      breadcrumb: "تقرير عام المنصة",
      breadcrumbEn: "Platform general report",
      preLabel: "التقارير",
      preLabelEn: "reports",
      preLink: "/dashboard/reports",
    },
  },
  {
    path: "/dashboard/reports/school-admin/subscriptions",
    name: "subscription-report",
    component:()=> import("../../../views/reports/school-admin/subscription-report/index.vue"),
    meta: {
      breadcrumb: "الاشتراكات",
      breadcrumbEn: "subscriptions",
      preLabel: "التقارير",
      preLabelEn: "reports",
      preLink: "/dashboard/reports",
    },
  },
  {
    path: "/dashboard/reports/school-admin/missions",
    name: "missions-report",
    component:()=> import("../../../views/reports/school-admin/missions-report/index.vue"),
    meta: {
      breadcrumb: "المهام",
      breadcrumbEn: "missions",
      preLabel: "التقارير",
      preLabelEn: "reports",
      preLink: "/dashboard/reports",
    },
  },
  {
    path: "/dashboard/reports/school-admin/competitions",
    name: "competition-report",
    component:()=> import("../../../views/reports/school-admin/competition-report/index.vue"),
    meta: {
      breadcrumb: "المسابقات",
      breadcrumbEn: "competitions",
      preLabel: "التقارير",
      preLabelEn: "reports",
      preLink: "/dashboard/reports",
    },
  },
  {
    path: "/dashboard/reports/school-admin/student-performance",
    name: "competition-report",
    component:()=> import("../../../views/reports/school-admin/students-report/index.vue"),
    meta: {
      breadcrumb: "تقرير أداء الطالب",
      breadcrumbEn: "Student performance report",
      preLabel: "التقارير",
      preLabelEn: "reports",
      preLink: "/dashboard/reports",
    },
  },
  {
    path: "/dashboard/reports/school-admin/class-performance",
    name: "competition-report",
    component:()=> import("../../../views/reports/school-admin/classes-report/index.vue"),
    meta: {
      breadcrumb: "تقرير أداء الفصل",
      breadcrumbEn: "Class performance report",
      preLabel: "التقارير",
      preLabelEn: "reports",
      preLink: "/dashboard/reports",
    },
  },
]
