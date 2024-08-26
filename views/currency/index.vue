<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="$t('currency.list')"
      :number-of-item="totalNumber"
      :tableItems="currencyList"
      :fieldsList="fieldsList"
      :v-search-model="groupSearchWord"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @refetch="getCurrency"
      :loading="loading"
      :isRefresh="refresh"
      :permission_delete="'delete-currencies'"
      :permission_edit="'edit-currencies'"
      :permission_view="'show-currencies'"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddCurrency"
          v-if="user.permissions.includes(`add-currencies`)"
        >
          <img src="@/assets/images/icons/plus.svg" />
          <span>{{ $t('currency.add') }}</span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="$t('currency.delete')"
      :content-message-question="$t('currency.confirm_delete')"
      :showModal="showModal"
      @cancel="cancel($event)"
      :is-warning="true"
      @cancelWithConfirm="cancelWithConfirm($event)"
    />
    <Modal :content-message="$t('CONTROLS.delete_successfully')" :showModal="deleteModal" :is-success="true" />
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
      refresh: false,
      deleteModal: false,
      groupSearchWord: "",
      currencyList: [],
      totalNumber: null,
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
          this.currencyList = response.data.data;
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
        this.deleteModal = true;
        this.getCurrency();
        this.refresh = true
        setTimeout(()=>{
          this.deleteModal = false
        },1500)
      });
      this.cancel();
    },
  },
  computed: {
    fieldsList(){
      return [
        { key: "vid", label: this.$i18n.t('TABLE_FIELDS.id') },
        { key: "name", label: this.$i18n.t('currency.name') },
        { key: "actions", label: this.$i18n.t('TABLE_FIELDS.actions') },
      ]
    },
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
