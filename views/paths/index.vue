<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="$t('PATH.learning_path')"
      :number-of-item="totalNumber"
      :tableItems="pathsList"
      :fields-list="fieldsList"
      :v-search-model="groupSearchWord"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @refetch="getPaths"
      :loading="loading"
      :permission_delete="'delete-learningpath'"
      :permission_edit="'edit-learningpath'"
      :permission_view="'show-learningpath'"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddPath()"
          v-if="user.permissions.includes(`add-learningpath`)"
        >
          <img src="@/assets/images/icons/plus.svg"/>
          <span>{{ $t('PATH.ADD_NEW') }}</span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="$t('PATH.delete_learning_path')"
      :content-message-question="$t('PATH.confirm_delete_learning_path')"
      :showModal="showModal"
      @cancel="cancel($event)"
      :is-warning="true"
      @cancelWithConfirm="cancelWithConfirm($event)"
    />
    <Modal :content-message="$t('can_not_delete')" :showModal="showModalFailed" :alarm="true"
           @cancelWithConfirm="showModalFailed=false"/>
  </section>
</template>

<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import {deleteLearningPathRequest, getLearningPathsRequest} from "@/api/learningPath";
import Modal from "@/components/Shared/Modal/index.vue";
import {mapGetters} from "vuex";

export default {
  components: {Modal, ListItems, Button},
  computed: {
    fieldsList() {
      return [
        {key: "vid", label: this.$i18n.t("TABLE_FIELDS.id")},
        {key: "name", label: this.$i18n.t("TABLE_FIELDS.learning_path_name")},
        {key: "audio", label: this.$i18n.t('TABLE_FIELDS.audio')},
        {key: "actions", label: this.$i18n.t('TABLE_FIELDS.actions')},
      ]
    },
    ...mapGetters(["user"]),
  },
  data() {
    return {
      loading: false,
      showModal: false,
      showModalFailed: false,
      groupSearchWord: "",
      pathsList: [],
      totalNumber: null,
    };
  },
  methods: {
    goToAddPath() {
      this.$router.push("/dashboard/path/add");
    },
    getPaths(event) {
      this.loading = true;
      const params = !event ? {per_page: 10} : event;
      this.ApiService(getLearningPathsRequest(params))
        .then((response) => {
          this.pathsList = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    detailItem($event) {
      this.$router.push(`/dashboard/path/show/${$event}`);
    },
    editItem($event) {
      this.$router.push(`/dashboard/path/edit/${$event}`);
    },
    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteLearningPathRequest(this.itemId)).then(() => {
        this.getPaths();
      }).catch((error) => {
        this.showModalFailed = error.response.data.code === 23000;
      }).finally(() => {
        this.cancel();
      })
    },
  },
  mounted() {
    this.getPaths();
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
