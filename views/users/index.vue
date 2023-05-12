<template>
  <section class="container-fluid custom-container">
    <ListItems :v-search-model="userSearchWord" @searchBy="searchBy">
      <template #buttons>
        <Button :custom-class="'add-btn rounded-btn big-padding'">
          <img src="@/assets/images/icons/plus.svg">
          <span>إضافة مستخدم جديد</span>
        </Button>
      </template>
    </ListItems>
  </section>
</template>
<script>
import ListItems from "@/components/ListItems/index.vue";
import Button from "@/components/Shared/Button/index.vue";
export default {
  name: "index",
  components: {
    ListItems,
    Button
  },
  data() {
    return {
      userSearchWord: "",
    }
  },
  methods: {
    searchBy($event) {
      console.log('$event', $event)
    }
  }
}
</script>


<style scoped lang="scss">
@import "./index";
</style>
