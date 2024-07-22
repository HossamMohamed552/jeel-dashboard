export default [
  // users
  {
    path: "/dashboard/all-school-users",
    name: "user-all-school-admin",
    component: () => import("../../../views/user-all-school-admin/index.vue"),
    meta: {
      breadcrumb: "المستخدمين",
      breadcrumbEn: "users",
      preLabel: "",
      preLink: "",
    },
  },
  {
    path: "/dashboard/add-school-user-excel",
    name: "add--school-user-excel",
    component: () => import("../../../views/user-all-school-admin/user-excel/index.vue"),
    meta: {
      breadcrumb: "إضافة مستخدمين عن طريق ملف الإكسيل",
      breadcrumbEn: "Add users via Excel file",
      preLabel: "المستخدمين",
      preLink: "/dashboard/all-school-users",
    },
  },
  {
    path: "/dashboard/add-user-school-admin",
    name: "add-user-all-school-admin",
    component: () => import("../../../views/user-all-school-admin/add-user-school-admin/index.vue"),
    meta: {
      breadcrumb: "إضافة مستخدم",
      breadcrumbEn: "add user",
      preLabel: "المستخدمين",
      preLabelEn: "users",
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
      breadcrumbEn: "edit user",
      preLabel: "المستخدمين",
      preLabelEn: "users",
      preLink: "/dashboard/all-school-users",
    },
  },
  {
    path: "/dashboard/user-all-school/:id",
    name: "view-school-users",
    component: () =>
      import("../../../views/user-all-school-admin/view-users-school-admin/index.vue"),
    meta: {
      breadcrumb: "تفاصيل  المستخدم",
      breadcrumbEn: "view user",
      preLabel: "المستخدمين",
      preLabelEn: "users",
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
      breadcrumbEn: "change password",
      preLabel: "المستخدمين",
      preLabelEn: "users",
      preLink: "/dashboard/all-school-users",
    },
  },
  // school info
  {
    path: "/dashboard/school-info",
    name: "school-info",
    component: () => import("../../../views/school-info/index.vue"),
    meta: {
      breadcrumb: "بيانات المدرسة",
      breadcrumbEn: "school info",
    },
  },
  {
    path: "/dashboard/school-info-edit",
    name: "school-info-edit",
    component: () => import("../../../views/school-info/school-info-edit/index.vue"),
    meta: {
      breadcrumb: "تعديل بيانات المدرسة",
      breadcrumbEn: "edit school info",
      preLabel: "بيانات المدرسة",
      preLabelEn: "school info",
      preLink: "/dashboard/school-info",
    },
  },
  // classes
  {
    path: "/dashboard/school-admin-classes",
    name: "school-admin-classes",
    component: () => import("../../../views/school-admin-classes/index.vue"),
    meta: {
      breadcrumb: "الفصول",
      breadcrumbEn: "classes",
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
      breadcrumbEn: "add class",
      preLabel: "الفصول",
      preLabelEn: "classes",
      preLink: "/dashboard/school-admin-classes",
    },
  },
  {
    path: "/dashboard/school-admin-class/edit/:id",
    name: "edit-school-admin-classes",
    component: () => import("../../../views/school-admin-classes/edit-class/index.vue"),
    meta: {
      breadcrumb: "تعديل الفصل",
      breadcrumbEn: "edit class",
      preLabel: "الفصول",
      preLabelEn: "classes",
      preLink: "/dashboard/school-admin-classes",
    },
  },
  {
    path: "/dashboard/school-admin-class/show/:id",
    name: "view-school-admin-classes",
    component: () => import("../../../views/school-admin-classes/view-class/index.vue"),
    meta: {
      breadcrumb: "تفاصيل الفصل",
      breadcrumbEn: "view class",
      preLabel: "الفصول",
      preLabelEn: "classes",
      preLink: "/dashboard/school-admin-classes",
    },
  },
  {
    path: "/dashboard/school-admin-class/students/:id",
    name: "add-student-classes",
    component: () => import("../../../views/school-admin-classes/students-class/index.vue"),
    meta: {
      breadcrumb: "تفاصيل الفصل",
      breadcrumbEn: "view class",
      preLabel: "الفصول",
      preLabelEn: "classes",
      preLink: "/dashboard/school-admin-classes",
    },
  },
  //school admin users
  {
    path: "/dashboard/school-admins-users",
    name: "school-admins-users",
    component: () => import("../../../views/user-school-admin/index.vue"),
    meta: {
      breadcrumb: "إدارة مديرى المدرسة",
      breadcrumbEn: "school admin users",
      preLabel: "",
      preLink: "",
    },
  },
  {
    path: "/dashboard/user-school-admin/:id",
    name: "view-school-admins-users",
    component: () => import("../../../views/user-school-admin/view-school-admin/index.vue"),
    meta: {
      breadcrumb: "تفاصيل  مدير المدرسة",
      breadcrumbEn: "view school admin user",
      preLabel: "إدارة مديرى المدرسة",
      preLink: "/dashboard/school-admins-users",
    },
  },
  {
    path: "/dashboard/user-school-admin-enrollment/:id",
    name: "user-school-admin-enrollment",
    component: () => import("../../../views/user-school-admin/enrollment/index.vue"),
    meta: {
      breadcrumb: "الصلاحيات",
      breadcrumbEn: "enrollment",
      preLabel: "إدارة مديرى المدرسة",
      preLabelEn: "school admin users",
      preLink: "/dashboard/school-admins-users",
    },
  },
  // supervisor
  {
    path: "/dashboard/supervisors-users",
    name: "supervisors-users",
    component: () => import("../../../views/user-supervisor/index.vue"),
    meta: {
      breadcrumb: "إدارة المشرفين",
      breadcrumbEn: "supervisors management",
    },
  },
  {
    path: "/dashboard/view-supervisor/:id",
    name: "view-supervisors-users",
    component: () => import("../../../views/user-supervisor/view-supervisor/index.vue"),
    meta: {
      breadcrumb: "تفاصيل المستخدم",
      breadcrumbEn: "view supervisor user",
      preLabel: "إدارة المشرفين",
      preLabelEn: "supervisors management",
      preLink: "/dashboard/supervisors-users",
    },
  },
  {
    path: "/dashboard/supervisor-enrollment/:id",
    name: "supervisors-users",
    component: () => import("../../../views/user-supervisor/enrollment/index.vue"),
    meta: {
      breadcrumb: "إدارة المشرفين",
      breadcrumbEn: "supervisor enrollment",
      preLabel: "إدارة المشرفين",
      preLabelEn: "supervisors management",
      preLink: "/dashboard/supervisors-users",
    },
  },
  // teacher
  {
    path: "/dashboard/teachers-users",
    name: "teachers-users",
    component: () => import("../../../views/user-teacher/index.vue"),
    meta: {
      breadcrumb: "إدارة المدرسين",
      breadcrumbEn: "teachers",
    },
  },
  {
    path: "/dashboard/user-teacher/:id",
    name: "view-teacher-users",
    component: () => import("../../../views/user-teacher/view-teacher/index.vue"),
    meta: {
      breadcrumb: "تفاصيل  مدرس المدرسة",
      breadcrumbEn: "view teacher user",
      preLabel: "إدارة المدرسين",
      preLabelEn: "teachers",
      preLink: "/dashboard/teachers-users",
    },
  },
  {
    path: "/dashboard/teacher-enrollment/:id",
    name: "teachers-users",
    component: () => import("../../../views/user-teacher/enrollment/index.vue"),
    meta: {
      breadcrumb: "إضافة فصل دراسي الى المدرس",
      breadcrumbEn: "Add a class to the teacher",
      preLabel: "إدارة المدرسين",
      preLabelEn: "teachers",
      preLink: "/dashboard/teachers-users",
    },
  },
  // students
  {
    path: "/dashboard/students-users",
    name: "students-users",
    component: () => import("../../../views/user-student/index.vue"),
    meta: {
      breadcrumb: "إدارة الطلاب",
      breadcrumbEn: "students management",
    },
  },
  {
    path: "/dashboard/user-student/:id",
    name: "view-student-users",
    component: () => import("../../../views/user-student/view-student/index.vue"),
    meta: {
      breadcrumb: "تفاصيل  الطالب",
      breadcrumbEn: "user details",
      preLabel: "إدارة الطلاب",
      preLabelEn: "students management",
      preLink: "/dashboard/students-users",
    },
  },
  {
    path: "/dashboard/student-enrollment/:id",
    name: "add-students-enrollment",
    component: () => import("../../../views/user-student/enrollment/index.vue"),
    meta: {
      breadcrumb: "تسجيل الصف الدراسي",
      breadcrumbEn: "Class registration",
      preLabel: "إدارة الطلاب",
      preLabelEn: "students",
      preLink: "/dashboard/students-users",
    },
  },
  {
    path: "/dashboard/add-parent-to-student-user/:id",
    name: "add-parent-to-student-user-enrollment",
    component: () => import("../../../views/user-student/student-parent-enrollment/index.vue"),
    meta: {
      breadcrumb: "أولياء الأمور للطالب",
      breadcrumbEn: "Parents of the student",
      preLabel: "إدارة الطلاب",
      preLabelEn: "students management",
      preLink: "/dashboard/students-users",
    },
  },
  //parents
  {
    path: "/dashboard/parents-users",
    name: "parents-users",
    component: () => import("../../../views/user-parent/index.vue"),
    meta: {
      breadcrumb: "إدارة أولياء الأمور",
      breadcrumbEn: "Parent management",
    },
  },
  {
    path: "/dashboard/user-parent/:id",
    name: "show-parents-users",
    component: () => import("../../../views/user-parent/view-parent/index.vue"),
    meta: {
      breadcrumb: "تفاصيل ولى الأمر",
      breadcrumbEn: "Parent details",
      preLabel: "إدارة أولياء الأمور",
      preLabelEn: "Parent management",
      preLink: "/dashboard/parents-users",
    },
  },
  {
    path: "/dashboard/parent-enrollment/:id",
    name: "add-students-parent-enrollment",
    component: () => import("../../../views/user-parent/students/index.vue"),
    meta: {
      breadcrumb: "إضافة طالب إلى ولى الأمر",
      breadcrumbEn: "Add a student to the parent",
      preLabel: "إدارة أولياء الأمور",
      preLabelEn: "Parent management",
      preLink: "/dashboard/parents-users",
    },
  },
]
