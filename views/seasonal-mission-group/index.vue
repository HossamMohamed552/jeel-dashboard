<template>
  <section class="container-fluid custom-container">
    <ListItems
      class="seasonal-mission-custom-list-item"
      :header-name="'مجموعة المهام الموسمية'"
      :number-of-item="totalNumber"
      :tableItems="seasonalMissionGroups"
      :fieldsList="fieldsList"
      :v-search-model="groupSearchWord"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @refetch="getSeasonalMissionGroups"
      :loading="loading"
      :permission_delete="'delete-languageSkill'"
      :permission_edit="'edit-languageSkill'"
      :permission_view="'show-languageSkill'"
    >
      <!-- todo tooo check the permission above and for the button -->
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddSeasonalMissionGroup"
          v-if="user.permissions.includes(`add-languageSkill`)"
        >
          <img src="@/assets/images/icons/plus.svg" alt="seasonal" />
          <span>إضافة مجموعة </span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="'حذف المجموعة'"
      :content-message-question="'هل انت متأكد من حذف المجموعة '"
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
import {
  getSeasonalMissionGroupsRequest,
  deleteSeasonalMissionGroupRequest,
} from "@/api/seasonal-mission-group.js";
import Modal from "@/components/Shared/Modal/index.vue";
import { mapGetters } from "vuex";

export default {
  components: { Modal, ListItems, Button },
  data() {
    return {
      loading: false,
      showModal: false,
      groupSearchWord: "",
      seasonalMissionGroups: [],
      totalNumber: null,
      fieldsList: [
        { key: "id", label: "التسلسل" },
        { key: "logo", label: "لوجو المجموعة" },
        { key: "name", label: "اسم المجموعة" },
        { key: "actions", label: "الإجراء" },
      ],
    };
  },
  methods: {
    goToAddSeasonalMissionGroup() {
      this.$router.push("/dashboard/seasonal-mission-group/add");
    },
    getSeasonalMissionGroups(event) {
      this.loading = true;
      const params = event;
      this.ApiService(getSeasonalMissionGroupsRequest(params))
        .then((response) => {
          this.seasonalMissionGroups = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    detailItem($event) {
      this.$router.push(`/dashboard/seasonal-mission-group/show/${$event}`);
    },
    editItem($event) {
      this.$router.push(`/dashboard/seasonal-mission-group/edit/${$event}`);
    },
    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteSeasonalMissionGroupRequest(this.itemId)).then(() => {
        this.getSeasonalMissionGroups();
      });
      this.cancel();
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    this.getSeasonalMissionGroups();
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
