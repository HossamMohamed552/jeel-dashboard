export default [
  {
    path: "/dashboard/teacher-level",
    name: "teacher-level",
    component: () => import("../../../views/teacher/teacher-level/index.vue"),
    meta: {
      breadcrumb: "الصفوف الدراسية",
      breadcrumbEn: "levels",
    },
  },
  {
    path: "/dashboard/teacher-level/show/:id",
    name: "show-teacher-level",
    component: () => import("../../../views/teacher/teacher-level/view-teacher-level/index.vue"),
    meta: {
      breadcrumb: "تفاصيل الصف الدراسي",
      breadcrumbEn: "view level",
      preLabel: "الصفوف الدراسية",
      preLabelEn: "levels",
      preLink: "/dashboard/teacher-level",
    },
  },
  {
    path: "/dashboard/teacher-class",
    name: "teacher-class",
    component: () => import("../../../views/teacher/teacher-class/index.vue"),
    meta: {
      breadcrumb: "الفصول",
      breadcrumbEn: "classes",
    },
  },
  {
    path: "/dashboard/teacher-class/show/:id",
    name: "show-teacher-class",
    component: () => import("../../../views/teacher/teacher-class/view-teacher-class/index.vue"),
    meta: {
      breadcrumb: "تفاصيل الفصل",
      breadcrumbEn: "view class",
      preLabel: "الفصول",
      preLabelEn: "classes",
      preLink: "/dashboard/teacher-class",
    },
  },
  {
    path: "/dashboard/teacher-group/add",
    name: "teacher-group-add",
    component: () => import("../../../views/teacher/teacher-group/add-teacher-group/index.vue"),
    meta: {
      breadcrumb: "إضافة مجموعة",
      breadcrumbEn: "add group",
      preLabel: "الفصول",
      preLabelEn: "classes",
      preLink: "/dashboard/teacher-class",
    },
  },
  {
    path: "/dashboard/teacher-group/edit/:id",
    name: "teacher-group-edit",
    component: () => import("../../../views/teacher/teacher-group/edit-teacher-group/index.vue"),
    meta: {
      breadcrumb: "تعديل المجموعة",
      breadcrumbEn: "edit group",
      preLabel: "الفصول",
      preLabelEn: "classes",
      preLink: "/dashboard/teacher-class",
    },
  },
  {
    path: "/dashboard/teacher-group/show/:id",
    name: "teacher-group-view",
    component: () => import("../../../views/teacher/teacher-group/view-teacher-group/index.vue"),
    meta: {
      breadcrumb: "تفاصيل المجموعة",
      breadcrumbEn: "view group",
      preLabel: "الفصول",
      preLabelEn: "classes",
      preLink: "/dashboard/teacher-class",
    },
  },

  {
    path: "/dashboard/teacher-mission",
    name: "teacher-mission",
    component: () => import("../../../views/teacher/teacher-mission/index.vue"),
    meta: {
      breadcrumb: "المهام الدراسية",
      breadcrumbEn: "Academic missions",
      preLabel: "المهام",
      preLabelEn: "missions",
      preLink: "/dashboard/teacher-mission",
    },
  },
  {
    path: "/dashboard/teacher-revision-mission",
    name: "teacher-revision-mission",
    component: () => import("../../../views/teacher/teacher-mission-revision/index.vue"),
    meta: {
      breadcrumb: "تصحيح المهام",
      breadcrumbEn: "Correction of missions",
      preLabel: "المهام",
      preLink: "/dashboard/teacher-mission",
    },
  },
  {
    path: "/dashboard/teacher/missions-student/show/:id",
    name: "teacher-revision-mission",
    component: () =>
      import("../../../views/teacher/teacher-mission-revision/view-mission/index.vue"),
    meta: {
      breadcrumb: "المهام الدراسية",
      breadcrumbEn: "revision mission",
      preLabel: "المهام",
      preLabelEn: "missions",
      preLink: "/dashboard/teacher-mission",
    },
  },
  {
    path: "/dashboard/teacher/missions-student/show/:studentId/:missionId",
    name: "mission-detail",
    component: () =>
      import("../../../views/teacher/teacher-mission-revision/view-mission-content/index.vue"),
    meta: {
      breadcrumb: " تفاصيل المهام الدراسية",
      breadcrumbEn: "view mission detail",
      preLabel: "المهام الدراسية",
      preLabelEn: "missions",
      preLink: "/dashboard/teacher-mission",
    },
  },
  {
    path: "/dashboard/teacher-students",
    name: "view-teacher-students",
    component: () => import("../../../views/teacher/teacher-student/index.vue"),
    meta: {
      breadcrumb: "الطلاب",
      breadcrumbEn: "students",
    },
  },
  {
    path: "/dashboard/teacher-advertisements",
    name: "teacher-advertisements",
    component: () => import("../../../views/teacher/teacher-advertisement/index.vue"),
    meta: {
      breadcrumb: "الرسائل",
      breadcrumbEn: "Announcements",
    },
  },
  {
    path: "/dashboard/teacher-advertisements/show/:id",
    name: "show-teacher-advertisements",
    component: () =>
      import("../../../views/teacher/teacher-advertisement/view-advertisement/index.vue"),
    meta: {
      breadcrumb: "تفاصيل الرسالة",
      breadcrumbEn: "view Announcement",
      preLabel: "قائمة الرسائل",
      preLabelEn: "list of Announcements",
      preLink: "/dashboard/teacher-advertisements",
    },
  },
  //

  {
    path: "/dashboard/teacher-student/show/:id",
    name: "show-super-student",
    component: () => import("../../../views/teacher/teacher-student/view-student/index.vue"),
    meta: {
      breadcrumb: "تفاصيل الطالب",
      breadcrumbEn: "view student",
      preLabel: "قائمة الطلاب",
      preLabelEn: "list of students",
      preLink: "/dashboard/teacher-students",
    },
  },
  {
    path: "/dashboard/teacher-students",
    name: "view-teacher-students",
    component: () => import("../../../views/teacher/teacher-student/index.vue"),
    meta: {
      breadcrumb: "الطلاب",
      breadcrumbEn: "students",
    },
  },
  {
    path: "/dashboard/teacher-leaderboard",
    name: "view-teacher-leaderboard",
    component: () => import("../../../views/teacher/teacher-leaderboard/index.vue"),
    meta: {
      breadcrumb: "لوحة الصدارة",
      breadcrumbEn: "leaderboard",
    },
  },
  {
    path: "/dashboard/teacher-competitions",
    name: "view-teacher-competitions",
    component: () => import("../../../views/competitions/index.vue"),
    meta: {
      breadcrumb: "المسابقات",
      breadcrumbEn: "competitions",
    },
  },
];
