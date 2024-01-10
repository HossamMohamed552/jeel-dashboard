<template>
  <section class="container-fluid custom-container">
    <div class="show-group">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("GROUP.showDetails") }}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="4" class="mb-4">
            <ShowItem class="with-border-bottom" :title="$t('GROUP.name')" :subtitle="group.name" />
          </b-col>
          <b-col lg="4" class="mb-4">
            <ShowItem
              class="with-border-bottom"
              :title="$t('GROUP.country')"
              :subtitle="group.country.name"
            />
          </b-col>
          <b-col lg="4" class="mb-4">
            <ShowItem
              class="with-border-bottom"
              :title="$t('GROUP.owner')"
              :subtitle="group.owner"
            />
          </b-col>

          <b-col lg="4" class="mb-4">
            <ShowItem
              class="with-border-bottom"
              :title="$t('GROUP.status')"
              :subtitle="group.status.name"
            />
          </b-col>
          <b-col lg="4" class="mb-4">
            <ShowItem
              class="with-border-bottom"
              :title="$t('GROUP.music_type')"
              :subtitle="group.music_status.name"
            />
          </b-col>
          <b-col cols="12" lg="12" class="mb-4" v-if="group.description">
            <ShowItem
              class="with-border-bottom"
              :title="$t('GROUP.Description')"
              :subtitle="group.description"
            />
          </b-col>
        </b-row>
        <b-row class="mt-5" v-if="group.schools && group.schools.length">
          <b-col cols="12">
            <h4>المدارس</h4>
            <ListItems
              class="p-0 m-0 custom-schools-table"
              :number-of-item="group.schools.length"
              :table-items="group.schools"
              :fieldsList="fieldsList"
              @detailItem="detailItem($event)"
              :permission_view="'show-schoolGroups'"
            >
            </ListItems>
          </b-col>
        </b-row>
      </div>
    </div>
    <MissionDetailsModal
      :mission-id="selectedMission"
      @closeModal="handleCloseMissionDetailsModal"
    />
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import { getSingleSchoolGroupRequest } from "@/api/schoolGroup";
import Button from "@/components/Shared/Button/index.vue";
import MissionDetailsModal from "@/components/Shared/MissionDetailsModal/index.vue";
import ListItems from "@/components/ListItems/index.vue";

export default {
  name: "index",
  components: {
    MissionDetailsModal,
    Button,
    ShowItem,
    ListItems,
  },
  data() {
    return {
      group: {},
      selectedMission: null,
      fieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "name",
          label: "اسم المدرسة",
        },
        {
          key: "country.name",
          label: "الدولة",
        },
        {
          key: "status.name",
          label: "الحالة",
        },
        {
          key: "actions",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ],
    };
  },
  methods: {
    handleShowMissionDetails(missionId) {
      this.selectedMission = missionId;
      this.$bvModal.show("mission-details-modal");
    },
    handleCloseMissionDetailsModal() {
      this.$bvModal.hide("mission-details-modal");
      this.selectedMission = null;
    },
    detailItem(id) {
      this.$router.push(`/dashboard/schools/show/${id}`);
    },
  },
  mounted() {
    this.ApiService(getSingleSchoolGroupRequest(this.$route.params.id)).then((response) => {
      this.group = response.data.data;
    });
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
