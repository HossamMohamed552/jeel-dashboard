import store from "@/store";

let routesUsers = [
  {
    name: "الأدوار الوظيفية",
    path: "/dashboard/role",
    altImage: "roles",
    titleImage: "roles",
    icon: require("@/assets/images/icons/permissions.png"),
    permission: "view-roles",
  },
  {
    name: "المستخدمين إدارة المنظومة",
    path: "/dashboard/users",
    altImage: "users",
    titleImage: "users",
    icon: require("@/assets/images/icons/list.svg"),
    permission: "view-users",
  },
  {
    name: "مستخدمين المدارس",
    path: "/dashboard/schools-users-search/",
    altImage: "schools-users-search",
    titleImage: "schools-users-search",
    icon: require("@/assets/images/icons/list.svg"),
    permission: "view-users",
  },
];
let routesSchool = [
  {
    name: "نوع الادارة",
    path: "/dashboard/school-department-types",
    altImage: "management-types",
    titleImage: "management-types",
    icon: require("@/assets/images/icons/school-group.svg"),
    // todo tooo change the permission acc to backend
    permission: "view-management-types",
  },
  {
    name: "نوع الشهادة",
    path: "/dashboard/school-degree-types",
    altImage: "certificates",
    titleImage: "certificates",
    icon: require("@/assets/images/icons/school-group.svg"),
    // todo tooo change the permission acc to backend
    permission: "view-certificates",
  },
  {
    name: "اللغات",
    path: "/dashboard/school-languages",
    altImage: "languages",
    titleImage: "languages",
    icon: require("@/assets/images/icons/school-group.svg"),
    // todo tooo change the permission acc to backend
    permission: "view-languages",
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
    name: "المدارس",
    path: "/dashboard/schools",
    altImage: "schools",
    titleImage: "schools",
    icon: require("@/assets/images/icons/school-list.svg"),
    permission: "view-schools",
  },
  // {
  //   name: "قائمة أنواع المدارس",
  //   path: "/dashboard/school-type",
  //   altImage: "schoolTypes",
  //   titleImage: "schoolTypes",
  //   icon: require("@/assets/images/icons/school-list.svg"),
  //   permission: "view-schoolTypes",
  // },
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
    permission: "view-tasks",
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
    name: "الصفوف الدراسية",
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
    permission: "view-seasonal-mission-groups",
  },
  {
    name: "المهام الموسمية",
    path: "/dashboard/seasonal-mission",
    altImage: "seasonal-mission",
    titleImage: "seasonal-mission",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-seasonal-missions",
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
    permission: "view-jeel-level-xps",
  },
  {
    name: "جوائز التفاعل",
    path: "/dashboard/rewarding-actions",
    altImage: "rewarding-actions",
    titleImage: "rewarding-actions",
    icon: require("@/assets/images/icons/country.svg"),
    permission: "view-reward-actions",
  },
  {
    name: "أصوات المنصة",
    path: "/dashboard/system-audios",
    altImage: "system-audios",
    titleImage: "system-audios",
    icon: require("@/assets/images/icons/country.svg"),
    permission: "view-system-audio",
  },
  // {
  //   name: "جيمز",
  //   path: "/dashboard/jems",
  //   altImage: "jems",
  //   titleImage: "jems",
  //   icon: require("@/assets/images/icons/country.svg"),
  //   permission: "view-gems",
  // },
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
    permission: "view-languageSkill",
  },
  {
    name: "أساليب التعلم",
    path: "/dashboard/learning-style",
    altImage: "learning-style",
    titleImage: "learning-style",
    icon: require("@/assets/images/icons/school-section.svg"),
    // todo to change the permission
    permission: "view-languageMethod",
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
    permission: "view-lesson",
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
    permission: "view-currencies",
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
    permission: "view-studyYear",
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
    name: "الصفوف الدراسية",
    path: "/dashboard/super-level",
    altImage: "super-level",
    titleImage: "super-level",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-supervisor-levels",
  },
  {
    name: "الفصول",
    path: "/dashboard/super-class",
    altImage: "super-class",
    titleImage: "super-class",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-supervisor-classes",
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
    permission: "view-supervisor-teachers",
  },
  {
    name: "الطلاب",
    path: "/dashboard/students",
    altImage: "view-students",
    titleImage: "view-students",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-supervisor-students",
  },
  {
    name: "المسابقات",
    path: "/dashboard/competitions",
    altImage: "view-competitions",
    titleImage: "view-competitions",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-competition",
  },
  {
    name: "الرسائل",
    path: "/dashboard/advertisements",
    altImage: "view-announcements",
    titleImage: "view-advertisements",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-announcements",
  },
];
let routeSchoolAdmin =[
  {
    name: "المستخدمين",
    path: "/dashboard/all-school-users",
    altImage: "users",
    titleImage: "users",
    icon: require("@/assets/images/icons/list.svg"),
    permission: "view-school-users",
  },
  {
    name: "بيانات المدرسة",
    path: "/dashboard/school-info",
    altImage: "school-info",
    titleImage: "school-info",
    icon: require("@/assets/images/icons/list.svg"),
    permission: "show-schooladmin-school-info",
  },
  //TODO
  {
    name: "إدارة العام الدراسي",
    path: "/dashboard/management-academic-year",
    altImage: "management-academic-year",
    titleImage: "management-academic-year",
    icon: require("@/assets/images/icons/list.svg"),
    permission: "view-school-study-years",
  },
  {
    name: "الفصول",
    path: "/dashboard/school-admin-classes",
    altImage: "classes",
    titleImage: "classes",
    icon: require("@/assets/images/icons/list.svg"),
    permission: "view-classes",
  },
  {
    name: "مديري المدرسة",
    path: "/dashboard/school-admins-users",
    altImage: "schooladmins-users",
    titleImage: "schooladmins-users",
    icon: require("@/assets/images/icons/list.svg"),
    permission: "view-schooladmins-users",
  },
  {
    name: "المشرفين",
    path: "/dashboard/supervisors-users",
    altImage: "supervisors-users",
    titleImage: "supervisors-users",
    icon: require("@/assets/images/icons/list.svg"),
    permission: "view-supervisors-users",
  },
  {
    name: "المدرسين",
    path: "/dashboard/teachers-users",
    altImage: "teachers-users",
    titleImage: "teachers-users",
    icon: require("@/assets/images/icons/list.svg"),
    permission: "view-teachers-users",
  },
  {
    name: "الطلاب",
    path: "/dashboard/students-users",
    altImage: "students-users",
    titleImage: "students-users",
    icon: require("@/assets/images/icons/list.svg"),
    permission: "view-students-users",
  },
  //TODO
  {
    name: "أولياء الأمور",
    path: "/dashboard/parents-users",
    altImage: "parents-users",
    titleImage: "parents-users",
    icon: require("@/assets/images/icons/list.svg"),
    permission: "view-parents-users",
  },
]
let routesPrizes = [
  {
    name: "شارات جيل",
    path: "/dashboard/jeel-badge",
    altImage: "jeel-badge",
    titleImage: "jeel-badge",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-badge",
  },
  {
    name: "الشخصيات",
    path: "/dashboard/characters",
    altImage: "characters",
    titleImage: "characters",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-prize-characters",
  },
  {
    name: "مكتبة جيل",
    path: "/dashboard/jeel-library",
    altImage: "jeel-library",
    titleImage: "jeel-library",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-prize-library",
  },
  {
    name: "صناديق الطاقة",
    path: "/dashboard/power-up-boxes",
    altImage: "power-up-boxes",
    titleImage: "power-up-boxes",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-power-up-boxes",
  },
];
let routesJeelStores = [
  {
    name: "مجموعة جيمز",
    path: "/dashboard/jeel-store-games",
    altImage: "jeel-store-games",
    titleImage: "jeel-store-games",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-gems",
  },
  {
    name: "شخصيات الشراء",
    path: "/dashboard/jeel-store-character",
    altImage: "jeel-store-character",
    titleImage: "jeel-store-character",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-store-characters",
  },
  {
    name: "مكتبة الشراء",
    path: "/dashboard/jeel-store-library",
    altImage: "jeel-store-library",
    titleImage: "jeel-store-library",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-store-library",
  },
];
let routesTeacher = [
  {
    name: "الفصول",
    path: "/dashboard/teacher-class",
    altImage: "teacher-class",
    titleImage: "teacher-class",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-teacher-classes",
  },
  {
    name: "الصفوف الدراسية",
    path: "/dashboard/teacher-level",
    altImage: "teacher-level",
    titleImage: "teacher-level",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-teacher-levels",
  },
  {
    name: "المهام",
    path: "/dashboard/teacher-mission",
    altImage: "missions-teacher",
    titleImage: "missions-teacher",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-teacher-missions",
  },
  {
    name: "تصحيح المهام",
    path: "/dashboard/teacher-revision-mission",
    altImage: "teacher-revision-mission",
    titleImage: "teacher-revision-mission",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-teacher-revision-missions",
  },
  {
    name: "الطلاب",
    path: "/dashboard/teacher-students",
    altImage: "view-teacher-students",
    titleImage: "view-teacher-students",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-teacher-students",
  },
  {
    name: "المسابقات",
    path: "/dashboard/teacher-competitions",
    altImage: "view-competitions",
    titleImage: "view-competitions",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-teacher-competitions",
  },
  {
    name: "الرسائل",
    path: "/dashboard/teacher-advertisements",
    altImage: "view-announcements",
    titleImage: "view-advertisements",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-teacher-announcements",
  },
];
let routesParent = [
  {
    name: "الدخول اليومى",
    path: "/dashboard/daily-login",
    altImage: "parent-daily-login",
    titleImage: "parent-daily-login",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-studnet-parent-daily-login",
  },
  {
    name: "المهام",
    path: "/dashboard/parent-missions",
    altImage: "parent-missions",
    titleImage: "parent-missions",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-studnet-parent-missions",
  },
  {
    name: "التعليقات",
    path: "/dashboard/parent-comments",
    altImage: "parent-comments",
    titleImage: "parent-comments",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-studnet-parent-comments",
  },
  {
    name: "الانجازات",
    path: "/dashboard/parent-achievements",
    altImage: "parent-achievements",
    titleImage: "parent-achievements",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-studnet-parent-achievements",
  },
  {
    name: "المنافسات",
    path: "/dashboard/parent-competitions",
    altImage: "parent-competitions",
    titleImage: "parent-competitions",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-studnet-parent-competitions",
  },
  {
    name: "المواسم",
    path: "/dashboard/parent-seasonal-missions",
    altImage: "parent-seasonal-missions",
    titleImage: "parent-seasonal-missions",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-studnet-parent-seasonal-missions",
  },
  {
    name: "لوحة الصدارة",
    path: "/dashboard/parent-leaderboard",
    altImage: "parent-leaderboard",
    titleImage: "parent-leaderboard",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-studnet-parent-leaderboard",
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
  routesJeelStores,
  routeSchoolAdmin,
  routesTeacher,
  routesParent
};
