<template>
  <section class="container-fluid custom-container">
    <ListItems :header-name="'قائمة المدارس'" :number-of-item="totalNumber"
               :tableItems="schoolsList" :fields="fields" :v-search-model="groupSearchWord"
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
import {getSchoolsRequest} from "@/api/school";

export default {
  components: {ListItems, Button},
  data() {
    return {
      groupSearchWord: "",
      schoolsList: [],
      totalNumber: null,
      fields: [
        { key: "id", label: "التسلسل" },
        { key: "name", label: "اسم المدرسة" },
        { key: "school_group", label: "اسم المجموعة" },
        { key: "subscription_start_date", label: "بداية التعاقد" },
        { key: "subscription_end_date", label: "نهاية التعاقد" },
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
    this.ApiService(getSchoolsRequest()).then((response) => {
      this.schoolsList = response.data.data
      this.totalNumber = response.data.meta.total
    })
  }

}
</script>

<style scoped lang="scss">
@import "./index";
</style>
