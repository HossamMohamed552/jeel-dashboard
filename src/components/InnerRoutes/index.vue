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
              <div class="col-lg-3 col-sm-6 col-12" v-for="(item,index) in routesSchool"
                   :key="index">
                <RouteItem :item="item"/>
              </div>
            </div>
          </div>
          <div class="col-12 px-0" v-if="activeTap === 3">
            <div class="row">
              <div class="col-lg-3 col-sm-6 col-12" v-for="(item,index) in routesContent"
                   :key="index">
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
import {routesUsers, routesSchool, routesContent} from "@/globalData"

export default {
  name: "index",
  data() {
    return {
      activeTap: 1,
      routesUsers: routesUsers,
      routesSchool: routesSchool,
      routesContent: routesContent
    }
  },
  components: {
    RouteItem
  },
  mounted() {
  },
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
