<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="$t('OBJECTIVE.OBJECTIVE')"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :table-items="objectiveCategories"
      :v-search-model="objectiveSearchWord"
      :loading="loading"
      :isRefresh="refresh"
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
          <span>{{ $t('OBJECTIVE.ADD') }}</span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="$t('OBJECTIVE.delete_OBJECTIVE')"
      :content-message-question="$t('OBJECTIVE.confirm_delete_OBJECTIVE')"
      :showModal="showModal"
      @cancel="cancel($event)"
      :is-warning="true"
      @cancelWithConfirm="cancelWithConfirm($event)"
    />
    <Modal :content-message="$t('can_not_delete')"
           :showModal="showModalFailed" :alarm="true"
           @cancelWithConfirm="showModalFailed=false"/>
    <Modal :content-message="$t('CONTROLS.delete_successfully')" :showModal="deleteModal" :is-success="true" />
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
      showModalFailed: false,
      objectiveSearchWord: "",
      objectiveCategories: [],
      totalNumber: 0,
      itemId: 0,
      refresh: false,
      deleteModal: false,
    };
  },
  computed: {
    fieldsList() {
      return [
        {
          key: "vid",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "name",
          label: this.$i18n.t("OBJECTIVE.NAME"),
        },
        {key: "learningPath.name", label: this.$i18n.t('TABLE_FIELDS.learning_path')},
        {key: "lesson.name", label: this.$i18n.t('LESSONS.NAME')},
        {
          key: "actions",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ]
    },
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
        this.deleteModal = true;
        this.getObjectiveCategories();
        this.refresh = true
        setTimeout(()=>{
          this.deleteModal = false
        },1500)
      }).catch((error) => {
        this.showModalFailed = error.response.data.code === 23000;
      }).finally(() => {
        this.cancel();
      })
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
