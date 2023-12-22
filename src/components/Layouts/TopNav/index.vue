<template>
  <header>
    <div class="container-fluid custom-container">
      <div class="row collapsed" v-if="collapseMode">
        <div class="col-12">
          <div class="top" :class="isSuperVisor && $route.name === 'main' ? 'top-supervisor': ''">
            <router-link to="/dashboard/home" tag="div" class="logo">
              <img src="@/assets/images/logo-white.png" alt="logo" title="geel logo" />
            </router-link>
            <div class="notification-info-admin">
              <!-- <div class="notification"> -->
<!--                <div class="bill">-->
<!--                  <img-->
<!--                    src="@/assets/images/icons/notification.svg"-->
<!--                    alt="notification"-->
<!--                    title="notification"-->
<!--                  />-->
<!--                </div>-->
<!--                <span class="no-of-notification">3</span>-->
              <!-- </div> -->
              <div class="info-admin">
                <div class="name-role">
                  <p class="name">{{ user.name }}</p>
<!--                  <p class="role">جيل أدمن</p>-->
                </div>
                <div class="dropdown-container" :dir="$i18n.locale == 'ar' ? 'ltr' : 'rtl'">
                  <b-dropdown no-caret>
                    <template #button-content>
                      <div class="user-image">
                        <img v-if="user && user.avatar" :src="user.avatar" alt="user" title="user" @error="altImage($event)"/>
                      </div>
                    </template>
                    <b-dropdown-item to="/profile">{{ $t("MY_PROFILE") }}</b-dropdown-item>
                    <b-dropdown-item @click="logout">{{ $t("GLOBAL_LOGOUT") }}</b-dropdown-item>
                  </b-dropdown>
                </div>
              </div>
            </div>
          </div>
          <b-navbar toggleable="lg"  class="nav" v-if="showNavigationBar &&  !isSuperVisor">
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
              <b-navbar-nav>

                <b-nav-item>
                  <router-link tag="div" to="/dashboard/home" class="nav-item">{{ $t("MENU.main") }}</router-link>
                </b-nav-item>

                <b-nav-item class="nav-item" v-if="Array.from(routesUsers).length >= 1">

                  <b-nav-item-dropdown>
                    <template #button-content>
                        <span style="color: #fff;">{{$t("MENU.permissionsSystemUsers")}}</span>
                      <img src="@/assets/images/icons/arrow.svg" @click="">
                    </template>
                    <b-dropdown-item 
                      v-if="routeUser.permission === 'view-roles' && user.is_super_admin === 1" 
                      v-for="(routeUser, index) in routesUsers" :key="index" 
                    >
                      <router-link :to="routeUser.path">{{ routeUser.name }}</router-link>
                    </b-dropdown-item>
                    <b-dropdown-item 
                      v-if="routeUser.permission !== 'view-roles'" 
                      v-for="(routeUser, index) in routesUsers" :key="index" :href="routeUser.path">
                      <router-link :to="routeUser.path">
                        {{ routeUser.name }}
                      </router-link>
                    </b-dropdown-item>
                  </b-nav-item-dropdown>

                </b-nav-item>

                <b-nav-item class="nav-item" v-if="Array.from(routesSchool).length >= 1">

                  <b-nav-item-dropdown>
                    <template #button-content>
                      <span style="color: #fff;">{{ $t("MENU.schools") }}</span>
                      <img src="@/assets/images/icons/arrow.svg" />
                    </template>
                    <b-dropdown-item 
                    v-for="(routeSchool, index) in routesSchool" :key="index" 
                    >
                      <router-link :to="routeSchool.path">{{ routeSchool.name }}</router-link>
                    </b-dropdown-item>
                   
                  </b-nav-item-dropdown>

                </b-nav-item>

                <b-nav-item class="nav-item" v-if="Array.from(routesContent).length >= 1">

                  <b-nav-item-dropdown>
                    <template #button-content>
                      <span style="color: #fff;">{{ $t("MENU.content") }}</span>
                      <img src="@/assets/images/icons/arrow.svg" />
                    </template>
                    <b-dropdown-item 
                    v-for="(routeContent, index) in routesContent" :key="index" 
                    >
                      <router-link :to="routeContent.path">{{ routeContent.name }}</router-link>
                    </b-dropdown-item>
                   
                  </b-nav-item-dropdown>
                </b-nav-item>

                <b-nav-item class="nav-item" v-if="Array.from(routeBasicData).length >= 1">

                  <b-nav-item-dropdown>
                    <template #button-content>
                      <span style="color: #fff;">{{ $t("MENU.basicData") }}</span>
                      <img src="@/assets/images/icons/arrow.svg" />
                    </template>
                    <b-dropdown-item 
                    v-for="(routeBasic, index) in routeBasicData" :key="index" 
                    >
                      <router-link :to="routeBasic.path">{{ routeBasic.name }}</router-link>
                    </b-dropdown-item>
                   
                  </b-nav-item-dropdown>

                </b-nav-item>

                <b-nav-item class="nav-item" v-if="user.is_super_admin === 1">

                  <b-nav-item-dropdown>
                    <template #button-content>
                      <span style="color: #fff;">{{ $t("MENU.system_settings") }}</span>
                      <img src="@/assets/images/icons/arrow.svg" />
                    </template>
                    <b-dropdown-item 
                    v-for="(route, index) in routeSettings" :key="index" 
                    >
                      <router-link :to="route.path">{{ route.name }}</router-link>
                    </b-dropdown-item>
                   
                  </b-nav-item-dropdown>
                </b-nav-item>

                <b-nav-item class="nav-item" v-if="user.is_super_admin === 1">
                  <router-link tag="p" to="/dashboard/home" style="color: #fff;">{{ $t("MENU.infoDashBoard") }}</router-link>
                </b-nav-item>

                <b-nav-item class="nav-item" v-if="user.is_super_admin === 1">
                  <router-link style="color: #fff;" tag="p" to="/dashboard/home">{{ $t("MENU.reports") }}</router-link>
                </b-nav-item>

              </b-navbar-nav>
            </b-collapse>
          </b-navbar>
          <b-navbar class="nav" v-if="isSuperVisor" :class="isSuperVisor && $route.name === 'main' ? 'nav-supervisor': ''">
            <b-nav-item>
              <router-link tag="div" to="/dashboard/home" class="nav-item">{{ $t("MENU.main") }}</router-link>
            </b-nav-item>
            <b-nav-item class="nav-item" v-if="Array.from(routesUsers).length >= 1" v-for="(routeUser, index) in routesUsers" :key="index">
              <router-link tag="li" :to="routeUser.path" >{{ routeUser.name }}</router-link>
            </b-nav-item>
            <b-nav-item class="nav-item" v-if="Array.from(routesSchool).length >= 1" v-for="(routeSchool, index) in routesSchool" :key="index">
              <router-link tag="li" :to="routeSchool.path" >{{ routeSchool.name }}</router-link>
            </b-nav-item>
            <b-nav-item class="nav-item" v-if="Array.from(routesContent).length >= 1" v-for="(routeContent, index) in routesContent" :key="index">
              <router-link tag="li" :to="routeContent.path" >{{ routeContent.name }}</router-link>
            </b-nav-item>
            <b-nav-item class="nav-item" v-if="Array.from(routeBasicData).length >= 1" v-for="(routeBasic, index) in routeBasicData" :key="index">
              <router-link tag="li" :to="routeBasic.path" >{{ routeBasic.name }}</router-link>
            </b-nav-item>
            <b-nav-item class="nav-item" v-if="Array.from(routeSuperVisor).length >= 1" v-for="(routeSuper, index) in routeSuperVisor" :key="index">
              <router-link tag="li" :to="routeSuper.path" >{{ routeSuper.name }}</router-link>
            </b-nav-item>
          </b-navbar>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-12">
          <div class="top" :class="isSuperVisor && $route.name === 'main' ? 'top-supervisor': ''">
            <router-link to="/dashboard/home" tag="div" class="logo">
              <img src="@/assets/images/logo-white.png" alt="logo" title="geel logo" />
            </router-link>
            <div class="notification-info-admin">
              <div class="notification">
