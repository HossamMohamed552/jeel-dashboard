<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("ROLES.showDetails") }}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="6">
            <ShowItem class="divider-show" :title="$t('CATEGORIES')" :subtitle="role?.type?.name" />
          </b-col>
          <b-col lg="6">
            <ShowItem class="divider-show" :title="$t('DEPARTMENT')" :subtitle="role.name" />
          </b-col>
          <b-col lg="12">
            <ShowItem
              class="divider-show"
              :title="$t('TABLE_FIELDS.description')"
              :subtitle="role.description"
            />
          </b-col>
        </b-row>
      </div>

      <div class="permissions">
        <h2 class="heading">إدارة الصلاحيات</h2>
        <b-table
          :head-variant="'gradient'"
          responsive
          striped
          :items="items"
          :fields="fieldsList"
          :tbody-class="'custom-body'"
          data-custom-sort="customSort"
          show-empty
        >
          <template #empty>
            <div class="mt-5 pt-5 text-center">لا توجد بيانات</div>
          </template>
        </b-table>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";

import { getSingleRoleRequest, getRolePermissionsRequest } from "@/api/role";
export default {
  name: "index",
  components: {
    ShowItem,
  },
  data() {
    return {
      role: {},
      fieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "type.nam  e",
          label: "اسم القائمة",
        },
        {
          key: "description",
          key: "name",
          label: "اسم الصلاحية",
        },
        {
          key: "actions",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ],
      items: [],
      data: [],
      roleID: this.$route.params.id,
      categoryID: 0,
    };
  },
  methods: {
    getAllRolePermissions() {
      let params = {
        role_id: this.$route.params.id,
        category_id: this.categoryID,
      };
      console.log("getAllRolePermissions", this.$route.params.id, this.categoryID);
      this.ApiService(getRolePermissionsRequest(params)).then((response) => {
        this.data = response.data.data;
        console.log(this.items);
      });
    },
  },
  mounted() {
    this.ApiService(getSingleRoleRequest(this.$route.params.id)).then((response) => {
      this.role = response.data.data;
      this.categoryID = response.data.data.type.id;
      this.getAllRolePermissions();
    });
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
