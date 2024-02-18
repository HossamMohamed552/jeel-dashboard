<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'قائمة الفصول'"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :table-items="classesList"
      :v-search-model="userSearchWord"
      :loading="loading"
      :disableIt="true"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @addStudentOnClassItem="addStudentOnClassItem($event)"
      @refetch="getAllClasses"
      :is-user-page="true"
      :permission_delete="'delete-classes'"
      :permission_edit="'edit-classes'"
      :permission_view="'show-classes'"
      :permission_addStudent="'add-enrollment-students-users'"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddClass"
          v-if="user.permissions.includes(`add-classes`)"
        >
          <img src="@/assets/images/icons/plus.svg"/>
          <span>إضافة فصل</span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="'حذف الفصل'"
      :content-message-question="'هل انت متأكد من حذف الفصل ؟'"
      :showModal="showModal"
      @cancel="cancel($event)"
      :is-warning="true"
      @cancelWithConfirm="cancelWithConfirm($event)"
    />
  </section>
</template>
<script>
import {deleteSchoolAdminClassRequest, getAllClassesRequest} from "@/api/school-info";
import ListItems from "@/components/ListItems/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import {mapGetters} from "vuex";
import Modal from "@/components/Shared/Modal/index.vue";

export default {
  name: "index",
  components: {Modal, Button, ListItems},
  computed: {
    ...mapGetters(["user"]),
  },
  data() {
    return {
      classesList: [],
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
          key: "studyYear.name",
          label: this.$i18n.t("TABLE_FIELDS.studyYear"),
        },
        {
          key: "level.name",
          label: this.$i18n.t("TABLE_FIELDS.levelSchoolAdmin"),
        },
        {
          key: "name",
          label: this.$i18n.t("TABLE_FIELDS.className"),
        },
        {
          key: "students_count",
          label: this.$i18n.t("TABLE_FIELDS.students_count"),
        },
        {
          key: "actions",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ],
    }
  },
  methods: {
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteSchoolAdminClassRequest(this.itemId)).then(() => {
        this.getAllClasses();
      });
      this.cancel();
    },
    detailItem($event) {
      this.$router.push(`/dashboard/school-admin-class/show/${$event}`);
    },
    editItem($event) {
      this.$router.push(`/dashboard/school-admin-class/edit/${$event}`);
    },
    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    addStudentOnClassItem($event) {
      console.log('$event', $event)
    },
    goToAddClass() {
      this.$router.push('/dashboard/school-admin-classes/add')
    },
    getAllClasses() {
      this.ApiService(getAllClassesRequest()).then((response) => {
        this.classesList = response.data.data
        this.totalNumber = response.data.meta.total;
      })
    }
  },
  mounted() {
    this.getAllClasses()
  }
}
</script>
<style scoped lang="scss">

</style>
