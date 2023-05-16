<template>
  <section class="container-fluid custom-container">
    <ListItems :header-name="'قائمة المجموعات'" :number-of-item="totalNumber"
               :table-items="schoolGroupList" :v-search-model="groupSearchWord"
               @searchBy="searchBy">
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
import {getSchoolGroupRequest} from "@/api/schoolGroup";

export default {
  components: {ListItems, Button},
  data() {
    return {
      groupSearchWord: "",
      schoolGroupList: [],
      totalNumber: null
    }
  },
  methods: {
    searchBy($event) {
      console.log('$event', $event)
    }
  },
  mounted() {
    this.ApiService(getSchoolGroupRequest()).then((response) => {
      this.schoolGroupList = response.data.data
      this.totalNumber = response.data.meta.total
    })
  }

}
</script>

<style scoped lang="scss">
@import "./index";
</style>
