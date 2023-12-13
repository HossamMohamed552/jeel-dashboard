<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'مخرجات التعلم'"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :table-items="outcomeCategories"
      :v-search-model="outcomeSearchWord"
      :loading="loading"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @refetch="getOutcomeCategories"
      :permission_delete="'delete-outcome'"
      :permission_edit="'edit-outcome'"
      :permission_view="'show-outcome'"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddOutcomeCategory"
          v-if="user.permissions.includes(`add-outcome`)"
        >
          <img src="@/assets/images/icons/plus.svg" />
          <span>إضافة مخرج تعليمى</span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="'حذف مخرج تعليمى'"
      :content-message-question="'هل انت متأكد من حذف المخرج تعليمى ؟'"
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
import {mapGetters} from "vuex";
import {deleteOutcomeRequest, getOutcomeCategoriesRequest} from "@/api/outcome";
export default {
  components: { Modal, ListItems, Button },
  data() {
    return {
      loading: false,
      showModal: false,
      outcomeSearchWord: "",
      outcomeCategories: [],
      totalNumber: 0,
      fieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "name",
          label: this.$i18n.t("TABLE_FIELDS.name"),
        },
        {key: "level.name", label: this.$i18n.t('TABLE_FIELDS.level')},
        {key: "learningPath.name", label: this.$i18n.t('TABLE_FIELDS.learning_path')},
        {
          key: "actions",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ],
      itemId: 0,
    };
  },
  computed:{
    ...mapGetters(['user'])
  },
  methods: {
    goToAddOutcomeCategory() {
      this.$router.push("/dashboard/outcome/add");
    },
    getOutcomeCategories(event) {
      this.loading = true;
      const params = event;
      this.ApiService(getOutcomeCategoriesRequest(params))
        .then((response) => {
          this.outcomeCategories = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    detailItem($event) {
      this.$router.push(`/dashboard/outcome/show/${$event}`);
    },
    editItem($event) {
      this.$router.push(`/dashboard/outcome/edit/${$event}`);
    },
    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteOutcomeRequest(this.itemId)).then(() => {
        this.getOutcomeCategories();
      });
      this.cancel();
    },
  },
  mounted() {
    this.getOutcomeCategories();
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
