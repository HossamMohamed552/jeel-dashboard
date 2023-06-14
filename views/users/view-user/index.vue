<template>
  <section class="container-fluid custom-container">
<!--<<<<<<< HEAD-->
<!--    <div class="show-user">-->
<!--      <div class="hold-fields">-->
<!--        <b-row>-->
<!--          <b-col lg="12">-->
<!--            <h2 class="heading">{{ $t("USERS.showDetails") }}</h2>-->
<!--          </b-col>-->
<!--        </b-row>-->
<!--        <b-row>-->
<!--          <b-col lg="2">-->
<!--            <div class="hold-user-img">-->
<!--              <img :src="user.avatar" >-->
<!--            </div>-->
<!--          </b-col>-->
<!--          <b-col lg="10">-->
<!--            <b-row>-->
<!--              <b-col lg="4">-->
<!--                <ShowItem-->
<!--                  :title="$t('USERS.name')"-->
<!--                  :subtitle="user.name"-->
<!--                />-->
<!--              </b-col>-->
<!--              <b-col lg="4">-->
<!--                <ShowItem-->
<!--                  :title="$t('USERS.first_name')"-->
<!--                  :subtitle="user.first_name"-->
<!--                />-->
<!--              </b-col>-->
<!--              <b-col lg="4">-->
<!--                <ShowItem-->
<!--                  :title="$t('USERS.last_name')"-->
<!--                  :subtitle="user.last_name"-->
<!--                />-->
<!--              </b-col>-->
<!--            </b-row>-->
<!--            <b-dd-divider class="my-4" />-->
<!--            <b-row>-->
<!--              <b-col lg="4">-->
<!--                <ShowItem-->
<!--                  :title="$t('USERS.roles')"-->
<!--                  :list-items="user.roles"-->
<!--                />-->
<!--              </b-col>-->
<!--              <b-col lg="4">-->
<!--                <ShowItem-->
<!--                  :title="$t('USERS.mobile')"-->
<!--                  :subtitle="user.mobile"-->
<!--                />-->
<!--              </b-col>-->
<!--              <b-col lg="4">-->
<!--                <ShowItem-->
<!--                  :title="$t('USERS.email')"-->
<!--                  :subtitle="user.email"-->
<!--                />-->
<!--              </b-col>-->
<!--            </b-row>-->
<!--=======-->
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
// <<<<<<< HEAD
// import {getSingleUserRequest} from "@/api/user";
//
// export default {
//   name: "index",
//   components: {ShowItem},
//   data() {
//     return {
//       user: {},
//     }
// =======
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
// <<<<<<< HEAD
//         this.user = response.data.data;
//       }
//     );
//   },
// }
// =======
        this.singleUser = response.data.data;
      }
    );
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
