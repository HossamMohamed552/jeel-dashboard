<template>
  <section class="container-fluid custom-container">
    <ListItems :header-name="$t('QUESTIONS.questionsList')" :number-of-item="totalNumber"
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
          <span>{{ $t('QUESTIONS.ADD_NEW') }}</span>
        </Button>
      </template>
    </ListItems>
    <Modal :content-message="$t('QUESTIONS.deleteQuestion')"
           :content-message-question="$t('QUESTIONS.confirm_delete_question')"
           :showModal="showModal"
           @cancel="cancel($event)"
           :is-warning="true"
           @cancelWithConfirm="cancelWithConfirm($event)"/>
    <Modal :content-message="$t('can_not_delete')"
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
    fieldsList() {
      return [
        {key: "vid", label: this.$i18n.t("TABLE_FIELDS.id"),},
        {key: "question", label: this.$i18n.t("TABLE_FIELDS.question")},
        {key: "questionType.name", label: this.$i18n.t("TABLE_FIELDS.questionType")},
        {key: "subQuestionType.name", label: this.$i18n.t("TABLE_FIELDS.subQuestionType")},
        {key: "lesson.name", label: this.$i18n.t("TABLE_FIELDS.lesson")},
        {key: "questionDifficulty", label: this.$i18n.t("TABLE_FIELDS.questionDifficulty")},
        {key: "actions", label: this.$i18n.t("TABLE_FIELDS.actions")},
      ]
    },
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
      })
    }
  },
  mounted() {
    this.getQuestions()
    window.localStorage.setItem("page", "questions");
  },
  beforeDestroy() {
    window.localStorage.setItem('page', '')
  }
}
</script>

<style scoped lang="scss">
@import "./index";
</style>
