<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'إدارة اولياء الامور'"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :table-items="parentList"
      :v-search-model="userSearchWord"
      :loading="loading"
      :disableIt="true"
      @refetch="getAllParentsUsers"
      :is-user-page="true"
      :add_role="'add-enrollment-students-parents-users'"
      :permission_view="'show-school-users'"
      @addRole="addRole($event)"
      @detailItem="detailItem($event)"
    >
    </ListItems>
  </section>
</template>
<script>
import ListItems from "@/components/ListItems/index.vue";
import {getAllParentUsersRequest, getAllTeacherUsersRequest} from "@/api/school-info";

export default {
  name: "index",
  components: {ListItems},
  data() {
    return {
      parentList: [],
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
    getAllParentsUsers(event) {
      this.loading = true;
      this.ApiService(getAllParentUsersRequest(event))
        .then((response) => {
          this.parentList = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    addRole($event){
      this.$router.push(`/dashboard/parent-enrollment/${$event}`)
    },
    detailItem($event){
      this.$router.push(`/dashboard/user-parent/${$event}`)
    },
  },
  mounted() {
    this.getAllParentsUsers()
  }
}
</script>
<style scoped lang="scss">

</style>
