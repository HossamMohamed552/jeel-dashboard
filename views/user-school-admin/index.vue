<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'إدارة مديرى المدرسة'"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :table-items="superVisorList"
      :v-search-model="userSearchWord"
      :loading="loading"
      :disableIt="true"
      :is-user-page="true"
      :add_role="'add-enrollment-schooladmins-users'"
      :permission_view="'show-school-users'"
      @detailItem="detailItem($event)"
      @refetch="getAllSchoolAdminsUsers"
      @addRole="addRole($event)"
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
    addRole($event){
      this.$router.push(`/dashboard/user-school-admin-enrollment/${$event}`)
    },
    detailItem($event){
      this.$router.push(`/dashboard/user-school-admin/${$event}`)
    },
    getAllSchoolAdminsUsers(event) {
      this.loading = true;
      this.ApiService(getAllSchoolAdminsUsersRequest(event))
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
