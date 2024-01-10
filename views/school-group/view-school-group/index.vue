<template v-if="group">
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
              :subtitle="group?.owner"
            />
          </b-col>

          <b-col lg="4" class="mb-4">
            <ShowItem
              class="with-border-bottom"
              :title="$t('GROUP.music')"
              :subtitle="group.music_status === 0 ? 'أكابيلا' : 'بموسيقى'"
            />
          </b-col>

          <b-col lg="4" class="mb-4">
            <ShowItem
              class="with-border-bottom"
              :title="$t('GROUP.status')"
              :subtitle="group.status === 1 ? 'مفعل' : 'غير مفعل'"
            />
          </b-col>
          <b-col cols="12" lg="12" class="mb-4" v-if="group.description">
            <ShowItem
              class="with-border-bottom"
              :title="$t('GROUP.description')"
              :subtitle="group.description"
            />
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

export default {
  name: "index",
  components: {
    MissionDetailsModal,
    Button,
    ShowItem,
  },
  data() {
    return {
      group: {},
      selectedMission: null,
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
