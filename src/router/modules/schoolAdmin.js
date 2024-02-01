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
    path: "/dashboard/school-admin-classes",
    name: "school-admin-classes",
    component: () => import("../../../views/school-admin-classes/index.vue"),
    meta: {
      breadcrumb: "الفصول",
      preLabel: "",
      preLink: "",
    },
  },
  {
    path: "/dashboard/school-admin-classes/add",
    name: "add-school-admin-classes",
    component: () => import("../../../views/school-admin-classes/add-class/index.vue"),
    meta: {
      breadcrumb: "إضافة فصل جديد",
      preLabel: "الفصول",
      preLink: "/dashboard/school-admin-classes",
    },
  },
  {
    path: "/dashboard/school-admin-class/edit/:id",
    name: "edit-school-admin-classes",
    component: () => import("../../../views/school-admin-classes/edit-class/index.vue"),
    meta: {
      breadcrumb: "تعديل الفصل",
      preLabel: "الفصول",
      preLink: "/dashboard/school-admin-classes",
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
    path: "/dashboard/user-school-admin-enrollment/:id",
    name: "user-school-admin-enrollment",
    component: () => import("../../../views/user-school-admin/enrollment/index.vue"),
    meta: {
      breadcrumb: "الصلاحيات",
      preLabel: "إدارة مديرى المدرسة",
      preLink: "/dashboard/school-admins-users",
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
    path: "/dashboard/supervisor-enrollment/:id",
    name: "supervisors-users",
    component: () => import("../../../views/user-supervisor/enrollment/index.vue"),
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
    path: "/dashboard/teacher-enrollment/:id",
    name: "teachers-users",
    component: () => import("../../../views/user-teacher/enrollment/index.vue"),
    meta: {
      breadcrumb: "الصلاحيات",
      preLabel: "إدارة المدرسين",
      preLink: "/dashboard/teachers-users",
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
