<template>
  <section class="inner-routes p-0" :class="isSuperVisor ? 'mt-0' : ''">
    <div v-if="!isSuperVisor" class="supervisor-section">
      <b-row>
        <b-col lg="3">
          <div class="user-info profile-card item-card" v-if="this.$store.getters.user.roles[0].type.key === 'parent_management'">
            <div>
              <div class="img-container">
                <span>
                  <img
                    v-if="currentChild?.image"
                    :src="currentChild?.image"
                    alt="avatar"
                    title="avatar"
                    @error="altImage($event)"
                  />
                  <i v-else class="far fa-user"></i>
                </span>
              </div>
              <div class="hold-info">
                <p class="name">{{ currentChild.name }}</p>
                <p class="role" v-if="currentChild?.class && currentChild?.class?.name">{{$t('PARENT.child_student')}} - {{ currentChild.class.level.name }}</p>
                <p class="school-name" v-if="currentChild?.school?.name">{{ currentChild.school.name }}</p>
                <p class="school-name" v-if="currentChild?.class && currentChild?.class?.name">{{ currentChild?.class && currentChild?.class?.name }}</p>
              </div>
            </div>
          </div>
          <div class="user-info profile-card item-card" v-else>
            <div>
              <div class="img-container">
                <span>
                  <img
                    v-if="user.image"
                    :src="user.image"
                    alt="avatar"
                    title="avatar"
                    @error="altImage($event)"
                  />
                  <i v-else class="far fa-user"></i>
                </span>
              </div>
              <div class="hold-info">
                <p class="name">{{ user.name }}</p>
                <p class="role" v-if="user?.roles[0]?.name">{{ user.roles[0]?.name }}</p>
                <p class="school-name" v-if="user?.school?.name">{{ user.school.name }}</p>
                <Button custom-class="cancel-btn profile-btn" @click="handleViewProfile">
                  {{ $t("profile-page") }}
                </Button>
              </div>
            </div>
          </div>
          <div class="last-attempt">
            <div class="last-attempt-icon">
              <img src="@/assets/images/icons/last-attempt.svg" alt="last-attempt">
            </div>
            <div>
              <p>آخر عملية تسجيل دخول</p>
              <p>{{ user.last_attempt }}</p>
            </div>
          </div>
        </b-col>
        <b-col lg="9">
          <b-row>
            <b-col lg="4" class="margin-card" v-for="(value, key) in statistics" :key="key">
              <div class="item-card route-card">
                <div class="item-number">{{ value }}</div>
                <div class="item-name">
                  <span>{{ $t(`STATISTICS.${key}`) }}</span>
                  <span><img src="@/assets/images/icons/arrow-left.svg"/></span>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>
    <div v-if="isSuperVisor" class="supervisor-section">
      <b-row>
        <b-col lg="3">
          <div class="user-info profile-card item-card">
            <div>
              <div class="img-container">
                <span>
                  <img
                    v-if="user.image"
                    :src="user.image"
                    alt="avatar"
                    title="avatar"
                    @error="altImage($event)"
                  />
                  <i v-else class="far fa-user"></i>
                </span>
              </div>
              <div class="hold-info">
                <p class="name">{{ user.name }}</p>
                <p class="role" v-if="user?.roles[0]?.name">{{ user.roles[0]?.name }}</p>
                <p class="school-name" v-if="user?.school?.name">{{ user.school.name }}</p>
                <Button custom-class="cancel-btn profile-btn" @click="handleViewProfile">
                  {{ $t("profile-page") }}
                </Button>
              </div>
            </div>
          </div>
        </b-col>
        <b-col lg="9">
          <b-row>
            <b-col lg="4" class="margin-card" v-for="(value, key) in statistics" :key="key">
              <div class="item-card route-card">
                <div class="item-number">{{ value }}</div>
                <div class="item-name">
                  <span>{{ $t(`STATISTICS.${key}`) }}</span>
                  <span><img src="@/assets/images/icons/arrow-left.svg"/></span>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="4">
          <div class="stats">
            <div class="heading">
              <span>المهام</span>
            </div>
            <ChartMission/>
            <div class="item-link">
              <router-link to="missions"><span>الكل</span> <span><img
                src="@/assets/images/icons/arrow-left.svg"/></span></router-link>
            </div>
          </div>
        </b-col>
        <b-col lg="4">
          <div class="stats leader-board">
            <div class="heading">
              <span>لوحة الصدارة</span>
            </div>
            <LeaderBoard/>
            <div class="item-link">
              <router-link to="missions"><span>الكل</span> <span><img
                src="@/assets/images/icons/arrow-left.svg"/></span></router-link>
            </div>
          </div>
        </b-col>
        <b-col lg="4">
          <div class="stats">
            <div class="heading">
              <span>المسابقات</span>
            </div>
            <ChartCompetition/>
            <div class="item-link">
              <router-link to="missions"><span>الكل</span> <span><img
                src="@/assets/images/icons/arrow-left.svg"/></span></router-link>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
    <WelcomeModal/>
  </section>
