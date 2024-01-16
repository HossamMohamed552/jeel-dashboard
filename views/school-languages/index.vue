<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'قائمة اللغات'"
      :number-of-item="totalNumber"
      :tableItems="schoolLanguagesList"
      :fieldsList="fieldsList"
      :v-search-model="groupSearchWord"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @refetch="getSchoolLanguages"
      :loading="loading"
      :permission_delete="'delete-languages'"
      :permission_edit="'edit-languages'"
      :permission_view="'show-languages'"
    >
      <!-- todo tooo check the permission above and for the button -->
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddSchoolLanguage"
          v-if="user.permissions.includes(`add-languages`)"
        >
          <img src="@/assets/images/icons/plus.svg" />
          <span>إضافة لغة </span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="'حذف اللغة'"
      :content-message-question="'هل انت متأكد من حذف اللغة '"
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
import { getSchoolLanguagesRequest, deleteSchoolLanguageRequest } from "@/api/school-languages";
import Modal from "@/components/Shared/Modal/index.vue";
import { mapGetters } from "vuex";

export default {
  components: { Modal, ListItems, Button },
  data() {
    return {
      loading: false,
      showModal: false,
      groupSearchWord: "",
      schoolLanguagesList: [],
      totalNumber: null,
      fieldsList: [
        { key: "id", label: "التسلسل" },
        { key: "name", label: "اسم اللغة" },
        { key: "actions", label: "الإجراء" },
      ],
    };
  },
  methods: {
    goToAddSchoolLanguage() {
      this.$router.push("/dashboard/school-languages/add");
    },
    getSchoolLanguages(event) {
      this.loading = true;
      const params = event;
      this.ApiService(getSchoolLanguagesRequest(params))
        .then((response) => {
          this.schoolLanguagesList = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    detailItem($event) {
      this.$router.push(`/dashboard/school-languages/show/${$event}`);
    },
    editItem($event) {
      this.$router.push(`/dashboard/school-languages/edit/${$event}`);
    },
    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteSchoolLanguageRequest(this.itemId)).then(() => {
        this.getSchoolLanguages();
      });
      this.cancel();
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    this.getSchoolLanguages();
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
