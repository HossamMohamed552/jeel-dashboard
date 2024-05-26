<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="$t('SCHOOL.list')"
      :number-of-item="totalNumber"
      :tableItems="schoolsList"
      :fields-list="fieldsList"
      :v-search-model="groupSearchWord"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @refetch="getSchools"
      :loading="loading"
      :permission_delete="'delete-schools'"
      :permission_edit="'edit-schools'"
      :permission_view="'show-schools'"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddSchools"
          v-if="user.permissions.includes(`add-schools`)"
        >
          <img src="@/assets/images/icons/plus.svg" />
          <span>{{ $t('SCHOOL.ADD_NEW') }}</span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="$t('SCHOOL.delete')"
      :content-message-question="$t('SCHOOL.confirm_delete')"
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
import { deleteSchoolsRequest, getSchoolsRequest } from "@/api/school";
import Modal from "@/components/Shared/Modal/index.vue";
import { mapGetters } from "vuex";

export default {
  components: { Modal, ListItems, Button },
  computed: {
    fieldsList(){
      return [
        { key: "vid", label: this.$i18n.t('TABLE_FIELDS.id') },
        { key: "name", label: this.$i18n.t("SCHOOL.name") },
        { key: "country.name", label: this.$i18n.t("MISSIONS.country") },
        { key: "status", label: this.$i18n.t("TABLE_FIELDS.status") },
        { key: "actions", label: this.$i18n.t("TABLE_FIELDS.actions") },
      ]
    },
    ...mapGetters(["user"]),
  },
  data() {
    return {
      loading: false,
      showModal: false,
      groupSearchWord: "",
      schoolsList: [],
      totalNumber: 0,
    };
  },
  methods: {
    goToAddSchools() {
      this.$router.push("/dashboard/schools/add");
    },
    getSchools(event) {
      this.loading = true;
      const params = event;
      this.ApiService(getSchoolsRequest(params))
        .then((response) => {
          this.schoolsList = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    detailItem($event) {
      this.$router.push(`/dashboard/schools/show/${$event}`);
    },
    editItem($event) {
      this.$router.push(`/dashboard/schools/edit/${$event}`);
    },
    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteSchoolsRequest(this.itemId)).then(() => {
        this.getSchools();
      }).finally(()=>{
        this.cancel();
      })
    },
  },
  mounted() {
    this.getSchools();
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
