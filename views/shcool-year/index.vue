<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'قائمة العام الدراسي'"
      :number-of-item="totalNumber"
      :tableItems="schoolYearsList"
      :fieldsList="fieldsList"
      :v-search-model="groupSearchWord"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @refetch="getSchoolYears"
      :loading="loading"
      :permission_delete="'delete-terms'"
      :permission_edit="'edit-terms'"
      :permission_view="'show-terms'"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddSchoolYear"
          v-if="user.permissions.includes(`add-terms`)"
        >
          <img src="@/assets/images/icons/plus.svg" />
          <span>إضافة عام دراسي </span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="'حذف العام الدراسي'"
      :content-message-question="'هل انت متأكد من حذف العام الدراسي '"
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
import { getSchoolYearRequest, deleteSchoolYearRequest } from "@/api/school-year";
import Modal from "@/components/Shared/Modal/index.vue";
import { mapGetters } from "vuex";

export default {
  components: { Modal, ListItems, Button },
  data() {
    return {
      loading: false,
      showModal: false,
      groupSearchWord: "",
      schoolYearsList: [],
      totalNumber: null,
      fieldsList: [
        { key: "id", label: "التسلسل" },
        { key: "name", label: "اسم العام الدراسي" },
        { key: "actions", label: "الإجراء" },
      ],
    };
  },
  methods: {
    goToAddSchoolYear() {
      this.$router.push("/dashboard/school-year/add");
    },
    getSchoolYears(event) {
      this.loading = true;
      const params = event;
      this.ApiService(getSchoolYearRequest(params))
        .then((response) => {
          this.schoolYearsList = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    detailItem($event) {
      this.$router.push(`/dashboard/school-year/show/${$event}`);
    },
    editItem($event) {
      this.$router.push(`/dashboard/school-year/edit/${$event}`);
    },
    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteSchoolYearRequest(this.itemId)).then(() => {
        this.getSchoolYears();
      });
      this.cancel();
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    this.getSchoolYears();
    if (this.user.roles[0].code === "supervisor") {
      this.fieldsList = [
        { key: "id", label: "التسلسل" },
        { key: "name", label: "اسم hguhl الدراسي" },
        { key: "classes_count", label: "عدد الفصول" },
        { key: "actions", label: "الإجراء" },
      ];
    }
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
