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
              <validation-observer v-slot="{ invalid }" ref="schoolsUsersSearch">
                <GenericForm
                  :schema="userSearch"
                  @onSubmit="onSubmit"
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
        :header-name="'المستخدمين'"
        :fieldsList="fieldsList"
        :number-of-item="totalNumber"
        :table-items="usersSchoolList"
        :v-search-model="userSearchWord"
        :loading="loading"
        :is-user-page="true"
        :permission_view="'show-school-users'"
        :permission_delete="'show-school-users'"
        :permission_edit="'show-school-users'"
        :change_password="'show-school-users'"
        :cancel_block="'show-school-users'"
        @detailItem="detailItem($event)"
        @changeStatus="changeStatus($event)"
        @cancelBlock="cancelBlock($event)"
        @changePassword="changePassword($event)"
        @deleteItem="deleteItem($event)"
        @editItem="editItem($event)"
        @refetch="getAllSchoolUsers"
      >
        <template #buttons>
          <Button
            :custom-class="'btn-add rounded-btn big-padding'"
            @click="goToAddUser"
            v-if="user.permissions.includes(`add-school-users`)"
          >
            <img src="@/assets/images/icons/plus.svg" />
            <span>إضافة مستخدم جديد</span>
          </Button>
        </template>
        <!--      /dashboard/users/show/:id-->
      </ListItems>
    </div>
    <Modal
      :content-message="'حذف المستخدم'"
      :content-message-question="'هل انت متأكد من حذف المستخدم'"
      :showModal="showModal"
      @cancel="cancel($event)"
      :is-warning="true"
      @cancelWithConfirm="cancelWithConfirm($event)"
    />
  </section>
</template>
<script>
import ListItems from "@/components/ListItems/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import GenericForm from "@/components/Shared/GenericForm";
import Modal from "@/components/Shared/Modal/index.vue";

import { getAllSchoolUsersRequest, deleteSchoolUserRequest } from "@/api/school-info";
import { postChangeStatusRequest, postCancelBlockRequest, deleteUserRequest } from "@/api/user";

import { mapGetters } from "vuex";
import { getAllUserStatus, getAllRolesByType } from "@/services/dropdownService";
export default {
  name: "index",
  components: { Button, ListItems, GenericForm, Modal },
  computed: {
    ...mapGetters(["user"]),
  },
  data() {
    return {
      collapsed: true,
      itemId: "",
      usersSchoolList: [],
      showModal: false,
      totalNumber: 0,
      loading: false,
      userSearchWord: "",
      fieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "image",
          label: this.$i18n.t("TABLE_FIELDS.image"),
        },
        {
          key: "first_name",
          label: this.$i18n.t("TABLE_FIELDS.first_name"),
        },
        {
          key: "last_name",
          label: this.$i18n.t("TABLE_FIELDS.last_name"),
        },
        {
          key: "email",
          label: this.$i18n.t("USERS.name"),
        },
        {
          key: "roles",
          label: this.$i18n.t("USERS.DEPARTMENT"),
        },
        {
          key: "status.key",
          label: this.$i18n.t("TABLE_FIELDS.status"),
        },
        {
          key: "actions",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ],
      userSearch: [
        {
          key: "email",
          label: this.$t("USERS.name"),
          col: "3",
          listen: "id",
          value: "",
          type: "text",
          rules: "",
        },
        {
          key: "role_id",
          col: "3",
          type: "select",
          optionValue: "name",
          listen: "id",
          label: this.$t("USERS.DEPARTMENT"),
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "",
        },
        {
          key: "status",
          col: "3",
          type: "select",
          optionValue: "name",
          label: this.$t("SCHOOL.status"),
          options: [],
          listen: "key",
          deselectFromDropdown: true,
          value: "",
          rules: "",
        },
        {
          key: "is_blocked",
          col: "3",
          type: "select",
          optionValue: "name",
          label: "الحظر",
          options: [
            {
              id: 0,
              key: true,
              name: "محظور",
            },
            {
              id: 1,
              key: false,
              name: "غير محظور",
            },
          ],
          listen: "key",
          deselectFromDropdown: true,
          value: "",
          rules: "",
        },
      ],
    };
  },
  methods: {
    onSubmit(values) {
      this.getAllSchoolUsers(values);
    },
    getAllSchoolUsers(event) {
      this.loading = true;
      this.ApiService(getAllSchoolUsersRequest(event))
        .then((response) => {
          this.usersSchoolList = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    detailItem($event) {
      this.$router.push(`/dashboard/user-all-school/${$event}`);
    },
    changePassword($event) {
      this.$router.push(`/dashboard/user-school-admin/change-password/${$event}`);
    },
    goToAddUser() {
      this.$router.push("/dashboard/add-user-school-admin");
    },
    editItem($event) {
      this.$router.push(`/dashboard/edit-user-school-admin/${$event}`);
    },
    changeStatus($event) {
      let userStatus = {
        user_id: $event.id,
      };

      if ($event.status.key == "deactivated" || $event.status.key == "unverified")
        userStatus.is_active = 1;
      else userStatus.is_active = 0;

      this.ApiService(postChangeStatusRequest(userStatus)).then(() => {});
    },
    cancelBlock($event) {
      this.ApiService(postCancelBlockRequest({ user_id: $event })).then(() => {
        this.getAllSchoolUsers();
      });
    },

    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteUserRequest(this.itemId)).then(() => {
        this.getAllSchoolUsers();
      });
      this.cancel();
    },
  },

  mounted() {
    this.getAllSchoolUsers();
    getAllRolesByType(this.userSearch, "role_id");
    getAllUserStatus(this.userSearch, "status");
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
