<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="$t('TERM.terms')"
      :number-of-item="totalNumber"
      :tableItems="termsList"
      :fieldsList="fieldsList"
      :v-search-model="groupSearchWord"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @refetch="getTerms"
      :loading="loading"
      :permission_delete="'delete-terms'"
      :permission_edit="'edit-terms'"
      :permission_view="'show-terms'"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddTerms"
          v-if="user.permissions.includes(`add-terms`)"
        >
          <img src="@/assets/images/icons/plus.svg" />
          <span>{{$t('TERM.ADD_NEW')}}</span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="$t('TERM.delete_term')"
      :content-message-question="$t('TERM.confirm_delete_term')"
      :showModal="showModal"
      @cancel="cancel($event)"
      :is-warning="true"
      @cancelWithConfirm="cancelWithConfirm($event)"
    />
    <Modal :content-message="$t('can_not_delete')"
           :showModal="showModalFailed" :alarm="true"
           @cancelWithConfirm="showModalFailed=false"/>
  </section>
</template>

<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import { deleteTermsRequest, getTermsRequest } from "@/api/term";
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
      termsList: [],
      totalNumber: null,
    };
  },
  methods: {
    goToAddTerms() {
      this.$router.push("/dashboard/terms/add");
    },
    getTerms(event) {
      this.loading = true;
      const params = event;
      this.ApiService(getTermsRequest(params))
        .then((response) => {
          this.termsList = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    detailItem($event) {
      this.$router.push(`/dashboard/terms/show/${$event}`);
    },
    editItem($event) {
      this.$router.push(`/dashboard/terms/edit/${$event}`);
    },
    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteTermsRequest(this.itemId)).then(() => {
        this.getTerms();
      }).catch((error) => {
        this.showModalFailed = error.response.data.code === 23000;
      }).finally(() => {
        this.cancel();
      })
    },
  },
  computed: {
    fieldsList(){
      return [
        { key: "vid", label: this.$i18n.t("TABLE_FIELDS.id")},
        { key: "name", label: this.$i18n.t("TERM.name")},
        { key: "min_missions", label: this.$i18n.t("TERM.min_mission") },
        { key: "actions", label: this.$i18n.t("TABLE_FIELDS.actions") },
      ]
    },
    fieldsListSuperVisor(){
      return [
        { key: "vid", label: this.$i18n.t("TABLE_FIELDS.id")},
        { key: "name", label: this.$i18n.t("TERM.name")},
        { key: "classes_count", label: this.$i18n.t("TERM.classes_count") },
        { key: "actions", label: this.$i18n.t("TABLE_FIELDS.actions") },
      ]
    },
    ...mapGetters(["user"]),
  },
  mounted() {
    this.getTerms();
    if (this.user.roles[0].code === "supervisor") {
      this.fieldsList = this.fieldsListSuperVisor;
    }
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
