<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'قائمة المستخدمين'"
      :number-of-item="totalNumber"
      :table-items="usersList"
      :fieldsList="fieldsList"
      :v-search-model="userSearchWord"
      :loading="loading"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @refetch="getAllUsers"
    >
      <template #buttons>
        <Button :custom-class="'btn-add rounded-btn big-padding'" @click="handleAddUser">
          <img src="@/assets/images/icons/plus.svg"/>
          <span>إضافة مستخدم جديد</span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="'حذف المستخدم'"
      :content-message-question="'هل انت متأكد من حذف المستخدم ؟'"
      :showModal="showModal"
      @cancel="cancel($event)"
      :is-warning="true"
      @cancelWithConfirm="cancelWithConfirm($event)"
    />
  </section>
</template>
<script>
import ListItems from "@/components/ListItems/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import {deleteUserRequest, getAllUsersRequest} from "@/api/user";
import Modal from "@/components/Shared/Modal/index.vue";

export default {
  name: "index",
  components: {
    Modal,
    ListItems,
    Button,
  },
  data() {
    return {
      loading: false,
      userSearchWord: "",
      usersList: [],
      showModal: false,
      fieldsList: [
        {key: "id", label: "التسلسل"},
        {key: "avatar", label: "الصورة"},
        {key: "name", label: "اسم المستخدم"},
        {key: "first_name", label: "الاسم الاول"},
        {key: "last_name", label: "الاسم الثانى"},
        {key: "roles", label: "الصلاحيات"},
        {key: "mobile", label: "الهاتف"},
        {key: "email", label: "البريد الإلكترونى"},
        {key: "actions", label: "الإجراء"},
      ],
      totalNumber: 0,
    };
  },
  methods: {
    handleAddUser() {
      this.$router.push("/dashboard/users/add");
    },
    getAllUsers(event) {
      this.loading = true;
      const params = event;
      this.ApiService(getAllUsersRequest(params))
        .then((response) => {
          this.usersList = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    detailItem($event) {
      this.$router.push(`/dashboard/users/show/${$event}`);
    },
    editItem($event) {
      this.$router.push(`/dashboard/users/edit/${$event}`);
    },
    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteUserRequest(this.itemId)).then(() => {
        this.getAllUsers();
      });
      this.cancel();
    },
  },
  mounted() {
    this.getAllUsers();
  },
  created() {
    console.log('matched', this.$route.matched)
  }
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
