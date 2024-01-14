export default [
    {
        path: "/dashboard/jeel-store-games",
        name: "jeel-store-games",
        component: () => import("../../../views/jeel-games/index.vue"),
        meta: {
            breadcrumb: "مجموعة جيمز",
            preLabel: "",
            preLink: "",
        },
    },
    {
        path: "/dashboard/jeel-store-games/add",
        name: "add-jeel-store-games",
        component: () => import("../../../views/jeel-games/add-jeel-games/index.vue"),
        meta: {
          breadcrumb: "إضافة مجموعة جيمز",
          preLabel: "مجموعة جيمز",
          preLink: "/dashboard/jeel-store-games",
        },
    },
    {
      path: "/dashboard/jeel-store-games/edit/:id",
      name: "edit-jeel-store-games",
      component: () => import("../../../views/jeel-games/edit-jeel-games/index.vue"),
      meta: {
        breadcrumb: "تعديل مجموعة جيمز",
        preLabel: "مجموعة جيمز",
        preLink: "/dashboard/jeel-store-games",
      },
    },
    {
      path: "/dashboard/jeel-store-games/show/:id",
      name: "show-jeel-store-games",
      component: () => import("../../../views/jeel-games/view-jeel-games/index.vue"),
      meta: {
        breadcrumb: "تفاصيل مجموعة جيمز",
        preLabel: "مجموعة جيمز",
        preLink: "/dashboard/jeel-store-games",
      },
    },


]
