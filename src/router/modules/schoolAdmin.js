export default [

  {
    path: "/dashboard/all-school-users",
    name: "user-all-school-admin",
    component: () => import("../../../views/user-all-school-admin/index.vue"),
    meta: {
      breadcrumb: "المستخدمين",
      preLabel: "",
      preLink: "",
    },
  },
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
    path: "/dashboard/school-info-edit",
    name: "school-info-edit",
    component: () => import("../../../views/school-info/school-info-edit/index.vue"),
    meta: {
      breadcrumb: "تعديل بيانات المدرسة",
      preLabel: "بيانات المدرسة",
      preLink: "/dashboard/school-info",
    },
  },
  {
    path: "/dashboard/school-admins-users",
    name: "school-admins-users",
    component: () => import("../../../views/user-school-admin/index.vue"),
    meta: {
      breadcrumb: "إدارة مديرى المدرسة",
      preLabel: "",
      preLink: "",
    },
  },
  {
    path: "/dashboard/supervisors-users",
    name: "supervisors-users",
    component: () => import("../../../views/user-supervisor/index.vue"),
    meta: {
      breadcrumb: "إدارة المشرفين",
      preLabel: "",
      preLink: "",
    },
  },
  {
    path: "/dashboard/teachers-users",
    name: "teachers-users",
    component: () => import("../../../views/user-teacher/index.vue"),
    meta: {
      breadcrumb: "إدارة المدرسين",
      preLabel: "",
      preLink: "",
    },
  },
  {
    path: "/dashboard/students-users",
    name: "students-users",
    component: () => import("../../../views/user-student/index.vue"),
    meta: {
      breadcrumb: "إدارة الطلاب",
      preLabel: "",
      preLink: "",
    },
  },

]
