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
            <ShowItem
              :title="$t('USER.first_name')"
              :subtitle="singleUser.first_name"
            />
          </b-col>
          <b-col lg="6" class="mb-5">
            <ShowItem
              :title="$t('USER.last_name')"
              :subtitle="singleUser.last_name"
            />
          </b-col>
          <b-col v-if="singleUser.user_name" lg="6" class="mb-5">
            <ShowItem
              :title="$t('USERS.USER_NAME')"
              :subtitle="singleUser.user_name"
            />
          </b-col>
          <b-col lg="6" class="mb-5">
            <ShowItem :title="$t('USER.name')" :subtitle="singleUser.name" />
          </b-col>
          <b-col lg="6" class="mb-5">
            <ShowItem :title="$t('USER.email')" :subtitle="singleUser.email" />
          </b-col>
          <b-col lg="6" class="mb-5">
            <ShowItem
              :title="$t('USER.mobile')"
              :subtitle="singleUser.mobile"
            />
          </b-col>
          <b-col lg="6" class="mb-5">
            <ShowItem
              :title="$t('USER.social_media')"
              :subtitle="singleUser.social_media"
            />
          </b-col>
          <b-col lg="6" class="mb-5" v-if="singleUser && singleUser.roles">
            <ShowItem
              :title="$t('USER.role')"
              :listItems="singleUser.roles"
            />
          </b-col>
          <b-col lg="6" class="mb-5 img-container">
            <img class="w-100" :src="singleUser.avatar" />
          </b-col>
          <b-col v-if="singleUser.user_credit" lg="12">
            <h2 class="heading">{{ $t("USER.user_credits") }}:</h2>
          </b-col>
          <b-col v-if="singleUser.user_credit" lg="6" class="mb-5">
            <ShowItem
              :title="$t('USER.coins')"
              :subtitle="singleUser.user_credit.jeel_coins"
            />
          </b-col>
          <b-col v-if="singleUser.user_credit" lg="6" class="mb-5">
            <ShowItem
              :title="$t('USER.gems')"
              :subtitle="singleUser.user_credit.jeel_gems"
            />
          </b-col>
          <b-col v-if="singleUser.user_credit" lg="6" class="mb-5">
            <ShowItem
              :title="$t('USER.xp')"
              :subtitle="singleUser.user_credit.jeel_xp"
            />
          </b-col>
          <b-col v-if="singleUser.user_credit" lg="6" class="mb-5">
            <ShowItem
              :title="$t('USER.level')"
              :subtitle="singleUser.user_credit.level"
            />
          </b-col>
          <b-col v-if="singleUser.user_credit" lg="6" class="mb-5">
            <ShowItem
              :title="$t('USER.level_percentage')"
              :subtitle="singleUser.user_credit.level_percentage"
            />
          </b-col>
          <b-col v-if="singleUser.student_action_histories && singleUser.student_action_histories.length" lg="12">
            <h2 class="heading">{{ $t("USER.student_action_history") }}:</h2>
          </b-col>
          <!-- Student action histories table -->
          <b-col v-if="singleUser.student_action_histories && singleUser.student_action_histories.length" lg="12">
            <div class="hold-table">
              <b-table
                :head-variant="'gradient'"
                responsive
                striped
                :items="singleUser.student_action_histories"
                :fields="fieldsList"
                sticky-header="500px"
              >
              </b-table>
            </div>
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
      fieldsList: [
        {
          key: "jeel_coins",
          label: this.$i18n.t("USER.coins"),
        },
        {
          key: "jeel_xp",
          label: this.$i18n.t("USER.xp"),
        },
        {
          key: "reward_action.action_name",
          label: this.$i18n.t("USER.action_name"),
        },
        {
          key: "reward_action.action_desc",
          label: this.$i18n.t("USER.action_description"),
        },
        {
          key: "reward_action.first_jeel_coins",
          label: this.$i18n.t("USER.first_coin"),
        },
        {
          key: "reward_action.first_jeel_xp",
          label: this.$i18n.t("USER.first_xp"),
        },
        {
          key: "reward_action.max_trail",
          label: this.$i18n.t("USER.max_trail"),
        },
        {
          key: "reward_action.next_jeel_coins",
          label: this.$i18n.t("USER.next_coins"),
        },
        {
          key: "reward_action.next_jeel_xp",
          label: this.$i18n.t("USER.next_xp"),
        },
        {
          key: "reward_action.second_jeel_coins",
          label: this.$i18n.t("USER.second_coins"),
        },
        {
          key: "reward_action.second_jeel_xp",
          label: this.$i18n.t("USER.second_xp"),
        }
      ],
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
