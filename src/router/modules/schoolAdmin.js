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
    path: "/dashboard/add-user-school-admin",
    name: "add-user-all-school-admin",
    component: () => import("../../../views/user-all-school-admin/add-user-school-admin/index.vue"),
    meta: {
      breadcrumb: "إضافة مستخدم",
      preLabel: "المستخدمين",
      preLink: "/dashboard/all-school-users",
    },
  },
  {
    path: "/dashboard/edit-user-school-admin/:id",
    name: "edit-user-all-school-admin",
    component: () =>
      import("../../../views/user-all-school-admin/edit-user-school-admin/index.vue"),
    meta: {
      breadcrumb: "تعديل مستخدم",
      preLabel: "المستخدمين",
      preLink: "/dashboard/all-school-users",
    },
  },
  {
    path: "/dashboard/user-school-admin/change-password/:id",
    name: "change-password-user-school-admin",
    component: () =>
      import("../../../views/user-all-school-admin/change-password-user-school-admin/index.vue"),
    meta: {
      breadcrumb: "تغيير كلمة سر المستخدم",
      preLabel: "المستخدمين",
      preLink: "/dashboard/all-school-users",
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
    path: "/dashboard/school-admin-class/show/:id",
    name: "edit-school-admin-classes",
    component: () => import("../../../views/school-admin-classes/view-class/index.vue"),
    meta: {
      breadcrumb: "تفاصيل الفصل",
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
    path: "/dashboard/view-supervisor/:id",
    name: "view-supervisors-users",
    component: () => import("../../../views/user-supervisor/view-supervisor/index.vue"),
    meta: {
      breadcrumb: "تفاصيل المستخدم",
      preLabel: "إدارة المشرفين",
      preLink: "/dashboard/supervisors-users",
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
  {
    path: "/dashboard/student-enrollment/:id",
    name: "add-students-enrollment",
    component: () => import("../../../views/user-student/enrollment/index.vue"),
    meta: {
      breadcrumb: "الصلاحيات",
      preLabel: "إدارة الطلاب",
      preLink: "/dashboard/students-users",
    },
  },
  //view users
  {
    path: "/dashboard/user-school-admin/:id",
    name: "view-school-admins-users",
    component: () => import("../../../views/user-school-admin/view-school-admin/index.vue"),
    meta: {
      breadcrumb: "تفاصيل  مدير المدرسة",
      preLabel: "إدارة مديرى المدرسة",
      preLink: "/dashboard/school-admins-users",
    },
  },
  {
    path: "/dashboard/user-supervisor/:id",
    name: "view-supervisor-users",
    component: () => import("../../../views/user-supervisor/view-supervisor/index.vue"),
    meta: {
      breadcrumb: "تفاصيل  مشرف المدرسة",
      preLabel: "إدارة المشرفين",
      preLink: "/dashboard/supervisors-users",
    },
  },
  {
    path: "/dashboard/user-teacher/:id",
    name: "view-teacher-users",
    component: () => import("../../../views/user-teacher/view-teacher/index.vue"),
    meta: {
      breadcrumb: "تفاصيل  مدرس المدرسة",
      preLabel: "إدارة المدرسين",
      preLink: "/dashboard/teacher-users",
    },
  },
  {
    path: "/dashboard/user-student/:id",
    name: "view-student-users",
    component: () => import("../../../views/user-student/view-student/index.vue"),
    meta: {
      breadcrumb: "تفاصيل  الطالب",
      preLabel: "إدارة الطلاب",
      preLink: "/dashboard/students-users",
    },
  },
  {
    path: "/dashboard/user-all-school/:id",
    name: "view-school-users",
    component: () =>
      import("../../../views/user-all-school-admin/view-users-school-admin/index.vue"),
    meta: {
      breadcrumb: "تفاصيل  الطالب",
      preLabel: "إدارة الطلاب",
      preLink: "/dashboard/students-users",
    },
  },
];
