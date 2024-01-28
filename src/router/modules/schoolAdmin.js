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
]
