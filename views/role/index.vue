<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'الأدوار الوظيفية'"
      :fieldsList="fieldsList"
      :table-items="rolesList"
      :v-search-model="roleSearchWord"
      @detailItem="detailItem($event)"
      :number-of-item="totalNumber"
      @editItem="editItem($event)"
      @permissionItem="permissionItem($event)"
      @deleteItem="deleteItem($event)"
      :loading="loading"
      @refetch="getRoles"
      :permission_delete="'delete-roles'"
      :permission_edit="'edit-roles'"
      :permission_view="'show-roles'"
      :permission_add="'add-permissions'"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddRole"
          v-if="user.permissions.includes(`add-roles`)"
        >
          <img src="../../src/assets/images/icons/plus.svg" />
          <span>{{ $t("ROLES.ADD_DEPARTMENT") }}</span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="'حذف الصلاحية'"
      :content-message-question="'هل انت متأكد من حذف الصلاحية'"
      :showModal="showModal"
      @cancel="cancel($event)"
      :is-warning="true"
      @cancelWithConfirm="cancelWithConfirm($event)"
    />
  </section>
</template>
<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import { getRolesRequest } from "@/api/role";
import { deleteRoleRequest } from "@/api/role";
import { mapGetters } from "vuex";

export default {
  name: "index",
  components: { ListItems, Button, Modal },
  data() {
    return {
      loading: false,
      showModal: false,
      roleSearchWord: "",
      totalNumber: 0,
      rolesList: [],
      fieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "type.name",
          label: this.$i18n.t("ROLES.CATEGORIES"),
        },
        {
          key: "description",
          key: "name",
          label: this.$i18n.t("ROLES.DEPARTMENT"),
        },
        {
          key: "actions",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ],
      itemId: 0,
    };
  },
  methods: {
    goToAddRole() {
      this.$router.push("/dashboard/role/add");
    },
    getRoles(event) {
      this.loading = true;
      const params = event;
      this.ApiService(getRolesRequest(params))
        .then((response) => {
          this.rolesList = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    detailItem($event) {
      this.$router.push(`/dashboard/role/show/${$event}`);
    },
    editItem($event) {
      this.$router.push(`/dashboard/role/edit/${$event}`);
    },
    permissionItem($event) {
      this.$router.push(`/dashboard/role/permission/${$event}`);
    },
    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteRoleRequest(this.itemId)).then(() => {
        this.getRoles();
      });
      this.cancel();
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    this.getRoles();
  },
};
</script>
<style scoped lang="scss">
@import "index";
</style>
