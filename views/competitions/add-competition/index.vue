<template>
  <div class="add-mission">
    <!-- {{ collectData }} -->
    <!-- <pre>{{ user.school.id }}</pre> -->
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
      v-show="currentStep === 0"
      :levels="levels"
      :missions="missions"
      :goals="goals"
      :outcomes="outcomes"
      @getMissions="getMissions"
      @getGoalsAndOutcomes="getGoalsAndOutcomes"
      @onSubmit="nextStepTwo"
      @handleCancel="handleCancel"
    />
    <AddEditCompetitionQuestions
      v-show="currentStep === 1"
      :questions-numbers="questionsNumbers"
      :random-questions="randomQuestions"
      @onSubmit="nextToStepThree"
      @handleBack="backToStepOne"
      @handleCancel="handleCancel"
      @generateRandomQuestions="generateRandomQuestions"
    />
    <AddEditCompetitionRewards
      v-show="currentStep === 2"
      :arrangmentList="arrangmentList"
      @onSubmit="submitCreateCompetition"
      @handleBack="backToSteptwo"
      @handleCancel="handleCancel"
      @getArrangmentList="getArrangmentList"
    />
  </div>
</template>
<script>
import AddEditCompetitionInfo from "@/components/Modules/Competitions/AddEditCompetitionInfo/index.vue";
import AddEditCompetitionQuestions from "@/components/Modules/Competitions/AddEditCompetitionQuestions/index.vue";
import AddEditCompetitionRewards from "@/components/Modules/Competitions/AddEditCompetitionRewards/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import Stepper from "@/components/Shared/Stepper/index.vue";
import axios from "axios";
import VueCookies from "vue-cookies";
import globalAssetData from "@/mixins/getData/globalAssetData";
import { getAllLevelsRequest } from "@/api/level";
import {
  getMissionForCompetitonRequest,
  getOutcomesForCompetitonRequest,
  getGoalsForCompetitonRequest,
  getCompetitonQuestionNumberRequest,
  getRandomQuestionRequest,
  getArrangmentListRequest,
  postCreateCompetitonRequest
} from "@/api/competition";
import { mapGetters } from "vuex";

export default {
  mixins: [globalAssetData],
  components: {
    Modal,
    Button,
    Stepper,
    AddEditCompetitionInfo,
    AddEditCompetitionQuestions,
    AddEditCompetitionRewards,
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
      levels: [],
      missions: [],
      goals: [],
      outcomes: [],
      questionsNumbers: [],
      randomQuestions: [],
      arrangmentList: [],
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    this.getAllLevels();
  },
  methods: {
    handleCancel() {
      this.$router.push("/dashboard/competitions");
    },
    nextStepTwo(data) {
      this.getQuestionsNumbers(data.missions, data.level_id);
      this.handleAssignObject(data);
      this.handleNavigation(1);
    },
    nextToStepThree(data) {
      this.handleAssignObject(data);
      this.handleNavigation(2);
    },
    submitCreateCompetition(data) {
      this.handleAssignObject(data);
      //logic to create competition
      this.collectData.school_id = this.user.school.id;

      this.showModal = true;
      this.ApiService(postCreateCompetitonRequest(this.collectData))
        .then((response) => {
          setTimeout(() => {
            this.showModal = false;
          }, 1500);
        })
        .then(() => {
          this.$router.push("/dashboard/competitions");
        });
    },
    backToStepOne() {
      this.handleNavigation(0);
    },
    backToSteptwo() {
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
    getAllLevels() {
      this.ApiService(getAllLevelsRequest()).then((response) => {
        this.levels = response.data.data;
      });
    },
    getMissions(levelId) {
      this.ApiService(
        getMissionForCompetitonRequest({ level_id: levelId })
      ).then((response) => {
        this.missions = response.data.data;
      });
    },
    getGoalsAndOutcomes(missions) {
      this.ApiService(getGoalsForCompetitonRequest(missions)).then(
        (response) => {
          this.goals = response.data.data;
        }
      );

      this.ApiService(getOutcomesForCompetitonRequest(missions)).then(
        (response) => {
          this.outcomes = response.data.data;
        }
      );
    },
    getQuestionsNumbers(missions, levelId) {
      const missionsIds = missions.join(",");
      this.ApiService(
        getCompetitonQuestionNumberRequest({
          missions: missionsIds,
          level_id: levelId,
        })
      ).then((response) => {
        this.questionsNumbers = response.data;
      });
    },
    generateRandomQuestions(questionDifficulties) {
      const data = {
        level_id: this.collectData.level_id,
        missions: this.collectData.missions,
        question_difficuly: questionDifficulties,
      };

      this.ApiService(getRandomQuestionRequest(data)).then((response) => {
        this.randomQuestions = response.data.data;
      });
    },
    getArrangmentList(data) {
      this.ApiService(getArrangmentListRequest(data)).then((response) => {
        this.arrangmentList = response.data.data;
      });
    },
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
