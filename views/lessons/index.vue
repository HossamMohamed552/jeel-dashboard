<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="$t('LESSONS.LESSONS')"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :table-items="lessonsList"
      :v-search-model="lessonSearchWord"
      :loading="loading"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @refetch="getLessonsList"
      :isRefresh="refresh"
      :permission_delete="'delete-lesson'"
      :permission_edit="'edit-lesson'"
      :permission_view="'show-lesson'"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddLesson"
          v-if="user.permissions.includes(`add-lesson`)"
        >
          <img src="@/assets/images/icons/plus.svg"/>
          <span>{{$t('LESSONS.ADD')}}</span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="$t('LESSONS.delete_lesson')"
      :content-message-question="$t('LESSONS.confirm_delete_lesson')"
      :showModal="showModal"
      @cancel="cancel($event)"
      :is-warning="true"
      @cancelWithConfirm="cancelWithConfirm($event)"
    />
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
import {mapGetters} from "vuex";
import {deleteLessonRequest, getLessonsRequest} from "@/api/lessons";

export default {
  components: {Modal, ListItems, Button},
  data() {
    return {
      loading: false,
      showModal: false,
      showModalFailed: false,
      deleteModal: false,
      lessonSearchWord: "",
      lessonsList: [],
      totalNumber: 0,
      itemId: 0,
      refresh:false
    };
  },
  computed: {
    fieldsList(){
      return [
        {key: "vid", label: this.$i18n.t("TABLE_FIELDS.id")},
        {key: "name", label: this.$i18n.t("LESSONS.NAME")},
        {key: "learningPath.name", label: this.$i18n.t('TABLE_FIELDS.learning_path')},
        {key: "actions", label: this.$i18n.t("TABLE_FIELDS.actions")},
      ]
    },
    ...mapGetters(['user'])
  },
  methods: {
    goToAddLesson() {
      this.$router.push("/dashboard/lessons/add");
    },
    getLessonsList(event) {
      this.loading = true;
      this.ApiService(getLessonsRequest(event))
        .then((response) => {
          this.lessonsList = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    detailItem($event) {
      this.$router.push(`/dashboard/lessons/show/${$event}`);
    },
    editItem($event) {
      this.$router.push(`/dashboard/lessons/edit/${$event}`);
    },
    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteLessonRequest(this.itemId)).then(() => {
        this.deleteModal = true;
        this.getLessonsList();
        this.refresh = true
        setTimeout(()=>{
          this.deleteModal = false
        },1500)
      }).catch((error) => {
        this.showModalFailed = error.response.data.code === 23000;
      }).finally(() => {
        this.cancel();
      })
    },
  },
  mounted() {
    this.getLessonsList();
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
