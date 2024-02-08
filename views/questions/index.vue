<template>
  <section class="container-fluid custom-container">
    <ListItems :header-name="'قائمة الأسئلة'" :number-of-item="totalNumber"
               :tableItems="questionsList" :fieldsList="fieldsList"
               :v-search-model="groupSearchWord"
               @detailItem="detailItem($event)"
               @editItem="editItem($event)" @deleteItem="deleteItem($event)"
               @refetch="getQuestions"
               @resetRefresh="refreshIt=false"
               :isRefresh="refreshIt"
               :loading="loading"
               :permission_delete="'delete-questions'"
               :permission_edit="'edit-questions'"
               :permission_view="'view-questions'"
    >
      <template #buttons>
        <Button :custom-class="'btn-add rounded-btn big-padding'" @click="goToAddQuestions"
                v-if="user.permissions.includes(`add-questions`)">
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
    <Modal :content-message="'لا يمكن حذف هذا العنصر لأنه مرتبط بعناصر أخرى'"
           :showModal="showModalFailed" :alarm="true"
           @cancelWithConfirm="showModalFailed=false"/>
  </section>
</template>

<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {deleteQuestionRequest, getQuestionRequest} from "@/api/question";
import {mapGetters} from "vuex";

export default {
  components: {Modal, ListItems, Button},
  computed: {
    ...mapGetters(['user'])
  },
  data() {
    return {
      loading: false,
      showModal: false,
      showModalFailed: false,
      groupSearchWord: "",
      questionsList: [],
      totalNumber: 0,
      refreshIt: false,
      fieldsList: [
        {key: "id", label: "التسلسل"},
        {key: "question", label: "نص السؤال"},
        {key: "questionType.name", label: "نوع السؤال"},
        {key: "subQuestionType.name", label: "نوع السؤال الفرعى"},
        {key: "questionDifficulty", label: "مستوى الصعوبة"},
        {key: "actions", label: "الإجراء"},
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
      }).finally(() => {
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
        this.refreshIt = true
      }).catch((error) => {
        this.showModalFailed = error.response.data.code === 23000;
      }).finally(() => {
        this.cancel();
      })()
    }
  },
  mounted() {
    this.getQuestions()
    window.localStorage.setItem("page","questions");
  },
  beforeDestroy() {
    window.localStorage.setItem('page', '')
  }
}
</script>

<style scoped lang="scss">
@import "./index";
</style>
