<template>
  <section class="container-fluid custom-container">
    <ListItems :header-name="'قائمة الدول'" :fieldsList="fieldsList" :number-of-item="totalNumber"
               :table-items="countriesList" :v-search-model="countrySearchWord" @detailItem="detailItem($event)"
               @editItem="editItem($event)" @deleteItem="deleteItem($event)"
               @searchBy="searchBy">
      <template #buttons>
        <Button :custom-class="'btn-add rounded-btn big-padding'"  @click="goToAddCountry">
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
export default {
  components: {Modal, ListItems, Button},
  data() {
    return {
      showModal: false,
      countrySearchWord: "",
      countriesList: [],
      totalNumber: null,
      fieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id")
        },
        {
          key: "name",
          label: this.$i18n.t("TABLE_FIELDS.name")
        },
        {
          key: "code",
          label: this.$i18n.t("TABLE_FIELDS.code")
        },
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
    getCountries(){
      this.ApiService(getCountryRequest()).then((response) => {
        this.countriesList = response.data.data
        this.totalNumber = response.data.meta.total
      })
    },
    searchBy($event) {
      console.log('$event', $event)
    },
    detailItem($event) {
      this.$router.push(`/dashboard/country/show/${$event}`)
      console.log('detailItem', $event)
    },
    editItem($event) {
      this.$router.push(`/dashboard/country/edit/${$event}`)
      console.log('editItem', $event)
    },
    deleteItem($event) {
      this.itemId = $event
      this.showModal = true
    },
    cancel($event) {
      this.showModal = $event
    },
    cancelWithConfirm() {
      this.ApiService(deleteCountryRequest(this.itemId))
      this.cancel()
      this.getCountries()
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
