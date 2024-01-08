<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'قائمة أنواع المهارات'"
      :number-of-item="totalNumber"
      :tableItems="LearningSkillsList"
      :fieldsList="fieldsList"
      :v-search-model="groupSearchWord"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @refetch="getLearningSkills"
      :loading="loading"
      :permission_delete="'delete-languageSkill'"
      :permission_edit="'edit-languageSkill'"
      :permission_view="'show-languageSkill'"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddLearningSkills"
          v-if="user.permissions.includes(`add-languageSkill`)"
        >
          <img src="@/assets/images/icons/plus.svg" />
          <span>إضافة مهارة </span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="'حذف المهارة'"
      :content-message-question="'هل انت متأكد من حذف المهارة '"
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
import { getLearningSkillsRequest, deleteLearningSkillRequest } from "@/api/learning-skill";
import Modal from "@/components/Shared/Modal/index.vue";
import { mapGetters } from "vuex";

export default {
  components: { Modal, ListItems, Button },
  data() {
    return {
      loading: false,
      showModal: false,
      groupSearchWord: "",
      LearningSkillsList: [],
      totalNumber: null,
      fieldsList: [
        { key: "id", label: "التسلسل" },
        { key: "name", label: "نوع المهارة" },
        { key: "actions", label: "الإجراء" },
      ],
    };
  },
  methods: {
    goToAddLearningSkills() {
      this.$router.push("/dashboard/learning-skill/add");
    },
    getLearningSkills(event) {
      this.loading = true;
      const params = event;
      this.ApiService(getLearningSkillsRequest(params))
        .then((response) => {
          this.LearningSkillsList = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    detailItem($event) {
      this.$router.push(`/dashboard/learning-skill/show/${$event}`);
    },
    editItem($event) {
      this.$router.push(`/dashboard/learning-skill/edit/${$event}`);
    },
    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteLearningSkillRequest(this.itemId)).then(() => {
        this.getLearningSkills();
      });
      this.cancel();
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    this.getLearningSkills();
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
