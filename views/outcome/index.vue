<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="$t('OUTCOME.OUTCOMELIST')"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :table-items="outcomeCategories"
      :v-search-model="outcomeSearchWord"
      :loading="loading"
      :isRefresh="refresh"
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
          <span>{{ $t('OUTCOME.ADD') }}</span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="$t('OUTCOME.delete_OUTCOME')"
      :content-message-question="$t('OUTCOME.confirm_delete_OUTCOME')"
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
import {deleteOutcomeRequest, getOutcomeCategoriesRequest} from "@/api/outcome";
export default {
  components: { Modal, ListItems, Button },
  data() {
    return {
      loading: false,
      showModal: false,
      showModalFailed: false,
      refresh: false,
      deleteModal: false,
      outcomeSearchWord: "",
      outcomeCategories: [],
      totalNumber: 0,
      fieldsList: [
        {
          key: "vid",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "name",
          label: this.$i18n.t("OUTCOME.NAME"),
        },
        {key: "learningPath.name", label: this.$i18n.t('PATH.Name')},
        {key: "lesson.name", label: this.$i18n.t('LESSONS.NAME_OF_LESSON')},
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
        this.deleteModal = true;
        this.getOutcomeCategories();
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
    this.getOutcomeCategories();
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
