export default [
  {
    path: "/dashboard/management-academic-year",
    name: "management-academic-year",
    component: () => import("../../../views/management-academic-year/index.vue"),
    meta: {
      breadcrumb: "إدارة العام الدراسى",
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
      breadcrumb: "تعديل الترم الدراسى",
      preLabel: "إدارة العام الدراسى",
      preLink: "management-academic-year",
    },
  },
  {
    path: "/dashboard/management-academic-year/edit/:id",
    name: "edit-management-academic-year",
    component: () =>
      import("../../../views/management-academic-year/edit-management-academic-year/index.vue"),
    meta: {
      breadcrumb: "تعديل الترم الدراسى",
      preLabel: "إدارة العام الدراسى",
      preLink: "management-academic-year",
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
      preLink: "management-academic-year",
    },
  },
];
