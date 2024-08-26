<template>
  <section class="container-fluid custom-container">
    <ListItems
      class="seasonal-mission-custom-list-item"
      :header-name="$t('seasonalGroup.seasonalGroup')"
      :number-of-item="totalNumber"
      :tableItems="seasonalMissionGroups"
      :fieldsList="fieldsList"
      :v-search-model="groupSearchWord"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @refetch="getSeasonalMissionGroups"
      :loading="loading"
      :isRefresh="refresh"
      :permission_delete="'delete-seasonal-mission-groups'"
      :permission_edit="'edit-seasonal-mission-groups'"
      :permission_view="'show-seasonal-mission-groups'"
    >
      <!-- todo tooo check the permission above and for the button -->
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddSeasonalMissionGroup"
          v-if="user.permissions.includes(`add-seasonal-mission-groups`)"
        >
          <img src="@/assets/images/icons/plus.svg" alt="seasonal"/>
          <span>{{ $t('seasonalGroup.add') }}</span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="$t('seasonalGroup.delete')"
      :content-message-question="$t('seasonalGroup.confirm')"
      :showModal="showModal"
      @cancel="cancel($event)"
      :is-warning="true"
      @cancelWithConfirm="cancelWithConfirm($event)"
    />
    <Modal :content-message="$t('CONTROLS.delete_successfully')" :showModal="deleteModal" :is-success="true" />
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
import {mapGetters} from "vuex";

export default {
  components: {Modal, ListItems, Button},
  data() {
    return {
      loading: false,
      showModal: false,
      groupSearchWord: "",
      seasonalMissionGroups: [],
      totalNumber: null,
      refresh: false,
      deleteModal: false,
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
        this.deleteModal = true;
        this.getSeasonalMissionGroups();
        this.refresh = true
        setTimeout(()=>{
          this.deleteModal = false
        },1500)
      });
      this.cancel();
    },
  },
  computed: {
    fieldsList() {
      return [
        {key: "vid", label: this.$i18n.t('TABLE_FIELDS.id')},
        {key: "logo", label: this.$i18n.t('TABLE_FIELDS.logoGroup')},
        {key: "name", label: this.$i18n.t('TABLE_FIELDS.nameGroup')},
        {key: "actions", label: this.$i18n.t('TABLE_FIELDS.actions')},
      ]
    },
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
