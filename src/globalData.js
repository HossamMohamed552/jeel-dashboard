import store from "@/store";

let routesUsers = [
  {
    name: "صلاحيات النظام",
    path: "/dashboard/role",
    altImage: 'roles',
    titleImage: 'roles',
    icon: require("@/assets/images/icons/permissions.png"),
    permission: "view-roles",
  },
  {
    name: "قائمة المستخدمين",
    path: "/dashboard/users",
    altImage: 'users',
    titleImage: 'users',
    icon: require("@/assets/images/icons/list.svg"),
    permission: "view-users",
  },
  {
    name: "الباقات",
    path: "/dashboard/package",
    altImage: 'packages',
    titleImage: 'packages',
    icon: require("@/assets/images/icons/packages.svg"),
    permission: "view-packages",
  },
];
let routesSchool = [
  {
    name: "مجموعات المدارس",
    path: "/dashboard/school-group",
    altImage: 'schoolGroups',
    titleImage: 'schoolGroups',
    icon: require("@/assets/images/icons/school-group.svg"),
    permission: "view-schoolGroups",
  },
  {
    name: "قائمة المدارس",
    path: "/dashboard/schools",
    altImage: 'schools',
    titleImage: 'schools',
    icon: require("@/assets/images/icons/school-list.svg"),
    permission: "view-schools",
  },
  {
    name: "قائمة أنواع المدارس",
    path: "/dashboard/school-type",
    altImage: 'schoolTypes',
    titleImage: 'schoolTypes',
    icon: require("@/assets/images/icons/school-list.svg"),
    permission: "view-schoolTypes",
  },
  {
    name: "قائمة المراحل الدراسية",
    path: "/dashboard/levels",
    altImage: 'levels',
    titleImage: 'levels',
    icon: require("@/assets/images/icons/list-steps.svg"),
    permission: "view-levels",
  },
  {
    name: "الفصول الدراسية",
    path: "/dashboard/terms",
    altImage: 'terms',
    titleImage: 'terms',
    icon: require("@/assets/images/icons/school-section.svg"),
    permission: "view-terms",
  },
];
let routesContent = [
  {
    name: "الفيديوهات",
    path: "/dashboard/video",
    altImage: 'video',
    titleImage: 'video',
    icon: require("@/assets/images/icons/video.svg"),
    permission: "view-video",
  },
  {
    name: "بنك الاسئلة",
    path: "/dashboard/questions",
    altImage: 'questions',
    titleImage: 'questions',
    icon: require("@/assets/images/icons/question.svg"),
    permission: "view-questions",
  },

  {
    name: "التمارين",
    path: "/dashboard/practices",
    altImage: 'practices',
    titleImage: 'practices',
    icon: require("@/assets/images/icons/exercises.svg"),
    permission: "view-quizzes",
  },
  {
    name: "أوراق العمل",
    path: "/dashboard/paper-work",
    altImage: 'paperWork',
    titleImage: 'paperWork',
    icon: require("@/assets/images/icons/paper-work.svg"),
    permission: "view-paperWork",
  },
  // {
  //   name: 'المهام',
  //   path: '/dashboard/tasks',
  //   icon: require('@/assets/images/icons/mission.svg'),

  // },
  {
    name: "المهام",
    path: "/dashboard/missions",
    altImage: 'missions',
    titleImage: 'missions',
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-missions",
  },
];
let routeSettings = [
  {
    name: "جيمز",
    path: "/dashboard/jems",
    altImage: 'jems',
    titleImage: 'jems',
    icon: require("@/assets/images/icons/country.svg"),
    permission: "view-countries",
  },
  {
    name: "نظام المكافآت",
    path: "/dashboard/rewarding-actions",
    altImage: 'rewarding-actions',
    titleImage: 'rewarding-actions',
    icon: require("@/assets/images/icons/country.svg"),
    permission: "view-countries",
  },
  {
    name: "المستويات",
    path: "/dashboard/student-levels",
    altImage: 'student-levels',
    titleImage: 'student-levels',
    icon: require("@/assets/images/icons/country.svg"),
    permission: "view-countries",
  },
  {
    name: "صعوبة السؤال",
    path: "/dashboard/question-difficulty",
    altImage: 'questionDifficulty',
    titleImage: 'questionDifficulty',
    icon: require("@/assets/images/icons/question.svg"),
    permission: "view-questionDifficulty",
  },
];
let routeBasicData = [
  {
    name: "الدول",
    path: "/dashboard/country",
    altImage: 'countries',
    titleImage: 'countries',
    icon: require("@/assets/images/icons/country.svg"),
    permission: "view-countries",
  },
  {
    name: "المسارات",
    path: "/dashboard/path",
    altImage: 'learning-path',
    titleImage: 'learning-path',
    icon: require("@/assets/images/icons/path.svg"),
    permission: "view-learningpath",
  },
  {
    name: "بلوم",
    path: "/dashboard/bloom",
    altImage: 'bloom',
    titleImage: 'bloom',
    icon: require("@/assets/images/icons/question.svg"),
    permission: "view-bloomCategory",
  },
  {
    name: "الاهداف التعليمية",
    path: "/dashboard/objective",
    altImage: 'objective',
    titleImage: 'objective',
    icon: require("@/assets/images/icons/question.svg"),
    permission: "view-objective",
  },
  {
    name: "مخرجات التعلم",
    path: "/dashboard/outcome",
    altImage: 'outcome',
    titleImage: 'outcome',
    icon: require("@/assets/images/icons/question.svg"),
    permission: "view-outcome",
  }
]
let routeSuperVisor = [

  {
    name: "الفصول",
    path: "/dashboard/super-class",
    altImage: 'super-class',
    titleImage: 'super-class',
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-classes",
  },
  {
    name: "المهام",
    path: "/dashboard/missions-supervisor",
    altImage: 'missions-supervisor',
    titleImage: 'missions-supervisor',
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-supervisor-missions",
  },
  {
    name: "المدرسين",
    path: "/dashboard/teachers",
    altImage: 'view-teachers',
    titleImage: 'view-teachers',
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-teachers",
  },
  {
    name: "الطلاب",
    path: "/dashboard/students",
    altImage: 'view-students',
    titleImage: 'view-students',
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-roles",
  },
  {
    name: "المسابقات",
    path: "/dashboard/competitions",
    altImage: 'view-competitions',
    titleImage: 'view-competitions',
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-roles",
  },
  {
    name: "الإعلانات",
    path: "/dashboard/advertisements",
    altImage: 'view-announcements',
    titleImage: 'view-advertisements',
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-announcements",
  }

]
export {routesUsers, routesSchool, routesContent, routeSettings, routeBasicData, routeSuperVisor};
