import store from "@/store";

let routesUsers = [
  {
    name: "صلاحيات النظام",
    path: "/dashboard/role",
    altImage: "roles",
    titleImage: "roles",
    icon: require("@/assets/images/icons/permissions.png"),
    permission: "view-roles",
  },
  {
    name: "قائمة المستخدمين",
    path: "/dashboard/users",
    altImage: "users",
    titleImage: "users",
    icon: require("@/assets/images/icons/list.svg"),
    permission: "view-users",
  },
];
let routesSchool = [
  {
    name: "نوع الادارة",
    path: "/dashboard/school-department-types",
    altImage: "schoolGroups",
    titleImage: "schoolGroups",
    icon: require("@/assets/images/icons/school-group.svg"),
    // todo tooo change the permission acc to backend
    permission: "view-schoolGroups",
  },
  {
    name: "نوع الشهادة",
    path: "/dashboard/school-degree-types",
    altImage: "schoolGroups",
    titleImage: "schoolGroups",
    icon: require("@/assets/images/icons/school-group.svg"),
    // todo tooo change the permission acc to backend
    permission: "view-schoolGroups",
  },
  {
    name: "اللغات",
    path: "/dashboard/school-languages",
    altImage: "schoolGroups",
    titleImage: "schoolGroups",
    icon: require("@/assets/images/icons/school-group.svg"),
    // todo tooo change the permission acc to backend
    permission: "view-schoolGroups",
  },
  {
    name: "مجموعات المدارس",
    path: "/dashboard/school-group",
    altImage: "schoolGroups",
    titleImage: "schoolGroups",
    icon: require("@/assets/images/icons/school-group.svg"),
    permission: "view-schoolGroups",
  },
  {
    name: "قائمة المدارس",
    path: "/dashboard/schools",
    altImage: "schools",
    titleImage: "schools",
    icon: require("@/assets/images/icons/school-list.svg"),
    permission: "view-schools",
  },
  {
    name: "قائمة أنواع المدارس",
    path: "/dashboard/school-type",
    altImage: "schoolTypes",
    titleImage: "schoolTypes",
    icon: require("@/assets/images/icons/school-list.svg"),
    permission: "view-schoolTypes",
  },
];
let routesContent = [
  {
    name: "الفيديوهات",
    path: "/dashboard/video",
    altImage: "video",
    titleImage: "video",
    icon: require("@/assets/images/icons/video.svg"),
    permission: "view-video",
  },
  {
    name: "الاسئلة",
    path: "/dashboard/questions",
    altImage: "questions",
    titleImage: "questions",
    icon: require("@/assets/images/icons/question.svg"),
    permission: "view-questions",
  },

  {
    name: "التمارين",
    path: "/dashboard/practices",
    altImage: "practices",
    titleImage: "practices",
    icon: require("@/assets/images/icons/exercises.svg"),
    permission: "view-quizzes",
  },
  {
    name: "التسجيلات الصوتية",
    path: "/dashboard/audio",
    altImage: "audio",
    titleImage: "audio",
    icon: require("@/assets/images/icons/video.svg"),
    permission: "view-video",
  },
  {
    name: "أوراق العمل",
    path: "/dashboard/paper-work",
    altImage: "paperWork",
    titleImage: "paperWork",
    icon: require("@/assets/images/icons/paper-work.svg"),
    permission: "view-paperWork",
  },
];
let routesMissions = [
  {
    name: "الدول",
    path: "/dashboard/country",
    altImage: "countries",
    titleImage: "countries",
    icon: require("@/assets/images/icons/country.svg"),
    permission: "view-countries",
  },
  {
    name: "قائمة الصفوف الدراسية",
    path: "/dashboard/levels",
    altImage: "levels",
    titleImage: "levels",
    icon: require("@/assets/images/icons/list-steps.svg"),
    permission: "view-levels",
  },
  {
    name: "الترم الدراسي",
    path: "/dashboard/terms",
    altImage: "terms",
    titleImage: "terms",
    icon: require("@/assets/images/icons/school-section.svg"),
    permission: "view-terms",
  },
  {
    name: "المهام",
    path: "/dashboard/missions",
    altImage: "missions",
    titleImage: "missions",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-missions",
  },
  {
    name: "مجموعة المهام الموسمية",
    path: "/dashboard/seasonal-mission-group",
    altImage: "seasonal-mission-group",
    titleImage: "seasonal-mission-group",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-missions",
  },
];
let routeSettings = [
  {
    name: "مستوى السؤال",
    path: "/dashboard/question-difficulty",
    altImage: "questionDifficulty",
    titleImage: "questionDifficulty",
    icon: require("@/assets/images/icons/question.svg"),
    permission: "view-questionDifficulty",
  },
  {
    name: "نقاط المستوى",
    path: "/dashboard/student-levels",
    altImage: "student-levels",
    titleImage: "student-levels",
    icon: require("@/assets/images/icons/country.svg"),
    permission: "view-countries",
  },
  {
    name: "جوائز التفاعل",
    path: "/dashboard/rewarding-actions",
    altImage: "rewarding-actions",
    titleImage: "rewarding-actions",
    icon: require("@/assets/images/icons/country.svg"),
    permission: "view-countries",
  },
  {
    name: "جيمز",
    path: "/dashboard/jems",
    altImage: "jems",
    titleImage: "jems",
    icon: require("@/assets/images/icons/country.svg"),
    permission: "view-countries",
  },
];
let routeBasicData = [
  {
    name: "بلوم",
    path: "/dashboard/bloom",
    altImage: "bloom",
    titleImage: "bloom",
    icon: require("@/assets/images/icons/question.svg"),
    permission: "view-bloomCategory",
  },
  {
    name: "أنواع المهارات",
    path: "/dashboard/learning-skill",
    altImage: "learning-skill",
    titleImage: "learning-skill",
    icon: require("@/assets/images/icons/school-section.svg"),
    // todo to change the permission
    permission: "view-outcome",
  },
  {
    name: "أساليب التعلم",
    path: "/dashboard/learning-style",
    altImage: "learning-style",
    titleImage: "learning-style",
    icon: require("@/assets/images/icons/school-section.svg"),
    // todo to change the permission
    permission: "view-outcome",
  },
  {
    name: "المسارات التعليمية",
    path: "/dashboard/path",
    altImage: "learning-path",
    titleImage: "learning-path",
    icon: require("@/assets/images/icons/path.svg"),
    permission: "view-learningpath",
  },
  {
    name: "الدروس",
    path: "/dashboard/lessons",
    altImage: "lessons",
    titleImage: "lessons",
    icon: require("@/assets/images/icons/question.svg"),
    permission: "view-outcome",
  },
  {
    name: "أهداف التعلم",
    path: "/dashboard/objective",
    altImage: "objective",
    titleImage: "objective",
    icon: require("@/assets/images/icons/question.svg"),
    permission: "view-objective",
  },
  {
    name: "مخرجات التعلم",
    path: "/dashboard/outcome",
    altImage: "outcome",
    titleImage: "outcome",
    icon: require("@/assets/images/icons/question.svg"),
    permission: "view-outcome",
  },
];
let routesSubscribes = [
  {
    name: "العملات",
    path: "/dashboard/currency",
    altImage: "currency",
    titleImage: "currency",
    icon: require("@/assets/images/icons/school-section.svg"),
    // todo to change the permission
    permission: "view-outcome",
  },
  {
    name: "الباقات",
    path: "/dashboard/package",
    altImage: "packages",
    titleImage: "packages",
    icon: require("@/assets/images/icons/packages.svg"),
    permission: "view-packages",
  },
  {
    name: "العام الدراسي",
    path: "/dashboard/school-year",
    altImage: "school-year",
    titleImage: "school-year",
    icon: require("@/assets/images/icons/school-section.svg"),
    // todo to change the permission
    permission: "view-terms",
  },
  {
    name: "الإشتراكات",
    path: "/dashboard/subscription",
    altImage: "packages",
    titleImage: "packages",
    icon: require("@/assets/images/icons/packages.svg"),
    permission: "view-subscription",
  },
];
let routeSuperVisor = [
  {
    name: "الفصول",
    path: "/dashboard/super-class",
    altImage: "super-class",
    titleImage: "super-class",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-classes",
  },
  {
    name: "المهام",
    path: "/dashboard/super-mission",
    altImage: "missions-supervisor",
    titleImage: "missions-supervisor",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-supervisor-missions",
  },
  {
    name: "المدرسين",
    path: "/dashboard/teachers",
    altImage: "view-teachers",
    titleImage: "view-teachers",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-teachers",
  },
  {
    name: "الطلاب",
    path: "/dashboard/students",
    altImage: "view-students",
    titleImage: "view-students",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-roles",
  },
  {
    name: "المسابقات",
    path: "/dashboard/competitions",
    altImage: "view-competitions",
    titleImage: "view-competitions",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-competitions",
  },
  {
    name: "الإعلانات",
    path: "/dashboard/advertisements",
    altImage: "view-announcements",
    titleImage: "view-advertisements",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-announcements",
  },
];

