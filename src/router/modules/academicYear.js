export default [
  {
    path: "/dashboard/management-academic-year",
    name: "management-academic-year",
    component: () => import("../../../views/management-academic-year/index.vue"),
    meta: {
      breadcrumb: "إدارة العام الدراسى",
      breadcrumbEn: "management academic year",
      preLabel: "",
      preLink: "",
    },
  },
  {
    path: "/dashboard/management-academic-year/add",
    name: "add-management-academic-year",
    component: () =>
      import("../../../views/management-academic-year/add-management-academic-year/index.vue"),
    meta: {
      breadcrumb: "تحديد ميعاد ترم الدراسى",
      breadcrumbEn: "Determine the date of the academic semester",
      preLabel: "إدارة العام الدراسى",
      preLabelEn: "management academic year",
      preLink: "/dashboard/management-academic-year",
    },
  },
  {
    path: "/dashboard/management-academic-year/edit/:id",
    name: "edit-management-academic-year",
    component: () =>
      import("../../../views/management-academic-year/edit-management-academic-year/index.vue"),
    meta: {
      breadcrumb: "تعديل الترم الدراسى",
      breadcrumbEn: "edit management academic year",
      preLabel: "إدارة العام الدراسى",
      preLabelEn: "management academic year",
      preLink: "/dashboard/management-academic-year",
    },
  },
  {
    path: "/dashboard/management-academic-year/show/:id",
    name: "show-management-academic-year",
    component: () =>
      import("../../../views/management-academic-year/view-management-academic-year/index.vue"),
    meta: {
      breadcrumb: "تفاصيل الترم الدراسى",
      preLabel: "الاصوات",
      preLink: "/dashboard/management-academic-year",
    },
  },
];
