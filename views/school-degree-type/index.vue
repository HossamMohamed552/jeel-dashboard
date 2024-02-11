<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'نوع الشهادة'"
      :number-of-item="totalNumber"
      :tableItems="degreeTypesList"
      :fieldsList="fieldsList"
      :v-search-model="groupSearchWord"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @refetch="getDegreeTypes"
      :loading="loading"
      :permission_delete="'delete-certificates'"
      :permission_edit="'edit-certificates'"
      :permission_view="'show-certificates'"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddDegreeType"
          v-if="user.permissions.includes(`add-certificates`)"
        >
          <img src="@/assets/images/icons/plus.svg" />
          <span>إضافة نوع شهادة </span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="'حذف نوع الشهادة'"
      :content-message-question="'هل انت متأكد من حذف نوع الشهادة '"
      :showModal="showModal"
      @cancel="cancel($event)"
      :is-warning="true"
      @cancelWithConfirm="cancelWithConfirm($event)"
    />
    <Modal :content-message="'لا يمكن حذف هذا العنصر لأنه مرتبط بعناصر أخرى'"
           :showModal="showModalFailed" :alarm="true"
           @cancelWithConfirm="showModalFailed=false"/>
  </section>
</template>

<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import {
  getSchoolDegreeTypesRequest,
  deleteSchoolDegreeTypeRequest,
} from "@/api/school-degree-type";
import Modal from "@/components/Shared/Modal/index.vue";
import { mapGetters } from "vuex";

export default {
  components: { Modal, ListItems, Button },
  data() {
    return {
      loading: false,
      showModal: false,
      showModalFailed: false,
      groupSearchWord: "",
      degreeTypesList: [],
      totalNumber: null,
      fieldsList: [
        { key: "id", label: "التسلسل" },
        { key: "name", label: "نوع الشهادة" },
        { key: "actions", label: "الإجراء" },
      ],
    };
  },
  methods: {
    goToAddDegreeType() {
      this.$router.push("/dashboard/school-degree-types/add");
    },
    getDegreeTypes(event) {
      this.loading = true;
      const params = event;
      this.ApiService(getSchoolDegreeTypesRequest(params))
        .then((response) => {
          this.degreeTypesList = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    detailItem($event) {
      this.$router.push(`/dashboard/school-degree-types/show/${$event}`);
    },
    editItem($event) {
      this.$router.push(`/dashboard/school-degree-types/edit/${$event}`);
    },
    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteSchoolDegreeTypeRequest(this.itemId)).then(() => {
        this.getDegreeTypes();
      }).catch((error) => {
        this.showModalFailed = error.response.data.code === 23000;
      }).finally(() => {
        this.cancel();
      })
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    this.getDegreeTypes();
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
