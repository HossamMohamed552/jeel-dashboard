<template>
  <section class="container-fluid custom-container">
    <div class="show-user">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("USERS.showDetails") }}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="2">
            <div class="hold-user-img">
              <img :src="user.avatar" >
            </div>
          </b-col>
          <b-col lg="10">
            <b-row>
              <b-col lg="4">
                <ShowItem
                  :title="$t('USERS.name')"
                  :subtitle="user.name"
                />
              </b-col>
              <b-col lg="4">
                <ShowItem
                  :title="$t('USERS.first_name')"
                  :subtitle="user.first_name"
                />
              </b-col>
              <b-col lg="4">
                <ShowItem
                  :title="$t('USERS.last_name')"
                  :subtitle="user.last_name"
                />
              </b-col>
            </b-row>
            <b-dd-divider class="my-4" />
            <b-row>
              <b-col lg="4">
                <ShowItem
                  :title="$t('USERS.roles')"
                  :list-items="user.roles"
                />
              </b-col>
              <b-col lg="4">
                <ShowItem
                  :title="$t('USERS.mobile')"
                  :subtitle="user.mobile"
                />
              </b-col>
              <b-col lg="4">
                <ShowItem
                  :title="$t('USERS.email')"
                  :subtitle="user.email"
                />
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
import {getSingleUserRequest} from "@/api/user";

export default {
  name: "index",
  components: {ShowItem},
  data() {
    return {
      user: {},
    }
  },
  mounted() {
    this.ApiService(getSingleUserRequest(this.$route.params.id)).then(
      (response) => {
        this.user = response.data.data;
      }
    );
  },
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
