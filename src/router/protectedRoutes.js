const protectedRoutes = [
  {
    path: "/dashboard/home",
    name: "dashboard",
    component: () => import("../layouts/dashboard/index.vue"),
    meta: {
      breadcrumb: "الصفحة الرئيسية",
    },
    children: [
      {
        path: "/dashboard/home",
        name: "main",
        component: () => import("../../views/home/index.vue"),
        meta: {
          breadcrumb: "",
        },
      },
      // role
      {
        path: "/dashboard/role",
        name: "role",
        component: () => import("../../views/role/index.vue"),
        meta: {
          breadcrumb: "صلاحيات النظام",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/role/add",
        name: "add-role",
        component: () => import("../../views/role/add-role/index.vue"),
        meta: {
          breadcrumb: "إضافة صلاحية",
          preLabel: "صلاحيات النظام",
          preLink: "/dashboard/role",
        },
      },
      {
        path: "/dashboard/role/show/:id",
        name: "show-role",
        component: () => import("../../views/role/view-role/index.vue"),
        meta: {
          breadcrumb: "تفاصيل صلاحية المستخدم",
          preLabel: "صلاحيات النظام",
          preLink: "/dashboard/role",
        },
      },
      {
        path: "/dashboard/role/edit/:id",
        name: "edit-role",
        component: () => import("../../views/role/edit-role/index.vue"),
        meta: {
          breadcrumb: "تعديل الصلاحية",
          preLabel: "صلاحيات النظام",
          preLink: "/dashboard/role",
        },
      },
      // users
      {
        path: "/dashboard/users",
        name: "users",
        component: () => import("../../views/users/index.vue"),
        meta: {
          breadcrumb: "قائمة المستخدمين",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/users/add",
        name: "add-users",
        component: () => import("../../views/users/add-user/index.vue"),
        meta: {
          breadcrumb: "إضافة مستخدم جديد",
          preLabel: "قائمة المستخدمين",
          preLink: "/dashboard/users",
        },
      },
      {
        path: "/dashboard/users/edit/:id",
        name: "edit-users",
        component: () => import("../../views/users/edit-user/index.vue"),
        meta: {
          breadcrumb: "تعديل بيانات المستخدم",
          preLabel: "قائمة المستخدمين",
          preLink: "/dashboard/users",
        },
      },
      {
        path: "/dashboard/users/show/:id",
        name: "show-users",
        component: () => import("../../views/users/view-user/index.vue"),
        meta: {
          breadcrumb: "تفاصيل المستخدم",
          preLabel: "قائمة المستخدمين",
          preLink: "/dashboard/users",
        },
      },
      // package
      {
        path: "/dashboard/package",
        name: "package",
        component: () => import("../../views/package/index.vue"),
        meta: {
          breadcrumb: "الباقات",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/package/add",
        name: "add-package",
        component: () => import("../../views/package/add-package/index.vue"),
        meta: {
          breadcrumb: "إضافة باقة جديدة",
          preLabel: "الباقات",
          preLink: "/dashboard/package",
        },
      },
      {
        path: "/dashboard/package/edit/:id",
        name: "edit-package",
        component: () => import("../../views/package/edit-package/index.vue"),
        meta: {
          breadcrumb: "تعديل الباقة",
          preLabel: "الباقات",
          preLink: "/dashboard/package",
        },
      },
      {
        path: "/dashboard/package/show/:id",
        name: "show-package",
        component: () => import("../../views/package/view-package/index.vue"),
        meta: {
          breadcrumb: "تفاصيل الباقة",
          preLabel: "الباقات",
          preLink: "/dashboard/package",
        },
      },
      // subscription
      {
        path: "/dashboard/subscription",
        name: "subscription",
        component: () => import("../../views/subscription/index.vue"),
        meta: {
          breadcrumb: "الإشتراكات",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/subscription/add",
        name: "add-subscription",
        component: () => import("../../views/subscription/add-subscription/index.vue"),
        meta: {
          breadcrumb: "تسجيل إشتراك",
          preLabel: "الإشتراكات",
          preLink: "/dashboard/subscription",
        },
      },
      {
        path: "/dashboard/subscription/edit/:id",
        name: "edit-subscription",
        component: () => import("../../views/subscription/edit-subscription/index.vue"),
        meta: {
          breadcrumb: "تعديل الإشتراك",
          preLabel: "الإشتراكات",
          preLink: "/dashboard/subscription",
        },
      },
      {
        path: "/dashboard/subscription/show/:id",
        name: "show-subscription",
        component: () => import("../../views/subscription/view-subscription/index.vue"),
        meta: {
          breadcrumb: "تفاصيل الإشتراك",
          preLabel: "الإشتراكات",
          preLink: "/dashboard/subscription",
        },
      },
      // school group
      {
        path: "/dashboard/school-group",
        name: "school-group",
        component: () => import("../../views/school-group/index.vue"),
        meta: {
          breadcrumb: "مجموعات المدارس",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/school-group/add",
        name: "add-school-group",
        component: () => import("../../views/school-group/add-school-group/index.vue"),
        meta: {
          breadcrumb: "إضافة مجموعة مدارس",
          preLabel: "مجموعات المدارس",
          preLink: "/dashboard/school-group",
        },
      },
      {
        path: "/dashboard/school-group/edit/:id",
        name: "edit-school-group",
        component: () => import("../../views/school-group/edit-school-group/index.vue"),
        meta: {
          breadcrumb: "تعديل مجموعة مدارس",
          preLabel: "مجموعات المدارس",
          preLink: "/dashboard/school-group",
        },
      },
      {
        path: "/dashboard/school-group/show/:id",
        name: "show-school-group",
        component: () => import("../../views/school-group/view-school-group/index.vue"),
        meta: {
          breadcrumb: "تفاصيل مجموعة مدارس",
          preLabel: "مجموعات المدارس",
          preLink: "/dashboard/school-group",
        },
      },
      // school
      {
        path: "/dashboard/schools",
        name: "schools",
        component: () => import("../../views/schools/index.vue"),
        meta: {
          breadcrumb: "المدارس",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/schools/add",
        name: "add-schools",
        component: () => import("../../views/schools/add-schools/index.vue"),
        meta: {
          breadcrumb: "إضافة مدرسة",
          preLabel: "المدارس",
          preLink: "/dashboard/schools",
        },
      },
      {
        path: "/dashboard/schools/edit/:id",
        name: "edit-schools",
        component: () => import("../../views/schools/edit-schools/index.vue"),
        meta: {
          breadcrumb: "تعديل المدرسة",
          preLabel: "المدارس",
          preLink: "/dashboard/schools",
        },
      },
      {
        path: "/dashboard/schools/show/:id",
        name: "view-schools",
        component: () => import("../../views/schools/view-schools/index.vue"),
        meta: {
          breadcrumb: "تفاصيل المدرسة",
          preLabel: "المدارس",
          preLink: "/dashboard/schools",
        },
      },
      // school department type
      {
        path: "/dashboard/school-department-types",
        name: "school-department-type",
        component: () => import("../../views/school-department-type/index.vue"),
        meta: {
          breadcrumb: "نوع الادارة",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/school-department-types/add",
        name: "add-school-department-type",
        component: () =>
          import("../../views/school-department-type/add-school-department-type/index.vue"),
        meta: {
          breadcrumb: "إضافة نوع ادارة",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/school-department-types/edit/:id",
        name: "edit-schools",
        component: () =>
          import("../../views/school-department-type/edit-school-department-type/index.vue"),
        meta: {
          breadcrumb: "تعديل نوع الادارة",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/school-department-types/show/:id",
        name: "view-school-department-type",
        component: () =>
          import("../../views/school-department-type/view-school-department-type/index.vue"),
        meta: {
          breadcrumb: "تفاصيل نوع الادارة",
          preLabel: "",
          preLink: "",
        },
      },
      // school degree type
      {
        path: "/dashboard/school-degree-types",
        name: "school-degree-type",
        component: () => import("../../views/school-degree-type/index.vue"),
        meta: {
          breadcrumb: "نوع الشهادة",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/school-degree-types/add",
        name: "add-school-degree-type",
        component: () => import("../../views/school-degree-type/add-school-degree-type/index.vue"),
        meta: {
          breadcrumb: "إضافة نوع شهادة",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/school-degree-types/edit/:id",
        name: "edit-schools",
        component: () => import("../../views/school-degree-type/edit-school-degree-type/index.vue"),
        meta: {
          breadcrumb: "تعديل نوع الشهادة",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/school-degree-types/show/:id",
        name: "view-school-degree-type",
        component: () => import("../../views/school-degree-type/view-school-degree-type/index.vue"),
        meta: {
          breadcrumb: "تفاصيل نوع الشهادة",
          preLabel: "",
          preLink: "",
        },
      },
      // school languages
      {
        path: "/dashboard/school-languages",
        name: "school-language",
        component: () => import("../../views/school-languages/index.vue"),
        meta: {
          breadcrumb: "اللغات",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/school-languages/add",
        name: "add-school-language",
        component: () => import("../../views/school-languages/add-school-language/index.vue"),
        meta: {
          breadcrumb: "إضافة لغة",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/school-languages/edit/:id",
        name: "edit-schools",
        component: () => import("../../views/school-languages/edit-school-language/index.vue"),
        meta: {
          breadcrumb: "تعديل لغة",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/school-languages/show/:id",
        name: "view-school-language",
        component: () => import("../../views/school-languages/view-school-language/index.vue"),
        meta: {
          breadcrumb: "تفاصيل اللغة",
          preLabel: "",
          preLink: "",
        },
      },
      // school type
      {
        path: "/dashboard/school-type",
        name: "school-type",
        component: () => import("../../views/school-type/index.vue"),
        meta: {
          breadcrumb: "انواع المدارس",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/school-type/add",
        name: "add-school-type",
        component: () => import("../../views/school-type/add-school-type/index.vue"),
        meta: {
          breadcrumb: "إضافة نوع مدرسة",
          preLabel: "انواع المدارس",
          preLink: "/dashboard/school-type",
        },
      },
      {
        path: "/dashboard/school-type/edit/:id",
        name: "edit-school-type",
        component: () => import("../../views/school-type/edit-school-type/index.vue"),
        meta: {
          breadcrumb: "تعديل نوع المدرسة",
          preLabel: "انواع المدارس",
          preLink: "/dashboard/school-type",
        },
      },
      {
        path: "/dashboard/school-type/show/:id",
        name: "show-school-type",
        component: () => import("../../views/school-type/view-school-type/index.vue"),
        meta: {
          breadcrumb: "تفاصيل نوع المدرسة",
          preLabel: "انواع المدارس",
          preLink: "/dashboard/school-type",
        },
      },
      // levels
      {
        path: "/dashboard/levels",
        name: "levels",
        component: () => import("../../views/levels/index.vue"),
        meta: {
          breadcrumb: "الصفوف الدراسية",
          preLabel: "",
          preLink: "",
        },
      },

      {
        path: "/dashboard/levels/add",
        name: "add-levels",
        component: () => import("../../views/levels/add-level/index.vue"),
        meta: {
          breadcrumb: "إضافة صف دراسي",
          preLabel: "الصفوف الدراسية",
          preLink: "/dashboard/levels",
        },
      },
      {
        path: "/dashboard/levels/edit/:id",
        name: "edit-levels",
        component: () => import("../../views/levels/edit-level/index.vue"),
        meta: {
          breadcrumb: "تعديل المرحلة الدراسية",
          preLabel: "الصفوف الدراسية",
          preLink: "/dashboard/levels",
        },
      },
      {
        path: "/dashboard/levels/show/:id",
        name: "show-levels",
        component: () => import("../../views/levels/view-level/index.vue"),
        meta: {
          breadcrumb: "تفاصيل الصف الدراسي",
          preLabel: "الصفوف الدراسية",
          preLink: "/dashboard/levels",
        },
      },
      // terms
      {
        path: "/dashboard/terms",
        name: "terms",
        component: () => import("../../views/terms/index.vue"),
        meta: {
          breadcrumb: "الترم الدراسي",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/terms/add",
        name: "add-terms",
        component: () => import("../../views/terms/add-terms/index.vue"),
        meta: {
          breadcrumb: "إضافة ترم دراسي",
          preLabel: "الترم الدراسي",
          preLink: "/dashboard/terms",
        },
      },
      {
        path: "/dashboard/terms/edit/:id",
        name: "edit-terms",
        component: () => import("../../views/terms/edit-terms/index.vue"),
        meta: {
          breadcrumb: "تعديل  الترم الدراسي",
          preLabel: "الترم الدراسي",
          preLink: "/dashboard/terms",
        },
      },
      {
        path: "/dashboard/terms/show/:id",
        name: "show-terms",
        component: () => import("../../views/terms/view-terms/index.vue"),
        meta: {
          breadcrumb: "تفاصيل الترم الدراسي",
          preLabel: "الترم الدراسي",
          preLink: "/dashboard/terms",
        },
      },
      // school year
      {
        path: "/dashboard/school-year",
        name: "school-year",
        component: () => import("../../views/shcool-year/index.vue"),
        meta: {
          breadcrumb: "الأعوام الدراسية",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/school-year/add",
        name: "add-school-year",
        component: () => import("../../views/shcool-year/add-school-year/index.vue"),
        meta: {
          breadcrumb: "إضافة عام دراسي",
          preLabel: "العام الدراسي",
          preLink: "/dashboard/school-year",
        },
      },
      {
        path: "/dashboard/school-year/edit/:id",
        name: "edit-school-year",
        component: () => import("../../views/shcool-year/edit-school-year/index.vue"),
        meta: {
          breadcrumb: "تعديل العام الدراسي",
          preLabel: "العام الدراسي",
          preLink: "/dashboard/school-year",
        },
      },
      {
        path: "/dashboard/school-year/show/:id",
        name: "show-school-year",
        component: () => import("../../views/shcool-year/view-school-year/index.vue"),
        meta: {
          breadcrumb: "تفاصيل العام الدراسي",
          preLabel: "العام الدراسي",
          preLink: "/dashboard/school-year",
        },
      },
      // currency
      {
        path: "/dashboard/currency",
        name: "currency",
        component: () => import("../../views/currency/index.vue"),
        meta: {
          breadcrumb: "العملات",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/currency/add",
        name: "add-currency",
        component: () => import("../../views/currency/add-currency/index.vue"),
        meta: {
          breadcrumb: "إضافة عملة",
          preLabel: "العملة",
          preLink: "/dashboard/currency",
        },
      },
      {
        path: "/dashboard/currency/edit/:id",
        name: "edit-currency",
        component: () => import("../../views/currency/edit-currency/index.vue"),
        meta: {
          breadcrumb: "تعديل العملة",
          preLabel: "العملة",
          preLink: "/dashboard/currency",
        },
      },
      {
        path: "/dashboard/currency/show/:id",
        name: "show-currency",
        component: () => import("../../views/currency/view-currency/index.vue"),
        meta: {
          breadcrumb: "تفاصيل العملة",
          preLabel: "العملة",
          preLink: "/dashboard/currency",
        },
      },
      // learning-style
      {
        path: "/dashboard/learning-style",
        name: "learning-style",
        component: () => import("../../views/learning-style/index.vue"),
        meta: {
          breadcrumb: "أساليب التعلم",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/learning-style/add",
        name: "add-learning-style",
        component: () => import("../../views/learning-style/add-learning-style/index.vue"),
        meta: {
          breadcrumb: "إضافة إسلوب التعلم",
          preLabel: "أساليب التعلم",
          preLink: "/dashboard/learning-style",
        },
      },
      {
        path: "/dashboard/learning-style/edit/:id",
        name: "edit-learning-style",
        component: () => import("../../views/learning-style/edit-learning-style/index.vue"),
        meta: {
          breadcrumb: "تعديل إسلوب التعلم",
          preLabel: "إسلوب التعلم",
          preLink: "/dashboard/learning-style",
        },
      },
      {
        path: "/dashboard/learning-style/show/:id",
        name: "show-learning-style",
        component: () => import("../../views/learning-style/view-learning-style/index.vue"),
        meta: {
          breadcrumb: "تفاصيل إسلوب التعلم",
          preLabel: "إسلوب التعلم",
          preLink: "/dashboard/learning-style",
        },
      },
      // learning-skill
      {
        path: "/dashboard/learning-skill",
        name: "learning-skill",
        component: () => import("../../views/learning-skill/index.vue"),
        meta: {
          breadcrumb: "أنواع المهارات",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/learning-skill/add",
        name: "add-learning-skill",
        component: () => import("../../views/learning-skill/add-learning-skill/index.vue"),
        meta: {
          breadcrumb: "إضافة نوع مهارة",
          preLabel: "مهارة التعلم",
          preLink: "/dashboard/learning-skill",
        },
      },
      {
        path: "/dashboard/learning-skill/edit/:id",
        name: "edit-learning-skill",
        component: () => import("../../views/learning-skill/edit-learning-skill/index.vue"),
        meta: {
          breadcrumb: "تعديل مهارة التعلم",
          preLabel: "مهارة التعلم",
          preLink: "/dashboard/learning-skill",
        },
      },
      {
        path: "/dashboard/learning-skill/show/:id",
        name: "show-learning-skill",
        component: () => import("../../views/learning-skill/view-learning-skill/index.vue"),
        meta: {
          breadcrumb: " تفاصيل نوع مهارة",
          preLabel: "مهارة التعلم",
          preLink: "/dashboard/learning-skill",
        },
      },
      // country
      {
        path: "/dashboard/country",
        name: "country",
        component: () => import("../../views/country/index.vue"),
        meta: {
          breadcrumb: "الدول",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/country/add",
        name: "add-country",
        component: () => import("../../views/country/add-country/index.vue"),
        meta: {
          breadcrumb: "إضافة دولة جديدة",
          preLabel: "الدول",
          preLink: "/dashboard/country",
        },
      },
      {
        path: "/dashboard/country/edit/:id",
        name: "edit-country",
        component: () => import("../../views/country/edit-country/index.vue"),
        meta: {
          breadcrumb: "تعديل الدولة",
          preLabel: "الدول",
          preLink: "/dashboard/country",
        },
      },
      {
        path: "/dashboard/country/show/:id",
        name: "show-country",
        component: () => import("../../views/country/view-country/index.vue"),
        meta: {
          breadcrumb: "تفاصيل الدولة",
          preLabel: "الدول",
          preLink: "/dashboard/country",
        },
      },
      // path
      {
        path: "/dashboard/path",
        name: "paths",
        component: () => import("../../views/paths/index.vue"),
        meta: {
          breadcrumb: "المسارات التعليمية",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/path/add",
        name: "add-path",
        component: () => import("../../views/paths/add-path/index.vue"),
        meta: {
          breadcrumb: "إضافة مسار تعليمي",
          preLabel: "المسارات التعليمية",
          preLink: "/dashboard/path",
        },
      },
      {
        path: "/dashboard/path/edit/:id",
        name: "edit-path",
        component: () => import("../../views/paths/edit-path/index.vue"),
        meta: {
          breadcrumb: "تعديل المسار التعليمي",
          preLabel: "المسارات التعليمية",
          preLink: "/dashboard/path",
        },
      },
      {
        path: "/dashboard/path/show/:id",
        name: "show-path",
        component: () => import("../../views/paths/view-path/index.vue"),
        meta: {
          breadcrumb: "تفاصيل المسار التعليمي",
          preLabel: "المسارات التعليمية",
          preLink: "/dashboard/path",
        },
      },
      // videos
      {
        path: "/dashboard/video",
        name: "videos",
        component: () => import("../../views/videos/index.vue"),
        meta: {
          breadcrumb: "الفيديوهات",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/videos/add",
        name: "add-videos",
        component: () => import("../../views/videos/add-video/index.vue"),
        meta: {
          breadcrumb: "إضافة فيديو",
          preLabel: "الفيديوهات",
          preLink: "/dashboard/video",
        },
      },
      {
        path: "/dashboard/videos/edit/:id",
        name: "edit-videos",
        component: () => import("../../views/videos/edit-video/index.vue"),
        meta: {
          breadcrumb: "تعديل الفيديو",
          preLabel: "الفيديوهات",
          preLink: "/dashboard/video",
        },
      },
      {
        path: "/dashboard/videos/show/:id",
        name: "show-video",
        component: () => import("../../views/videos/view-video/index.vue"),
        meta: {
          breadcrumb: "تفاصيل الفيديو",
          preLabel: "الفيديوهات",
          preLink: "/dashboard/video",
        },
      },
      {
        path: "/dashboard/video/:id/questions",
        name: "video-questions",
        component: () => import("../../views/videos/questions/index.vue"),
        meta: {
          breadcrumb: "إضافة أسئلة للفيديو",
          preLabel: "قائمة الفيديوهات",
          preLink: "/dashboard/video",
        },
      },
      // audio
      {
        path: "/dashboard/audio",
        name: "audios",
        component: () => import("../../views/audios/index.vue"),
        meta: {
          breadcrumb: "التسجيلات الصوتية",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/audios/add",
        name: "add-audios",
        component: () => import("../../views/audios/add-audio/index.vue"),
        meta: {
          breadcrumb: "إضافة تسجيل صوتى",
          preLabel: "التسجيلات الصوتية",
          preLink: "/dashboard/audio",
        },
      },
      {
        path: "/dashboard/audios/edit/:id",
        name: "edit-audios",
        component: () => import("../../views/audios/edit-audio/index.vue"),
        meta: {
          breadcrumb: "تعديل التسجيل الصوتى",
          preLabel: "التسجيلات الصوتية",
          preLink: "/dashboard/audio",
        },
      },
      {
        path: "/dashboard/audios/show/:id",
        name: "show-audio",
        component: () => import("../../views/audios/view-audio/index.vue"),
        meta: {
          breadcrumb: "تفاصيل التسجيل الصوتى",
          preLabel: "التسجيلات الصوتية",
          preLink: "/dashboard/audio",
        },
      },
      // questions
      {
        path: "/dashboard/questions",
        name: "questions",
        component: () => import("../../views/questions/index.vue"),
        meta: {
          breadcrumb: "بنك الأسئلة",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/questions/add",
        name: "add-questions",
        component: () => import("../../views/questions/add-questions/index.vue"),
        meta: {
          breadcrumb: "إضافة سؤال",
          preLabel: "بنك الأسئلة",
          preLink: "/dashboard/questions",
        },
      },
      {
        path: "/dashboard/questions/edit/:id",
        name: "edit-questions",
        component: () => import("../../views/questions/edit-questions/index.vue"),
        meta: {
          breadcrumb: "تعديل السؤال",
          preLabel: "بنك الأسئلة",
          preLink: "/dashboard/questions",
        },
      },
      {
        path: "/dashboard/questions/show/:id",
        name: "show-questions",
        component: () => import("../../views/questions/view-questions/index.vue"),
        meta: {
          breadcrumb: "تفاصيل السؤال",
          preLabel: "بنك الأسئلة",
          preLink: "/dashboard/questions",
        },
      },
      // bloom
      {
        path: "/dashboard/bloom",
        name: "bloom",
        component: () => import("../../views/bloom/index.vue"),
        meta: {
          breadcrumb: "بلوم",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/bloom/add",
        name: "add-bloom",
        component: () => import("../../views/bloom/add-bloom/index.vue"),
        meta: {
          breadcrumb: "إضافة بلوم",
          preLabel: "بلوم",
          preLink: "/dashboard/bloom",
        },
      },
      {
        path: "/dashboard/bloom/edit/:id",
        name: "edit-bloom",
        component: () => import("../../views/bloom/edit-bloom/index.vue"),
        meta: {
          breadcrumb: "تعديل البلوم",
          preLabel: "بلوم",
          preLink: "/dashboard/bloom",
        },
      },
      {
        path: "/dashboard/bloom/show/:id",
        name: "show-bloom",
        component: () => import("../../views/bloom/view-bloom/index.vue"),
        meta: {
          breadcrumb: "تفاصيل البلوم",
          preLabel: "بلوم",
          preLink: "/dashboard/bloom",
        },
      },
      // objective
      {
        path: "/dashboard/objective",
        name: "objective",
        component: () => import("../../views/objective/index.vue"),
        meta: {
          breadcrumb: "الأهداف التعليمية",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/objective/add",
        name: "add-objective",
        component: () => import("../../views/objective/add-objective/index.vue"),
        meta: {
          breadcrumb: "إضافة هدف تعليمى",
          preLabel: "الأهداف التعليمية",
          preLink: "/dashboard/objective",
        },
      },
      {
        path: "/dashboard/objective/edit/:id",
        name: "edit-objective",
        component: () => import("../../views/objective/edit-objective/index.vue"),
        meta: {
          breadcrumb: "تعديل الهدف تعليمى",
          preLabel: "الأهداف التعليمية",
          preLink: "/dashboard/objective",
        },
      },
      {
        path: "/dashboard/objective/show/:id",
        name: "show-objective",
        component: () => import("../../views/objective/view-objective/index.vue"),
        meta: {
          breadcrumb: "تفاصيل الهدف تعليمى",
          preLabel: "الأهداف التعليمية",
          preLink: "/dashboard/objective",
        },
      },
      // outcome
      {
        path: "/dashboard/outcome",
        name: "outcome",
        component: () => import("../../views/outcome/index.vue"),
        meta: {
          breadcrumb: "مخرجات التعلم",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/outcome/add",
        name: "add-outcome",
        component: () => import("../../views/outcome/add-outcome/index.vue"),
        meta: {
          breadcrumb: "إضافة مخرج تعليمي",
          preLabel: "مخرجات التعلم",
          preLink: "/dashboard/outcome",
        },
      },
      {
        path: "/dashboard/outcome/edit/:id",
        name: "edit-outcome",
        component: () => import("../../views/outcome/edit-outcome/index.vue"),
        meta: {
          breadcrumb: "تعديل مخرج التعلم",
          preLabel: "مخرجات التعلم",
          preLink: "/dashboard/outcome",
        },
      },
      {
        path: "/dashboard/outcome/show/:id",
        name: "show-outcome",
        component: () => import("../../views/outcome/view-outcome/index.vue"),
        meta: {
          breadcrumb: "تفاصيل مخرج تعليمي",
          preLabel: "مخرجات التعلم",
          preLink: "/dashboard/outcome",
        },
      },
      // Lessons
      {
        path: "/dashboard/lessons",
        name: "lessons",
        component: () => import("../../views/lessons/index.vue"),
        meta: {
          breadcrumb: "الدروس التعليمية",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/lessons/add",
        name: "add-lessons",
        component: () => import("../../views/lessons/add-lessons/index.vue"),
        meta: {
          breadcrumb: "إضافة درس تعليمي",
          preLabel: "الدروس التعليمية",
          preLink: "/dashboard/lessons",
        },
      },
      {
        path: "/dashboard/lessons/edit/:id",
        name: "edit-lessons",
        component: () => import("../../views/lessons/edit-lessons/index.vue"),
        meta: {
          breadcrumb: "تعديل الدرس",
          preLabel: "الدروس",
          preLink: "/dashboard/lessons",
        },
      },
      {
        path: "/dashboard/lessons/show/:id",
        name: "show-lessons",
        component: () => import("../../views/lessons/view-lessons/index.vue"),
        meta: {
          breadcrumb: "تفاصيل درس تعليمي",
          preLabel: "الدروس",
          preLink: "/dashboard/lessons",
        },
      },
      // quiz or practice
      {
        path: "/dashboard/practices",
        name: "practices",
        component: () => import("../../views/practices/index.vue"),
        meta: {
          breadcrumb: "التمارين",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/practice/add",
        name: "add-practices",
        component: () => import("../../views/practices/add-practices/index.vue"),
        meta: {
          breadcrumb: "إضافة تمرين",
          preLabel: "التمارين",
          preLink: "/dashboard/practices",
        },
      },
      {
        path: "/dashboard/practices/edit/:id",
        name: "edit-practices",
        component: () => import("../../views/practices/edit-practices/index.vue"),
        meta: {
          breadcrumb: "تعديل التمرين",
          preLabel: "التمارين",
          preLink: "/dashboard/practices",
        },
      },
      {
        path: "/dashboard/practices/show/:id",
        name: "show-practices",
        component: () => import("../../views/practices/view-practices/index.vue"),
        meta: {
          breadcrumb: "تفاصيل التمرين",
          preLabel: "التمارين",
          preLink: "/dashboard/practices",
        },
      },
      // paper work
      {
        path: "/dashboard/paper-work",
        name: "paper-work",
        component: () => import("../../views/paper-work/index.vue"),
        meta: {
          breadcrumb: "أوراق العمل",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/paper-work/add",
        name: "add-paper-work",
        component: () => import("../../views/paper-work/add-paper-work/index.vue"),
        meta: {
          breadcrumb: "إضافة ورقة عمل",
          preLabel: "أوراق العمل",
          preLink: "/dashboard/paper-work",
        },
      },
      {
        path: "/dashboard/paper-work/edit/:id",
        name: "edit-paper-work",
        component: () => import("../../views/paper-work/edit-paper-work/index.vue"),
        meta: {
          breadcrumb: "تعديل ورقة عمل",
          preLabel: "أوراق العمل",
          preLink: "/dashboard/paper-work",
        },
      },
      {
        path: "/dashboard/paper-work/show/:id",
        name: "show-paper-work",
        component: () => import("../../views/paper-work/view-paper-work/index.vue"),
        meta: {
          breadcrumb: "تفاصيل ورقة عمل",
          preLabel: "أوراق العمل",
          preLink: "/dashboard/paper-work",
        },
      },
      // missions
      {
        path: "/dashboard/missions",
        name: "missions",
        component: () => import("../../views/missions/index.vue"),
        meta: {
          breadcrumb: "المهام",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/missions/add",
        name: "add-missions",
        component: () => import("../../views/missions/add-missions/index.vue"),
        meta: {
          breadcrumb: "إضافة مهمة",
          preLabel: "المهام",
          preLink: "/dashboard/missions",
        },
      },
      {
        path: "/dashboard/missions/edit/:id",
        name: "edit-missions",
        component: () => import("../../views/missions/edit-missions/index.vue"),
        meta: {
          breadcrumb: "تعديل المهمة",
          preLabel: "المهام",
          preLink: "/dashboard/missions",
        },
      },
      {
        path: "/dashboard/missions/show/:id",
        name: "show-missions",
        component: () => import("../../views/missions/view-missions/index.vue"),
        meta: {
          breadcrumb: "تفاصيل المهمة",
          preLabel: "المهام",
          preLink: "/dashboard/missions",
        },
      },
      // class
      {
        path: "/dashboard/class/add",
        name: "add-class",
        component: () => import("../../views/class/add-class/index.vue"),
        meta: {
          breadcrumb: "الصفوف الدراسية",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/class/edit/:id",
        name: "edit-class",
        component: () => import("../../views/class/edit-class/index.vue"),
        meta: {
          breadcrumb: "تعديل الصف الدراسي",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/class/show/:id",
        name: "show-class",
        component: () => import("../../views/class/view-class/index.vue"),
        meta: {
          breadcrumb: "تفاصيل الصف الدراسي",
          preLabel: "",
          preLink: "",
        },
      },
      // staff
      {
        path: "/dashboard/staff-enroll/add",
        name: "add-staff-enroll",
        component: () => import("../../views/staff-enroll/add-staff-enroll/index.vue"),
        meta: {
          breadcrumb: "إضافة موظف",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/staff-enroll/edit/:id",
        name: "edit-staff-enroll",
        component: () => import("../../views/staff-enroll/edit-staff-enroll/index.vue"),
        meta: {
          breadcrumb: "تعديل الموظف",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/staff-enroll/show/:id",
        name: "show-staff-enroll",
        component: () => import("../../views/staff-enroll/view-staff-enroll/index.vue"),
        meta: {
          breadcrumb: "تفاصيل الموظف",
          preLabel: "",
          preLink: "",
        },
      },
      // student
      {
        path: "/dashboard/student-enroll/add",
        name: "add-student-enroll",
        component: () => import("../../views/student-enroll/add-student-enroll/index.vue"),
        meta: {
          breadcrumb: "إضافة طالب",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/student-enroll/edit/:id",
        name: "edit-student-enroll",
        component: () => import("../../views/student-enroll/edit-student-enroll/index.vue"),
        meta: {
          breadcrumb: "تعديل الطالب",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/student-enroll/show/:id",
        name: "show-student-enroll",
        component: () => import("../../views/student-enroll/view-student-enroll/index.vue"),
        meta: {
          breadcrumb: "تفاصيل الطالب",
          preLabel: "",
          preLink: "",
        },
      },
      //school admin
      {
        path: "/dashboard/school-admin/add",
        name: "add-school-admin-enroll",
        component: () => import("../../views/school-admin/add-school-admin/index.vue"),
        meta: {
          breadcrumb: "إضافة مدير",
          preLabel: "",
          preLink: "",
        },
      },
      // jems
      {
        path: "/dashboard/jems",
        name: "jems",
        component: () => import("../../views/jems/index.vue"),
        meta: {
          breadcrumb: "الجيمز",
          preLabel: "",
          preLink: "",
        },
      },
      // rewarding-actions
      {
        path: "/dashboard/rewarding-actions",
        name: "rewarding-actions",
        component: () => import("../../views/rewarding-actions/index.vue"),
        meta: {
          breadcrumb: "نظام المكافآت",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/rewarding-actions/:id",
        name: "rewarding-actions-edit",
        component: () => import("../../views/rewarding-actions/edit/index.vue"),
        meta: {
          breadcrumb: "تعديل نظام المكافآت",
          preLabel: "",
          preLink: "",
        },
      },
      // student levels
      {
        path: "/dashboard/student-levels",
        name: "student-levels",
        component: () => import("../../views/student-levels/index.vue"),
        meta: {
          breadcrumb: "المستويات",
          preLabel: "",
          preLink: "",
        },
      },
      // question difficulty
      {
        path: "/dashboard/question-difficulty",
        name: "question-difficulty",
        component: () => import("../../views/question-difficulty/index.vue"),
        meta: {
          breadcrumb: "صعوبات السؤال",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/question-difficulty/edit/:id",
        name: "view-question-difficulty",
        component: () =>
          import("../../views/question-difficulty/edit-question-difficulty/index.vue"),
        meta: {
          breadcrumb: "تعديل  صعوبة السؤال",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/question-difficulty/show/:id",
        name: "show-question-difficulty",
        component: () =>
          import("../../views/question-difficulty/view-question-difficulty/index.vue"),
        meta: {
          breadcrumb: "تفاصيل  صعوبة السؤال",
          preLabel: "",
          preLink: "",
        },
      },

      // all but level class not done
      {
        path: "/dashboard/level-classes/:levelId",
        name: "level-classes",
        component: () => import("../../views/levels/level-classes/index.vue"),
        meta: {
          breadcrumb: "الصفوف الدراسية",
          preLabel: "",
          preLink: "",
        },
      },
      // path content // if supervisor or teacher
      {
        path: "/dashboard/path-content/:id",
        name: "path-content",
        component: () => import("../../views/path-content/index.vue"),
        meta: {
          breadcrumb: "مسارات الصف الدراسى",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/path-content/:pathId/mission/:missionId",
        name: "path-content-mission",
        component: () => import("../../views/path-content/mission-content/index.vue"),
        meta: {
          breadcrumb: "تعديل محتوى المسار",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/profile",
        name: "profile",
        component: () => import("../../views/profile/index.vue"),
        meta: {
          breadcrumb: "حسابي",
        },
      },
      {
        path: "/dashboard/super-class",
        name: "super-class",
        component: () => import("../../views/super-class/index.vue"),
        meta: {
          breadcrumb: "الفصول",
        },
      },
      {
        path: "/dashboard/super-class/show/:id",
        name: "show-super-class",
        component: () => import("../../views/super-class/view-super-class/index.vue"),
        meta: {
          breadcrumb: "تفاصيل  الفصل",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/advertisements",
        name: "advertisements",
        component: () => import("../../views/advertisement/index.vue"),
        meta: {
          breadcrumb: "الإعلانات",
        },
      },
      {
        path: "/dashboard/advertisements/add",
        name: "add-advertisements",
        component: () => import("../../views/advertisement/add-advertisement/index.vue"),
        meta: {
          breadcrumb: "إعلان جديد",
          preLabel: "قائمة الإعلانات",
          preLink: "/dashboard/advertisements",
        },
      },
      {
        path: "/dashboard/advertisements/:id",
        name: "edit-advertisements",
        component: () => import("../../views/advertisement/edit-advertisement/index.vue"),
        meta: {
          breadcrumb: "تعديل الإعلان",
          preLabel: "قائمة الإعلانات",
          preLink: "/dashboard/advertisements",
        },
      },
      {
        path: "/dashboard/advertisements/show/:id",
        name: "show-advertisements",
        component: () => import("../../views/advertisement/view-advertisement/index.vue"),
        meta: {
          breadcrumb: "تفاصيل الاعلان",
          preLabel: "قائمة الإعلانات",
          preLink: "/dashboard/advertisements",
        },
      },
      {
        path: "/dashboard/teachers",
        name: "view-teachers",
        component: () => import("../../views/teachers/index.vue"),
        meta: {
          breadcrumb: "الإعلانات",
        },
      },
      {
        path: "/dashboard/teachers/show/:id",
        name: "show-teacher",
        component: () => import("../../views/teachers/view-teacher/index.vue"),
        meta: {
          breadcrumb: "تفاصيل المدرس",
          preLabel: "قائمة المدرسين",
          preLink: "/dashboard/teachers",
        },
      },
      {
        path: "/dashboard/super-mission",
        name: "super-mission",
        component: () => import("../../views/super-mission/index.vue"),
        meta: {
          breadcrumb: " تعديل المهام الدراسية",
          preLabel: "المهام",
          preLink: "/dashboard/super-mission",
        },
      },
      {
        path: "/dashboard/mission-detail/:id",
        name: "mission-detail",
        component: () => import("../../views/super-mission/mission-detail/index.vue"),
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
        component: () => import("../../views/competitions/index.vue"),
        meta: {
          breadcrumb: "المسابقات",
          preLabel: "",
          preLink: "",
        },
      },

      {
        path: "/dashboard/competitions/add",
        name: "add-competitions",
        component: () => import("../../views/competitions/add-competition/index.vue"),
        meta: {
          breadcrumb: "إضافة مسابقة",
          preLabel: "المسابقات",
          preLink: "/dashboard/competitions",
        },
      },
      {
        path: "/dashboard/competitions/edit/:id",
        name: "edit-competitions",
        component: () => import("../../views/competitions/edit-competition/index.vue"),
        meta: {
          breadcrumb: "تعديل المسابقة",
          preLabel: "المسابقات",
          preLink: "/dashboard/competitions",
        },
      },
      {
        path: "/dashboard/competitions/show/:id",
        name: "show-competitions",
        component: () => import("../../views/competitions/view-competition/index.vue"),
        meta: {
          breadcrumb: "تفاصيل المسابقة",
          preLabel: "المسابقات",
          preLink: "/dashboard/competitions",
        },
      },
    ],
  },
];

export default protectedRoutes;
