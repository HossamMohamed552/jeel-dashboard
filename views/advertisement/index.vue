<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'قائمة الإعلانات'"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :table-items="announcement"
      :v-search-model="announcementSearchWord"
      :loading="loading"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      @deleteItem="deleteItem($event)"
      @refetch="getAnnouncement"
      :permission_delete="'delete-announcements'"
      :permission_edit="'edit-announcements'"
      :permission_view="'show-announcements'"
    >
      <template #buttons>
        <Button
          :custom-class="'btn-add rounded-btn big-padding'"
          @click="goToAddAnnouncement"
          v-if="user.permissions.includes(`add-announcements`)"
        >
          <img src="@/assets/images/icons/plus.svg"/>
          <span>إضافة إعلان</span>
        </Button>
      </template>
    </ListItems>
    <Modal
      :content-message="'حذف الإعلان'"
      :content-message-question="'هل انت متأكد من حذف الإعلان ؟'"
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
import {deleteAnnouncementRequest, getAnnouncementRequest} from "@/api/announcement";

export default {
  components: {Modal, ListItems, Button},
  data() {
    return {
      loading: false,
      showModal: false,
      announcementSearchWord: "",
      announcement: [],
      totalNumber: 0,
      fieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {key: "level.name", label: this.$i18n.t('TABLE_FIELDS.superLevel')},
        {key: "teachers", label: this.$i18n.t('TABLE_FIELDS.superTeachersTo')},
        {key: "subject", label: this.$i18n.t('TABLE_FIELDS.subject')},
        {key: "description", label: this.$i18n.t('TABLE_FIELDS.superDescription')},
        {
          key: "actions",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ],
      itemId: 0,
    };
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    goToAddAnnouncement() {
      this.$router.push("/dashboard/advertisements/add");
    },
    getAnnouncement(event) {
      this.loading = true;
      const params = event;
      this.ApiService(getAnnouncementRequest(params))
        .then((response) => {
          this.announcement = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    detailItem($event) {
      this.$router.push(`/dashboard/advertisements/show/${$event}`);
    },
    editItem($event) {
      this.$router.push(`/dashboard/advertisements/${$event}`);
    },
    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteAnnouncementRequest(this.itemId)).then(() => {
        this.getAnnouncement();
      });
      this.cancel();
    },
  },
  mounted() {
    this.getAnnouncement();
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
