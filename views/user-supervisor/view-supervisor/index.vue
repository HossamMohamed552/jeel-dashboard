<template>
  <section class="container-fluid custom-container fix-display">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("USERS.showDetails") }}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="3">
            <div class="img-container">
              <span>
                <img v-if="singleUser.image" :src="singleUser.image" alt="Person Image" />
                <i v-else class="far fa-user"></i>
              </span>
            </div>
          </b-col>
          <b-col lg="9">
            <b-row>
              <b-col lg="4" class="mb-5 showItem">
                <ShowItem :title="$t('USER.first_name')" :subtitle="singleUser.first_name" />
              </b-col>
              <b-col lg="4" class="mb-5 showItem">
                <ShowItem :title="$t('USERS.SECOND_NAME')" :subtitle="singleUser.middle_name" />
              </b-col>
              <b-col lg="4" class="mb-5 showItem">
                <ShowItem :title="$t('USER.last_name')" :subtitle="singleUser.last_name" />
              </b-col>
              <b-col lg="8" class="mb-5 showItem">
                <ShowItem :title="$t('TABLE_FIELDS.email_username')" :subtitle="singleUser.email" />
              </b-col>
              <b-col lg="4" class="mb-5 showItem">
                <ShowItem :title="$t('USER.mobile')" :subtitle="singleUser.mobile" />
              </b-col>
              <b-col lg="4" class="mb-5 showItem">
                <ShowItem
                  :title="$t('USERS.NATIONALITY')"
                  :subtitle="singleUser?.user_country?.name"
                />
              </b-col>
              <b-col lg="4" class="mb-5 showItem">
                <ShowItem
                  :title="$t('USERS.religion')"
                  :subtitle="singleUser?.user_religion?.name"
                />
              </b-col>
              <b-col lg="4" class="mb-5 showItem">
                <ShowItem :title="$t('USERS.gender')" :subtitle="singleUser?.gender?.name" />
              </b-col>
              <b-col lg="6" class="mb-5 showItem" v-if="singleUser && singleUser.roles">
                <ShowItem :title="$t('USERS.DEPARTMENT')" :listItems="singleUser.roles" />
              </b-col>
              <b-col lg="4" class="mb-5 showItem">
                <ShowItem :title="$t('USERS.ACTIVE')" :subtitle="singleUser?.status?.name" />
              </b-col>
              <b-col lg="12">
                <h3 class="mb-5">روابط التواصل الإجتماعي</h3>
              </b-col>
              <b-col lg="4" class="mb-5 showItem">
                <ShowItem :title="$t('SOCIAL_MEDIA.FACEBOOK')" :subtitle="singleUser?.facebook" />
              </b-col>
              <b-col lg="4" class="mb-5 showItem">
                <ShowItem :title="$t('SOCIAL_MEDIA.TWITTER')" :subtitle="singleUser?.twitter" />
              </b-col>
              <b-col lg="4" class="mb-5 showItem">
                <ShowItem :title="$t('SOCIAL_MEDIA.LINKEDIN')" :subtitle="singleUser?.linkedin" />
              </b-col>
              <b-col lg="6" class="mb-5 showItem img-container">
                <img class="w-100" :src="singleUser.avatar" />
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import {getUsersSchoolAdminRequest} from "@/api/school-info";
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
    this.ApiService(getUsersSchoolAdminRequest(this.$route.params.id)).then((response) => {
      this.singleUser = response.data.data;
    });
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
