<template>
  <section class="container-fluid">
    <ListItems
      :header-name="'قائم الموظفين'"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :table-items="staffEnrollList"
      :v-search-model="staffEnrollSearchWord"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @searchBy="searchBy"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddStaffEnroll"
        >
          <img src="@/assets/images/icons/plus.svg" />
          <span>إضافة موظف</span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="'حذف موظف مسجل'"
      :content-message-question="'هل انت متأكد من حذف الموظف'"
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
import { deleteStaffEnrollRequest, getStaffEnrollRequest } from "@/api/staffEnroll.js";
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
      staffEnrollSearchWord: "",
      staffEnrollList: [],
      totalNumber: null,
      fieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "name",
          label: this.$i18n.t("TABLE_FIELDS.name"),
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
    goToAddStaffEnroll() {
      // this.$router.push("/dashboard/class/add");
      this.$router.push({
        name: "add-staff-enroll",
        params: { schoolId: this.schoolId },
      });
    },
    getStaffEnrolls() {
      this.ApiService(getStaffEnrollRequest()).then((response) => {
        this.staffEnrollList = response.data.data;
        this.totalNumber = response.data.meta.total;
      });
    },
    searchBy($event) {
      console.log("$event", $event);
    },
    detailItem($event) {
      this.$router.push(`/dashboard/staff-enroll/show/${$event}`);
    },
    editItem($event) {
      // this.$router.push(`/dashboard/class/edit/${$event}`);
      this.$router.push({
        name: "edit-staff-enroll",
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
      this.ApiService(deleteStaffEnrollRequest(this.itemId)).then(() => {
        this.getStaffEnrolls();
      });
      this.cancel();
    },
  },
  mounted() {
    this.getStaffEnrolls();
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
