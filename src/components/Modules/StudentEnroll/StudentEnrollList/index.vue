<template>
  <section class="container-fluid">
    <ListItems
      :header-name="'قوائم الطلاب'"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :table-items="studentEnrollList"
      :v-search-model="studentEnrollSearchWord"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @searchBy="searchBy"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddStudentEnroll"
        >
          <img src="@/assets/images/icons/plus.svg" />
          <span>إضافة طالب</span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="'حذف طالب مسجل'"
      :content-message-question="'هل انت متأكد من حذف الطالب'"
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
import {
  deleteStudentEnrollRequest,
  getStudentEnrollRequest,
} from "@/api/studentEnroll.js";
import Modal from "@/components/Shared/Modal/index.vue";
export default {
  props: {
    schoolId: {
      type: Number,
      default: null,
    },
  },
  components: { Modal, ListItems, Button },
  data() {
    return {
      showModal: false,
      studentEnrollSearchWord: "",
      studentEnrollList: [],
      totalNumber: null,
      fieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "user.name",
          label: this.$i18n.t("TABLE_FIELDS.name"),
        },
        {
          key: "class.name",
          label: this.$i18n.t("TABLE_FIELDS.class"),
        },
        {
          key: "school.name",
          label: this.$i18n.t("TABLE_FIELDS.school"),
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
    goToAddStudentEnroll() {
      // this.$router.push("/dashboard/class/add");
      this.$router.push({
        name: "add-student-enroll",
        params: { schoolId: this.schoolId },
      });
    },
    getStudentEnrolls() {
      this.ApiService(getStudentEnrollRequest(this.schoolId)).then((response) => {
        this.studentEnrollList = response.data.data;
        this.totalNumber = response.data.meta.total;
      });
    },
    searchBy($event) {
      console.log("$event", $event);
    },
    detailItem($event) {
      this.$router.push(`/dashboard/student-enroll/show/${$event}`);
    },
    editItem($event) {
      // this.$router.push(`/dashboard/class/edit/${$event}`);
      this.$router.push({
        name: "edit-student-enroll",
        params: { id: $event, schoolId: this.schoolId },
      });
    },
    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteStudentEnrollRequest(this.itemId)).then(() => {
        this.getStudentEnrolls();
      });
      this.cancel();
    },
  },
  mounted() {
    this.getStudentEnrolls();
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
