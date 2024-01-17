<template>
  <section class="container-fluid custom-container">
    <div class="collapse-search">
      <div class="collapse-search__header">
        <h2 class="heading">{{ $t("BUTTONS.SEARCH") }}</h2>
        <button class="collapsed" @click="toggleCollapsed">
          <i :class="collapsed ? 'fas fa-minus' : 'fas fa-plus'"></i>
        </button>
      </div>
      <div :class="collapsed ? '' : 'collapsed'" class="collapse-search__body">
        <div class="hold-fields">
          <b-row>
            <b-col lg="12">
              <GenericForm
                :schema="userSearch"
                @handleCancel="handleCancel"
                @onSubmit="onSubmit"
                @handleInput="handleInput"
                :loading="loading"
                :submitButton="$t('BUTTONS.SEARCH')"
                :cancelButton="$t('BUTTONS.RECOVERY')"
              ></GenericForm>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
    <div class="collapse-search listing">
      <ListItems
        :header-name="$t('SCHOOL.USERS_SCHOOL_LIST')"
        :tableItems="usersList"
        :fields-list="fieldsList"
        @detailItem="detailItem($event)"
        @changeStatus="changeStatus($event)"
        @cancelBlock="cancelBlock($event)"
        @changePassword="changePassword($event)"
        :loading="loading"
        :change_password="'change-password'"
        :permission_view="'show-schools'"
        :cancel_block="'cancel-block'"
        :notHidePagination="false"
        :showSortControls="false"
      >
        <template #buttons>
          <Button
            :custom-class="'btn-add rounded-btn big-padding'"
            @click="handleAddUser"
            v-if="user.permissions.includes(`add-users`)"
          >
            <img src="@/assets/images/icons/plus.svg" />
            <span>إضافة مستخدم</span>
          </Button>
        </template>
      </ListItems>
    </div>
  </section>
</template>
<script>
import Button from "@/components/Shared/Button/index.vue";
import GenericForm from "@/components/Shared/GenericForm";
import ListItems from "@/components/ListItems/index.vue";
import { mapGetters } from "vuex";
import { postChangeStatusRequest, getAllUsersRequest } from "@/api/user";
import { getUsersSearch } from "@/api/school";
import _ from "lodash";

import {
  getALLCountries,
  getALLSchoolGroups,
  getALLStatuses,
  getAllUserStatus,
  getAllRolesType,
  getAllSchoolsBySchoolGroup,
  getAllRolesByType,
} from "@/services/dropdownService";
export default {
  name: "index",
  components: {
    GenericForm,
    ListItems,
    Button,
  },
  computed: {
    ...mapGetters(["user"]),
  },
  data() {
    return {
      collapsed: true,
      loading: false,
      showModal: false,
      usersList: [],
      userSearch: [
        {
          key: "name",
          label: "",
          label: this.$t("USERS.name"),
          col: "4",
          value: "",
          type: "text",
          rules: "",
        },
        {
          key: "country_id",
          col: "4",
          type: "select",
          label: this.$t("SCHOOL.COUNTRY"),
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "",
        },
        {
          key: "school_group_id",
          col: "4",
          type: "select",
          label: this.$t("SCHOOL.SCHOOL_COLLECTION"),
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "",
        },
        {
          key: "school_id",
          col: "4",
          type: "select",
          label: this.$t("TABLE_FIELDS.school"),
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "",
        },
        {
          key: "roles_categories",
          col: "4",
          type: "select",
          label: this.$t("ROLES.CLASSIFICATION_DEPARTMENT"),
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "",
        },
        {
          key: "roles",
          col: "4",
          type: "select",
          label: this.$t("USERS.DEPARTMENT"),
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "",
        },
        {
          key: "status",
          col: "4",
          type: "select",
          label: this.$t("SCHOOL.status"),
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "",
        },
      ],
      usersList: [],
      totalNumber: 0,
      fieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "roles",
          label: this.$i18n.t("USERS.DEPARTMENT"),
        },
        {
          key: "email",
          label: this.$i18n.t("USERS.name"),
        },
        {
          key: "status.key",
          label: this.$i18n.t("TABLE_FIELDS.status"),
        },
        {
          key: "status.name",
          label: this.$i18n.t("TABLE_FIELDS.block"),
        },
        {
          key: "actions",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ],
    };
  },

  methods: {
    onSubmit(values) {
      // this.loading = true;
      console.log("onSubmit", values);
      this.getAllUsers(values);
    },
    handleInput: _.debounce(function (key, value) {
      if (key == "school_group_id" && value != "")
        getAllSchoolsBySchoolGroup(this.userSearch, "school_id", value);
      if (key == "roles_categories" && value != "")
        getAllRolesByType(this.userSearch, "roles", value);
      console.log("handleInput", key, value);
    }, 300),

    handleCancel() {
      console.log("handleCancel");
      // this.$router.push("/dashboard/schools");
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },

    // Table Functions
    handleAddUser() {
      this.$router.push("/dashboard/schools-users-search/add");
    },
    detailItem($event) {
      this.$router.push(`/dashboard/users/show/${$event}`);
    },

    changePassword($event) {
      this.$router.push(`/dashboard/users/change-password/${$event}`);
    },
    cancelBlock($event) {
      this.ApiService(postCancelBlockRequest({ user_id: $event })).then(() => {
        this.getAllUsers();
      });
    },
    changeStatus($event) {
      let userStatus = {
        user_id: $event.id,
      };

      if ($event.status.key == "deactivated" || $event.status.key == "unverified")
        userStatus.is_active = 1;
      else userStatus.is_active = 0;

      this.ApiService(postChangeStatusRequest(userStatus)).then(() => {
        this.getAllUsers();
      });
    },
    getAllUsers(event) {
      this.loading = true;
      const params = event;
      this.ApiService(getAllUsersRequest(params))
        .then((response) => {
          this.usersList = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  async mounted() {
    getALLCountries(this.userSearch, "country_id");
    getALLSchoolGroups(this.userSearch, "school_group_id");
    getAllRolesType(this.userSearch, "roles_categories");
    getAllUserStatus(this.userSearch, "status");
    this.getAllUsers();
  },
  watch: {},
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
