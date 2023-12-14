<template>
  <section class="container-fluid custom-container">
    <ListItems :header-name="'قائمة الدول'" :fieldsList="fieldsList" :number-of-item="totalNumber"
               :table-items="countriesList" :v-search-model="countrySearchWord" @detailItem="detailItem($event)"
               @editItem="editItem($event)" @deleteItem="deleteItem($event)"
               @refetch="getCountries"
               :loading="loading"
               :permission_delete="'delete-countries'"
               :permission_edit="'edit-countries'"
               :permission_view="'show-countries'"
               >
      <template #buttons>
        <Button :custom-class="'btn-add rounded-btn big-padding'"  @click="goToAddCountry" v-if="user.permissions.includes(`add-countries`)">
          <img src="@/assets/images/icons/plus.svg">
          <span>إضافة دولة</span>
        </Button>
      </template>
    </ListItems>
    <Modal :content-message="'حذف الدولة'"
           :content-message-question="'هل انت متأكد من حذف الدولة'"
           :showModal="showModal"
           @cancel="cancel($event)"
           :is-warning="true"
           @cancelWithConfirm="cancelWithConfirm($event)"/>
  </section>
</template>

<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import {deleteCountryRequest, getCountryRequest} from "@/api/country";
import Modal from "@/components/Shared/Modal/index.vue";
import {mapGetters} from "vuex";
export default {
  components: {Modal, ListItems, Button},
  computed:{
    ...mapGetters(['user'])
  },
  data() {
    return {
      loading: false,
      showModal: false,
      countrySearchWord: "",
      countriesList: [],
      totalNumber: 0,
      fieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id")
        },
        {
          key: "name",
          label: this.$i18n.t("TABLE_FIELDS.name")
        },
        // {
        //   key: "code",
        //   label: this.$i18n.t("TABLE_FIELDS.code")
        // },
        {
          key: "actions",
          label: this.$i18n.t("TABLE_FIELDS.actions")
        }
      ],
      itemId: 0,
    }
  },
  methods: {
    goToAddCountry(){
      this.$router.push('/dashboard/country/add')
    },
    getCountries(event) {
      this.loading = true
      const params = !event ? { per_page: 10 } : event;
      this.ApiService(getCountryRequest(params)).then((response) => {
        this.countriesList = response.data.data
        this.totalNumber = response.data.meta.total
      }) .finally(() => {
          this.loading = false;
        });
    },
    detailItem($event) {
      this.$router.push(`/dashboard/country/show/${$event}`)
    },
    editItem($event) {
      this.$router.push(`/dashboard/country/edit/${$event}`)
    },
    deleteItem($event) {
      this.itemId = $event
      this.showModal = true
    },
    cancel($event) {
      this.showModal = $event
    },
    cancelWithConfirm() {
      this.ApiService(deleteCountryRequest(this.itemId)).then(()=>{
        this.getCountries()
      })
      this.cancel()
    }
  },
  mounted() {
    this.getCountries()
  }

}
</script>

<style scoped lang="scss">
@import "./index";
</style>
