export default [
  {
    path: "/dashboard/super-level",
    name: "super-level",
    component: () => import("../../../views/super-level/index.vue"),
    meta: {
      breadcrumb: "الصفوف الدراسية",
    },
  },
  {
    path: "/dashboard/super-level/show/:id",
    name: "show-super-level",
    component: () => import("../../../views/super-level/view-super-level/index.vue"),
    meta: {
      breadcrumb: "تفاصيل الصف الدراسي",
      preLabel: "الصفوف الدراسية",
      preLink: "/dashboard/super-level",
    },
  },
  {
    path: "/dashboard/super-class",
    name: "super-class",
    component: () => import("../../../views/super-class/index.vue"),
    meta: {
      breadcrumb: "الفصول",
    },
  },
  {
    path: "/dashboard/super-class/show/:id",
    name: "show-super-class",
    component: () => import("../../../views/super-class/view-super-class/index.vue"),
    meta: {
      breadcrumb: "تفاصيل الفصل",
      preLabel: "الفصول",
      preLink: "/dashboard/super-class",
    },
  },
  {
    path: "/dashboard/advertisements",
    name: "advertisements",
    component: () => import("../../../views/advertisement/index.vue"),
    meta: {
      breadcrumb: "الرسائل",
    },
  },
  {
    path: "/dashboard/advertisements/add",
    name: "add-advertisements",
    component: () => import("../../../views/advertisement/add-advertisement/index.vue"),
    meta: {
      breadcrumb: "رسالة جديدة",
      preLabel: "قائمة الرسائل",
      preLink: "/dashboard/advertisements",
    },
  },
  {
    path: "/dashboard/advertisements/:id",
    name: "edit-advertisements",
    component: () => import("../../../views/advertisement/edit-advertisement/index.vue"),
    meta: {
      breadcrumb: "تعديل الرسالة",
      preLabel: "قائمة الرسائل",
      preLink: "/dashboard/advertisements",
    },
  },
  {
    path: "/dashboard/advertisements/show/:id",
    name: "show-advertisements",
    component: () => import("../../../views/advertisement/view-advertisement/index.vue"),
    meta: {
      breadcrumb: "تفاصيل الرسالة",
      preLabel: "قائمة الرسائل",
      preLink: "/dashboard/advertisements",
    },
  },
  {
    path: "/dashboard/teachers",
    name: "view-teachers",
    component: () => import("../../../views/teachers/index.vue"),
    meta: {
      breadcrumb: "المدرسين",
    },
  },
  {
    path: "/dashboard/students",
    name: "view-students",
    component: () => import("../../../views/super-student/index.vue"),
    meta: {
      breadcrumb: "الطلاب",
    },
  },
  {
    path: "/dashboard/super-student/show/:id",
    name: "show-super-student",
    component: () => import("../../../views/super-student/view-student/index.vue"),
    meta: {
      breadcrumb: "تفاصيل الطالب",
      preLabel: "قائمة الطلاب",
      preLink: "/dashboard/students",
    },
  },
  {
    path: "/dashboard/teachers/show/:id",
    name: "show-teacher",
    component: () => import("../../../views/teachers/view-teacher/index.vue"),
    meta: {
      breadcrumb: "تفاصيل المدرس",
      preLabel: "قائمة المدرسين",
      preLink: "/dashboard/teachers",
    },
  },
  {
    path: "/dashboard/super-mission",
    name: "super-mission",
    component: () => import("../../../views/super-mission/index.vue"),
    meta: {
      breadcrumb: " تعديل المهام الدراسية",
      preLabel: "المهام",
      preLink: "/dashboard/super-mission",
    },
  },
  {
    path: "/dashboard/mission-detail/:id",
    name: "mission-detail",
    component: () => import("../../../views/super-mission/mission-detail/index.vue"),
    meta: {
      breadcrumb: " تفاصبل المهام الدراسية",
      preLabel: "المهام",
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
      preLabel: "",
      preLink: "",
    },
  },
  {
    path: "/dashboard/competitions/add",
    name: "add-competitions",
    component: () => import("../../../views/competitions/add-competition/index.vue"),
    meta: {
      breadcrumb: "إضافة مسابقة",
      preLabel: "المسابقات",
      preLink: "/dashboard/competitions",
    },
  },
  {
    path: "/dashboard/competitions/edit/:id",
    name: "edit-competitions",
    component: () => import("../../../views/competitions/edit-competition/index.vue"),
    meta: {
      breadcrumb: "تعديل المسابقة",
      preLabel: "المسابقات",
      preLink: "/dashboard/competitions",
    },
  },
  {
    path: "/dashboard/competitions/show/:id",
    name: "show-competitions",
    component: () => import("../../../views/competitions/view-competition/index.vue"),
    meta: {
      breadcrumb: "تفاصيل المسابقة",
      preLabel: "المسابقات",
      preLink: "/dashboard/competitions",
    },
  },
]
