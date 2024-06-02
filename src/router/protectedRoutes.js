import badges from "./modules/badges";
import characters from "./modules/characters";
import powerUpBoxes from "./modules/powerUpBoxes";
import jeelLibrary from "./modules/jeelLibrary";
import jeelStoreGames from "./modules/jeelStoreGames";
import jeelStoreLibrary from "./modules/jeelStoreLibrary";
import jeelStoreCharacters from "./modules/jeelStoreCharacters";
import schoolAdmin from "@/router/modules/schoolAdmin";
import supervisor from "@/router/modules/supervisor"
import seasonalMissions from "@/router/modules/seasonalMissions";
import systemAudios from "@/router/modules/systemAudios";
import academicYear from "@/router/modules/academicYear";
import parent from "@/router/modules/parent";
import teacher from "@/router/modules/teacher";
import reports from "@/router/modules/reports";
import jeelAdmin from "@/router/modules/jeelAdmin";
import schoolAdminReports from "@/router/modules/schoolAdminReports";
const protectedRoutes = [
  {
    path: "/dashboard/home",
    name: "dashboard",
    component: () => import("../layouts/dashboard/index.vue"),
    meta: {
      breadcrumb: "الصفحة الرئيسية",
      breadcrumbEn: "home",
    },
    children: [
      {
        path: "/dashboard/home",
        name: "main",
        component: () => import("../../views/home/index.vue"),
        meta: {
          breadcrumb: "الصفحة الرئيسية",
          breadcrumbEn: "home",
        },
      },



      // school group
      {
        path: "/dashboard/school-group",
        name: "school-group",
        component: () => import("../../views/school-group/index.vue"),
        meta: {
          breadcrumb: "مجموعات المدارس",
          breadcrumbEn: "school groups",
          preLabel: "",
          preLabelEn: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/school-group/add",
        name: "add-school-group",
        component: () => import("../../views/school-group/add-school-group/index.vue"),
        meta: {
          breadcrumb: "إضافة مجموعة مدارس",
          breadcrumbEn: "add school group",
          preLabel: "مجموعات المدارس",
          preLabelEn: "school groups",
          preLink: "/dashboard/school-group",
        },
      },
      {
        path: "/dashboard/school-group/edit/:id",
        name: "edit-school-group",
        component: () => import("../../views/school-group/edit-school-group/index.vue"),
        meta: {
          breadcrumb: "تعديل مجموعة مدارس",
          breadcrumbEn: "edit school group",
          preLabel: "مجموعات المدارس",
          preLabelEn: "school groups",
          preLink: "/dashboard/school-group",
        },
      },
      {
        path: "/dashboard/school-group/show/:id",
        name: "show-school-group",
        component: () => import("../../views/school-group/view-school-group/index.vue"),
        meta: {
          breadcrumb: "تفاصيل مجموعة مدارس",
          breadcrumbEn: "show school group",
          preLabel: "مجموعات المدارس",
          preLabelEn: "school groups",
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
          breadcrumbEn: "schools",
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
          breadcrumbEn: "add school",
          preLabel: "المدارس",
          preLabelEn: "schools",
          preLink: "/dashboard/schools",
        },
      },
      {
        path: "/dashboard/schools/edit/:id",
        name: "edit-schools",
        component: () => import("../../views/schools/edit-schools/index.vue"),
        meta: {
          breadcrumb: "تعديل المدرسة",
          breadcrumbEn: "edit school",
          preLabel: "المدارس",
          preLabelEn: "schools",
          preLink: "/dashboard/schools",
        },
      },
      {
        path: "/dashboard/schools/show/:id",
        name: "view-schools",
        component: () => import("../../views/schools/view-schools/index.vue"),
        meta: {
          breadcrumb: "تفاصيل المدرسة",
          breadcrumbEn: "view school",
          preLabel: "المدارس",
          preLabelEn: "schools",
          preLink: "/dashboard/schools",
        },
      },

      // school department type
      {
        path: "/dashboard/school-department-types",
        name: "school-department-type",
        component: () => import("../../views/school-department-type/index.vue"),
        meta: {
          breadcrumb: "نوع الإدارة",
          breadcrumbEn: "Management type",
          preLabel: "",
          preLabelEn: "",
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
          breadcrumbEn: "add school department type",
          preLabel: "",
          preLabelEn: "Management type",
          preLink: "",
        },
      },
      {
        path: "/dashboard/school-department-types/edit/:id",
        name: "edit-school-department-type",
        component: () =>
          import("../../views/school-department-type/edit-school-department-type/index.vue"),
        meta: {
          breadcrumb: "تعديل نوع الإدارة",
          breadcrumbEn: "edit school department type",
          preLabel: "",
          preLabelEn: "Management type",
          preLink: "",
        },
      },
      {
        path: "/dashboard/school-department-types/show/:id",
        name: "view-school-department-type",
        component: () =>
          import("../../views/school-department-type/view-school-department-type/index.vue"),
        meta: {
          breadcrumb: "تفاصيل نوع الإدارة",
          breadcrumbEn: "view school department type",
          preLabel: "",
          preLabelEn: "Management type",
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
          breadcrumbEn: "school degree type",
          preLabel: "",
          preLabelEn: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/school-degree-types/add",
        name: "add-school-degree-type",
        component: () => import("../../views/school-degree-type/add-school-degree-type/index.vue"),
        meta: {
          breadcrumb: "إضافة نوع شهادة",
          breadcrumbEn: "add school degree type",
          preLabel: "نوع الشهادة",
          preLabelEn: "school degree type",
          preLink: "",
        },
      },
      {
        path: "/dashboard/school-degree-types/edit/:id",
        name: "edit-schools",
        component: () => import("../../views/school-degree-type/edit-school-degree-type/index.vue"),
        meta: {
          breadcrumb: "تعديل نوع الشهادة",
          breadcrumbEn: "edit school degree type",
          preLabel: "نوع الشهادة",
          preLabelEn: "school degree type",
          preLink: "",
        },
      },
      {
        path: "/dashboard/school-degree-types/show/:id",
        name: "view-school-degree-type",
        component: () => import("../../views/school-degree-type/view-school-degree-type/index.vue"),
        meta: {
          breadcrumb: "تفاصيل نوع الشهادة",
          breadcrumbEn: "view school degree type",
          preLabel: "نوع الشهادة",
          preLabelEn: "school degree type",
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
          breadcrumbEn: "school language",
          preLabel: "",
          preLabelEn: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/school-languages/add",
        name: "add-school-language",
        component: () => import("../../views/school-languages/add-school-language/index.vue"),
        meta: {
          breadcrumb: "إضافة لغة",
          breadcrumbEn: "add school language",
          preLabel: "اللغات",
          preLabelEn: "school language",
          preLink: "/dashboard/school-languages",
        },
      },
      {
        path: "/dashboard/school-languages/edit/:id",
        name: "edit-school-language",
        component: () => import("../../views/school-languages/edit-school-language/index.vue"),
        meta: {
          breadcrumb: "تعديل لغة",
          breadcrumbEn: "edit school language",
          preLabel: "اللغات",
          preLabelEn: "school language",
          preLink: "/dashboard/school-languages",
        },
      },
      {
        path: "/dashboard/school-languages/show/:id",
        name: "view-school-language",
        component: () => import("../../views/school-languages/view-school-language/index.vue"),
        meta: {
          breadcrumb: "تفاصيل اللغة",
          breadcrumbEn: "edit school language",
          preLabel: "اللغات",
          preLabelEn: "school language",
          preLink: "/dashboard/school-languages",
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
          breadcrumbEn: "levels",
          preLabel: "",
          preLabelEn: "",
          preLink: "",
        },
      },

      {
        path: "/dashboard/levels/add",
        name: "add-levels",
        component: () => import("../../views/levels/add-level/index.vue"),
        meta: {
          breadcrumb: "إضافة صف دراسي",
          breadcrumbEn: "add levels",
          preLabel: "الصفوف الدراسية",
          preLabelEn: "levels",
          preLink: "/dashboard/levels",
        },
      },
      {
        path: "/dashboard/levels/edit/:id",
        name: "edit-levels",
        component: () => import("../../views/levels/edit-level/index.vue"),
        meta: {
          breadcrumb: "تعديل المرحلة الدراسية",
          breadcrumbEn: "edit levels",
          preLabel: "الصفوف الدراسية",
          preLabelEn: "levels",
          preLink: "/dashboard/levels",
        },
      },
      {
        path: "/dashboard/levels/show/:id",
        name: "show-levels",
        component: () => import("../../views/levels/view-level/index.vue"),
        meta: {
          breadcrumb: "تفاصيل الصف الدراسي",
          breadcrumbEn: "show levels",
          preLabel: "الصفوف الدراسية",
          preLabelEn: "levels",
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
          breadcrumbEn: "terms",
          preLabel: "",
          preLabelEn: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/terms/add",
        name: "add-terms",
        component: () => import("../../views/terms/add-terms/index.vue"),
        meta: {
          breadcrumb: "إضافة ترم دراسي",
          breadcrumbEn: "add terms",
          preLabel: "الترم الدراسي",
          preLabelEn: "terms",
          preLink: "/dashboard/terms",
        },
      },
      {
        path: "/dashboard/terms/edit/:id",
        name: "edit-terms",
        component: () => import("../../views/terms/edit-terms/index.vue"),
        meta: {
          breadcrumb: "تعديل  الترم الدراسي",
          breadcrumbEn: "edit term",
          preLabel: "الترم الدراسي",
          preLabelEn: "terms",
          preLink: "/dashboard/terms",
        },
      },
      {
        path: "/dashboard/terms/show/:id",
        name: "show-terms",
        component: () => import("../../views/terms/view-terms/index.vue"),
        meta: {
          breadcrumb: "تفاصيل الترم الدراسي",
          breadcrumbEn: "show term",
          preLabel: "الترم الدراسي",
          preLabelEn: "terms",
          preLink: "/dashboard/terms",
        },
      },

      // learning-style
      {
        path: "/dashboard/learning-style",
        name: "learning-style",
        component: () => import("../../views/learning-style/index.vue"),
        meta: {
          breadcrumb: "أساليب التعلم",
          breadcrumbEn: "learning style",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/learning-style/add",
        name: "add-learning-style",
        component: () => import("../../views/learning-style/add-learning-style/index.vue"),
        meta: {
          breadcrumb: "إضافة أسلوب التعلم",
          breadcrumbEn: "add learning style",
          preLabel: "أساليب التعلم",
          preLabelEn: "learning style",
          preLink: "/dashboard/learning-style",
        },
      },
      {
        path: "/dashboard/learning-style/edit/:id",
        name: "edit-learning-style",
        component: () => import("../../views/learning-style/edit-learning-style/index.vue"),
        meta: {
          breadcrumb: "تعديل أسلوب التعلم",
          breadcrumbEn: "edit learning style",
          preLabel: "أسلوب التعلم",
          preLabelEn: "learning style",
          preLink: "/dashboard/learning-style",
        },
      },
      {
        path: "/dashboard/learning-style/show/:id",
        name: "show-learning-style",
        component: () => import("../../views/learning-style/view-learning-style/index.vue"),
        meta: {
          breadcrumb: "تفاصيل أسلوب التعلم",
          breadcrumbEn: "show learning style",
          preLabel: "أسلوب التعلم",
          preLabelEn: "learning style",
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
          breadcrumbEn: "learning skill",
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
          breadcrumbEn: "add learning skill",
          preLabel: "مهارة التعلم",
          preLabelEn: "learning skill",
          preLink: "/dashboard/learning-skill",
        },
      },
      {
        path: "/dashboard/learning-skill/edit/:id",
        name: "edit-learning-skill",
        component: () => import("../../views/learning-skill/edit-learning-skill/index.vue"),
        meta: {
          breadcrumb: "تعديل مهارة التعلم",
          breadcrumbEn: "edit learning skill",
          preLabel: "مهارة التعلم",
          preLabelEn: "learning skill",
          preLink: "/dashboard/learning-skill",
        },
      },
      {
        path: "/dashboard/learning-skill/show/:id",
        name: "show-learning-skill",
        component: () => import("../../views/learning-skill/view-learning-skill/index.vue"),
        meta: {
          breadcrumb: " تفاصيل نوع مهارة",
          breadcrumbEn: "show learning skill",
          preLabel: "مهارة التعلم",
          preLabelEn: "learning skill",
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
          breadcrumbEn: "countries",
          preLabel: "",
          preLabelEn: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/country/add",
        name: "add-country",
        component: () => import("../../views/country/add-country/index.vue"),
        meta: {
          breadcrumb: "إضافة دولة جديدة",
          breadcrumbEn: "add country",
          preLabel: "الدول",
          preLabelEn: "country",
          preLink: "/dashboard/country",
        },
      },
      {
        path: "/dashboard/country/edit/:id",
        name: "edit-country",
        component: () => import("../../views/country/edit-country/index.vue"),
        meta: {
          breadcrumb: "تعديل الدولة",
          breadcrumbEn: "edit country",
          preLabel: "الدول",
          preLabelEn: "country",
          preLink: "/dashboard/country",
        },
      },
      {
        path: "/dashboard/country/show/:id",
        name: "show-country",
        component: () => import("../../views/country/view-country/index.vue"),
        meta: {
          breadcrumb: "تفاصيل الدولة",
          breadcrumbEn: "show country",
          preLabel: "الدول",
          preLabelEn: "country",
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
          breadcrumbEn: "learning path",
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
          breadcrumbEn: "add learning path",
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
          breadcrumbEn: "edit learning path",
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
          breadcrumbEn: "videos",
          preLabel: "",
          preLabelEn: "",
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
          breadcrumbEn: "add videos",
          preLabelEn: "videos",
          preLink: "/dashboard/video",
        },
      },
      {
        path: "/dashboard/videos/edit/:id",
        name: "edit-videos",
        component: () => import("../../views/videos/edit-video/index.vue"),
        meta: {
          breadcrumb: "تعديل الفيديو",
          breadcrumbEn: "edit videos",
          preLabel: "الفيديوهات",
          preLabelEn: "videos",
          preLink: "/dashboard/video",
        },
      },
      {
        path: "/dashboard/videos/show/:id",
        name: "show-video",
        component: () => import("../../views/videos/view-video/index.vue"),
        meta: {
          breadcrumb: "تفاصيل الفيديو",
          breadcrumbEn: "show video",
          preLabel: "الفيديوهات",
          preLabelEn: "videos",
          preLink: "/dashboard/video",
        },
      },
      {
        path: "/dashboard/video/:id/questions",
        name: "video-questions",
        component: () => import("../../views/videos/questions/index.vue"),
        meta: {
          breadcrumb: "إضافة أسئلة للفيديو",
          breadcrumbEn: "Add questions to the video",
          preLabel: "قائمة الفيديوهات",
          preLabelEn: "videos",
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
          breadcrumbEn: "tasks",
          preLabel: "",
          preLabelEn: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/audios/add",
        name: "add-audios",
        component: () => import("../../views/audios/add-audio/index.vue"),
        meta: {
          breadcrumb: "إضافة تسجيل صوتى",
          breadcrumbEn: "add task",
          preLabel: "التسجيلات الصوتية",
          preLabelEn: "tasks",
          preLink: "/dashboard/audio",
        },
      },
      {
        path: "/dashboard/audios/edit/:id",
        name: "edit-audios",
        component: () => import("../../views/audios/edit-audio/index.vue"),
        meta: {
          breadcrumb: "تعديل التسجيل الصوتي",
          breadcrumbEn: "edit task",
          preLabel: "التسجيلات الصوتية",
          preLabelEn: "tasks",
          preLink: "/dashboard/audio",
        },
      },
      {
        path: "/dashboard/audios/show/:id",
        name: "show-audio",
        component: () => import("../../views/audios/view-audio/index.vue"),
        meta: {
          breadcrumb: "تفاصيل التسجيل الصوتي",
          breadcrumbEn: "show task",
          preLabel: "التسجيلات الصوتية",
          preLabelEn: "tasks",
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
          breadcrumbEn: "Question bank",
          preLabelEn: "",
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
          breadcrumbEn: "add questions",
          preLabel: "بنك الأسئلة",
          preLabelEn: "Question bank",
          preLink: "/dashboard/questions",
        },
      },
      {
        path: "/dashboard/questions/edit/:id",
        name: "edit-questions",
        component: () => import("../../views/questions/edit-questions/index.vue"),
        meta: {
          breadcrumb: "تعديل السؤال",
          breadcrumbEn: "edit questions",
          preLabel: "بنك الأسئلة",
          preLabelEn: "Question bank",
          preLink: "/dashboard/questions",
        },
      },
      {
        path: "/dashboard/questions/show/:id",
        name: "show-questions",
        component: () => import("../../views/questions/view-questions/index.vue"),
        meta: {
          breadcrumb: "تفاصيل السؤال",
          breadcrumbEn: "view questions",
          preLabel: "بنك الأسئلة",
          preLabelEn: "Question bank",
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
          breadcrumbEn: "bloom",
          preLabel: "",
          preLabelEn: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/bloom/add",
        name: "add-bloom",
        component: () => import("../../views/bloom/add-bloom/index.vue"),
        meta: {
          breadcrumb: "إضافة بلوم",
          breadcrumbEn: "add bloom",
          preLabel: "بلوم",
          preLabelEn: "bloom",
          preLink: "/dashboard/bloom",
        },
      },
      {
        path: "/dashboard/bloom/edit/:id",
        name: "edit-bloom",
        component: () => import("../../views/bloom/edit-bloom/index.vue"),
        meta: {
          breadcrumb: "تعديل البلوم",
          breadcrumbEn: "edit bloom",
          preLabel: "بلوم",
          preLabelEn: "bloom",
          preLink: "/dashboard/bloom",
        },
      },
      {
        path: "/dashboard/bloom/show/:id",
        name: "show-bloom",
        component: () => import("../../views/bloom/view-bloom/index.vue"),
        meta: {
          breadcrumb: "تفاصيل البلوم",
          breadcrumbEn: "show bloom",
          preLabel: "بلوم",
          preLabelEn: "bloom",
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
          breadcrumbEn: "objective",
          preLabel: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/objective/add",
        name: "add-objective",
        component: () => import("../../views/objective/add-objective/index.vue"),
        meta: {
          breadcrumb: "إضافة هدف تعليمي",
          breadcrumbEn: "add objective",
          preLabel: "الأهداف التعليمية",
          preLabelEn: "objective",
          preLink: "/dashboard/objective",
        },
      },
      {
        path: "/dashboard/objective/edit/:id",
        name: "edit-objective",
        component: () => import("../../views/objective/edit-objective/index.vue"),
        meta: {
          breadcrumb: "تعديل الهدف تعليمي",
          breadcrumbEn: "edit objective",
          preLabel: "الأهداف التعليمية",
          preLabelEn: "objective",
          preLink: "/dashboard/objective",
        },
      },
      {
        path: "/dashboard/objective/show/:id",
        name: "show-objective",
        component: () => import("../../views/objective/view-objective/index.vue"),
        meta: {
          breadcrumb: "تفاصيل الهدف تعليمي",
          breadcrumbEn: "show objective",
          preLabel: "الأهداف التعليمية",
          preLabelEn: "objective",
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
          breadcrumbEn: "outcome",
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
          breadcrumbEn: "add outcome",
          preLabel: "مخرجات التعلم",
          preLabelEn: "outcome",
          preLink: "/dashboard/outcome",
        },
      },
      {
        path: "/dashboard/outcome/edit/:id",
        name: "edit-outcome",
        component: () => import("../../views/outcome/edit-outcome/index.vue"),
        meta: {
          breadcrumb: "تعديل مخرج التعلم",
          breadcrumbEn: "edit outcome",
          preLabelEn: "outcome",
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
          breadcrumbEn: "show outcome",
          preLabelEn: "outcome",
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
          breadcrumbEn: "lessons",
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
          breadcrumbEn: "add lessons",
          preLabel: "الدروس التعليمية",
          preLabelEn: "lessons",
          preLink: "/dashboard/lessons",
        },
      },
      {
        path: "/dashboard/lessons/edit/:id",
        name: "edit-lessons",
        component: () => import("../../views/lessons/edit-lessons/index.vue"),
        meta: {
          breadcrumb: "تعديل الدرس",
          breadcrumbEn: "edit lessons",
          preLabel: "الدروس",
          preLabelEn: "lessons",
          preLink: "/dashboard/lessons",
        },
      },
      {
        path: "/dashboard/lessons/show/:id",
        name: "show-lessons",
        component: () => import("../../views/lessons/view-lessons/index.vue"),
        meta: {
          breadcrumb: "تفاصيل درس تعليمي",
          breadcrumbEn: "show lessons",
          preLabel: "الدروس",
          preLabelEn: "lessons",
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
          breadcrumbEn: "practices",
          preLabel: "",
          preLabelEn: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/practice/add",
        name: "add-practices",
        component: () => import("../../views/practices/add-practices/index.vue"),
        meta: {
          breadcrumb: "إضافة تمرين",
          breadcrumbEn: "add practices",
          preLabel: "التمارين",
          preLabelEn: "practices",
          preLink: "/dashboard/practices",
        },
      },
      {
        path: "/dashboard/practices/edit/:id",
        name: "edit-practices",
        component: () => import("../../views/practices/edit-practices/index.vue"),
        meta: {
          breadcrumb: "تعديل التمرين",
          breadcrumbEn: "edit practices",
          preLabel: "التمارين",
          preLabelEn: "practices",
          preLink: "/dashboard/practices",
        },
      },
      {
        path: "/dashboard/practices/show/:id",
        name: "show-practices",
        component: () => import("../../views/practices/view-practices/index.vue"),
        meta: {
          breadcrumb: "تفاصيل التمرين",
          breadcrumbEn: "show practices",
          preLabel: "التمارين",
          preLabelEn: "practices",
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
          breadcrumbEn: "paper work",
          preLabel: "",
          preLabelEn: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/paper-work/add",
        name: "add-paper-work",
        component: () => import("../../views/paper-work/add-paper-work/index.vue"),
        meta: {
          breadcrumb: "إضافة ورقة عمل",
          breadcrumbEn: "add paper work",
          preLabel: "أوراق العمل",
          preLabelEn: "paper work",
          preLink: "/dashboard/paper-work",
        },
      },
      {
        path: "/dashboard/paper-work/edit/:id",
        name: "edit-paper-work",
        component: () => import("../../views/paper-work/edit-paper-work/index.vue"),
        meta: {
          breadcrumb: "تعديل ورقة عمل",
          breadcrumbEn: "edit paper work",
          preLabel: "أوراق العمل",
          preLabelEn: "paper work",
          preLink: "/dashboard/paper-work",
        },
      },
      {
        path: "/dashboard/paper-work/show/:id",
        name: "show-paper-work",
        component: () => import("../../views/paper-work/view-paper-work/index.vue"),
        meta: {
          breadcrumb: "تفاصيل ورقة عمل",
          breadcrumbEn: "show paper work",
          preLabel: "أوراق العمل",
          preLabelEn: "paper work",
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
          breadcrumbEn: "missions",
          preLabel: "",
          preLabelEn: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/missions/add",
        name: "add-missions",
        component: () => import("../../views/missions/add-missions/index.vue"),
        meta: {
          breadcrumb: "إضافة مهمة",
          breadcrumbEn: "add mission",
          preLabel: "المهام",
          preLabelEn: "missions",
          preLink: "/dashboard/missions",
        },
      },
      {
        path: "/dashboard/missions/edit/:id",
        name: "edit-missions",
        component: () => import("../../views/missions/edit-missions/index.vue"),
        meta: {
          breadcrumb: "تعديل المهمة",
          breadcrumbEn: "edit mission",
          preLabel: "المهام",
          preLabelEn: "missions",
          preLink: "/dashboard/missions",
        },
      },
      {
        path: "/dashboard/missions/show/:id",
        name: "show-missions",
        component: () => import("../../views/missions/view-missions/index.vue"),
        meta: {
          breadcrumb: "تفاصيل المهمة",
          breadcrumbEn: "view mission",
          preLabel: "المهام",
          preLabelEn: "missions",
          preLink: "/dashboard/missions",
        },
      },
      // seasonal mission groups
      {
        path: "/dashboard/seasonal-mission-group",
        name: "seasonal-mission-groups",
        component: () => import("../../views/seasonal-mission-group/index.vue"),
        meta: {
          breadcrumb: "مجموعة المهام المدرسية",
          breadcrumbEn: "seasonal mission group",
          preLabel: "",
          preLabelEn: "",
          preLink: "",
        },
      },
      {
        path: "/dashboard/seasonal-mission-group/add",
        name: "add-seasonal-mission-group",
        component: () =>
          import("../../views/seasonal-mission-group/add-seasonal-mission-group/index.vue"),
        meta: {
          breadcrumb: "إضافة مجموعة جديدة",
          breadcrumbEn: "add seasonal mission group",
          preLabel: "مجموعة المهام المدرسية",
          preLabelEn: "seasonal mission group",
          preLink: "/dashboard/seasonal-mission-group",
        },
      },
      {
        path: "/dashboard/seasonal-mission-group/edit/:id",
        name: "edit-seasonal-mission-group",
        component: () =>
          import("../../views/seasonal-mission-group/edit-seasonal-mission-group/index.vue"),
        meta: {
          breadcrumb: "تعديل المجموعة",
          breadcrumbEn: "edit seasonal mission group",
          preLabel: "مجموعة المهام المدرسية",
          preLabelEn: "seasonal mission group",
          preLink: "/dashboard/seasonal-mission-group",
        },
      },
      {
        path: "/dashboard/seasonal-mission-group/show/:id",
        name: "show-seasonal-mission-group",
        component: () =>
          import("../../views/seasonal-mission-group/view-seasonal-mission-group/index.vue"),
        meta: {
          breadcrumb: "تفاصيل المجموعة",
          breadcrumbEn: "show seasonal mission group",
          preLabel: "مجموعة المهام المدرسية",
          preLabelEn: "seasonal mission group",
          preLink: "/dashboard/seasonal-mission-group",
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
          breadcrumb: "مسارات الصف الدراسي",
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
          breadcrumb: "مسارات الصف الدراسي",
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
        path: "/view-profile",
        name: "view-profile",
        component: () => import("../../views/profile/view-profile/index.vue"),
        meta: {
          breadcrumb: "الملف الشخصي",
        },
      },
      {
        path: "/edit-profile",
        name: "edit-profile",
        component: () => import("../../views/profile/edit-profile/index.vue"),
        meta: {
          breadcrumb: "تعديل الملف الشخصي",
        },
      },
      // prizes
      ...badges,
      ...characters,
      ...powerUpBoxes,
      ...jeelLibrary,
      ...jeelStoreGames,
      ...jeelStoreCharacters,
      ...jeelStoreLibrary,
      ...schoolAdmin,
      ...supervisor,
      ...seasonalMissions,
      ...systemAudios,
      ...academicYear,
      ...parent,
      ...teacher,
      ...reports,
      ...schoolAdminReports,
      ...jeelAdmin
    ],
  },
];

export default protectedRoutes;
