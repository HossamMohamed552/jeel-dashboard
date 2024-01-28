<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'إدارة المدرسين'"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :table-items="superVisorList"
      :v-search-model="userSearchWord"
      :loading="loading"
      @refetch="getAllUsers"
      :is-user-page="true"
      :permission_delete="'delete-users'"
      :permission_edit="'edit-users'"
      :permission_view="'show-users'"
      :change_password="'change-password'"
      :cancel_block="'cancel-block'"
    >
    </ListItems>
  </section>
</template>
<script>
import ListItems from "@/components/ListItems/index.vue";
import {getAllSchoolAdminsUsersRequest} from "@/api/school-info";
export default {
  name: "index",
  components: {ListItems},
  data() {
    return {
      superVisorList: [],
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
          key: "actions",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ],
    }
  },
  methods:{
    getAllSchoolAdminsUsers(event) {
      this.loading = true;
      const params = event;
      this.ApiService(getAllSchoolAdminsUsersRequest(params))
        .then((response) => {
          this.superVisorList = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.getAllSchoolAdminsUsers()
  }
}
</script>
<style scoped lang="scss">

</style>
