<template>
  <section class="container-fluid custom-container">
    <ListItems :header-name="$t('QUIZZES.quizzes')" :number-of-item="totalNumber"
               :tableItems="quizzesList" :fieldsList="fieldsList"
               :v-search-model="quizzesSearchWord" @detailItem="detailItem($event)"
               @editItem="editItem($event)" @deleteItem="deleteItem($event)"
               @refetch="getQuizzes"
               :isRefresh="refresh"
               :loading="loading"
               :permission_delete="'delete-quizzes'"
               :permission_edit="'edit-quizzes'"
               :permission_view="'show-quizzes'"
    >
      <template #buttons>
        <Button :custom-class="'btn-add rounded-btn big-padding'" @click="goToAddQuiz"
                v-if="user.permissions.includes(`add-quizzes`)">
          <img src="@/assets/images/icons/plus.svg">
          <span>{{ $t('QUIZZES.ADD_NEW') }}</span>
        </Button>
      </template>
    </ListItems>
    <Modal :content-message="$t('QUIZZES.delete_quiz')"
           :content-message-question="$t('QUIZZES.confirm_delete_quiz')"
           :showModal="showModal"
           @cancel="cancel($event)"
           :is-warning="true"
           @cancelWithConfirm="cancelWithConfirm($event)"/>
    <Modal :content-message="$t('can_not_delete')"
           :showModal="showModalFailed" :alarm="true"
           @cancelWithConfirm="showModalFailed=false"/>
    <Modal :content-message="$t('CONTROLS.delete_successfully')" :showModal="deleteModal" :is-success="true" />
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
  computed: {
    fieldsList() {
      return [
        {
          key: "vid",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {key: "name", label: this.$i18n.t("QUIZZES.name")},
        {key: "quizType.name", label: this.$i18n.t("QUIZZES.quizType")},
        {key: "learningPath.name", label: this.$i18n.t("LEARNING_PATH.LEARNING_PATH")},
        {key: "lessons", label: this.$i18n.t("TABLE_FIELDS.lesson")},
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
      quizzesSearchWord: "",
      quizzesList: [],
      totalNumber: null,
      refresh: false,
      deleteModal: false,
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
        this.deleteModal = true;
        this.getQuizzes()
        this.refresh = true
        setTimeout(()=>{
          this.deleteModal = false
        },1500)
      }).catch((error) => {
        this.showModalFailed = error.response.data.code === 23000;
      }).finally(() => {
        this.cancel();
      })
    }
  },
  mounted() {
    this.getQuizzes()
    // window.localStorage.setItem("page","practices");
  },
  beforeDestroy() {
    window.localStorage.setItem("page", "");
  }
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
