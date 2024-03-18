export default [
  {
    path: "/dashboard/choose-student",
    name: "choose-student",
    component: () => import("../../../views/parent/choose-student/index.vue"),
  },
  {
    path: "/dashboard/daily-login",
    name: "daily-login",
    component: () => import("../../../views/parent/daily-login/index.vue"),
    meta: {
      breadcrumb: "الدخول اليومى",
    },
  },
  {
    path: "/dashboard/parent-missions",
    name: "parent-missions",
    component: () => import("../../../views/parent/missions/index.vue"),
    meta: {
      breadcrumb: "المهام",
    },
  },
  {
    path: "/dashboard/parent-comments",
    name: "parent-comments",
    component: () => import("../../../views/parent/comments/index.vue"),
    meta: {
      breadcrumb: "التعليقات",
    },
  },
  {
    path: "/dashboard/parent-achievements",
    name: "parent-achievements",
    component: () => import("../../../views/parent/achievements/index.vue"),
    meta: {
      breadcrumb: "الانجازات",
    },
  },
  {
    path: "/dashboard/parent-competitions",
    name: "parent-competitions",
    component: () => import("../../../views/parent/competitions/index.vue"),
    meta: {
      breadcrumb: "المنافسات",
    },
  },
  {
    path: "/dashboard/parent-seasonal-missions",
    name: "parent-competitions",
    component: () => import("../../../views/parent/seasonal-missions/index.vue"),
    meta: {
      breadcrumb: "المواسم",
    },
  },
  {
    path: "/dashboard/parent-leaderboard",
    name: "parent-leaderboard",
    component: () => import("../../../views/parent/leaderboard/index.vue"),
    meta: {
      breadcrumb: "لوحة الصدارة",
    },
  },
]
