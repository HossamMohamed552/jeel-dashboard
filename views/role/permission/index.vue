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
        <div class="search-sort">
          <h2 class="heading">إدارة الصلاحيات</h2>
          <div class="search">
            <b-form-input v-model="inputValue" placeholder="بحث" class="search-input" />
            <img src="@/assets/images/icons/search.svg" />
          </div>
        </div>
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
          <template :slot="`head(is_active)`">
            <div class="d-flex">
              <b-form-checkbox :checked="isSelectAll" @change="toggleSelectAll"></b-form-checkbox>
              {{ this.$i18n.t("TABLE_FIELDS.actions") }}
            </div>
          </template>
          <template #empty>
            <div class="mt-5 pt-5 text-center">لا توجد بيانات</div>
          </template>
          <template #cell(is_active)="data">
            <b-form-checkbox
              size="lg"
              v-model="data.value"
              switch
              @change="toggleIsActive(data.item)"
            ></b-form-checkbox>
          </template>
        </b-table>
        <div class="hold-btns-form">
          <Button @click="handleCancel" custom-class="cancel-btn margin">
            {{ $t("GLOBAL_CANCEL") }}
          </Button>
          <Button
            :disabled="disabledBtn"
            @click="updateRolePermissions"
            :loading="loading"
            custom-class="submit-btn"
          >
            {{ $t("GLOBAL_SAVE") }}
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import { debounce } from "lodash";
import { getPermissionRequest } from "@/api/permission";
import {
  getSingleRoleRequest,
  getRolePermissionsRequest,
  putRolePermissionsRequest,
} from "@/api/role";
export default {
  name: "index",
  components: {
    ShowItem,
    ListItems,
  },
  data() {
    return {
      role: {},
      isSelectAll: false,
      inputValue: "",
      formValues: {
        per_page: 10,
        page: 1,
        name: "",
        order: "",
        order_by: "",
      },
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
      loading: false,
      items: [],
      cloneItems: [],
      active_permissions: [],
      inactive_permissions: [],
      roleID: this.$route.params.id,
      categoryID: 0,
      disabledBtn: true,
    };
  },
  computed: {
    activeItems() {
      return this.items.filter((item) => item.is_active);
    },
    inactiveItems() {
      return this.items.filter((item) => !item.is_active);
    },
  },

  methods: {
    toggleSelectAll() {
      this.isSelectAll = !this.isSelectAll;
      console.log(this.isSelectAll);

      this.items.forEach((item) => {
        item.is_active = this.isSelectAll;
      });

      this.updateActiveInactiveIDs();
    },

    searchBy: debounce(function (name) {
      console.log(name);
      let params = {
        role_id: this.$route.params.id,
        category_id: this.categoryID,
        name: name,
      };

      this.ApiService(getRolePermissionsRequest(params)).then((response) => {
        this.flattenDataWithRole(response.data.data);
      });
    }, 500),
    handleCancel() {
      this.$router.push("/dashboard/role");
    },
    toggleIsActive(item) {
      // Update the 'is_active' property of the clicked item
      item.is_active = !item.is_active;
      this.updateActiveInactiveIDs();
    },
    updateActiveInactiveIDs() {
      this.active_permissions = this.activeItems.map((item) => item.id);
      this.inactive_permissions = this.inactiveItems.map((item) => item.id);
    },
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
      this.cloneItems = JSON.parse(JSON.stringify(this.items));
    },
    updateRolePermissions() {
      let params = {
        role_id: this.$route.params.id,
        category_id: this.categoryID,
        active_permissions: this.active_permissions,
        inactive_permissions: this.inactive_permissions,
      };
      this.loading = true;
      this.ApiService(putRolePermissionsRequest(params))
        .then(() => {
          this.$router.push("/dashboard/role");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    isPermissionsChange(newItems) {
      this.disabledBtn = !newItems.some(
        (newItem, index) => newItem.is_active !== this.cloneItems[index].is_active
      );
    },
  },

  watch: {
    inputValue(newVal) {
      this.searchBy(newVal);
    },
    items: {
      handler(newItems) {
        this.isPermissionsChange(newItems);
      },
      deep: true,
      immediate: true,
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
