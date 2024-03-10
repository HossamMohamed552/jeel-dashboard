<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'قائمة الرسائل'"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :table-items="announcement"
      :v-search-model="announcementSearchWord"
      :loading="loading"
      @detailItem="detailItem($event)"
      @refetch="getAnnouncement"
      :permission_view="'show-announcements'"
    >
    </ListItems>
  </section>
</template>

<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {mapGetters} from "vuex";
import {getAnnouncementForTeacherRequest} from "@/api/teacher-module";

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
        {key: "description", label: this.$i18n.t('ads.superDescription')},
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
    getAnnouncement(event) {
      this.loading = true;
      const params = event;
      this.ApiService(getAnnouncementForTeacherRequest(params))
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
  },
  mounted() {
    this.getAnnouncement();
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
