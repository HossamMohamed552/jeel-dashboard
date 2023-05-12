<template>
  <section class="inner-routes">
    <div class="taps">
      <div @click="activeTap = 1" :class="activeTap === 1 ? 'active' :''" class="tap">
        صلاحيات النظام والمستخدمين
      </div>
      <div @click="activeTap = 2" :class="activeTap === 2 ? 'active' :''" class="tap">
        المدارس
      </div>
      <div @click="activeTap = 3" :class="activeTap === 3 ? 'active' :''" class="tap">
        المحتوي
      </div>
    </div>
    <div class="content">
      <div class="row">
        <transition name="fade">
          <div class="col-12 px-0" v-if="activeTap === 1">
            <div class="row">
              <div class="col-lg-6 col-12" v-for="(item,index) in routesUsers" :key="index">
                <RouteItem :item="item"/>
              </div>
            </div>
          </div>
          <div class="col-12 px-0" v-if="activeTap === 2">
            <div class="row">
              <div class="col-lg-3 col-sm-6 col-12" v-for="(item,index) in routesSchool" :key="index">
                <RouteItem :item="item"/>
              </div>
            </div>
          </div>
          <div class="col-12 px-0" v-if="activeTap === 3">
            <div class="row">
              <div class="col-lg-3 col-sm-6 col-12" v-for="(item,index) in routesContent" :key="index">
                <RouteItem :item="item"/>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>
<script>
import RouteItem from "@/components/RouteItem/index.vue";

export default {
  name: "index",
  data() {
    return {
      activeTap: 1,
      routesUsers: [
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
      ],
      routesSchool:[
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
        },

      ],
      routesContent: [
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
    }
  },
  components: {
    RouteItem
  }
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
