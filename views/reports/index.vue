<template>
  <section class="inner-routes custom-container">
    <div class="row" v-if="routesJeelAdminReports.length > 0">
      <div class="col-lg-3 col-12" v-for="(item,index) in routesJeelAdminReports" :key="index">
        <RouteItem :item="item" class="m-0"/>
      </div>
    </div>
    <div class="row" v-if="routesSchoolAdminReports.length > 0">
      <div class="col-lg-3 col-12 mb-4" v-for="(item,index) in routesSchoolAdminReports" :key="index">
        <RouteItem :item="item" class="m-0"/>
      </div>
    </div>
  </section>
</template>
<script>
import RouteItem from "@/components/RouteItem/index.vue";
import {routesJeelAdminReports,routesSchoolAdminReports} from "@/globalData"

export default {
  name: "index",
  data() {
    return {
      routesJeelAdminReports: [],
      routesSchoolAdminReports: [],
    }
  },
  components: {
    RouteItem
  },
  computed: {
    permissions() {
      return this.$store.getters.user?.permissions;
    },
  },
  watch: {
    permissions: {
      handler: function (val) {
        this.routesJeelAdminReports = this.getRoutes(routesJeelAdminReports);
        this.routesSchoolAdminReports = this.getRoutes(routesSchoolAdminReports);
      },
      immediate: true,
    },
  },
  methods: {
    getRoutes(routeArr = []) {
      return routeArr.filter((route) => this.permissions?.includes(route.permission));
    },
  },
  mounted() {
  }
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
