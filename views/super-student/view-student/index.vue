<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("teacher.data") }}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="2">
            <b-row>
              <b-col lg="12" class="img-container">
                <img class="w-100" :src="studentObject.avatar ? studentObject.avatar :'@/assets/images/icons/user-avatar.png'" @error="altImage($event)"/>
              </b-col>
            </b-row>
          </b-col>
          <b-col lg="10">
            <b-row class="divider">
              <b-col lg="4">
                <ShowItem :title="$t('teacher.teacherName')" :subtitle="studentObject.name"/>
              </b-col>
              <b-col lg="4">
                <ShowItem :title="$t('teacher.firstName')" :subtitle="studentObject.first_name"/>
              </b-col>
              <b-col lg="4">
                <ShowItem :title="$t('teacher.lastName')" :subtitle="studentObject.last_name"/>
              </b-col>
            </b-row>
            <b-row class="divider">
              <b-col lg="4" class="mt-4" v-if="studentObject && studentObject.roles">
                <ShowItem :title="$t('teacher.role')" :subtitle="studentObject.roles[0].name"/>
              </b-col>
              <b-col lg="4" class="mt-4">
                <ShowItem :title="$t('teacher.mobile')" :subtitle="studentObject.mobile"/>
              </b-col>
              <b-col lg="4" class="mt-4">
                <ShowItem :title="$t('teacher.email')" :subtitle="studentObject.email"/>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="12" class="my-4">
                <ShowItem :title="$t('teacher.social_media')"
                          :subtitle="studentObject.social_media"/>
              </b-col>
              <b-col lg="4">
                <div class="hold-field">
                  <ShowItem :title="$t('SOCIAL_MEDIA.FACEBOOK')"
                            :subtitle="studentObject.facebook"/>
                </div>
              </b-col>
              <b-col lg="4">
                <div class="hold-field">
                  <ShowItem :title="$t('SOCIAL_MEDIA.TWITTER')"
                            :subtitle="studentObject.twitter"/>
                </div>
              </b-col>
              <b-col lg="4">
                <div class="hold-field">
                  <ShowItem :title="$t('SOCIAL_MEDIA.LINKEDIN')"
                            :subtitle="studentObject.linkedin"/>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <!-- tabs-->
        <div class="taps">
          <div @click="activeTap = 1" :class="activeTap === 1 ? 'active' : ''" class="tap">
            البيانات الدراسية
          </div>
          <div @click="activeTap = 2" :class="activeTap === 2 ? 'active' : ''" class="tap">
            الدخول اليومي
          </div>
          <div @click="activeTap = 3" :class="activeTap === 3 ? 'active' : ''" class="tap">
            المهام
          </div>
          <div @click="activeTap = 4" :class="activeTap === 4 ? 'active' : ''" class="tap">
            الإنجازات
          </div>
          <div @click="activeTap = 5" :class="activeTap === 5 ? 'active' : ''" class="tap">
            المنافسات
          </div>
          <div @click="activeTap = 6" :class="activeTap === 6 ? 'active' : ''" class="tap">
            المواسم
          </div>
        </div>
        <div class="content">
          <ScholasticData v-if="activeTap === 1"/>
          <DailyLogin  v-if="activeTap === 2"/>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import {getStudentForSuperVisor} from "@/api/user";
import ListItems from "@/components/ListItems/index.vue";
import TextField from "@/components/Shared/TextField/index.vue";
import ScholasticData from "@/components/SuperVisor/ScholasticData/index.vue";
import DailyLogin from "@/components/SuperVisor/DailyLogin/index.vue";
export default {
  name: "index",
  components: {
    TextField,
    ShowItem,
    ListItems,
    ScholasticData,
    DailyLogin
  },
  data() {
    return {
      studentObject: {},
      activeTap: 1
    };
  },
  methods: {
    altImage($event) {
      $event.target.src = require("@/assets/images/icons/user-avatar.png")
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  mounted() {
    this.ApiService(getStudentForSuperVisor(this.$route.params.id)).then((response) => {
      this.studentObject = response.data.data;
    });
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
