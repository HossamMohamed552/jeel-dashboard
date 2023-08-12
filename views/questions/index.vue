<template>
  <section class="container-fluid custom-container">
    <ListItems :header-name="'قائمة بنك الأسئلة'" :number-of-item="totalNumber"
               :tableItems="questionsList" :fieldsList="fieldsList"
               :v-search-model="groupSearchWord"
               @detailItem="detailItem($event)"
               @editItem="editItem($event)" @deleteItem="deleteItem($event)"
               @refetch="getQuestions"
               :loading="loading"
               >
      <template #buttons>
        <Button :custom-class="'btn-add rounded-btn big-padding'" @click="goToAddQuestions">
          <img src="@/assets/images/icons/plus.svg">
          <span>إضافة سؤال جديد</span>
        </Button>
      </template>
    </ListItems>
    <Modal :content-message="'حذف السؤال'"
           :content-message-question="'هل انت متأكد من حذف السؤال'"
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
import {deleteQuestionRequest, getQuestionRequest} from "@/api/question";

export default {
  components: {Modal, ListItems, Button},
  data() {
    return {
      loading:false,
      showModal: false,
      groupSearchWord: "",
      questionsList: [],
      totalNumber: 0,
      fieldsList: [
        {key: "id", label: "التسلسل"},
        {key: "question_type", label: "نوع السؤال"},
        {key: "question", label: "السؤال"},
        {key: "question_difficulty", label: "مستوى الصعوبة"},
        {key: "question_pattern", label: "نمط السؤال"},
        {key: "learningPath.name", label: this.$i18n.t('TABLE_FIELDS.learning_path')},
        {key: "level.name", label: this.$i18n.t('TABLE_FIELDS.level')},
        { key: "actions", label: "الإجراء" },
      ],
    }
  },
  methods: {
    goToAddQuestions() {
      this.$router.push('/dashboard/questions/add')
    },
    getQuestions(event) {
      this.loading = true
      const params = event
      this.ApiService(getQuestionRequest(params)).then((response) => {
        this.questionsList = response.data.data
        this.totalNumber = response.data.meta.total
      }) .finally(() => {
          this.loading = false;
        });
    },
    detailItem($event) {
      this.$router.push(`/dashboard/questions/show/${$event}`)
    },
    editItem($event) {
      this.$router.push(`/dashboard/questions/edit/${$event}`)
    },
    deleteItem($event) {
      this.itemId = $event
      this.showModal = true
    },
    cancel($event) {
      this.showModal = $event
    },
    cancelWithConfirm() {
      this.ApiService(deleteQuestionRequest(this.itemId)).then(() => {
        this.getQuestions()
      })
      this.cancel()
    }
  },
  mounted() {
    this.getQuestions()
  }

}
</script>

<style scoped lang="scss">
@import "./index";
</style>
