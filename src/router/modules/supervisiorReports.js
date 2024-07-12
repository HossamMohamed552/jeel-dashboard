export default [
  {
    path: "/dashboard/reports/supervisor-report/student-performance",
    name: "supervisor-students-report",
    component: () => import("../../../views/reports/supervisor-report/students-report/index.vue"),
    meta: {
      breadcrumb: "تقرير أداء الطالب",
      breadcrumbEn: "Student performance report",
      preLabel: "التقارير",
      preLabelEn: "reports",
      preLink: "/dashboard/reports",
    },
  },
  {
    path: "/dashboard/reports/supervisor-report/class-performance",
    name: "supervisor-classes-report",
    component: () => import("../../../views/reports/supervisor-report/classes-report/index.vue"),
    meta: {
      breadcrumb: "تقرير أداء الفصل",
      breadcrumbEn: "Class performance report",
      preLabel: "التقارير",
      preLabelEn: "reports",
      preLink: "/dashboard/reports",
    },
  },
];
