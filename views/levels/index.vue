<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'قائمة الصفوف الدراسية'"
      :number-of-item="totalNumber"
      :tableItems="levelsList"
      :fieldsList="fieldsList"
      :v-search-model="groupSearchWord"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @refetch="getLevels"
      :loading="loading"
      :permission_delete="'delete-levels'"
      :permission_edit="'edit-levels'"
      :permission_view="'show-levels'"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddLevel"
          v-if="user.permissions.includes(`add-levels`)"
        >
          <img src="@/assets/images/icons/plus.svg" />
          <span>إضافة صف دراسي</span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="'حذف المرحلة الدراسية'"
      :content-message-question="'هل انت متأكد من حذف المرحلة الدراسية'"
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
import {deleteLevelRequest, getLevelsRequest} from "@/api/level";
import Modal from "@/components/Shared/Modal/index.vue";
import {mapGetters} from "vuex";

export default {
  components: { Modal, ListItems, Button },
  data() {
    return {
      loading: false,
      showModal: false,
      groupSearchWord: "",
      levelsList: [],
      totalNumber: 0,
      fieldsList: [
        { key: "id", label: "التسلسل" },
        { key: "name", label: "اسم المرحلة" },
        { key: "actions", label: "الإجراء" },
      ],
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    goToAddLevel() {
      this.$router.push("/dashboard/levels/add");
    },
    getLevels(event) {
      this.loading = true;
      this.ApiService(getLevelsRequest(event))
        .then((response) => {
          this.levelsList = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    detailItem($event) {
      this.$router.push(`/dashboard/levels/show/${$event}`);
    },
    editItem($event) {
      this.$router.push(`/dashboard/levels/edit/${$event}`);
    },
    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteLevelRequest(this.itemId)).then(() => {
        this.getLevels();
      });
      this.cancel();
    },
  },
  mounted() {
    this.getLevels();
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
