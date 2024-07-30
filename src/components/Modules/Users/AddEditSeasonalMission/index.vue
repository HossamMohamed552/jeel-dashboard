<template>
  <div class="container-fluid custom-container">
    <div class="add-edit-learning-skill">
      <div class="add-edit-term-form">
        <h3>{{ $route.params.id ? $t('seasonalMission.edit') : $t('seasonalMission.add') }}</h3>
        <Stepper v-show="true" class="mt-5 mb-3" :steps="steps" :current-step="currentStep" />
        <StepOne
          v-if="currentStep === 0"
          :stepForm="stepOneForm"
          @nextStep="nextStep"
          @prevStep="prevStep"
          :currentStep="currentStep"
          :isAddForm="isAddForm"
        >
          <Button @click="handleCancel" custom-class="cancel-btn margin"> {{ $t('GLOBAL_CANCEL') }} </Button>
        </StepOne>
        <StepTwo
          v-show="currentStep === 1"
          :stepForm="stepTwoForm"
          :learningPath="stepOneForm[6]"
          @nextStep="nextStep"
          @prevStep="prevStep"
          :currentStep="currentStep"
        >
          <Button @click="handleCancel" custom-class="cancel-btn margin"> {{ $t('GLOBAL_CANCEL') }} </Button>
        </StepTwo>
        <StepThree
          v-if="currentStep === 2"
          :stepForm="stepThreeForm"
          @nextStep="nextStep"
          @prevStep="prevStep"
          :currentStep="currentStep"
        >
          <Button @click="handleCancel" custom-class="cancel-btn margin"> {{ $t('GLOBAL_CANCEL') }} </Button>
        </StepThree>
        <StepFour
          v-if="currentStep === 3"
          :stepForm="stepFourForm"
          @nextStep="nextStep"
          @prevStep="prevStep"
          :currentStep="currentStep"
        >
          <Button @click="handleCancel" custom-class="cancel-btn margin"> {{ $t('GLOBAL_CANCEL') }} </Button>
        </StepFour>
        <StepFive
          v-if="currentStep === 4"
          :stepForm="[...stepOneForm]"
          :learningPathCount="stepOneForm[6]?.value?.length"
          @nextStep="nextStep"
          @prevStep="prevStep"
          :currentStep="currentStep"
        >
          <Button @click="handleCancel" custom-class="cancel-btn margin"> {{ $t('GLOBAL_CANCEL') }} </Button>
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

import { getSeasonalMissionByIdRequest } from "@/api/seasonal-mission";
import moment from "moment";
import { mapActions } from "vuex";

