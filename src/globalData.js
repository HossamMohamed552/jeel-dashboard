let routesUsers = [
  {
    name: 'صلاحيات النظام',
    path: '/dashboard/role',
    icon: require('@/assets/images/icons/permissions.png')
  },
  {
    name: 'قائمة المستخدمين',
    path: '/dashboard/users',
    icon: require('@/assets/images/icons/list.svg')
  },
  {
    name: 'الباقات',
    path: '/dashboard/package',
    icon: require('@/assets/images/icons/list.svg')
  }
]
let routesSchool = [
  {
    name: 'مجموعات المدارس',
    path: '/dashboard/school-group',
    icon: require('@/assets/images/icons/school-group.svg')
  },
  {
    name: 'قائمة المدارس',
    path: '/dashboard/schools',
    icon: require('@/assets/images/icons/school-list.svg')
  },
  {
    name: 'قائمة المراحل الدراسية',
    path: '/dashboard/levels',
    icon: require('@/assets/images/icons/list-steps.svg')
  },
  {
    name: 'الفصول الدراسية',
    path: '/dashboard/terms',
    icon: require('@/assets/images/icons/school-section.svg')
  }
]
let routesContent = [
  {
    name: 'الدول',
    path: '/dashboard/country',
    icon: require('@/assets/images/icons/country.svg')
  },
  {
    name: 'المسارات',
    path: '/dashboard/path',
    icon: require('@/assets/images/icons/path.svg')
  },
  {
    name: 'الفيديوهات',
    path: '/dashboard/video',
    icon: require('@/assets/images/icons/video.svg')
  },
  {
    name: 'بنك الاسئلة',
    path: '/dashboard/questions',
    icon: require('@/assets/images/icons/question.svg')
  },
  {
    name: 'التمارين',
    path: '/dashboard/practices',
    icon: require('@/assets/images/icons/exercises.svg')
  },
  {
    name: 'أوراق العمل',
    path: '/dashboard/paper-work',
    icon: require('@/assets/images/icons/paper-work.svg')
  },
  {
    name: 'المهام',
    path: '/dashboard/tasks',
    icon: require('@/assets/images/icons/mission.svg')
  },
  {
    name: 'المراحل',
    path: '/dashboard/missions',
    icon: require('@/assets/images/icons/steps.svg')
  }
]
export {routesUsers, routesSchool, routesContent}
