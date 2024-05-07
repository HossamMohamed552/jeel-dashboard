<template>
  <section class="inner-routes custom-container">
    <div class="row">
      <div class="col-lg-3 col-12" v-for="(item,index) in routesJeelAdminReports" :key="index">
        <RouteItem :item="item" class="m-0"/>
      </div>
    </div>
  </section>
</template>
<script>
import RouteItem from "@/components/RouteItem/index.vue";
import {routesJeelAdminReports,} from "@/globalData"

export default {
  name: "index",
  data() {
    return {
      routesJeelAdminReports: []
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
