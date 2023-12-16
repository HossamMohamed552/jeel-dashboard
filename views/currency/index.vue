<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'قائمة العملات'"
      :number-of-item="totalNumber"
      :tableItems="CurrencyList"
      :fieldsList="fieldsList"
      :v-search-model="groupSearchWord"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @refetch="getCurrency"
      :loading="loading"
      :permission_delete="'delete-terms'"
      :permission_edit="'edit-terms'"
      :permission_view="'show-terms'"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddCurrency"
          v-if="user.permissions.includes(`add-terms`)"
        >
          <img src="@/assets/images/icons/plus.svg" />
          <span>إضافة عملة </span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="'حذف العملة'"
      :content-message-question="'هل انت متأكد من حذف العملة '"
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
import { getCurrencyRequest, deleteCurrencyRequest } from "@/api/currency";
import Modal from "@/components/Shared/Modal/index.vue";
import { mapGetters } from "vuex";

export default {
  components: { Modal, ListItems, Button },
  data() {
    return {
      loading: false,
      showModal: false,
      groupSearchWord: "",
      CurrencyList: [],
      totalNumber: null,
      fieldsList: [
        { key: "id", label: "التسلسل" },
        { key: "name", label: "اسم العملة" },
        { key: "actions", label: "الإجراء" },
      ],
    };
  },
  methods: {
    goToAddCurrency() {
      this.$router.push("/dashboard/currency/add");
    },
    getCurrency(event) {
      this.loading = true;
      const params = event;
      this.ApiService(getCurrencyRequest(params))
        .then((response) => {
          this.CurrencyList = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    detailItem($event) {
      this.$router.push(`/dashboard/currency/show/${$event}`);
    },
    editItem($event) {
      this.$router.push(`/dashboard/currency/edit/${$event}`);
    },
    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteCurrencyRequest(this.itemId)).then(() => {
        this.getCurrency();
      });
      this.cancel();
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    this.getCurrency();
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
