<template>
  <div class="add-mission">
    <Modal
      :content-message="'تمت الإضافة بنجاح'"
      :showModal="showModal"
      :is-success="true"
    />
    <Stepper
      v-show="currentStep === 0 || currentStep === 1 || currentStep === 2"
      class="mt-5 mb-3"
      :steps="steps"
      :current-step="currentStep"
    />
    <AddEditCompetitionInfo
      v-if="currentStep === 0"
      @onSubmit="nextStepTwo"
      @handleCancel="handleCancel"
    />
    <AddEditCompetitionQuestions v-if="currentStep === 1" />
  </div>
</template>
<script>
import AddEditCompetitionInfo from "@/components/Modules/Competitions/AddEditCompetitionInfo/index.vue";
import AddEditCompetitionQuestions from "@/components/Modules/Competitions/AddEditCompetitionQuestions/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import Stepper from "@/components/Shared/Stepper/index.vue";
import axios from "axios";
import VueCookies from "vue-cookies";
import globalAssetData from "@/mixins/getData/globalAssetData";

export default {
  mixins: [globalAssetData],
  components: {
    Modal,
    Button,
    Stepper,
    AddEditCompetitionInfo,
    AddEditCompetitionQuestions
  },
  data() {
    return {
      loading: false,
      showModal: false,
      collectData: {},
      steps: [
        {
          icon: "1",
          title: this.$t("COMPETITIONS.STEP_ONE"),
        },
        {
          icon: "2",
          title: this.$t("COMPETITIONS.STEP_TWO"),
        },
        {
          icon: "3",
          title: this.$t("COMPETITIONS.STEP_THREE"),
        },
      ],
      currentStep: 0,
    };
  },
  methods: {
    handleCancel() {
      this.$router.push("/dashboard/competitions");
    },
    nextStepTwo(data) {
      this.handleAssignObject(data);
      this.handleNavigation(1);
    },
    addCompetition() {},
    handleAssignObject(data) {
      Object.assign(this.collectData, { ...data });
      this.handleSaveCollectedData(data);
    },
    handleSaveCollectedData(data) {
      sessionStorage.setItem("collectData", data);
    },
    handleNavigation(nextStep) {
      this.currentStep = nextStep;
    },
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
