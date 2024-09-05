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
            {{ $t('GLOBAL_BACK') }}
          </Button>
          <Button
            :custom-class="'submit-btn'"
            :disabled="isAddForm ? (invalid || imageUploaded) : invalid"
            @click="nextStep"
          >
            {{ $t('GLOBAL_NEXT') }}
          </Button>
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
  getAllGender,
  getAllLearningPaths,
  getAllLevels,
  getAllReligion,
  getAllSeasonalMissionGroups,
  getLessonsDepenseLearningPath,
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
    isAddForm: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      imageUploaded: true,
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
        if(key === 'learningpaths'){
          field.name = value?.map((singleValue) => {
            return singleValue.name
          });
        } else {
          const selectedOptionNames = value?.map((singleValue) => {
            const selectedOption = field.options.find(
              (option) => option[field.listen] === singleValue
            );
            return selectedOption ? selectedOption.name : "";
          });
          field.name = selectedOptionNames;
        }
      } else {
        const selectedOption = field.options.find((option) => option[field.listen] === value);
        const optionName = selectedOption ? selectedOption.name : "";
        field.name = optionName;
      }
    },
    handleInput: _.debounce(function (key, value, field) {
      if (key === "start_date") this.validateForm(value);
      if (key === "image") {
        this.imageUploaded = false;
        const imageObjectIndex = this.stepForm.findIndex((field) => field.key === "image");
        this.stepForm[imageObjectIndex].value = value.uuid;
        this.stepForm[imageObjectIndex].url = value.url;
        this.stepForm[imageObjectIndex].task_audio_name = value.file_name;
        this.stepForm[imageObjectIndex].task_audio_size = value.size / 1000;
        this.stepForm[imageObjectIndex].is_change = true;
      } else if (key === "learningpaths") {
        if (value != "") this.stepForm[7].disabled = false;
        const idsArray = value.map((obj) => obj.id);
        getLessonsDepenseLearningPath(this.stepForm, "lessons", idsArray);
        this.handleInputValueName(key, value, field);
      } else {
        this.handleInputValueName(key, value, field);
      }
    }, 300),
    validateForm(val) {
      const endDateRule = this.stepForm.find((rule) => rule.key === "end_date");
      if (endDateRule) {
        endDateRule.rules = `required|afterDate:${val}`;
      }
    },
    removeFile(fileName, fileChange, fileRequest) {
      console.log("File removed in parent component:", fileName, fileChange, fileRequest);
      this.imageUploaded = true;
      const imageObjectIndex = this.stepForm.findIndex((field) => field.key === "image");

      this.stepForm[imageObjectIndex].url = null;
      this.stepForm[imageObjectIndex].value = null;
      this.stepForm[imageObjectIndex].task_audio_name = null;
      this.stepForm[imageObjectIndex].task_audio_size = null;
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
