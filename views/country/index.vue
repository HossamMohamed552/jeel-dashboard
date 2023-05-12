<template>
  <section class="container-fluid custom-container">
    <ListItems :header-name="'قائمة الدول'" :number-of-item="totalNumber"
               :table-items="countriesList" :v-search-model="countrySearchWord"
               @searchBy="searchBy">
      <template #buttons>
        <Button :custom-class="'btn-add rounded-btn big-padding'">
          <img src="@/assets/images/icons/plus.svg">
          <span>إضافة دولة</span>
        </Button>
      </template>
    </ListItems>
  </section>
</template>

<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import {getCountryRequest} from "@/api/country";

export default {
  components: {ListItems, Button},
  data() {
    return {
      countrySearchWord: "",
      countriesList: [],
      totalNumber: null
    }
  },
  methods: {
    searchBy($event) {
      console.log('$event', $event)
    }
  },
  mounted() {
    this.ApiService(getCountryRequest()).then((response) => {
      this.countriesList = response.data.data
      this.totalNumber = response.data.meta.total
      console.log('response', response)
    })
  }

}
</script>

<style scoped lang="scss">
@import "./index";
</style>
