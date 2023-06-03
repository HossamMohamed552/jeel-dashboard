<template>
  <section class="container-fluid">
    <ListItems
      :header-name="'قائمة الصفوف الدراسية'"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :table-items="classesList"
      :loading="loading"
      :v-search-model="classesSearchWord"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @refetch="getClasses"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddClass"
        >
          <img src="@/assets/images/icons/plus.svg" />
          <span>إضافة صف دراسي</span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="'حذف الصف الدراسي'"
      :content-message-question="'هل انت متأكد من حذف الصف الدراسي'"
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
import { deleteClassRequest, getClassRequest } from "@/api/class.js";
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
      loading: false,
      showModal: false,
      classesSearchWord: "",
      classesList: [],
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
          key: "term.name",
          label: this.$i18n.t("TABLE_FIELDS.term"),
        },
        {
          key: "level.name",
          label: this.$i18n.t("TABLE_FIELDS.level"),
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
    goToAddClass() {
      // this.$router.push("/dashboard/class/add");
      this.$router.push({
        name: "add-class",
        params: { schoolId: this.schoolId },
      });
    },
    getClasses(event) {
      this.loading = true;
      const params = event;
      this.ApiService(getClassRequest(params))
        .then((response) => {
          this.classesList = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    detailItem($event) {
      this.$router.push(`/dashboard/class/show/${$event}`);
    },
    editItem($event) {
      // this.$router.push(`/dashboard/class/edit/${$event}`);
      this.$router.push({
        name: "edit-class",
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
      this.ApiService(deleteClassRequest(this.itemId)).then(() => {
        this.getClasses();
      });
      this.cancel();
    },
  },
  mounted() {
    this.getClasses();
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
