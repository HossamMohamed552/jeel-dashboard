export default [
  {
    path: "/dashboard/super-level",
    name: "super-level",
    component: () => import("../../../views/super-level/index.vue"),
    meta: {
      breadcrumb: "الصفوف الدراسية",
      breadcrumbEn: "levels",
    },
  },
  {
    path: "/dashboard/super-level/show/:id",
    name: "show-super-level",
    component: () => import("../../../views/super-level/view-super-level/index.vue"),
    meta: {
      breadcrumb: "تفاصيل الصف الدراسي",
      breadcrumbEn: "view level",
      preLabel: "الصفوف الدراسية",
      preLabelEn: "levels",
      preLink: "/dashboard/super-level",
    },
  },
  {
    path: "/dashboard/super-class",
    name: "super-class",
    component: () => import("../../../views/super-class/index.vue"),
    meta: {
      breadcrumb: "الفصول",
      breadcrumbEn: "classes",
    },
  },
  {
    path: "/dashboard/super-class/show/:id",
    name: "show-super-class",
    component: () => import("../../../views/super-class/view-super-class/index.vue"),
    meta: {
      breadcrumb: "تفاصيل الفصل",
      breadcrumbEn: "view class",
      preLabel: "الفصول",
      preLabelEn: "class",
      preLink: "/dashboard/super-class",
    },
  },
  {
    path: "/dashboard/teachers",
    name: "view-teachers",
    component: () => import("../../../views/teachers/index.vue"),
    meta: {
      breadcrumb: "المدرسين",
      breadcrumbEn: "teachers",
    },
  },
  {
    path: "/dashboard/teachers/show/:id",
    name: "show-teacher",
    component: () => import("../../../views/teachers/view-teacher/index.vue"),
    meta: {
      breadcrumb: "تفاصيل المدرس",
      breadcrumbEn: "view teacher",
      preLabel: "قائمة المدرسين",
      preLabelEn: "teachers",
      preLink: "/dashboard/teachers",
    },
  },
  {
    path: "/dashboard/students",
    name: "view-students",
    component: () => import("../../../views/super-student/index.vue"),
    meta: {
      breadcrumb: "الطلاب",
      breadcrumbEn: "students",
    },
  },
  {
    path: "/dashboard/super-student/show/:id",
    name: "show-super-student",
    component: () => import("../../../views/super-student/view-student/index.vue"),
    meta: {
      breadcrumb: "تفاصيل الطالب",
      breadcrumbEn: "view student",
      preLabel: "قائمة الطلاب",
      preLabelEn: "students",
      preLink: "/dashboard/students",
    },
  },

  {
    path: "/dashboard/super-mission",
    name: "super-mission",
    component: () => import("../../../views/super-mission/index.vue"),
    meta: {
      breadcrumb: " تعديل المهام الدراسية",
      breadcrumbEn: "edit missions",
      preLabel: "المهام",
      preLabelEn: "missions",
      preLink: "/dashboard/super-mission",
    },
  },
  {
    path: "/dashboard/mission-detail/:id",
    name: "mission-detail",
    component: () => import("../../../views/super-mission/mission-detail/index.vue"),
    meta: {
      breadcrumb: " تفاصيل المهام الدراسية",
      breadcrumbEn: "view mission detail",
      preLabel: "المهام",
      preLabelEn: "missions",
      preLink: "/dashboard/super-mission",
    },
  },
  //competitions
  {
    path: "/dashboard/competitions",
    name: "competitions",
    component: () => import("../../../views/competitions/index.vue"),
    meta: {
      breadcrumb: "المسابقات",
      breadcrumbEn: "competitions",
    },
  },
  {
    path: "/dashboard/competitions/add",
    name: "add-competitions",
    component: () => import("../../../views/competitions/add-competition/index.vue"),
    meta: {
      breadcrumb: "إضافة مسابقة",
      breadcrumbEn: "add new competition",
      preLabel: "المسابقات",
      preLabelEn: "competitions",
      preLink: "/dashboard/competitions",
    },
  },
  {
    path: "/dashboard/competitions/edit/:id",
    name: "edit-competitions",
    component: () => import("../../../views/competitions/edit-competition/index.vue"),
    meta: {
      breadcrumb: "تعديل المسابقة",
      breadcrumbEn: "edit competition",
      preLabel: "المسابقات",
      preLabelEn: "competitions",
      preLink: "/dashboard/competitions",
    },
  },
  {
    path: "/dashboard/competitions/show/:id",
    name: "show-competitions",
    component: () => import("../../../views/competitions/view-competition/index.vue"),
    meta: {
      breadcrumb: "تفاصيل المسابقة",
      breadcrumbEn: "view competition",
      preLabel: "المسابقات",
      preLabelEn: "competitions",
      preLink: "/dashboard/competitions",
    },
  },

  {
    path: "/dashboard/advertisements",
    name: "advertisements",
    component: () => import("../../../views/advertisement/index.vue"),
    meta: {
      breadcrumb: "الرسائل",
      breadcrumbEn: "Announcements",
    },
  },
  {
    path: "/dashboard/advertisements/add",
    name: "add-advertisements",
    component: () => import("../../../views/advertisement/add-advertisement/index.vue"),
    meta: {
      breadcrumb: "رسالة جديدة",
      breadcrumbEn: "add new Announcement",
      preLabel: "قائمة الرسائل",
      preLabelEn: "Announcements",
      preLink: "/dashboard/advertisements",
    },
  },
  {
    path: "/dashboard/advertisements/:id",
    name: "edit-advertisements",
    component: () => import("../../../views/advertisement/edit-advertisement/index.vue"),
    meta: {
      breadcrumb: "تعديل الرسالة",
      breadcrumbEn: "edit Announcement",
      preLabel: "قائمة الرسائل",
      preLabelEn: "Announcements",
      preLink: "/dashboard/advertisements",
    },
  },
  {
    path: "/dashboard/advertisements/show/:id",
    name: "show-advertisements",
    component: () => import("../../../views/advertisement/view-advertisement/index.vue"),
    meta: {
      breadcrumb: "تفاصيل الرسالة",
      breadcrumbEn: "view Announcement",
      preLabel: "قائمة الرسائل",
      preLabelEn: "Announcements",
      preLink: "/dashboard/advertisements",
    },
  },
  {
    path: "/dashboard/super-leaderboard",
    name: "view-super-leaderboard",
    component: () => import("../../../views/super-leaderboard/index.vue"),
    meta: {
      breadcrumb: "لوحة الصدارة",
      breadcrumbEn: "leaderboard",
    },
  },
]
