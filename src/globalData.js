import store from "@/store";

let routesUsers = [
  {
    name: "صلاحيات النظام",
    path: "/dashboard/role",
    icon: require("@/assets/images/icons/permissions.png"),
    permission: "view-roles",
  },
  {
    name: "قائمة المستخدمين",
    path: "/dashboard/users",
    icon: require("@/assets/images/icons/list.svg"),
    permission: "view-users",
  },
  {
    name: "الباقات",
    path: "/dashboard/package",
    icon: require("@/assets/images/icons/packages.svg"),
    permission: "view-packages",
  },
];
let routesSchool = [
  {
    name: "أنواع المدارس",
    path: "/dashboard/school-group",
    icon: require("@/assets/images/icons/school-group.svg"),
    permission: "view-schoolGroups",
  },
  {
    name: "قائمة المدارس",
    path: "/dashboard/schools",
    icon: require("@/assets/images/icons/school-list.svg"),
    permission: "view-schools",
  },
  {
    name: "مجموعات المدارس",
    path: "/dashboard/school-type",
    icon: require("@/assets/images/icons/school-list.svg"),
    permission: "view-schoolTypes",
  },
  {
    name: "قائمة المراحل الدراسية",
    path: "/dashboard/levels",
    icon: require("@/assets/images/icons/list-steps.svg"),
    permission: "view-levels",
  },
  {
    name: "الفصول الدراسية",
    path: "/dashboard/terms",
    icon: require("@/assets/images/icons/school-section.svg"),
    permission: "view-terms",
  },
];
let routesContent = [
  {
    name: "الدول",
    path: "/dashboard/country",
    icon: require("@/assets/images/icons/country.svg"),
    permission: "view-countries",
  },
  {
    name: "المسارات",
    path: "/dashboard/path",
    icon: require("@/assets/images/icons/path.svg"),
    permission: "view-learningpath",
  },
  {
    name: "الفيديوهات",
    path: "/dashboard/video",
    icon: require("@/assets/images/icons/video.svg"),
    permission: "view-video",
  },
  {
    name: "بنك الاسئلة",
    path: "/dashboard/questions",
    icon: require("@/assets/images/icons/question.svg"),
    permission: "view-questions",
  },
  {
    name: "بلوم",
    path: "/dashboard/bloom",
    icon: require("@/assets/images/icons/question.svg"),
    permission: "view-bloomCategory",
  },
  {
    name: "التمارين",
    path: "/dashboard/practices",
    icon: require("@/assets/images/icons/exercises.svg"),
    permission: "view-quizzes",
  },
  {
    name: "أوراق العمل",
    path: "/dashboard/paper-work",
    icon: require("@/assets/images/icons/paper-work.svg"),
    permission: "view-paperWork",
  },
  // {
  //   name: 'المهام',
  //   path: '/dashboard/tasks',
  //   icon: require('@/assets/images/icons/mission.svg'),

  // },
  {
    name: "المراحل",
    path: "/dashboard/missions",
    icon: require("@/assets/images/icons/steps.svg"),
    permission: "view-missions",
  },
];
let routeSettings = [
  {
    name: "جيمز",
    path: "/dashboard/jems",
    icon: require("@/assets/images/icons/country.svg"),
    permission: "view-countries",
  },
  {
    name: "نظام المكافآت",
    path: "/dashboard/rewarding-actions",
    icon: require("@/assets/images/icons/country.svg"),
    permission: "view-countries",
  },
  {
    name: "المستويات",
    path: "/dashboard/student-levels",
    icon: require("@/assets/images/icons/country.svg"),
    permission: "view-countries",
  },
  {
    name: "صعوبة السؤال",
    path: "/dashboard/question-difficulty",
    icon: require("@/assets/images/icons/question.svg"),
    permission: "view-questionDifficulty",
  },
];
export { routesUsers, routesSchool, routesContent, routeSettings };
