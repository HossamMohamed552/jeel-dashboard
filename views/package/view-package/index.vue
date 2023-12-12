<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("PACKAGE.showDetails") }}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="4" class="mb-5">
            <ShowItem :title="$t('PACKAGE.name')" :subtitle="singlePackage.name" />
          </b-col>
          <b-col lg="4" class="mb-5">
            <ShowItem :title="$t('PACKAGE.price')" :subtitle="singlePackage.price" />
          </b-col>
          <b-col lg="4" class="mb-5">
            <ShowItem
              :title="$t('PACKAGE.classes_count')"
              :subtitle="singlePackage.classes_count"
            />
          </b-col>
          <b-col lg="4" class="mb-5" v-for="singlePackageRole in roles" :key="singlePackageRole.id">
            <ShowItem
              :title="` عدد ${singlePackageRole.name}`"
              :subtitle="singlePackageRole.number"
            />
          </b-col>
          <b-col lg="12">
            <ShowItem
              :title="$t('PACKAGE.description')"
              :subtitle="singlePackage.description"
            />
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import { getSinglePackagesRequest } from "@/api/packages.js";
export default {
  name: "index",
  components: {
    ShowItem,
  },
  data() {
    return {
      singlePackage: {},
      roles: [
        {
          role_id: 2,
          name: "مديرين المدرسة",
          number: "",
        },
        {
          role_id: 3,
          name: "المشرفين",
          number: "",
        },
        {
          role_id: 4,
          name: "المدرسين",
          number: "",
        },
        {
          role_id: 5,
          name: "الطلاب",
          number: "",
        },
        {
          role_id: 6,
          name: "أولياء الأمور",
          number: "",
        }

      ]
    };
  },
  mounted() {
    this.ApiService(getSinglePackagesRequest(this.$route.params.id)).then(
      (response) => {
        this.singlePackage = response.data.data;
        this.roles[0].number = response.data.data.number_users_roles[0].number
        this.roles[1].number = response.data.data.number_users_roles[1].number
        this.roles[2].number = response.data.data.number_users_roles[2].number
        this.roles[3].number = response.data.data.number_users_roles[3].number
        this.roles[4].number = response.data.data.number_users_roles[4].number
      }
    );
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
