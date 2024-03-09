<template>
  <div class="add-mission">
    <!-- {{ collectData }} -->
    <!-- <pre>{{ user.school.id }}</pre> -->
    <Modal :content-message="'تمت الإضافة بنجاح'" :showModal="showModal" :is-success="true" />
    <Stepper class="mt-5 mb-3" :steps="steps" :current-step="currentStep" />
    <AddEditCompetitionInfo
      v-if="currentStep === 0"
      :stepForm="competitionInfoForm"
      @nextStep="nextStep"
      @handleCancel="handleCancel"
    >
      <Button @click="handleCancel" custom-class="cancel-btn margin"> إلغاء </Button>
    </AddEditCompetitionInfo>

    <AddEditCompetitionQuestions
      v-if="currentStep === 1"
      @onSubmit="nextToStepThree"
      @handleBack="prevStep"
      @handleCancel="handleCancel"
      :level_id="competitionInfoForm[1].value"
      :missions_ids="competitionInfoForm[2].value"
    />
    <AddEditPrizes
      v-if="currentStep === 2"
      :stepForm="prizeForm"
      @nextStep="nextStep"
      @prevStep="prevStep"
      :currentStep="currentStep"
    >
      <Button @click="handleCancel" custom-class="cancel-btn margin"> إلغاء </Button>
    </AddEditPrizes>
    <AddEditNotification
      v-if="currentStep === 3"
      :stepForm="notificationForm"
      @nextStep="nextStep"
      @prevStep="prevStep"
      :currentStep="currentStep"
    >
      <Button @click="handleCancel" custom-class="cancel-btn margin"> إلغاء </Button>
    </AddEditNotification>
    <PreviewData
      v-if="currentStep === 4"
      :currentStep="currentStep"
      @prevStep="prevStep"
      :stepForm="[...competitionInfoForm]"
      :questions_ids="questionsIds"
    >
      <Button @click="handleCancel" custom-class="cancel-btn margin"> إلغاء </Button>
    </PreviewData>
  </div>
</template>
<script>
// Steps
import AddEditCompetitionInfo from "@/components/Modules/Competitions/AddEditCompetitionInfo/index.vue";
import AddEditCompetitionQuestions from "@/components/Modules/Competitions/AddEditCompetitionQuestions/index.vue";
import PreviewData from "@/components/Modules/Competitions/PreviewData";
import AddEditPrizes from "@/components/Modules/addEditPrize";
import AddEditNotification from "@/components/Modules/addEditNotification";

import Button from "@/components/Shared/Button/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import Stepper from "@/components/Shared/Stepper/index.vue";
import {
  getArrangmentListRequest,
  postCreateCompetitonRequest,
} from "@/api/competition";
import { mapGetters, mapActions } from "vuex";

