<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'قائمة المستخدمين'"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :table-items="usersList"
      :v-search-model="userSearchWord"
      :loading="loading"
      :is-user-page="true"
      @detailItem="detailItem($event)"
      @refetch="getAllUsers"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="handleAddUser"
        >
          <img src="@/assets/images/icons/plus.svg" />
          <span>إضافة مستخدم جديد</span>
        </Button>
      </template>
    </ListItems>
  </section>
</template>
<script>
import ListItems from "@/components/ListItems/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import { getAllUsersRequest } from "@/api/user";

export default {
  name: "index",
  components: {
    ListItems,
    Button,
  },
  data() {
    return {
      loading: false,
      userSearchWord: "",
      usersList: [],
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
          key: "roles[0].name",
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
  },
  mounted() {
    this.getAllUsers();
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
