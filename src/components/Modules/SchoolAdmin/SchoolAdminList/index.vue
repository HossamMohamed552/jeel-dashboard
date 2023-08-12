<template>
  <section class="container-fluid">
    <ListItems
      :header-name="'قائم المديرين'"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :tableItems="schoolAdminList"
      :loading="loading"
      :v-search-model="schoolAdminSearchWord"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @refetch="getSchoolAdmins"
      :permission_delete="'delete-enrollment'"
      :permission_edit="'edit-enrollment'"
      :permission_view="'show-enrollment'"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddSchoolAdminEnroll"
          v-if="user.permissions.includes(`add-enrollment`)"
        >
          <img src="@/assets/images/icons/plus.svg" />
          <span>إضافة مدير</span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="'حذف مدير مسجل'"
      :content-message-question="'هل انت متأكد من حذف المدير'"
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
import Modal from "@/components/Shared/Modal/index.vue";
import {deleteSchoolAdminRequest, getSchoolAdminRequest} from "@/api/schoolAdmin";
import {mapGetters} from "vuex";

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
      schoolAdminSearchWord: "",
      schoolAdminList: [],
      totalNumber: 0,
      fieldsList: [
        {key: "id", label: "التسلسل"},
        {key: "name", label: this.$i18n.t('TABLE_FIELDS.name')},
        {key: "email", label: this.$i18n.t('TABLE_FIELDS.email')},
        {key: "actions", label: "الإجراء"},
      ],
      itemId: 0,
    };
  },
  methods: {
    goToAddSchoolAdminEnroll() {
      this.$router.push({
        name: "add-school-admin-enroll",
        params: { schoolId: this.schoolId },
      });
    },
    getSchoolAdmins(event) {
      this.loading = true;
      const params = { ...event, school_id: this.schoolId };
      this.ApiService(getSchoolAdminRequest(params))
        .then((response) => {
          this.schoolAdminList = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
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
      this.ApiService(deleteSchoolAdminRequest({user_id: this.itemId , school_id: this.schoolId})).then(() => {
        this.getSchoolAdmins();
      });
      this.cancel();
    },
  },
  computed:{
    ...mapGetters(['user'])
  },
  mounted() {
    this.getSchoolAdmins();
    window.localStorage.setItem('page', 'schoolAdmin')
  },
  beforeDestroy() {
    window.localStorage.setItem('page', '')
  }
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
