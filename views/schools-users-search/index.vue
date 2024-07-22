<template>
  <section class="container-fluid custom-container">
    <div class="collapse-search">
      <div class="collapse-search__header">
        <h2 class="heading">{{ $t("BUTTONS.SEARCH") }}</h2>
        <button class="collapsed" @click="toggleCollapsed">
          <i :class="collapsed ? 'fas fa-minus' : 'fas fa-plus'"></i>
        </button>
      </div>
      <div :class="collapsed ? '' : 'collapsed'" class="collapse-search__body" v-if="collapsed">
        <div class="hold-fields">
          <b-row>
            <b-col lg="12">
              <validation-observer v-slot="{ invalid }" ref="schoolsUsersSearch">
                <GenericForm
                  :schema="userSearch"
                  @handleCancel="handleCancel"
                  @onSubmit="onSubmit"
                  @handleInput="handleInput"
                  :loading="loading"
                  :submitButton="$t('BUTTONS.SEARCH')"
                  :cancelButton="$t('BUTTONS.RECOVERY')"
                  :invalid="invalid"
                ></GenericForm>
              </validation-observer>
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
        :number-of-item="totalNumber"
        @detailItem="detailItem($event)"
        @changeStatus="changeStatus($event)"
        @cancelBlock="cancelBlock($event)"
        @changePassword="changePassword($event)"
        @refetch="getAllUsers($event)"
        :loading="loading"
        :change_password="'change-password'"
        :permission_view="'show-schools'"
        :permission_edit="'hide-it'"
        :cancel_block="'cancel-block'"
        :showSortControls="false"
      >
        <template #buttons>
          <Button
            class="mr-3"
            :custom-class="'btn-add rounded-btn big-padding'"
            @click="goToAddUserExcel"
            v-if="user.permissions.includes(`excel-user-export`)"
          >
            <img src="@/assets/images/icons/plus.svg"/>
            <span>{{ $t('AddExport') }}</span>
          </Button>
          <Button
            :custom-class="'btn-add rounded-btn big-padding'"
            @click="handleAddUser"
            v-if="user.permissions.includes(`add-users`)"
          >
            <img src="@/assets/images/icons/plus.svg"/>
            <span>{{ $t('USERS.addSchoolUser') }}</span>
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
import {mapGetters} from "vuex";
import {postChangeStatusRequest, postCancelBlockRequest, getSchoolUsersRequest} from "@/api/user";
import {getUsersSearch} from "@/api/school";
import _ from "lodash";

import {
  getALLCountries,
  getALLSchoolGroups,
  getAllUserStatus,
  getAllRolesType,
  getAllSchoolsBySchoolGroup,
  getAllRolesByType, getAllSchoolsBySchoolGroupWithoutFullDetail,
} from "@/services/dropdownService";

export default {
  name: "index",
  components: {
    GenericForm,
    ListItems,
    Button,
  },
  computed: {
    fieldsList() {
      return [
        {
          key: "vid",
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
          key: "school.name",
          label: this.$i18n.t("TABLE_FIELDS.school"),
        },
        {
          key: "actions",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ]
    },
    ...mapGetters(["user"]),
  },
  data() {
    return {
      collapsed: false,
      loading: false,
      showModal: false,
      usersList: [],
      searchWithPagination: {},
      userSearch: [
        {
          key: "email",
          label: "اسم المستخدم",
          labelEn: "user name",
          col: "4",
          listen: "id",
          value: "",
          type: "text",
          rules: "",
        },
        {
          key: "nationality_id",
          col: "4",
          listen: "id",
          type: "select",
          optionValue: "name",
          label: "الدولة",
          labelEn: "country",
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "",
        },
        {
          key: "school_group_id",
          col: "4",
          listen: "id",
          type: "select",
          optionValue: "name",
          label: "مجموعة المدارس",
          labelEn: "school group",
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "",
        },
        {
          key: "school_id",
          col: "4",
          listen: "id",
          type: "select",
          optionValue: "name",
          label: "المدرسة",
          labelEn: "school",
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "",
        },
        {
          key: "category_id",
          col: "4",
          listen: "id",
          type: "select",
          optionValue: "name",
          label: "تصنيف الدور الوظيفي",
          labelEn: "Job role classification",
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "",
        },
        {
          key: "role_id",
          col: "4",
          type: "select",
          optionValue: "name",
          listen: "id",
          label: "الدور الوظيفي",
          labelEn: "Job role",
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "",
        },
        {
          key: "status",
          col: "4",
          type: "select",
          optionValue: "name",
          label: "الحالة",
          labelEn: "status",
          options: [],
          listen: "key",
          deselectFromDropdown: true,
          value: "",
          rules: "",
        },
      ],
      totalNumber: 0,
    };
  },
  methods: {
    onSubmit(values) {
      this.loading = true;
      this.searchWithPagination = values;
      this.getAllUsers(values);
    },
    handleInput: _.debounce(function (key, value) {
      if (key == "school_group_id" && value != ""){
        console.log('value',value)
        getAllSchoolsBySchoolGroupWithoutFullDetail(this.userSearch, "school_id", {school_group_id:value,list_all:true});
      }
      if (key == "category_id" && value != ""){
        getAllRolesByType(this.userSearch, "role_id", value);
      }
    }, 300),

    handleCancel() {
      this.userSearch.map(field => field.value = "")
      this.searchWithPagination = {}
      this.getAllUsers()
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
      this.ApiService(postCancelBlockRequest({user_id: $event})).then(() => {
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
        // this.getAllUsers();
      });
    },
    getAllUsers($event) {
      this.loading = true;
      const params = {...$event, ...this.searchWithPagination};
      this.ApiService(getSchoolUsersRequest(params))
        .then((response) => {
          this.usersList = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    goToAddUserExcel(){
      this.$router.push('/dashboard/add-user-excel')
    }
  },
  async mounted() {
    await getALLCountries(this.userSearch, "nationality_id");
    await getALLSchoolGroups(this.userSearch, "school_group_id");
    await getAllRolesType(this.userSearch, "category_id");
    await getAllUserStatus(this.userSearch, "status");
    this.getAllUsers();
  },
  watch: {},
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
