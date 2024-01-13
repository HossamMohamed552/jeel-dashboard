export default [
    {
        path: "/dashboard/characters",
        name: "characters",
        component: () => import("../../../views/characters/index.vue"),
        meta: {
            breadcrumb: "الشخصيات",
            preLabel: "",
            preLink: "",
        },
    },
    {
        path: "/dashboard/characters/add",
        name: "add-character",
        component: () => import("../../../views/characters/add-character/index.vue"),
        meta: {
          breadcrumb: "إضافة شخصية جديدة",
          preLabel: "الشخصيات",
          preLink: "/dashboard/characters",
        },
    },
    {
      path: "/dashboard/characters/edit/:id",
      name: "edit-character",
      component: () => import("../../../views/characters/edit-character/index.vue"),
      meta: {
        breadcrumb: "تعديل الشخصية",
        preLabel: "الشخصيات",
        preLink: "/dashboard/characters",
      },
    },
    {
      path: "/dashboard/characters/show/:id",
      name: "show-character",
      component: () => import("../../../views/characters/view-character/index.vue"),
      meta: {
        breadcrumb: "تفاصيل الشخصية",
        preLabel: "الشخصيات",
        preLink: "/dashboard/characters",
      },
    },


]
