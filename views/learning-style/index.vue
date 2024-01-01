<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'قائمة أساليب التعلم'"
      :number-of-item="totalNumber"
      :tableItems="schoolYearsList"
      :fieldsList="fieldsList"
      :v-search-model="groupSearchWord"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @refetch="getLearningStyle"
      :loading="loading"
      :permission_delete="'delete-languageMethod'"
      :permission_edit="'edit-languageMethod'"
      :permission_view="'show-languageMethod'"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddSchoolYear"
          v-if="user.permissions.includes(`add-languageMethod`)"
        >
          <img src="@/assets/images/icons/plus.svg" />
          <span>إضافة إسلوب التعلم </span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="'حذف إسلوب التعلم'"
      :content-message-question="'هل انت متأكد من حذف إسلوب التعلم'"
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
import { getLearningStyleRequest, deleteLearningStyleRequest } from "@/api/learning-style";
import Modal from "@/components/Shared/Modal/index.vue";
import { mapGetters } from "vuex";

export default {
  components: { Modal, ListItems, Button },
  data() {
    return {
      loading: false,
      showModal: false,
      groupSearchWord: "",
      schoolYearsList: [],
      totalNumber: null,
      fieldsList: [
        { key: "id", label: "التسلسل" },
        { key: "name", label: "اسم إسلوب التعلم" },
        { key: "actions", label: "الإجراء" },
      ],
    };
  },
  methods: {
    goToAddSchoolYear() {
      this.$router.push("/dashboard/learning-style/add");
    },
    getLearningStyle(event) {
      this.loading = true;
      const params = event;
      this.ApiService(getLearningStyleRequest(params))
        .then((response) => {
          this.schoolYearsList = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    detailItem($event) {
      this.$router.push(`/dashboard/learning-style/show/${$event}`);
    },
    editItem($event) {
      this.$router.push(`/dashboard/learning-style/edit/${$event}`);
    },
    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteLearningStyleRequest(this.itemId)).then(() => {
        this.getLearningStyle();
      });
      this.cancel();
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    this.getLearningStyle();
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