export default {
  // mixins: [globalAssetData],
  components: {
    Stepper,
    Modal,
    Button,
    AddEditCompetitionInfo,
    AddEditPrizes,
    AddEditNotification,
    AddEditCompetitionQuestions,
    PreviewData,
  },
  data() {
    return {
      loading: false,
      showModal: false,
      currentStep: 0,
      collectData: {},
      steps: [
        {
          icon: "1",
          title: "البيانات الاساسية",
        },
        {
          icon: "2",
          title: "أسئلة المسابقة",
        },
        {
          icon: "3",
          title: "الجوائز",
        },
        {
          icon: "4",
          title: "الاشعارات",
        },
        {
          icon: "5",
          title: "معاينة المسابقة",
        },
      ],

      competitionInfoForm: [
        {
          key: "name",
          label: "اسم المسابقة",
          col: "4",
          listen: "id",
          value: "",
          type: "text",
          rules: "required|min:3|max:100",
        },
        {
          key: "level_id",
          col: "4",
          listen: "id",
          type: "select",
          optionValue: "name",
          label: "الصفوف المدرسية",
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "required",
          multiple: false,
        },
        {
          key: "missions",
          disabled: true,
          col: "4",
          listen: "id",
          type: "select",
          optionValue: "name",
          label: "المهام",
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "required",
          multiple: true,
        },
        {
          key: "objective_id",
          col: "4",
          disabled: true,
          listen: "id",
          type: "select",
          optionValue: "name",
          label: "الاهداف التعليمية",
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "required",
          multiple: false,
        },
        {
          key: "outcome_id",
          disabled: true,
          col: "4",
          listen: "id",
          type: "select",
          optionValue: "name",
          label: "مخرجات التعلم",
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "required",
          multiple: false,
        },
        {
          key: "start_date",
          label: "بداية المسابقة",
          col: "2",
          listen: "id",
          value: "",
          type: "date",
          rules: "required",
          placeholder: "من",
        },
        {
          key: "end_date",
          label: "نهاية المسابقة",
          col: "2",
          listen: "id",
          value: "",
          type: "date",
          rules: "required",
          placeholder: "الى",
        },
        {
          key: "competition_time",
          label: "المدة الزمنية (بالساعات)",
          col: "4",
          value: "",
          placeholder: "22:00",
          type: "text",
          rules: "required",
        },
      ],
      prizeForm: [
        {
          key: "main_percentage",
          label: "من نسبة",
          col: "4",
          listen: "id",
          value: "",
          type: "number",
          rules: "required|numeric|max_value:100|min_value:0",
        },
        {
          key: "max_percentage",
          label: "إلى نسبة",
          col: "4",
          listen: "id",
          value: "",
          type: "number",
          rules: "required|numeric|max_value:100|min_value:0",
        },
        {
          key: "type_id",
          col: "4",
          listen: "id",
          type: "select",
          optionValue: "name",
          label: "نوع الجائزة",
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "required",
        },
        {
          key: "prizeable_type",
          col: "4",
          listen: "id",
          type: "select",
          optionValue: "name",
          label: "نوع المحتوى",
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "required",
          multiple: true,
          disabled: true,
        },
        {
          key: "prizeable_id",
          col: "4",
          listen: "id",
          type: "select",
          optionValue: "name",
          label: "المحتوى",
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "required",
          disabled: true,
        },
      ],
      notificationForm: [
        {
          key: "name",
          label: "عنوان الإشعار",
          col: "4",
          listen: "id",
          value: "",
          type: "text",
          rules: "required|min:3|max:100",
        },
        {
          key: "start_date",
          label: "تاريخ ووقت الإشعار",
          col: "4",
          listen: "id",
          value: "",
          type: "date",
          rules: "required",
        },
        {
          key: "description",
          label: "نص الإشعار",
          col: "12",
          listen: "id",
          value: "",
          type: "textarea",
          rules: "required|min:3|max:100",
        },
        {
          key: "audio",
          label: "صوت الإشعار",
          col: "12",
          listen: "id",
          value: "",
          type: "audio",
          rules: "required",
        },
      ],
      questionsIds: [],
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    ...mapActions(["addPrizeById", "addNotificationById"]),

    emptyStore() {
      this.addPrizeById([]);
      this.addNotificationById([]);
    },

    handleCancel() {
      this.$router.push("/dashboard/competitions");
    },

    nextStep() {
      this.currentStep = this.currentStep + 1;
    },
    prevStep() {
      this.currentStep = this.currentStep - 1;
    },

    nextToStepThree(data) {
      console.log(data);
      this.questionsIds = data;
      this.handleAssignObject(data);
      this.nextStep();
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

    addCompetition() {},
    handleAssignObject(data) {
      Object.assign(this.collectData, { ...data });
      this.handleSaveCollectedData(data);
    },
    handleSaveCollectedData(data) {
      sessionStorage.setItem("collectData", data);
    },

    getArrangmentList(data) {
      this.ApiService(getArrangmentListRequest(data)).then((response) => {
        this.arrangmentList = response.data.data;
      });
    },
  },
  mounted() {},
  beforeMount() {
    this.emptyStore();
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
