<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'تصنيف بلوم'"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :table-items="bloomCategories"
      :v-search-model="packageSearchWord"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @searchBy="searchBy"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddBloomCategoryRequest"
        >
          <img src="@/assets/images/icons/plus.svg" />
          <span>إضافة سؤال بلوم</span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="'حذف تصنيف بلوم'"
      :content-message-question="'هل انت متأكد من حذف تصنيف بلوم ؟'"
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
import { getBloomCategoriesRequest, deleteBloomRequest } from "@/api/bloom.js";
import Modal from "@/components/Shared/Modal/index.vue";
export default {
  components: { Modal, ListItems, Button },
  data() {
    return {
      showModal: false,
      packageSearchWord: "",
      bloomCategories: [],
      totalNumber: null,
      fieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: this.$i18n.locale == "ar" ? "name.ar" : "name.en",
          label: this.$i18n.t("TABLE_FIELDS.name"),
        },
        {
          key: "actions",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ],
      itemId: 0,
    };
  },
  methods: {
    goToAddBloomCategoryRequest() {
      this.$router.push("/dashboard/bloom/add");
    },
    getBloomCategories() {
      this.ApiService(getBloomCategoriesRequest()).then((response) => {
        this.bloomCategories = response.data.data;
        this.totalNumber = response.data.meta.total;
      });
    },
    searchBy($event) {
      console.log("$event", $event);
    },
    detailItem($event) {
      this.$router.push(`/dashboard/bloom/show/${$event}`);
    },
    editItem($event) {
      this.$router.push(`/dashboard/bloom/edit/${$event}`);
    },
    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteBloomRequest(this.itemId)).then(() => {
        this.getBloomCategories();
      });
      this.cancel();
    },
  },
  mounted() {
    this.getBloomCategories();
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
