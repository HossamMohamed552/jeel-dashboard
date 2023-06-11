<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("USER.showDetails") }}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="6" class="mb-5">
            <ShowItem :title="$t('USER.first_name')" :subtitle="singleUser.first_name" />
          </b-col>
          <b-col lg="6" class="mb-5">
            <ShowItem :title="$t('USER.last_name')" :subtitle="singleUser.last_name" />
          </b-col>
          <b-col lg="6" class="mb-5">
            <ShowItem :title="$t('USER.name')" :subtitle="singleUser.name" />
          </b-col>
          <b-col lg="6" class="mb-5">
            <ShowItem :title="$t('USER.email')" :subtitle="singleUser.email" />
          </b-col>
          <b-col lg="6" class="mb-5">
            <ShowItem :title="$t('USER.mobile')" :subtitle="singleUser.mobile" />
          </b-col>
          <b-col lg="6" class="mb-5">
            <ShowItem :title="$t('USER.social_media')" :subtitle="singleUser.social_media" />
          </b-col>
          <b-col lg="6" class="mb-5">
            <ShowItem :title="$t('USER.role')" :subtitle="singleUser.roles[0].name" />
          </b-col>
          <b-col lg="6" class="mb-5 img-container">
            <img class="w-100" :src="singleUser.avatar" />
          </b-col>
          <b-col v-if="singleUser.student_action_histories && singleUser.student_action_histories.length" lg="12" class="mb-5">
            <ShowItem :title="$t('USER.student_action_histories')" :subtitle="singleUser.student_action_histories" />
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import { getSingleUserRequest } from "@/api/user.js";
export default {
  name: "index",
  components: {
    ShowItem,
  },
  data() {
    return {
      singleUser: {},
    };
  },
  mounted() {
    this.ApiService(getSingleUserRequest(this.$route.params.id)).then(
      (response) => {
        this.singleUser = response.data.data;
      }
    );
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
