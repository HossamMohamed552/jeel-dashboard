<template>
  <validation-observer v-slot="{ invalid }" ref="stepOneForm">
    <GenericForm
      :schema="stepForm"
      @handleInput="handleInput"
      @removeFile="removeFile"
      :loading="loading"
      :submitedForm="false"
      :invalid="invalid"
    >
      <div class="buttons-container">
        <slot></slot>
        <div class="steps">
          <Button :custom-class="'cancel-btn margin'" v-if="currentStep > 0" @click="prevStep">
            السابق
          </Button>
          <Button :custom-class="'submit-btn'" @click="nextStep"> التالي </Button>
        </div>
      </div>
    </GenericForm>
  </validation-observer>
</template>

<script>
import Stepper from "@/components/Shared/Stepper/index.vue";
import GenericForm from "@/components/Shared/GenericForm";

import {
  getALLCountries,
  getAllReligion,
  getAllGender,
  getAllSeasonalMissionGroups,
  getAllLearningPaths,
  getLessonsDepenseLearningPath, 
  getAllLevels,
} from "@/services/dropdownService";
import _ from "lodash";

export default {
  components: {
    Stepper,
    GenericForm,
  },
  props: {
    currentStep: {
      type: Number,
      default: 0,
    },
    stepForm: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    nextStep() {
      this.$emit("nextStep");
    },
    prevStep() {
      this.$emit("prevStep");
    },
    handleCancel() {
      this.$emit("onSubmit", this.stepForm);
    },
    handleInputValueName(key, value, field) {
      if (field.multiple) {
        const selectedOptionNames = value.map((singleValue) => {
          const selectedOption = field.options.find(
            (option) => option[field.listen] === singleValue
          );
          return selectedOption ? selectedOption.name : "";
        });
        field.name = selectedOptionNames;
      } else {
        const selectedOption = field.options.find((option) => option[field.listen] === value);
        const optionName = selectedOption ? selectedOption.name : "";
        field.name = optionName;
      }
    },
    handleInput: _.debounce(function (key, value, field) {
      if (key === "image") {
        const imageObjectIndex = this.stepForm.findIndex((field) => field.key === "image");
        this.stepForm[imageObjectIndex].value = value.uuid;
        this.stepForm[imageObjectIndex].url = value.url;
        this.stepForm[imageObjectIndex].task_audio_name = value.file_name;
        this.stepForm[imageObjectIndex].task_audio_size = value.size / 1000;
        this.stepForm[imageObjectIndex].is_change = true;
      } else if (key === "learningpaths") {
        if (value != "") this.stepForm[7].disabled = false;
        getLessonsDepenseLearningPath(this.stepForm, "lessons", value);
        this.handleInputValueName(key, value, field);
      } else {
        this.handleInputValueName(key, value, field);
      }
    }, 300),
    removeFile(fileName, fileChange, fileRequest) {
      const imageObjectIndex = this.stepForm.findIndex((field) => field.key === "image");
      this.stepForm[imageObjectIndex].value = "";
    },
  },
  async mounted() {
    await getAllSeasonalMissionGroups(this.stepForm, "seasonal_mission_group_id");
    await getAllLearningPaths(this.stepForm, "learningpaths");
    await getALLCountries(this.stepForm, "countries");
    await getAllReligion(this.stepForm, "religions");
    await getAllGender(this.stepForm, "types");
    await getAllLevels(this.stepForm, "level_id");
  },
};
</script>

<style lang="scss" scoped>
@import "../index.scss";
</style>
