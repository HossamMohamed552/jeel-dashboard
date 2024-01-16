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
            <ShowItem
              class="divider-show"
              :title="$t('ROLES.CATEGORIES')"
              :subtitle="role?.type?.name"
            />
          </b-col>
          <b-col lg="6">
            <ShowItem class="divider-show" :title="$t('ROLES.DEPARTMENT')" :subtitle="role.name" />
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
          <template #cell(is_active)="data">
            <span v-if="data.value" class="mark checked">
              <b-icon icon="check" variant="success"></b-icon>
            </span>
            <span v-else class="mark unchecked">
              <b-icon icon="x" variant="danger"></b-icon>
            </span>
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
          key: "role",
          label: "اسم القائمة",
        },
        {
          key: "name",
          label: "اسم الصلاحية",
        },
        {
          key: "is_active",
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
      this.ApiService(getRolePermissionsRequest(params)).then((response) => {
        this.flattenDataWithRole(response.data.data);
      });
    },
    flattenDataWithRole(data) {
      // Flatten the nested arrays and add the role property to each object
      const flattenedData = Object.entries(data).flatMap(([role, items]) =>
        items.map((item) => ({ ...item, role }))
      );
      this.items = flattenedData;
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
