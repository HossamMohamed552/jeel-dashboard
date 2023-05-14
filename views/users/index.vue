<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'قائمة المستخدمين'"
      :number-of-item="totalNumber"
      :table-items="usersList"
      :v-search-model="userSearchWord"
      @searchBy="searchBy"
    >
      <template #buttons>
        <Button :custom-class="'btn-add rounded-btn big-padding'" @click="handleAddUser">
          <img src="@/assets/images/icons/plus.svg" />
          <span>إضافة مستخدم جديد</span>
        </Button>
      </template>
    </ListItems>
  </section>
</template>
<script>
import ListItems from "@/components/ListItems/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import { getAllUsersRequest } from "@/api/user";

export default {
  name: "index",
  components: {
    ListItems,
    Button,
  },
  data() {
    return {
      userSearchWord: "",
      usersList: [],
      totalNumber: null,
    };
  },
  methods: {
    searchBy($event) {
      console.log("$event", $event);
    },
    handleAddUser() {
      this.$router.push("/dashboard/users/add");
    },
  },
  mounted() {
    this.ApiService(getAllUsersRequest()).then((response) => {
      this.usersList = response.data.data;
      this.totalNumber = response.data.meta.total;
      console.log("response", response);
    });
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
