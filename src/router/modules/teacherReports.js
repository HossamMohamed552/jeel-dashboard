export default [
  {
    path: "/dashboard/reports/teacher-report/student-performance",
    name: "teacher-students-report",
    component: () => import("../../../views/reports/teacher-report/students-report/index.vue"),
    meta: {
      breadcrumb: "تقرير أداء الطالب",
      breadcrumbEn: "Student performance report",
      preLabel: "التقارير",
      preLabelEn: "reports",
      preLink: "/dashboard/reports",
    },
  },
  {
    path: "/dashboard/reports/teacher-report/class-performance",
    name: "teacher-classes-report",
    component: () => import("../../../views/reports/teacher-report/classes-report/index.vue"),
    meta: {
      breadcrumb: "تقرير أداء الفصل",
      breadcrumbEn: "Class performance report",
      preLabel: "التقارير",
      preLabelEn: "reports",
      preLink: "/dashboard/reports",
    },
  },
];
