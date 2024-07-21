<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="$t('academy.academyList')"
      :number-of-item="totalNumber"
      :tableItems="acadamicList"
      :fieldsList="fieldsList"
      :v-search-model="missionSearchWord"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @refetch="getAcademicYear"
      :loading="loading"
      :permission_delete="'delete-school-study-years'"
      :permission_edit="'edit-school-study-years'"
      :permission_view="'show-school-study-years'"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          v-if="user.permissions.includes(`add-school-study-years`)"
          @click="goToAddMissions"
        >
          <img src="@/assets/images/icons/plus.svg" />
          <span>{{$t('academy.add')}}</span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="$t('academy.delete')"
      :content-message-question="$t('academy.confirm_delete')"
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
import {deleteAcademicYearRequest, getAcademicYearRequest} from "@/api/academicYear";
import { mapGetters } from "vuex";

export default {
  name: "index",
  components: { Modal, ListItems, Button },
  computed: {
    fieldsList(){
      return  [
        { key: "vid", label: this.$i18n.t('TABLE_FIELDS.id') },
        { key: "studyYear.name", label: this.$i18n.t('TABLE_FIELDS.studyYearName') },
        { key: "term.name", label: this.$i18n.t('TABLE_FIELDS.academyTerm') },
        { key: "start_date", label: this.$i18n.t('TABLE_FIELDS.academyStart_date') },
        { key: "end_date", label: this.$i18n.t('TABLE_FIELDS.academyEnd_date') },
        { key: "actions", label: this.$i18n.t('TABLE_FIELDS.actions') },
      ]
    },
    ...mapGetters(["user"]),
  },
  data() {
    return {
      loading: false,
      showModal: false,
      missionSearchWord: "",
      acadamicList: [],
      totalNumber: 0,
    };
  },
  methods: {
    goToAddMissions() {
      this.$router.push("/dashboard/management-academic-year/add");
    },
    getAcademicYear(event) {
      this.loading = true;
      const params = event;
      this.ApiService(getAcademicYearRequest(params))
        .then((response) => {
          this.acadamicList = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    searchBy($event) {},
    detailItem($event) {
      this.$router.push(`/dashboard/management-academic-year/show/${$event}`);
    },
    editItem($event) {
      this.$router.push(`/dashboard/management-academic-year/edit/${$event}`);
    },
    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteAcademicYearRequest(this.itemId)).then(() => {
        this.getAcademicYear();
      });
      this.cancel();
    },
  },
  mounted() {
    this.getAcademicYear();
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
