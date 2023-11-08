<template>
  <section class="inner-routes p-0">
    <div class="taps">
      <div
        @click="activeTapActive(1)"
        :class="activeTap === 1 && Array.from(routesUsers).length >= 1 ? 'active' : ''"
        class="tap"
        v-if="Array.from(routesUsers).length >= 1"
      >
        صلاحيات النظام والمستخدمين
      </div>
      <div
        @click="activeTapActive(2)"
        :class="activeTap === 2 && Array.from(routesSchool).length >= 1 ? 'active' : ''"
        class="tap"
        v-if="Array.from(routesSchool).length >= 1"
      >
        المدارس
      </div>
      <div
        @click="activeTapActive(3)"
        :class="activeTap === 3 && Array.from(routesContent).length >= 1 ? 'active' : ''"
        class="tap"
        v-if="Array.from(routesContent).length >= 1"
      >
        المحتوي
      </div>
      <div
        @click="activeTapActive(4)"
        :class="activeTap === 4 && Array.from(routeBasicData).length >= 1 ? 'active' : ''"
        class="tap"
        v-if="Array.from(routeBasicData).length >= 1"
      >
        البيانات الأساسية
      </div>
    </div>
    <div class="content">
      <div class="row">
        <transition name="fade">
          <div class="col-12 px-0" v-if="activeTap === 1 && Array.from(routesUsers).length >= 1">
            <div class="row">
              <div class="col-lg-6 col-12" v-for="(item, index) in routesUsers" :key="index">
                <RouteItem :item="item" v-if="item.permission === 'view-roles' && user.is_super_admin === 1"/>
                <RouteItem :item="item" v-if="item.permission !== 'view-roles'"/>
              </div>
            </div>
          </div>
          <div class="col-12 px-0" v-if="activeTap === 2 && Array.from(routesSchool).length >= 1">
            <div class="row">
              <div
                class="col-lg-3 col-sm-6 col-12"
                v-for="(item, index) in routesSchool"
                :key="index"
              >
                <RouteItem :item="item"/>
              </div>
            </div>
          </div>
          <div class="col-12 px-0" v-if="activeTap === 3 && Array.from(routesContent).length >= 1">
            <div class="row">
              <div
                class="col-lg-3 col-sm-6 col-12"
                v-for="(item, index) in routesContent"
                :key="index"
              >
                <RouteItem :item="item"/>
              </div>
            </div>
          </div>
          <div class="col-12 px-0" v-if="activeTap === 4 && Array.from(routeBasicData).length >= 1">
            <div class="row">
              <div
                class="col-lg-3 col-sm-6 col-12"
                v-for="(item, index) in routeBasicData"
                :key="index"
              >
                <RouteItem :item="item"/>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <WelcomeModal/>
  </section>
</template>
<script>
import RouteItem from "@/components/RouteItem/index.vue";
import {routesUsers, routesSchool, routesContent, routeBasicData} from "@/globalData";
import WelcomeModal from "@/components/Shared/WelcomeModal/index.vue";
import {mapActions} from "vuex";

export default {
  name: "index",
  data() {
    return {
      activeTap: 1,
      routesUsers: [],
      routesSchool: [],
      routesContent: [],
      routeBasicData: [],
    };
  },
  components: {
    RouteItem,
    WelcomeModal,
  },
  methods: {
    ...mapActions(["hide"]),
    hideModal() {
      this.hide();
    },
    getRoutes(routeArr = []) {
      return routeArr.filter((route) => this.permissions?.includes(route.permission));
    },
    activeTapActive(tap) {
      this.activeTap = tap;
    },
  },
  watch: {
    permissions: {
      handler: function (val) {
        this.routesUsers = this.getRoutes(routesUsers);
        this.routesSchool = this.getRoutes(routesSchool);
        this.routesContent = this.getRoutes(routesContent);
        this.routeBasicData = this.getRoutes(routeBasicData);
      },
      immediate: true,
    },
  },
  computed: {
    permissions() {
      return this.$store.getters.user?.permissions;
    }, user() {
      return this.$store.getters.user;
    },

  },
  mounted() {
    setTimeout(() => {
      this.hideModal();
    }, 6000);
    if (Array.from(this.routesUsers).length >= 1) {
      this.activeTapActive(1);
    } else if (Array.from(this.routesSchool).length >= 1) {
      this.activeTapActive(2);
    } else if (Array.from((this.routeBasicData).length >= 1)) {
      this.activeTapActive(4);
    } else {
      this.activeTapActive(3);
    }
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
