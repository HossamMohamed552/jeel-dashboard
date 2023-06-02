<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'قائمة أنواع المدارس'"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :table-items="schoolTypessList"
      :v-search-model="packageSearchWord"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @searchBy="searchBy"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddSchoolType"
        >
          <img src="@/assets/images/icons/plus.svg" />
          <span>إضافة نوع مدرسة</span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="'حذف نوع المدرسة'"
      :content-message-question="'هل انت متأكد من حذف نوع المدرسة'"
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
import { deleteSchoolTypesRequest, getSchoolTypesRequest } from "@/api/schoolType.js";
import Modal from "@/components/Shared/Modal/index.vue";
export default {
  components: { Modal, ListItems, Button },
  data() {
    return {
      showModal: false,
      packageSearchWord: "",
      schoolTypessList: [],
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
    goToAddSchoolType() {
      this.$router.push("/dashboard/school-type/add");
    },
    getSchoolTypes() {
      this.ApiService(getSchoolTypesRequest()).then((response) => {
        this.schoolTypessList = response.data.data;
        this.totalNumber = response.data.meta.total;
      });
    },
    searchBy($event) {
      console.log("$event", $event);
    },
    detailItem($event) {
      this.$router.push(`/dashboard/school-type/show/${$event}`);
    },
    editItem($event) {
      this.$router.push(`/dashboard/school-type/edit/${$event}`);
    },
    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteSchoolTypesRequest(this.itemId)).then(() => {
        this.getSchoolTypes();
      });
      this.cancel();
    },
  },
  mounted() {
    this.getSchoolTypes();
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
