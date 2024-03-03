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

import { mapActions, mapGetters } from "vuex";

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
    ...mapActions(["addVideoesInArray", "addExercisesInArray", "addLearningPath"]),
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
      this.learningPath.learningpaths = [];
      if (key === "video_id") {
        const videoObjects = field.name.map((video) => ({ ...video }));
        let videoesPayload = {
          videos: videoObjects,
          index: index - 1,
        };
        this.addVideoesInArray(videoesPayload);
      } else {
        const exerciseObjects = field.name.map((exercise) => ({ ...exercise }));
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
        if (formElement.type === "title") {
          if (index == 1) formElement.label = "اسم المسار الأول";
          else if (index == 2) formElement.label = "اسم المسار الثاني";
          else if (index == 3) formElement.label = "اسم المسار الثالث";
          else formElement.label = "اسم المسار الأخير";
        }

        if (this.$route.params.id) {
          let i;
          if (formElement.key === "video_id") {
            if (index == 1) i = 0;
            else if (index == 2) i = 1;
            else if (index == 3) i = 2;
            else i = 3;
            let videoesPayload = {
              videos: this.learningPath.value[i].videos,
              index: i,
            };
            this.addVideoesInArray(videoesPayload);
            formElement.value = this.learningPath.value[i].videos;
          } else if (formElement.key === "exams_id") {
            if (index == 1) i = 0;
            else if (index == 2) i = 1;
            else if (index == 3) i = 2;
            else i = 3;
            let exercisesPayload = {
              exercisess: this.learningPath.value[i].quizzes,
              index: i,
            };
            this.addExercisesInArray(exercisesPayload);
            formElement.value = this.learningPath.value[i].quizzes;
          }
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
          id,
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
  },
  async mounted() {
    getQuizLevelPath(this.stepForm, "exams_id");
    getVideoPerLevelPath(this.stepForm, "video_id");
  },
};
</script>

<style lang="scss" scoped>
@import "../index.scss";
</style>
