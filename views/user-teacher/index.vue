<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'إدارة المدرسين'"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :table-items="teacherList"
      :v-search-model="userSearchWord"
      :loading="loading"
      :disableIt="true"
      @refetch="getAllTeachersUsers"
      :is-user-page="true"
      :permission_delete="'delete-users'"
      :permission_edit="'edit-users'"
      :permission_view="'show-users'"
    >
    </ListItems>
  </section>
</template>
<script>
import ListItems from "@/components/ListItems/index.vue";
import {getAllTeacherUsersRequest} from "@/api/school-info";

export default {
  name: "index",
  components: {ListItems},
  data() {
    return {
      teacherList: [],
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
    }
  },
  methods:{
    getAllTeachersUsers(event) {
      this.loading = true;
      this.ApiService(getAllTeacherUsersRequest(event))
        .then((response) => {
          this.teacherList = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.getAllTeachersUsers()
  }
}
</script>
<style scoped lang="scss">

</style>