<!--                <div class="bill">-->
<!--                  <img-->
<!--                    src="@/assets/images/icons/notification.svg"-->
<!--                    alt="notification"-->
<!--                    title="notification"-->
<!--                  />-->
<!--                </div>-->
<!--                <span class="no-of-notification">3</span>-->
              </div>
              <div class="info-admin">
                <div class="name-role">
                  <p class="name">{{ user.name }}</p>
<!--                  <p class="role">جيل أدمن</p>-->
                </div>
                <div class="dropdown-container" :dir="$i18n.locale == 'ar' ? 'ltr' : 'rtl'">
                  <b-dropdown no-caret>
                    <template #button-content>
                      <div class="user-image">
                        <img v-if="user && user.avatar" :src="user.avatar" alt="user" title="user" @error="altImage($event)"/>
                      </div>
                    </template>
                    <b-dropdown-item to="/profile">{{ $t("MY_PROFILE") }}</b-dropdown-item>
                    <b-dropdown-item @click="logout">{{ $t("GLOBAL_LOGOUT") }}</b-dropdown-item>
                  </b-dropdown>
                </div>
              </div>
            </div>
          </div>
          <div class="nav" v-if="showNavigationBar &&  !isSuperVisor">
            <router-link tag="div" to="/dashboard/home" class="nav-item"
              >{{ $t("MENU.main") }}
            </router-link>
            <div class="nav-item" v-if="Array.from(routesUsers).length >= 1">
              <p>
                <span>{{ $t("MENU.permissionsSystemUsers") }}</span
                ><img src="@/assets/images/icons/arrow.svg" />
              </p>
              <div class="dropdown-item-list">
                <ul >
                  <router-link tag="li" v-if="routeUser.permission === 'view-roles' && user.is_super_admin === 1" :to="routeUser.path" v-for="(routeUser, index) in routesUsers" :key="index">{{ routeUser.name }}</router-link>
                  <router-link tag="li" v-if="routeUser.permission !== 'view-roles'" :to="routeUser.path" v-for="(routeUser, index) in routesUsers" :key="index">{{ routeUser.name }}</router-link>
                </ul>
              </div>
            </div>
            <div class="nav-item" v-if="Array.from(routesSchool).length >= 1">
              <p>
                <span>{{ $t("MENU.schools") }}</span
                ><img src="@/assets/images/icons/arrow.svg" />
              </p>
              <div class="dropdown-item-list">
                <ul >
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
            <div class="nav-item" v-if="Array.from(routesContent).length >= 1">
              <p>
                <span>{{ $t("MENU.content") }}</span
                ><img src="@/assets/images/icons/arrow.svg" />
              </p>
              <div class="dropdown-item-list">
                <ul >
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
            <div class="nav-item" v-if="Array.from(routeBasicData).length >= 1">
              <p>
                <span>{{ $t("MENU.basicData") }}</span
                ><img src="@/assets/images/icons/arrow.svg" />
              </p>
              <div class="dropdown-item-list">
                <ul >
                  <router-link
                    tag="li"
                    :to="routeBasic.path"
                    v-for="(routeBasic, index) in routeBasicData"
                    :key="index"
                  >
                    {{ routeBasic.name }}</router-link
                  >
                </ul>
              </div>
            </div>
            <div class="nav-item" v-if="user.is_super_admin === 1">
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
            <div class="nav-item" v-if="user.is_super_admin === 1">
              <router-link tag="p" to="/dashboard/home">{{ $t("MENU.infoDashBoard") }}</router-link>
            </div>
            <div class="nav-item" v-if="user.is_super_admin === 1">
              <router-link tag="p" to="/dashboard/home">{{ $t("MENU.reports") }}</router-link>
            </div>
          </div>
          <div class="nav" v-if="isSuperVisor" :class="isSuperVisor && $route.name === 'main' ? 'nav-supervisor': ''">
            <router-link tag="div" to="/dashboard/home" class="nav-item">{{ $t("MENU.main") }}</router-link>
            <div class="nav-item" v-if="Array.from(routesUsers).length >= 1" v-for="(routeUser, index) in routesUsers" :key="index">
              <router-link tag="li" :to="routeUser.path" >{{ routeUser.name }}</router-link>
            </div>
            <div class="nav-item" v-if="Array.from(routesSchool).length >= 1" v-for="(routeSchool, index) in routesSchool" :key="index">
              <router-link tag="li" :to="routeSchool.path" >{{ routeSchool.name }}</router-link>
            </div>
            <div class="nav-item" v-if="Array.from(routesContent).length >= 1" v-for="(routeContent, index) in routesContent" :key="index">
              <router-link tag="li" :to="routeContent.path" >{{ routeContent.name }}</router-link>
            </div>
            <div class="nav-item" v-if="Array.from(routeBasicData).length >= 1" v-for="(routeBasic, index) in routeBasicData" :key="index">
              <router-link tag="li" :to="routeBasic.path" >{{ routeBasic.name }}</router-link>
            </div>
            <div class="nav-item" v-if="Array.from(routeSuperVisor).length >= 1" v-for="(routeSuper, index) in routeSuperVisor" :key="index">
              <router-link tag="li" :to="routeSuper.path" >{{ routeSuper.name }}</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import { routesUsers, routesSchool, routesContent, routeSettings, routeBasicData, routeSuperVisor } from "@/globalData";
