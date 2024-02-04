<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'المستخدمين'"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :table-items="usersSchoolList"
      :v-search-model="userSearchWord"
      :loading="loading"
      :disableIt="true"
      :is-user-page="true"
      :permission_view="'show-school-users'"
      @detailItem="detailItem($event)"
      @refetch="getAllSchoolUsers"
    >
      <template #buttons>

        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddUser"
          v-if="user.permissions.includes(`add-school-users`)"
        >
          <img src="@/assets/images/icons/plus.svg"/>
          <span>إضافة مستخدم جديد</span>
        </Button>
      </template>
      <!--      /dashboard/users/show/:id-->
    </ListItems>
  </section>
</template>
<script>
import ListItems from "@/components/ListItems/index.vue";
import {
  getAllSchoolAdminsUsersRequest,
  getAllSchoolUsersRequest,
  getAllSchoolUsersUsersRequest
} from "@/api/school-info";
import Button from "@/components/Shared/Button/index.vue";
import {mapGetters} from "vuex";

export default {
  name: "index",
  components: {Button, ListItems},
  computed: {
    ...mapGetters(["user"]),
  },
  data() {
    return {
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
    }
  },
  methods: {
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
      this.$router.push(`/dashboard/user-all-school/${$event}`)
    },
    goToAddUser() {
      this.$router.push('/dashboard/add-user-school-admin')
    },
  },

  mounted() {
    this.getAllSchoolUsers()
  }
}
</script>
<style scoped lang="scss">

</style>
