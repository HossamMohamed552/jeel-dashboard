<template>
  <section class="container-fluid custom-container">
    <ListItems :header-name="'قائمة التمارين'" :number-of-item="totalNumber"
               :tableItems="quizzesList" :fieldsList="fieldsList" :v-search-model="quizzesSearchWord" @detailItem="detailItem($event)"
               @editItem="editItem($event)" @deleteItem="deleteItem($event)"
               @refetch="getQuizzes"
               :loading="loading"
               >
      <template #buttons>
        <Button :custom-class="'btn-add rounded-btn big-padding'" @click="goToAddQuiz">
          <img src="@/assets/images/icons/plus.svg">
          <span>إضافة تمرين جديد </span>
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

export default {
  name: "index",
  components: {Modal, ListItems, Button},
  data() {
    return {
      loading: false,
      showModal: false,
      quizzesSearchWord: "",
      quizzesList: [],
      totalNumber: null,
      fieldsList: [
        { key: "id", label: "التسلسل" },
        { key: "name", label: "اسم التمرين" },
        { key: "type", label: "النوع" },
        { key: "total_question", label: "إجمالى الإسئلة" },
        { key: "level", label: "المرحله الدراسية" },
        { key: "description", label: "الوصف" },
        { key: "actions",label:"الإجراء" },
      ],
    }
  },
  methods: {
    goToAddQuiz(){
      this.$router.push('/dashboard/practice/add')
    },
    getQuizzes(event) {
      this.loading = true
      const params = event
      this.ApiService(getQuizzesRequest(params)).then((response) => {
        this.quizzesList = response.data.data
        this.totalNumber = response.data.meta.total
      }) .finally(() => {
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
      this.ApiService(deleteQuizRequest(this.itemId)).then(()=>{
        this.getQuizzes()
      })
      this.cancel()
    }
  },
  mounted() {
    this.getQuizzes()
  }
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
