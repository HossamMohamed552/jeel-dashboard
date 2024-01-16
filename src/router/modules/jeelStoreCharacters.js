export default [
    {
        path: "/dashboard/jeel-store-character",
        name: "characters",
        component: () => import("../../../views/jeel-store-character/index.vue"),
        meta: {
            breadcrumb: "شخصيات الشراء",
            preLabel: "",
            preLink: "",
        },
    },
    {
        path: "/dashboard/jeel-store-character/add",
        name: "add-character",
        component: () => import("../../../views/jeel-store-character/add-character/index.vue"),
        meta: {
          breadcrumb: "إضافة شخصية جديدة",
          preLabel: "شخصيات الشراء",
          preLink: "/dashboard/jeel-store-character",
        },
    },
    {
      path: "/dashboard/jeel-store-character/edit/:id",
      name: "edit-character",
      component: () => import("../../../views/jeel-store-character/edit-character/index.vue"),
      meta: {
        breadcrumb: "تعديل الشخصية",
        preLabel: "شخصيات الشراء",
        preLink: "/dashboard/jeel-store-character",
      },
    },
    {
      path: "/dashboard/jeel-store-character/show/:id",
      name: "show-character",
      component: () => import("../../../views/jeel-store-character/view-character/index.vue"),
      meta: {
        breadcrumb: "تفاصيل الشخصية",
        preLabel: "شخصيات الشراء",
        preLink: "/dashboard/jeel-store-character",
      },
    },


]
