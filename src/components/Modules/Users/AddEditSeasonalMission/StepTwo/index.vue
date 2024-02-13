<template>
  <validation-observer v-slot="{ invalid }" ref="stepTwoForm">
    <div v-for="index in learningPath?.value?.length" :key="index">
      <GenericForm
        @handleInput="handleInput"
        :schema="getStepTwoForm(index)"
        :index="index"
        :loading="loading"
        :submitedForm="false"
        :invalid="invalid"
      >
      </GenericForm>
    </div>
    <div class="buttons-container">
      <Button @click="handleCancel" custom-class="cancel-btn margin"> الغاء </Button>
      <div class="steps">
        <Button custom-class="cancel-btn margin" v-if="currentStep > 0" @click="prevStep">
          السابق
        </Button>
        <Button custom-class="submit-btn" :disabled="invalid" @click="nextStep"> التالي </Button>
      </div>
    </div>
  </validation-observer>
</template>

<script>
import Stepper from "@/components/Shared/Stepper/index.vue";
import GenericForm from "@/components/Shared/GenericForm";
import { getQuizLevelPath, getVideoPerLevelPath } from "@/services/dropdownService";
import _ from "lodash";

import { mapActions } from "vuex";

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
    learningPath: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      loading: false,
      videoLists: [],
      exerciseLists: [],
    };
  },
  methods: {
    ...mapActions(["addVideo", "addExercises"]),
    handleInput: _.debounce(function (key, value, field, index) {
      if (field.multiple) {
        const selectedOptionNames = value.map((singleValue) => {
          const selectedOption = field.options.find(
            (option) => option[field.listen] === singleValue
          );
          return selectedOption ? selectedOption : "";
        });
        field.name = selectedOptionNames;
      }
      if (key === "video_id") {
        if (!this.videoLists[index - 1]) {
          this.$set(this.videoLists, index - 1, []);
        } else {
          this.videoLists[index - 1] = [];
        }
        const videoObjects = field.name.map((video) => ({ ...video }));
        this.learningPath.learningpaths[index - 1].videos = videoObjects;
        this.videoLists[index - 1] = this.videoLists[index - 1].concat(videoObjects);
      } else {
        if (!this.exerciseLists[index - 1]) {
          this.$set(this.exerciseLists, index - 1, []);
        } else {
          this.exerciseLists[index - 1] = [];
        }
        const exerciseObjects = field.name.map((exercise) => ({ ...exercise }));
        this.learningPath.learningpaths[index - 1].quizzes = exerciseObjects;
        this.exerciseLists[index - 1] = this.exerciseLists[index - 1].concat(exerciseObjects);
      }
    }, 300),
    getStepTwoForm(index) {
      const duplicatedForm = JSON.parse(JSON.stringify(this.stepForm));
      duplicatedForm.forEach((formElement) => {
        if (formElement.type === "title") {
          if (index == 1) formElement.label = "اسم المسار الأول";
          else if (index == 2) formElement.label = "اسم المسار الثاني";
          else if (index == 3) formElement.label = "اسم المسار الثالث";
          else formElement.label = "اسم المسار الأخير";
        }
      });
      return duplicatedForm;
    },
    nextStep() {
      this.addVideo(this.videoLists);
      this.addExercises(this.exerciseLists);
      this.$emit("nextStep");
    },
    prevStep() {
      this.$emit("prevStep");
    },
    handleCancel() {
      this.$emit("onSubmit", this.stepForm);
    },
  },
  async mounted() {
    getQuizLevelPath(this.stepForm, "exams_id");
    getVideoPerLevelPath(this.stepForm, "video_id");
  },
  computed: {
    pathNum() {},
  },
};
</script>

<style lang="scss" scoped>
@import "../index.scss";
</style>
