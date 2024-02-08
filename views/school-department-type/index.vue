<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'نوع الادارة'"
      :number-of-item="totalNumber"
      :tableItems="departmentTypeList"
      :fieldsList="fieldsList"
      :v-search-model="groupSearchWord"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @refetch="getSchoolDepartmentsTypes"
      :loading="loading"
      :permission_delete="'delete-management-types'"
      :permission_edit="'edit-management-types'"
      :permission_view="'show-management-types'"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddSchoolDepartmentType"
          v-if="user.permissions.includes(`add-management-types`)"
        >
          <img src="@/assets/images/icons/plus.svg"/>
          <span>إضافة نوع ادارة </span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="'حذف نوع الادارة'"
      :content-message-question="'هل انت متأكد من حذف نوع الادارة '"
      :showModal="showModal"
      @cancel="cancel($event)"
      :is-warning="true"
      @cancelWithConfirm="cancelWithConfirm($event)"
    />
    <Modal :content-message="'هذا السجل موجود من قبل'" :showModal="showModalFailed" :isUsed="true"
           @cancelWithConfirm="showModalFailed=false"/>
  </section>
</template>

<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import {
  getSchoolDepartmentTypesRequest,
  deleteSchoolDepartmentTypeRequest,
} from "@/api/school-department-type";
import Modal from "@/components/Shared/Modal/index.vue";
import {mapGetters} from "vuex";

export default {
  components: {Modal, ListItems, Button},
  data() {
    return {
      loading: false,
      showModal: false,
      showModalFailed: false,
      groupSearchWord: "",
      departmentTypeList: [],
      totalNumber: null,
      fieldsList: [
        {key: "id", label: "التسلسل"},
        {key: "name", label: "اسم نوع الادارة"},
        {key: "actions", label: "الإجراء"},
      ],
    };
  },
  methods: {
    goToAddSchoolDepartmentType() {
      this.$router.push("/dashboard/school-department-types/add");
    },
    getSchoolDepartmentsTypes(event) {
      this.loading = true;
      const params = event;
      this.ApiService(getSchoolDepartmentTypesRequest(params))
        .then((response) => {
          this.departmentTypeList = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    detailItem($event) {
      this.$router.push(`/dashboard/school-department-types/show/${$event}`);
    },
    editItem($event) {
      this.$router.push(`/dashboard/school-department-types/edit/${$event}`);
    },
    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteSchoolDepartmentTypeRequest(this.itemId)).then(() => {
        this.getSchoolDepartmentsTypes();
      })
      this.cancel();
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    this.getSchoolDepartmentsTypes();
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
