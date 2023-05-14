let routesUsers = [
  {
    name: 'صلاحيات النظام',
    path: '/dashboard/permission',
    icon: require('@/assets/images/icons/permissions.png')
  },
  {
    name: 'قائمة المستخدمين',
    path: '/dashboard/users',
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
    path: '/dashboard/school-list',
    icon: require('@/assets/images/icons/school-list.svg')
  },
  {
    name: 'قائمة المدارس',
    path: '/dashboard/school-list',
    icon: require('@/assets/images/icons/school-list.svg')
  },
  {
    name: 'قائمة المراحل الدراسية',
    path: '/dashboard/list-steps',
    icon: require('@/assets/images/icons/list-steps.svg')
  },
  {
    name: 'الصفوف الدراسية',
    path: '/dashboard/school-section',
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
    path: '/dashboard/question',
    icon: require('@/assets/images/icons/question.svg')
  },
  {
    name: 'التمارين',
    path: '/dashboard/exercises',
    icon: require('@/assets/images/icons/exercises.svg')
  },
  {
    name: 'أوراق العمل',
    path: '/dashboard/work',
    icon: require('@/assets/images/icons/paper-work.svg')
  },
  {
    name: 'المهام',
    path: '/dashboard/mission',
    icon: require('@/assets/images/icons/mission.svg')
  },
  {
    name: 'المراحل',
    path: '/dashboard/steps',
    icon: require('@/assets/images/icons/steps.svg')
  }
]
export {routesUsers, routesSchool, routesContent}
