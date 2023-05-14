<template>
  <section class="container-fluid custom-container">
    <ListItems :header-name="'قائمة المراحل الدراسية'" :number-of-item="totalNumber"
               :tableItems="levelsList" :fields="fields" :v-search-model="groupSearchWord"
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
import {getLevelsRequest} from "@/api/level";

export default {
  components: {ListItems, Button},
  data() {
    return {
      groupSearchWord: "",
      levelsList: [],
      totalNumber: null,
      fields: [
        { key: "id", label: "التسلسل" },
        { key: "name", label: "اسم المرحلة" },
        // { key: "level_school_group", label: "اسم المجموعة" },
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
    this.ApiService(getLevelsRequest()).then((response) => {
      this.levelsList = response.data.data
      this.totalNumber = response.data.meta.total
      console.log('response', response)
    })
  }

}
</script>

<style scoped lang="scss">
@import "./index";
</style>
