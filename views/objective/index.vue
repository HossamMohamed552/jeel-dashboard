<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'الأهداف التعليمة'"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :table-items="objectiveCategories"
      :v-search-model="objectiveSearchWord"
      :loading="loading"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @refetch="getObjectiveCategories"
      :permission_delete="'delete-objective'"
      :permission_edit="'edit-objective'"
      :permission_view="'show-objective'"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddObjectiveCategory"
          v-if="user.permissions.includes(`add-objective`)"
        >
          <img src="@/assets/images/icons/plus.svg"/>
          <span>إضافة هدف تعليمى</span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="'حذف الهدف التعليمى'"
      :content-message-question="'هل انت متأكد من حذف الهدف التعليمى ؟'"
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
import {deleteObjectiveRequest, getObjectiveCategoriesRequest} from "@/api/objective";

export default {
  components: {Modal, ListItems, Button},
  data() {
    return {
      loading: false,
      showModal: false,
      objectiveSearchWord: "",
      objectiveCategories: [],
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
        {key: "learning_path.name", label: this.$i18n.t('TABLE_FIELDS.learning_path')},
        {
          key: "actions",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ],
      itemId: 0,
    };
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    goToAddObjectiveCategory() {
      this.$router.push("/dashboard/objective/add");
    },
    getObjectiveCategories(event) {
      this.loading = true;
      const params = event;
      this.ApiService(getObjectiveCategoriesRequest(params))
        .then((response) => {
          this.objectiveCategories = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    detailItem($event) {
      this.$router.push(`/dashboard/objective/show/${$event}`);
    },
    editItem($event) {
      this.$router.push(`/dashboard/objective/edit/${$event}`);
    },
    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteObjectiveRequest(this.itemId)).then(() => {
        this.getObjectiveCategories();
      });
      this.cancel();
    },
  },
  mounted() {
    this.getObjectiveCategories();
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
