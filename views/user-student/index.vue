<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'إدارة الطلاب'"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :table-items="studentList"
      :v-search-model="userSearchWord"
      :loading="loading"
      :disableIt="true"
      @refetch="getAllStudentUsers"
      :is-user-page="true"
      :permission_view="'view-enrollment-students-users'"
      :add_role="'add-enrollment-students-users'"
      :add_parent="'add-enrollment-students-parents-users'"
      @addRole="addRole($event)"
      @detailItem="detailItem($event)"
      @addParentToStudentItem="addParentToStudentItem($event)"
    >
    </ListItems>
  </section>
</template>
<script>
import ListItems from "@/components/ListItems/index.vue";
import {getAllStudentUsersRequest, getAllTeacherUsersRequest} from "@/api/school-info";

export default {
  name: "index",
  components: {ListItems},
  data() {
    return {
      studentList: [],
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
      this.$router.push(`/dashboard/student-enrollment/${$event}`)
    },
    detailItem($event){
      this.$router.push(`/dashboard/user-student/${$event}`)
    },
    addParentToStudentItem($event){
      this.$router.push(`/dashboard/add-parent-to-student-user/${$event}`)
    },
    getAllStudentUsers(event) {
      this.loading = true;
      this.ApiService(getAllStudentUsersRequest(event))
        .then((response) => {
          this.studentList = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.getAllStudentUsers()
  }
}
</script>
<style scoped lang="scss">

</style>
