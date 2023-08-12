<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'بلوم'"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :table-items="bloomCategories"
      :v-search-model="packageSearchWord"
      :loading="loading"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @refetch="getBloomCategories"
      :permission_delete="'delete-bloomCategory'"
      :permission_edit="'edit-bloomCategory'"
      :permission_view="'show-bloomCategory'"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddBloomCategoryRequest"
          v-if="user.permissions.includes(`add-bloomCategory`)"
        >
          <img src="@/assets/images/icons/plus.svg" />
          <span>إضافة بلوم</span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="'حذف بلوم'"
      :content-message-question="'هل انت متأكد من حذف بلوم ؟'"
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
import {mapGetters} from "vuex";
export default {
  components: { Modal, ListItems, Button },
  data() {
    return {
      loading: false,
      showModal: false,
      packageSearchWord: "",
      bloomCategories: [],
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
    goToAddBloomCategoryRequest() {
      this.$router.push("/dashboard/bloom/add");
    },
    getBloomCategories(event) {
      this.loading = true;
      const params = event;
      this.ApiService(getBloomCategoriesRequest(params))
        .then((response) => {
          this.bloomCategories = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
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
