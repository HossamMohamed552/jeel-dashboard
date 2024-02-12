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
          <Button custom-class="cancel-btn margin" v-if="currentStep > 0" @click="prevStep">
            السابق
          </Button>
          <Button :disabled="invalid" custom-class="submit-btn" @click="nextStep"> التالي </Button>
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
  getAllLessons,
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
    handleInput: _.debounce(function (key, value, field) {
      if (key === "image") {
        const imageObjectIndex = this.stepForm.findIndex((field) => field.key === "image");
        this.stepForm[imageObjectIndex].value = value.uuid;
        this.stepForm[imageObjectIndex].url = value.url;
      } else {
        if (field.multiple) {
          field["learningpaths"] = [];
          // If multiple, value is an array
          const selectedOptionNames = value.map((singleValue) => {
            if (key === "learningpaths") {
              field["learningpaths"].push({
                id: singleValue,
              });
            }
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
      }
    }, 300),
    removeFile(fileName, fileChange, fileRequest) {
      const imageObjectIndex = this.stepForm.findIndex((field) => field.key === "image");
      this.stepForm[imageObjectIndex].value = "";
    },
  },
  async mounted() {
    getAllSeasonalMissionGroups(this.stepForm, "seasonal_mission_group_id");
    getAllLearningPaths(this.stepForm, "learningpaths");
    getAllLessons(this.stepForm, "lessons");
    getALLCountries(this.stepForm, "countries");
    getAllReligion(this.stepForm, "religions");
    getAllGender(this.stepForm, "types");
    getAllLevels(this.stepForm, "level_id");
  },
};
</script>

<style lang="scss" scoped>
@import "../index.scss";
</style>
