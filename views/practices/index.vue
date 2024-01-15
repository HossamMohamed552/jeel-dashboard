<template>
  <section class="container-fluid custom-container">
    <ListItems :header-name="'قائمة التمارين'" :number-of-item="totalNumber"
               :tableItems="quizzesList" :fieldsList="fieldsList"
               :v-search-model="quizzesSearchWord" @detailItem="detailItem($event)"
               @editItem="editItem($event)" @deleteItem="deleteItem($event)"
               @refetch="getQuizzes"
               :loading="loading"
               :permission_delete="'delete-quizzes'"
               :permission_edit="'edit-quizzes'"
               :permission_view="'show-quizzes'"
    >
      <template #buttons>
        <Button :custom-class="'btn-add rounded-btn big-padding'" @click="goToAddQuiz" v-if="user.permissions.includes(`add-quizzes`)">
          <img src="@/assets/images/icons/plus.svg">
          <span>إضافة تمرين</span>
        </Button>
      </template>
    </ListItems>
    <Modal :content-message="'حذف التمرين'"
           :content-message-question="'هل انت متأكد من حذف التمرين '"
           :showModal="showModal"
           @cancel="cancel($event)"
           :is-warning="true"
           @cancelWithConfirm="cancelWithConfirm($event)"/>
  </section>
</template>
<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {deleteQuizRequest, getQuizzesRequest} from "@/api/quiz";
import {mapGetters} from "vuex";

export default {
  name: "index",
  components: {Modal, ListItems, Button},
  computed:{
    ...mapGetters(['user'])
  },
  data() {
    return {
      loading: false,
      showModal: false,
      quizzesSearchWord: "",
      quizzesList: [],
      totalNumber: null,
      fieldsList: [
        {key: "id", label: "التسلسل"},
        {key: "name", label: "اسم التمرين"},
        {key: "type.name", label: "نوع التمرين"},
        {key: "learning_path.name", label: "المسار التعليمي"},
        {key: "lessons", label: "اسم الدرس"},
        {key: "actions", label: "الإجراء"},
      ],
    }
  },
  methods: {
    goToAddQuiz() {
      this.$router.push('/dashboard/practice/add')
    },
    getQuizzes(event) {
      this.loading = true
      const params = event
      this.ApiService(getQuizzesRequest(params)).then((response) => {
        this.quizzesList = response.data.data
        this.totalNumber = response.data.meta.total
      }).finally(() => {
        this.loading = false;
      });
    },
    detailItem($event) {
      this.$router.push(`/dashboard/practices/show/${$event}`)
    },
    editItem($event) {
      this.$router.push(`/dashboard/practices/edit/${$event}`)
    },
    deleteItem($event) {
      this.itemId = $event
      this.showModal = true
    },
    cancel($event) {
      this.showModal = $event
    },
    cancelWithConfirm() {
      this.ApiService(deleteQuizRequest(this.itemId)).then(() => {
        this.getQuizzes()
      })
      this.cancel()
    }
  },
  mounted() {
    this.getQuizzes()
    window.localStorage.setItem("page","practices");
  },
  beforeDestroy() {
    window.localStorage.setItem("page","");
  }
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
