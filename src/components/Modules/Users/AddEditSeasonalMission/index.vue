<template>
  <div class="container-fluid custom-container">
    <div class="add-edit-learning-skill">
      <div class="add-edit-term-form">
        <h3>{{ $route.params.id ? "تعديل المهمة موسمية" : "إضافة مهمة موسمية" }}</h3>
        <Stepper v-show="true" class="mt-5 mb-3" :steps="steps" :current-step="currentStep" />

        <StepOne
          v-if="currentStep === 0"
          :stepForm="stepOneForm"
          @nextStep="nextStep"
          @prevStep="prevStep"
          :currentStep="currentStep"
        >
          <Button @click="handleCancel" custom-class="cancel-btn margin"> إلغاء </Button>
        </StepOne>
        <StepTwo
          v-if="currentStep === 1"
          :stepForm="stepTwoForm"
          :learningPath="stepOneForm[6]"
          @nextStep="nextStep"
          @prevStep="prevStep"
          :currentStep="currentStep"
        >
          <Button @click="handleCancel" custom-class="cancel-btn margin"> إلغاء </Button>
        </StepTwo>
        <StepThree
          v-if="currentStep === 2"
          :stepForm="stepThreeForm"
          @nextStep="nextStep"
          @prevStep="prevStep"
          :currentStep="currentStep"
        >
          <Button @click="handleCancel" custom-class="cancel-btn margin"> إلغاء </Button>
        </StepThree>
        <StepFour
          v-if="currentStep === 3"
          :stepForm="stepFourForm"
          @nextStep="nextStep"
          @prevStep="prevStep"
          :currentStep="currentStep"
        >
          <Button @click="handleCancel" custom-class="cancel-btn margin"> إلغاء </Button>
        </StepFour>
        <StepFive
          v-if="currentStep === 4"
          :stepForm="[...stepOneForm]"
          :learningPathCount="stepOneForm[6]?.value?.length"
          @nextStep="nextStep"
          @prevStep="prevStep"
          :currentStep="currentStep"
        >
          <Button @click="handleCancel" custom-class="cancel-btn margin"> إلغاء </Button>
        </StepFive>
      </div>
    </div>
  </div>
</template>

<script>
import Stepper from "@/components/Shared/Stepper/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import StepOne from "@/components/Modules/Users/AddEditSeasonalMission/StepOne/index.vue";
import StepTwo from "@/components/Modules/Users/AddEditSeasonalMission/StepTwo/index.vue";
import StepThree from "@/components/Modules/Users/AddEditSeasonalMission/StepThree/index.vue";
import StepFour from "@/components/Modules/Users/AddEditSeasonalMission/StepFour/index.vue";
import StepFive from "@/components/Modules/Users/AddEditSeasonalMission/StepFive/index.vue";

export default {
  components: {
    Stepper,
    Button,
    StepOne,
    StepTwo,
    StepThree,
    StepFour,
    StepFive,
  },
  data() {
    return {
      loading: false,
      showModal: false,
      currentStep: 0,
      steps: [
        {
          icon: "1",
          title: "البيانات الاساسية",
        },
        {
          icon: "2",
          title: "محتوى المهمة",
        },
        {
          icon: "3",
          title: "الجوائز",
        },
        {
          icon: "4",
          title: "الإشعارات",
        },
        {
          icon: "5",
          title: "معاينة المهمة",
        },
      ],
      stepOneForm: [
        {
          key: "name",
          label: "اسم المهمة",
          col: "8",
          listen: "id",
          value: "",
          type: "text",
          rules: "required|min:3|max:100",
        },
        {
          key: "countries",
          col: "4",
          listen: "id",
          type: "select",
          optionValue: "name",
          label: this.$t("SCHOOL.COUNTRY"),
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "required",
          multiple: true,
        },
        {
          key: "seasonal_mission_group_id",
          col: "6",
          listen: "id",
          type: "select",
          optionValue: "name",
          label: "اسم المجموعة الموسمية",
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "required",
        },
        {
          key: "start_date",
          label: "تاريخ بدء المهمة",
          col: "3",
          listen: "id",
          value: "",
          type: "date",
          rules: "required",
          placeholder: "أختر تاريخ بدء المهمة",
        },
        {
          key: "end_date",
          label: "تاريخ نهاية المهمة",
          col: "3",
          listen: "id",
          value: "",
          type: "date",
          rules: "required",
          placeholder: "أختر تاريخ نهاية المهمة",
        },
        {
          key: "level_id",
          col: "6",
          listen: "id",
          type: "select",
          optionValue: "name",
          label: "الصف الدراسي",
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "required",
        },
        {
          key: "learningpaths",
          col: "6",
          listen: "id",
          type: "select",
          optionValue: "name",
          label: "المسار التعليمي",
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "required",
          multiple: true,
        },
        {
          key: "lessons",
          col: "6",
          listen: "id",
          type: "select",
          optionValue: "name",
          label: "الدرس",
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "required",
          multiple: true,
        },
        {
          key: "religions",
          col: "3",
          listen: "id",
          type: "select",
          optionValue: "name",
          label: "الديانة",
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "required",
          multiple: true,
        },
        {
          key: "types",
          col: "3",
          listen: "id",
          type: "select",
          optionValue: "name",
          label: "النوع",
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "required",
          multiple: true,
        },
        {
          key: "image",
          col: "12",
          type: "image",
          label: "لوجو المهمة",
          value: "",
          rules: "required",
          multiple: false,
        },
      ],
      stepTwoForm: [
        {
          label: "اسم المسار الأول",
          type: "title",
          col: "12",
        },
        {
          key: "video_id",
          col: "6",
          listen: "id",
          type: "select",
          label: "الفيديوهات",
          optionValue: "title",
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "required",
          multiple: true,
        },
        {
          key: "exams_id",
          col: "6",
          listen: "id",
          type: "select",
          label: "التمارين",
          optionValue: "name",
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "required",
          multiple: true,
        },
      ],
      stepThreeForm: [
        {
          key: "main_percentage",
          label: "من نسبة",
          col: "4",
          listen: "id",
          value: "",
          type: "text",
          rules: "required",
        },
        {
          key: "max_percentage",
          label: "إلى نسبة",
          col: "4",
          listen: "id",
          value: "",
          type: "text",
          rules: "required",
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
        },
      ],
      stepFourForm: [
        {
          key: "name",
          label: "عنوان اللإشعار",
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
    };
  },
  methods: {
    handleCancel() {
      this.$router.push("/dashboard/seasonal-mission");
    },

    nextStep() {
      this.currentStep = this.currentStep + 1;
    },
    prevStep() {
      this.currentStep = this.currentStep - 1;
    },
  },
  async mounted() {},
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