export default {
  props: {
    isAddForm: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Stepper,
    Button,
    StepOne,
    StepTwo,
    StepThree,
    StepFour,
    StepFive,
  },
  computed:{
    steps(){
      return [
        {
          icon: "1",
          title: this.$i18n.t('seasonalMission.basicInformation'),
        },
        {
          icon: "2",
          title: this.$i18n.t('seasonalMission.missionContent'),
        },
        {
          icon: "3",
          title: this.$i18n.t('seasonalMission.prizes'),
        },
        {
          icon: "4",
          title: this.$i18n.t('seasonalMission.Notifications'),
        },
        {
          icon: "5",
          title: this.$i18n.t('seasonalMission.PreviewSeasonalMission'),
        },
      ]
    },
  },
  data() {
    return {
      loading: false,
      showModal: false,
      currentStep: 0,
      stepOneForm: [
        {
          key: "name",
          label: "اسم المهمة",
          labelEn: "mission name",
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
          label: 'الدولة',
          labelEn: "country",
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "required",
          multiple: true,
        },
        {
          key: "seasonal_mission_group_id",
          col: "4",
          listen: "id",
          type: "select",
          optionValue: "name",
          label: "اسم المجموعة الموسمية",
          labelEn: "Seasonal group name",
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "required",
        },
        {
          key: "start_date",
          label: "تاريخ بدء المهمة",
          labelEn: "mission start date",
          col: "4",
          listen: "id",
          value: "",
          type: "date",
          rules: "required",
          placeholder: "اختر تاريخ بدء المهمة",
        },
        {
          key: "end_date",
          label: "تاريخ نهاية المهمة",
          labelEn: "mission end date",
          col: "4",
          listen: "id",
          value: "",
          type: "date",
          rules: "required",
          placeholder: "اختر تاريخ نهاية المهمة",
        },
        {
          key: "level_id",
          col: "6",
          listen: "id",
          type: "select",
          optionValue: "name",
          label: "الصف الدراسي",
          labelEn: "level",
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "required",
        },
        {
          key: "learningpaths",
          col: "6",
          type: "select",
          optionValue: "name",
          label: "المسار التعليمي",
          labelEn: "learning path",
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
          labelEn: "lesson",
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "required",
          multiple: true,
          disabled: true,
        },
        {
          key: "religions",
          col: "3",
          listen: "id",
          type: "select",
          optionValue: "name",
          label: "الديانة",
          labelEn: "religion",
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
          labelEn: "type",
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
          labelEn: "Mission logo",
          value: "",
          rules: "required",
          multiple: false,
        },
      ],
      stepTwoForm: [
        {
          label: "The name of the first path",
          labelEn: "Mission logo",
          type: "title",
          key: "title",
          col: "12",
        },
        {
          key: "video_id",
          col: "6",
          listen: "id",
          type: "select",
          label: "الفيديوهات",
          labelEn: "videos",
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
          labelEn: "quiz",
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
          labelEn: "min percentage",
          col: "4",
          listen: "id",
          value: "",
          type: "number",
          rules: "required|numeric|max_value:100|min_value:0",
        },
        {
          key: "max_percentage",
          label: "إلى نسبة",
          labelEn: "max percentage",
          col: "4",
          listen: "id",
          value: "",
          type: "number",
          rules: "required|numeric|max_value:100|min_value:",
        },
        {
          key: "type_id",
          col: "4",
          listen: "id",
          type: "select",
          optionValue: "name",
          label: "نوع الجائزة",
          labelEn: "prize type",
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "required",
        },
        {
          key: "prizeable_type",
          col: "4",
          listen: "id",
          type: "hidden",
          optionValue: "name",
          label: "نوع المحتوى",
          labelEn: "Content type",
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
          type: "hidden",
          optionValue: "name",
          label: "المحتوى",
          labelEn: "content",
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "required",
          disabled: true,
        },
        {
          key: "jeel_coins",
          label: "عملات جيل",
          labelEn: "jeel coins",
          col: "4",
          value: "",
          type: "hidden",
          rules: "required|numeric",
          disabled: true,
        },
      ],
      stepFourForm: [
        {
          key: "name",
          label: "عنوان الإشعار",
          labelEn: "Notice title",
          col: "4",
          listen: "id",
          value: "",
          type: "text",
          rules: "required|min:3|max:100",
        },
        {
          key: "start_date",
          label: "تاريخ ووقت الإشعار",
          labelEn: "Date and time of notification",
          col: "4",
          listen: "id",
          value: "",
          type: "date",
          rules: "required",
        },
        {
          key: "description",
          label: "نص الإشعار",
          labelEn: "Notice text",
          col: "12",
          listen: "id",
          value: "",
          type: "textarea",
          rules: "required|min:3|max:100",
        },
        {
          key: "audio",
          label: "صوت الإشعار",
          labelEn: "Notification sound",
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
    ...mapActions([
      "addPrize",
      "addNotification",
      "addPrizeById",
      "addNotificationById",
      "addVideo",
      "addExercises",
    ]),

    handleCancel() {
      this.$router.push("/dashboard/seasonal-mission");
    },
    nextStep() {
      this.currentStep = this.currentStep + 1;
    },
    prevStep() {
      this.currentStep = this.currentStep - 1;
    },
    updateFieldOptions(array, key, data) {
      const selectOptionsField = array.find((field) => field.key === key);
      if (selectOptionsField) {
        if (Array.isArray(data)) {
          selectOptionsField.value = data;
          selectOptionsField.name = data.map((item) => item.name);
          console.log("name", selectOptionsField.name);
        } else {
          selectOptionsField.value = data;
          console.log("selectOptionsField", selectOptionsField.value);
        }
      }
    },

    emptyStore() {
      this.addPrizeById([]);
      this.addNotificationById([]);
      this.addVideo([]);
      this.addExercises([]);
    },
    handleEditLearningpaths(learningPath) {
      learningPath.map((id, index) => {
        learningPath.learningpaths[index] = {
          id,
          videos: this.getVideosList[index],
          quizzes: this.getExercisesList[index],
        };
      });
    },
    handlePrizesInEdit(prizes) {
      prizes.map((prize) => {
        prize["type_id"] = prize.type?.id;
        prize["type_id_name"] = prize.type?.name;
        this.addPrize(prize);
      });
    },
    handleNotificationInEdit(notifications) {
      notifications.map((notification) => {
        notification["uuid"] = notification.audio_uuid;
        delete notification["uuid"];
        notification.original_url = notification.audio;
        delete notification.audio;
        this.addNotification(notification);
      });
    },
  },
  beforeMount() {
    this.emptyStore();
  },
  async mounted() {
    if (this.$route.params.id) {
      this.ApiService(getSeasonalMissionByIdRequest(this.$route.params.id)).then((response) => {
        let seasonalMission = response.data.data;
        // get key and value
        const mergedAllSteps = [
          ...this.stepOneForm,
          ...this.stepTwoForm,
          ...this.stepThreeForm,
          ...this.stepFourForm,
        ];

        Object.entries(seasonalMission).forEach(([key, value]) => {
          this.updateFieldOptions(mergedAllSteps, key, value);
        });

        mergedAllSteps[2].value = seasonalMission.sesonalMissionGroup;
        mergedAllSteps[2].name = seasonalMission.sesonalMissionGroup.name;
        mergedAllSteps[3].value = moment(seasonalMission.start_date).format("DD-MM-YYYY");
        mergedAllSteps[4].value = moment(seasonalMission.end_date).format("DD-MM-YYYY");
        mergedAllSteps[5].value = seasonalMission.level;
        mergedAllSteps[5].name = seasonalMission.level.name;
        // Image
        mergedAllSteps[10].url = seasonalMission.image;
        mergedAllSteps[10].value = seasonalMission.image_uuid;
        mergedAllSteps[10].task_audio_name = seasonalMission.image_name;
        mergedAllSteps[10].task_audio_size = seasonalMission.image_size;

        this.handlePrizesInEdit(seasonalMission.prizes);
        this.handleNotificationInEdit(seasonalMission.notifications);
        console.log("mergedAllSteps", mergedAllSteps);
      });
    }
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
