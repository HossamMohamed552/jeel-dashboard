<template>
  <validation-observer v-slot="{ invalid }" ref="stepTwoForm">
    <div v-for="index in learningPath?.value?.length" :key="index">
      <GenericForm
        @handleInput="handleInput"
        :schema="computedStepTwoForm[index]"
        :index="index"
        :loading="loading"
        :submitedForm="false"
        :invalid="invalid"
      >
      </GenericForm>
    </div>
    <div class="buttons-container">
      <Button @click="handleCancel" custom-class="cancel-btn margin"> الغاء</Button>
      <div class="steps">
        <Button custom-class="cancel-btn margin" v-if="currentStep > 0" @click="prevStep">
          {{ $t('GLOBAL_BACK') }}
        </Button>
        <Button custom-class="submit-btn" :disabled="invalid" @click="nextStep"> {{ $t('GLOBAL_NEXT') }}</Button>
      </div>
    </div>
  </validation-observer>
</template>

<script>
import Stepper from "@/components/Shared/Stepper/index.vue";
import GenericForm from "@/components/Shared/GenericForm";
import {getQuizLevelPath, getVideoPerLevelPath} from "@/services/dropdownService";
import _ from "lodash";
import {getVideoPerLevelPathRequest} from "@/api/videos";
import {getQuizLevelPathRequest} from "@/api/quiz"; // التمارين

import {mapActions, mapGetters} from "vuex";

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
      default: () => {
      },
    },
  },
  data() {
    return {
      loading: false,
      videoLists: [],
      exerciseLists: [],
      examGenerateIndex: 0,
      videoGenerateIndex: 0,
      testForm: [],
    };
  },
  methods: {
    ...mapActions(["addVideoesInArray", "addExercisesInArray", "addLearningPath"]),
    handleInput: _.debounce(function (key, value, field, options, index) {
      console.log("options", options);
      if (field.multiple) {
        const selectedOptionNames = value.map((singleValue) => {
          const selectedOption = field.options.find((option) => option[field.listen] === singleValue);
          return selectedOption ? selectedOption : "";
        });
        field.name = selectedOptionNames;
      }
      this.learningPath.learningpaths = [];
      if (key === "video_id") {
        const videoObjects = field.name.map((video) => ({...video}));
        let videoesPayload = {
          videos: videoObjects,
          index: index - 1,
        };
        this.addVideoesInArray(videoesPayload);
      } else {
        const exerciseObjects = field.name.map((exercise) => ({...exercise}));
        let exercisesPayload = {
          exercisess: exerciseObjects,
          index: index - 1,
        };
        this.addExercisesInArray(exercisesPayload);
      }
    }, 300),

    getStepTwoForm(index) {
      const duplicatedForm = JSON.parse(JSON.stringify(this.stepForm));
      duplicatedForm.forEach((formElement) => {
        if (this.$route.params.id) {
          let i;
          if (formElement.key === "video_id" && this.videoGenerateIndex <= 9) {
            this.videoGenerateIndex = this.videoGenerateIndex + 1;

            if (index == 1) i = 0;
            else if (index == 2) i = 1;
            else if (index == 3) i = 2;
            let videoesPayload = {
              videos: this.learningPath.value[i].videos,
              index: i,
            };
            this.addVideoesInArray(videoesPayload);
            formElement.value = this.learningPath.value[i].videos;
          } else if (formElement.key === "exams_id") {
            this.examGenerateIndex = this.examGenerateIndex + 1;

            if (index == 1) i = 0;
            else if (index == 2) i = 1;
            else if (index == 3) i = 2;

            let exercisesPayload = {
              exercisess: this.learningPath.value[i].quizzes,
              index: i,
            };
            this.addExercisesInArray(exercisesPayload);
            formElement.value = this.learningPath.value[i].quizzes;
          }
        }

        if (formElement.key === "title") {
          formElement.label = this.learningPath?.value[index - 1].name;
        } else if (formElement.key === "exams_id") {
          this.ApiService(getQuizLevelPathRequest(this.learningPath?.value[index - 1].id)).then(
            (response) => {
              formElement.options = response.data.data;
            }
          );
        } else if (formElement.key === "video_id") {
          this.ApiService(getVideoPerLevelPathRequest(this.learningPath?.value[index - 1].id)).then(
            (response) => {
              formElement.options = response.data.data;
            }
          );
        }
      });
      return duplicatedForm;
    },

    async nextStep() {
      if (this.$route.params.id) await this.handleEditLearningPaths();
      else await this.handleLearningPaths();
      this.addLearningPath(this.learningPath.learningpaths);
      this.$emit("nextStep");
    },

    processArray(arr) {
      // Check if the array is not empty
      if (arr.length > 0) {
        // Get the type of the first element
        const firstElementType = typeof arr[0];
        // Check if the first element is an object
        if (firstElementType === "object") {
          // Array of objects
          return false;
        } else if (firstElementType === "string") {
          // Array of strings
          return true;
        } else {
          return false;
        }
      } else {
        // Handle empty array if needed
        return false;
      }
    },

    async handleLearningPaths() {
      this.learningPath.value.map((id, index) => {
        this.learningPath.learningpaths[index] = {
          id: id.id,
          videos: this.getVideosList[index],
          quizzes: this.getExercisesList[index],
        };
      });
    },
    async handleEditLearningPaths() {
      this.learningPath.value.map((id, index) => {
        this.learningPath.learningpaths[index] = {
          id: id.id,
          videos: this.getVideosList[index],
          quizzes: this.getExercisesList[index],
        };
      });
    },

    prevStep() {
      this.$emit("prevStep");
    },
    handleCancel() {
      this.$emit("onSubmit", this.stepForm);
    },
  },
  computed: {
    ...mapGetters(["getVideosList", "getExercisesList"]),
    learningPathLength() {
      return this.learningPath?.value?.length || 0;
    },
    computedStepTwoForm() {
      const computedForms = [];
      for (let index = 1; index <= this.learningPathLength; index++) {
        computedForms[index] = this.getStepTwoForm(index);
      }
      this.testForm = computedForms.flat();
      return computedForms;
    },
  },
  async mounted() {
  },
};
</script>

<style lang="scss" scoped>
@import "../index.scss";
</style>
