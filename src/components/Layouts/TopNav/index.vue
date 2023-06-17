<template>
  <header>
    <div class="container-fluid custom-container">
      <div class="row">
        <div class="col-12">
          <div class="top">
            <router-link to="/dashboard/home" tag="div" class="logo">
              <img src="@/assets/images/logo-white.png" alt="logo" title="geel logo" />
            </router-link>
            <div class="notification-info-admin">
              <div class="notification">
                <div class="bill">
                  <img
                    src="@/assets/images/icons/notification.svg"
                    alt="notification"
                    title="notification"
                  />
                </div>
                <span class="no-of-notification">3</span>
              </div>
              <div class="info-admin">
                <div class="name-role">
                  <p class="name">سعد بن عبد الرحمن الغامدي</p>
                  <p class="role">جيل أدمن</p>
                </div>
                <div class="dropdown-container" :dir="$i18n.locale == 'ar' ? 'ltr' : 'rtl'">
                  <b-dropdown no-caret>
                    <template #button-content>
                      <div class="user-image">
                        <img src="@/assets/images/icons/user.svg" alt="user" title="user" />
                      </div>
                    </template>
                    <b-dropdown-item @click="logout">{{ $t("GLOBAL_LOGOUT") }}</b-dropdown-item>
                  </b-dropdown>
                </div>
              </div>
            </div>
          </div>
          <div class="nav" v-if="showNavigationBar">
            <router-link tag="div" to="/dashboard/home" class="nav-item"
              >{{ $t("MENU.main") }}
            </router-link>
            <div class="nav-item">
              <p>
                <span>{{ $t("MENU.permissionsSystemUsers") }}</span
                ><img src="@/assets/images/icons/arrow.svg" />
              </p>
              <div class="dropdown-item-list">
                <ul>
                  <router-link
                    tag="li"
                    :to="routeUser.path"
                    v-for="(routeUser, index) in routesUsers"
                    :key="index"
                  >
                    {{ routeUser.name }}</router-link
                  >
                </ul>
              </div>
            </div>
            <div class="nav-item">
              <p>
                <span>{{ $t("MENU.schools") }}</span
                ><img src="@/assets/images/icons/arrow.svg" />
              </p>
              <div class="dropdown-item-list">
                <ul>
                  <router-link
                    tag="li"
                    :to="routeSchool.path"
                    v-for="(routeSchool, index) in routesSchool"
                    :key="index"
                  >
                    {{ routeSchool.name }}</router-link
                  >
                </ul>
              </div>
            </div>
            <div class="nav-item">
              <p>
                <span>{{ $t("MENU.content") }}</span
                ><img src="@/assets/images/icons/arrow.svg" />
              </p>
              <div class="dropdown-item-list">
                <ul>
                  <router-link
                    tag="li"
                    :to="routeContent.path"
                    v-for="(routeContent, index) in routesContent"
                    :key="index"
                  >
                    {{ routeContent.name }}</router-link
                  >
                </ul>
              </div>
            </div>
            <div class="nav-item">
              <p>
                <span>{{ $t("MENU.system_settings") }}</span
                ><img src="@/assets/images/icons/arrow.svg" />
              </p>
              <div class="dropdown-item-list">
                <ul>
                  <router-link
                    tag="li"
                    :to="route.path"
                    v-for="(route, index) in routeSettings"
                    :key="index"
                  >
                    {{ route.name }}</router-link
                  >
                </ul>
              </div>
            </div>
            <div class="nav-item">
              <router-link tag="p" to="/dashboard/home">{{ $t("MENU.infoDashBoard") }}</router-link>
            </div>
            <div class="nav-item">
              <router-link tag="p" to="/dashboard/home">{{ $t("MENU.reports") }}</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import { routesUsers, routesSchool, routesContent, routeSettings } from "@/globalData";
import { mapActions } from "vuex";

export default {
  name: "index",
  data: () => ({
    showNavigationBar: false,
    routesUsers: [],
    routesSchool: [],
    routesContent: [],
    routeSettings: [],
  }),
  watch: {
    $route: function () {
      this.checkRoutes();
    },
    permissions: {
      handler: function (val) {
        this.routesUsers = this.getRoutes(routesUsers);
        this.routesSchool = this.getRoutes(routesSchool);
        this.routesContent = this.getRoutes(routesContent);
        this.routeSettings = this.getRoutes(routeSettings);
      },
      immediate: true,
    },
  },
  computed: {
    permissions() {
      return this.$store.getters.user?.permissions;
    },
  },
  methods: {
    ...mapActions(["removeUser"]),
    logout() {
      this.removeUser();
    },
    getRoutes(routeArr = []) {
      return routeArr.filter((route) => this.permissions?.includes(route.permission));
    },
    checkRoutes() {
      if (this.$route.name !== "main") {
        this.showNavigationBar = true;
      } else {
        this.showNavigationBar = false;
      }
    },
  },
  mounted() {
    this.checkRoutes();
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
