<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'قائمة الباقات'"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :table-items="packagesList"
      :v-search-model="packageSearchWord"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @searchBy="searchBy"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddPackage"
        >
          <img src="@/assets/images/icons/plus.svg" />
          <span>إضافة باقة</span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="'حذف الباقة'"
      :content-message-question="'هل انت متأكد من حذف الباقة'"
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
import { deletePackagesRequest, getPackagesRequest } from "@/api/packages";
import Modal from "@/components/Shared/Modal/index.vue";
export default {
  components: { Modal, ListItems, Button },
  data() {
    return {
      showModal: false,
      packageSearchWord: "",
      packagesList: [],
      totalNumber: null,
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
          key: "price",
          label: this.$i18n.t("TABLE_FIELDS.price"),
        },
        {
          key: "classes_count",
          label: this.$i18n.t("TABLE_FIELDS.classes_count"),
        },
        {
          key: "description",
          label: this.$i18n.t("TABLE_FIELDS.description"),
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
    goToAddPackage() {
      this.$router.push("/dashboard/package/add");
    },
    getPackages() {
      this.ApiService(getPackagesRequest()).then((response) => {
        this.packagesList = response.data.data;
        this.totalNumber = response.data.meta.total;
      });
    },
    searchBy($event) {
      console.log("$event", $event);
    },
    detailItem($event) {
      this.$router.push(`/dashboard/package/show/${$event}`);
      console.log("detailItem", $event);
    },
    editItem($event) {
      this.$router.push(`/dashboard/package/edit/${$event}`);
      console.log("editItem", $event);
    },
    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deletePackagesRequest(this.itemId)).then(() => {
        this.getPackages();
      });
      this.cancel();
    },
  },
  mounted() {
    this.getPackages();
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
