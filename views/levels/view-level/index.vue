<template>
  <section class="container-fluid custom-container">
    <div class="show-level">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("LEVEL.showDetails") }}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="6">
            <ShowItem :title="$t('LEVEL.name')" :subtitle="level.name" />
          </b-col>
          <b-col lg="6">
            <ShowItem :title="$t('LEVEL.min_levels')" :subtitle="level.min_levels" />
          </b-col>
        </b-row>
        <b-row class="mt-5">
          <b-col
            cols="12"
            sm="6"
            class="mb-4"
            v-for="(school_group, index) in level.school_groups"
            :key="index"
          >
            <ShowItem :title="$t('TABLE_FIELDS.school_group')" :subtitle="school_group.name" />
          </b-col>
        </b-row>
        <b-row
          v-if="
            user.permissions.includes('rearrange-missions') ||
            user.permissions.includes('manage-learningpath')
          "
        >
          <b-col lg="6">
            <h3 class="mission-title">الصفوف</h3>
            <div class="mission-item" v-for="mission in levelNotFiltered">
              <span>{{ mission.name }}</span>
            </div>
          </b-col>
          <b-col lg="6">
            <h3 class="mission-title">الصفوف المختاره</h3>
            <div class="mission-item" v-for="mission in levelFiltered">
              <span>{{ mission.name }}</span>
              <!--              <router-link :to="`/dashboard/path-content/${mission.id}`" class="mission-content"-->
              <!--                           v-if="user.permissions.includes('manage-learningpath')">تعديل المحتوى <i-->
              <!--                class="far fa-edit"></i></router-link>-->
            </div>
          </b-col>
        </b-row>
        <!--        <b-row v-if="user.permissions.includes('manage-learningpath')">-->
        <!--          <b-col lg="12">-->
        <!--            <h3 class="mission-title">الصفوف المختاره</h3>-->
        <!--            <div class="mission-item" v-for="mission in levelFiltered">-->
        <!--              <span>{{ mission.name }}</span>-->
        <!--&lt;!&ndash;              :to="`/dashboard/path-content/${mission.id}`"&ndash;&gt;-->
        <!--            </div>-->
        <!--          </b-col>-->
        <!--        </b-row>-->
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import { getSingleLevelRequest } from "@/api/level";
import { mapGetters } from "vuex";
import Button from "@/components/Shared/Button/index.vue";
import TextAreaField from "@/components/Shared/TextAreaField/index.vue";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import TextField from "@/components/Shared/TextField/index.vue";
import draggable from "vuedraggable";
import axios from "axios";
import VueCookies from "vue-cookies";
import Modal from "@/components/Shared/Modal/index.vue";
import user from "@/store/modules/user";

export default {
  name: "index",
  computed: {
    ...mapGetters(["user"]),
  },
  components: {
    Modal,
    TextField,
    SelectSearch,
    draggable,
    TextAreaField,
    Button,
    ShowItem,
  },
  data() {
    return {
      level: {},
      missionNotSelected: [],
      missionsSend: [],
      loading: false,
      showModal: false,
      levelNotFiltered: [],
      levelFiltered: [],
    };
  },
  methods: {
    onSubmit() {
      //   let missions = this.missionsSend.map((item, index) => {
      //     return {id: item.id, order: index + 1, is_selected: 1}
      //   })
      //   console.log('this.missionsSend', missions)
      //   axios.post('/rearrange-mission', {
      //     level_id: this.$route.params.id,
      //     missions: missions
      //   }, {
      //     headers: {
      //       Authorization: `Bearer ${VueCookies.get("token")}`,
      //       locale: 'ar',
      //     }
      //   }).then((response) => {
      //     this.showModal = true
      //     setTimeout(() => {
      //       this.showModal = false;
      //     }, 3000);
      //   }).then(()=>this.$router.push('/dashboard/levels')).catch((error) => {
      //     console.log(error)
      //   })
      // }
    },
  },
  mounted() {
    this.ApiService(getSingleLevelRequest(this.$route.params.id))
      .then((response) => {
        this.level = response.data.data;
        // this.missionNotSelected = response.data.data.missions.filter((item) => item.is_selected === 0)
        // this.missionsSend = response.data.data.missions.filter((item) => item.is_selected === 1)
      })
      .then(() => {
        this.levelNotFiltered = this.level.missions.filter((item) => item.is_selected !== 1);
        this.levelFiltered = this.level.missions.filter((item) => item.is_selected === 1);
      });
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