let routesPrizes = [
  {
    name: "شارات جيل",
    path: "/dashboard/jeel-badge",
    altImage: "jeel-badge",
    titleImage: "jeel-badge",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-classes",
  },
  {
    name: "الشخصيات",
    path: "/dashboard/characters",
    altImage: "characters",
    titleImage: "characters",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-classes",
  },
  {
    name: "مكتبة جيل",
    path: "/dashboard/jeel-library",
    altImage: "jeel-library",
    titleImage: "jeel-library",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-classes",
  },
  {
    name: "صناديق الطاقة",
    path: "/dashboard/power-up-boxes",
    altImage: "power-up-boxes",
    titleImage: "power-up-boxes",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-classes",
  },
];

let routesJeelStores = [
  {
    name: "مجموعة جيمز",
    path: "/dashboard/jeel-store-games",
    altImage: "jeel-store-games",
    titleImage: "jeel-store-games",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-classes",
  },
  {
    name: "شخصيات الشراء",
    path: "/dashboard/jeel-store-character",
    altImage: "jeel-store-character",
    titleImage: "jeel-store-character",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-classes",
  },
  {
    name: "مكتبة الشراء",
    path: "/dashboard/jeel-store-library",
    altImage: "jeel-store-library",
    titleImage: "jeel-store-library",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-classes",
  },
];


export {
  routesUsers,
  routesSchool,
  routesContent,
  routeSettings,
  routeBasicData,
  routesMissions,
  routesSubscribes,
  routeSuperVisor,
  routesPrizes,
  routesJeelStores
};
