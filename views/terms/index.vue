<template>
  <section class="container-fluid custom-container">
    <ListItems :header-name="'قائمة الفصول الدراسية'" :number-of-item="totalNumber"
               :tableItems="termsList" :fieldsList="fields" :v-search-model="groupSearchWord"
               @searchBy="searchBy" >
      <template #buttons>
        <Button :custom-class="'btn-add rounded-btn big-padding'">
          <img src="@/assets/images/icons/plus.svg">
          <span>إضافة مجموعه</span>
        </Button>
      </template>
    </ListItems>
  </section>
</template>

<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import {getCountryRequest} from "@/api/country";
import {getTermsRequest} from "@/api/term";

export default {
  components: {ListItems, Button},
  data() {
    return {
      groupSearchWord: "",
      termsList: [],
      totalNumber: null,
      fields: [
        { key: "id", label: "التسلسل" },
        { key: "name", label: "اسم الفصل" },
        { key: "actions",label:"الإجراء" },
      ],
    }
  },
  methods: {
    searchBy($event) {
      console.log('$event', $event)
    }
  },
  mounted() {
    this.ApiService(getTermsRequest()).then((response) => {
      this.termsList = response.data.data
      this.totalNumber = response.data.meta.total
      console.log('response', response)
    })
  }

}
</script>

<style scoped lang="scss">
@import "./index";
</style>
