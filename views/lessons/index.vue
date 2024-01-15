<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'قائمة الدروس التعليمية'"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :table-items="lessonsList"
      :v-search-model="lessonSearchWord"
      :loading="loading"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @refetch="getLessonsList"
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
          <img src="@/assets/images/icons/plus.svg" />
          <span>إضافة درس تعليمي</span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="'حذف درس'"
      :content-message-question="'هل انت متأكد من حذف الدرس؟'"
      :showModal="showModal"
      @cancel="cancel($event)"
      :is-warning="true"
      @cancelWithConfirm="cancelWithConfirm($event)"
    />
  </section>
</template>

<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {mapGetters} from "vuex";
import {deleteLessonRequest, getLessonsRequest} from "@/api/lessons";
export default {
  components: { Modal, ListItems, Button },
  data() {
    return {
      loading: false,
      showModal: false,
      lessonSearchWord: "",
      lessonsList: [],
      totalNumber: 0,
      fieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "name",
          label: this.$i18n.t("LESSONS.NAME"),
        },
        {key: "learningPath.name", label: this.$i18n.t('TABLE_FIELDS.learning_path')},
        {
          key: "actions",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ],
      itemId: 0,
    };
  },
  computed:{
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
        this.getLessonsList();
      });
      this.cancel();
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
