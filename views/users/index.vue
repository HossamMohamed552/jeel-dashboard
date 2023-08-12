<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'قائمة المستخدمين'"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :table-items="usersList"
      :v-search-model="userSearchWord"
      :loading="loading"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @refetch="getAllUsers"
      :is-user-page="true"
      :permission_delete="'delete-users'"
      :permission_edit="'edit-users'"
      :permission_view="'show-users'"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="handleAddUser"
          v-if="user.permissions.includes(`add-users`)"
        >
          <img src="@/assets/images/icons/plus.svg"/>
          <span>إضافة مستخدم جديد</span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="'حذف المستخدم'"
      :content-message-question="'هل انت متأكد من حذف المستخدم ؟'"
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
import {deleteUserRequest, getAllUsersRequest} from "@/api/user";
import Modal from "@/components/Shared/Modal/index.vue";
import {mapGetters} from "vuex";

export default {
  name: "index",
  components: {
    Modal,
    ListItems,
    Button,
  },
  data() {
    return {
      loading: false,
      userSearchWord: "",
      usersList: [],
      showModal: false,
      totalNumber: 0,
      fieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "avatar",
          label: this.$i18n.t("avatar"),
        },
        {
          key: "name",
          label: this.$i18n.t("TABLE_FIELDS.name"),
        },
        {
          key: "roles",
          label: this.$i18n.t("TABLE_FIELDS.role"),
        },
        {
          key: "email",
          label: this.$i18n.t("TABLE_FIELDS.email"),
        },
        {
          key: "mobile",
          label: this.$i18n.t("TABLE_FIELDS.mobile"),
        },
        {
          key: "actions",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ],
    };
  },
  methods: {
    handleAddUser() {
      this.$router.push("/dashboard/users/add");
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
    detailItem($event) {
      this.$router.push(`/dashboard/users/show/${$event}`);
    },
    editItem($event) {
      this.$router.push(`/dashboard/users/edit/${$event}`);
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
        this.getAllUsers();
      });
      this.cancel();
    },
  },
  computed:{
    ...mapGetters(['user'])
  },
  mounted() {
    this.getAllUsers();
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