import { mapActions } from "vuex";

export default {
  name: "index",
  data: () => ({
    showNavigationBar: false,
    isSuperVisor: false,
    routesUsers: [],
    routesSchool: [],
    routesContent: [],
    routeSettings: [],
    routeBasicData: [],
    routeSuperVisor: [],
    collapseMode:false
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
        this.routeBasicData = this.getRoutes(routeBasicData);
        this.routeSuperVisor = this.getRoutes(routeSuperVisor);
      },
      immediate: true,
    },
  },
  computed: {
    permissions() {
      return this.$store.getters.user?.permissions;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    ...mapActions(["removeUser"]),
    altImage($event){
      $event.target.src = require("@/assets/images/icons/user-avatar.png")
    },
    logout() {
      this.removeUser();
    },
    getRoutes(routeArr = []) {
      return routeArr.filter((route) => this.permissions?.includes(route.permission));
    },
    checkRoutes() {
      this.showNavigationBar = this.$route.name !== "main";
    },
    checkNavCollapseMode(screenSize){
      if(screenSize > 991){
        this.collapseMode = false;
      } else {
        this.collapseMode = true;
      }
    }
  },
  mounted() {
    this.checkRoutes();
    this.isSuperVisor = this.user.roles[0]?.code === 'supervisor';
    this.checkNavCollapseMode(screen.width)
    window.addEventListener('resize', function(event) {
      this.checkNavCollapseMode(screen.width)
    }, true);
   
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
