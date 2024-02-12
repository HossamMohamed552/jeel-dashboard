export default [
  {
    path: "/dashboard/system-audios",
    name: "system-audios",
    component: () => import("../../../views/system-audios/index.vue"),
    meta: {
      breadcrumb: "الاصوات",
      preLabel: "",
      preLink: "",
    },
  },
  {
    path: "/dashboard/system-audios/edit/:id",
    name: "edit-system-audios",
    component: () => import("../../../views/system-audios/edit-system-audios/index.vue"),
    meta: {
      breadcrumb: "تعديل الصوت",
      preLabel: "الاصوات",
      preLink: "/dashboard/system-audios",
    },
  },
  {
    path: "/dashboard/system-audios/show/:id",
    name: "show-system-audios",
    component: () => import("../../../views/system-audios/view-system-audios/index.vue"),
    meta: {
      breadcrumb: "تفاصيل الصوت",
      preLabel: "الاصوات",
      preLink: "/dashboard/system-audios",
    },
  },
];
