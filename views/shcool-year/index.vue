<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="$t('studyYear.list')"
      :number-of-item="totalNumber"
      :tableItems="schoolYearsList"
      :fieldsList="fieldsList"
      :v-search-model="groupSearchWord"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @refetch="getSchoolYears"
      :loading="loading"
      :permission_delete="'delete-studyYear'"
      :permission_edit="'edit-studyYear'"
      :permission_view="'show-studyYear'"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddSchoolYear"
          v-if="user.permissions.includes(`add-studyYear`)"
        >
          <img src="@/assets/images/icons/plus.svg" />
          <span>{{$t('studyYear.add')}}</span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="$t('studyYear.delete')"
      :content-message-question="$t('studyYear.confirm_delete')"
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
    fieldsList(){
      return [
        { key: "vid", label: this.$i18n.t('TABLE_FIELDS.id') },
        { key: "name", label: this.$i18n.t('studyYear.name') },
        { key: "actions", label: this.$i18n.t('TABLE_FIELDS.actions') },
      ]
    },
    fieldsListSuperVisor() {
      return [
        { key: "vid", label: this.$i18n.t('TABLE_FIELDS.id') },
        { key: "name", label: this.$i18n.t('studyYear.name') },
        { key: "classes_count", label: this.$i18n.t('studyYear.classes_count') },
        { key: "actions", label: this.$i18n.t('TABLE_FIELDS.actions') },
      ]
    },
    ...mapGetters(["user"]),
  },
  mounted() {
    this.getSchoolYears();
    if (this.user.roles[0].code === "supervisor") {
      this.fieldsList = this.fieldsListSuperVisor;
    }
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