</template>
<script>
import RouteItem from "@/components/RouteItem/index.vue";
import {routesUsers, routesSchool, routesContent, routeBasicData} from "@/globalData";
import WelcomeModal from "@/components/Shared/WelcomeModal/index.vue";
import {mapActions} from "vuex";
import Button from "@/components/Shared/Button/index.vue";
import ChartMission from "@/components/ChartMissions/ChartMission.vue";
import ChartCompetition from "@/components/ChartCompetitions/ChartCompetitions.vue";
import LeaderBoard from "@/components/LeaderBoard/LeaderBoard.vue";
import {
  getAllStatisticsRequest,
  getAllStatisticsSchoolAdminRequest,
  getAllStatisticsSuperVisorRequest
} from "@/api/statistics";

export default {
  name: "index",
  data() {
    return {
      activeTap: 1,
      routesUsers: [],
      routesSchool: [],
      routesContent: [],
      routeBasicData: [],
      statistics: [],
      isSuperVisor: false,
    };
  },

  components: {
    LeaderBoard,
    ChartCompetition,
    ChartMission,
    Button,
    RouteItem,
    WelcomeModal,
  },
  methods: {
    ...mapActions(["hide"]),
    hideModal() {
      this.hide();
    },
    handleViewProfile() {
      this.$router.push(`/view-profile`);
    },
    getRoutes(routeArr = []) {
      return routeArr.filter((route) => this.permissions?.includes(route.permission));
    },
    activeTapActive(tap) {
      this.activeTap = tap;
    },
    altImage($event) {
      $event.target.src = require("@/assets/images/icons/user-avatar.png");
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
    },
    user() {
      return this.$store.getters.user;
    },
    currentChild() {
      return this.$store.getters.currentChild;
    },
  },
  mounted() {
    if (this.user && this.user.roles && this.user.roles[0]?.type.key === "system_administration") {
      this.ApiService(getAllStatisticsRequest()).then((response) => {
        this.statistics = response.data.data;
      });
    } else if (this.user && this.user.roles && this.user.roles[0]?.type.key === "school_management") {
      this.ApiService(getAllStatisticsSchoolAdminRequest()).then((response) => {
        this.statistics = response.data.data;
      })
    } else if (this.user && this.user.roles && this.user.roles[0]?.type.key === "supervisors_management") {
      this.ApiService(getAllStatisticsSuperVisorRequest()).then((response) => {
        this.statistics = response.data.data;
      });
    }
    setTimeout(() => {
      this.hideModal();
    }, 6000);
    if (Array.from(this.routesUsers).length >= 1) {
      this.activeTapActive(1);
    } else if (Array.from(this.routesSchool).length >= 1) {
      this.activeTapActive(2);
    } else if (Array.from(this.routeBasicData.length >= 1)) {
      this.activeTapActive(4);
    } else {
      this.activeTapActive(3);
    }
    this.isSuperVisor = this.user.roles[0]?.code === "supervisor";
  },
};
</script>
<style scoped lang="scss">
@import "./index";

.item-card {
  background: url("../../assets/images/bg/bg-super.svg");
  background-color: #fff;
  border-radius: 1.5rem;
  background-repeat: no-repeat;
  background-position: top;
  background-size: 100%;
  border: 1px solid #f4edf3;

  .item-number {
    color: #76236c;
    font-size: 2.8rem;
    font-weight: bold;
  }

  .item-name {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #000000;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 1rem 0 0 0;
  }
}

.route-card {
  padding: 1rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  span {
    &:last-of-type {
      border-radius: 50%;
      background: #ffffff;
      border: 1px solid #f4edf3;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 45px;
      height: 45px;
      cursor: pointer;
      opacity: 0;
      position: relative;
      left: -1.5rem;
      transition: all ease-in-out 0.3s;

      //&:hover {
      //  background: $color-primary;
      //
      //  img {
      //    filter: brightness(0) invert(1);
      //    -webkit-filter: brightness(0) invert(1);
      //  }
      //}
    }
  }

  //&:hover {
  //  span {
  //    &:last-of-type {
  //      opacity: 1;
  //    }
  //  }
  //}
}

.leader-board {
  background: url("../../assets/images/bg/leader-bg.svg");
  background-color: #fff;
  background-repeat: no-repeat;
  background-size: 80%;
  background-position: center;
}

.margin-card {
  margin-bottom: 2rem;
}
</style>
