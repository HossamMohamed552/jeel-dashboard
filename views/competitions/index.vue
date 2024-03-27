<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'قائمة المسابقات'"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :table-items="competition"
      :v-search-model="competitionSearchWord"
      :loading="loading"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @refetch="getCompetition"
      :permission_delete="['delete-competition', 'delete-teacher-competitions']"
      :permission_edit="['edit-competition', 'edit-teacher-competitions']"
      :permission_view="['show-competition', 'show-teacher-competitions']"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddCompetition"
          v-if="
            user.permissions.includes('add-competition') ||
            user.permissions.includes('add-teacher-competitions')
          "
        >
          <img src="@/assets/images/icons/plus.svg" />
          <span>إضافة مسابقة</span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="'حذف المسابقة'"
      :content-message-question="'هل انت متأكد من حذف المسابقة ؟'"
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
import { mapGetters } from "vuex";
import { deleteCompetitionRequest, getCompetitionRequest } from "@/api/competition";

export default {
  components: { Modal, ListItems, Button },
  data() {
    return {
      loading: false,
      showModal: false,
      competitionSearchWord: "",
      competition: [],
      totalNumber: 0,
      fieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        { key: "name", label: this.$i18n.t("COMPETITIONS.NAME") },
        { key: "level.name", label: this.$i18n.t("COMPETITIONS.LEVEL") },
        { key: "competition_duration", label: this.$i18n.t("COMPETITIONS.DURATION") },
        {
          key: "actions",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ],
      itemId: 0,
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    goToAddCompetition() {
      this.$router.push("/dashboard/competitions/add");
    },
    getCompetition(event) {
      this.loading = true;
      const params = event;
      this.ApiService(getCompetitionRequest(params))
        .then((response) => {
          this.competition = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    detailItem($event) {
      this.$router.push(`/dashboard/competitions/show/${$event}`);
    },
    editItem($event) {
      this.$router.push(`/dashboard/competitions/edit/${$event}`);
    },
    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteCompetitionRequest(this.itemId)).then(() => {
        this.getCompetition();
      });
      this.cancel();
    },
  },
  mounted() {
    this.getCompetition();
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
