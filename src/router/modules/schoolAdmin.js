export default [
  {
    path: "/dashboard/school-info",
    name: "school-info",
    component: () => import("../../../views/school-info/index.vue"),
    meta: {
      breadcrumb: "بيانات المدرسة",
      preLabel: "",
      preLink: "",
    },
  },
  {
    path: "/dashboard/school-admins-users",
    name: "school-admins-users",
    component: () => import("../../../views/user-school-admin/index.vue"),
    meta: {
      breadcrumb: "إدارة المدرسين",
      preLabel: "",
      preLink: "",
    },
  },
]
