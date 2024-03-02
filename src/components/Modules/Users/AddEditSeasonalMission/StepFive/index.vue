<template>
  <section>
    <div class="container-fluid">
      <b-row>
        <b-col v-for="field in stepForm" :key="field.key" :lg="field.col">
          <PreviewMedia
            v-if="filesUploadedTypes.includes(field.type)"
            :header="field.label"
            :media-name="field.task_audio_name"
            :file-size="field.task_audio_size"
            :showRemoveButton="false"
            :typeOfMedia="'image'"
            :image-url="field.url"
          />
          <ShowItem
            v-else-if="field.type === 'select'"
            class="divider-show"
            :title="field?.label"
            :subtitle="Array.isArray(field?.name) ? field?.name.join(', ') : field?.name"
          />
          <ShowItem v-else class="divider-show" :title="field?.label" :subtitle="field?.value" />
        </b-col>
        <b-col :lg="12">
          <ListItems
            class="seasonal-mission-custom-list-item"
            :tableItems="notificationsList"
            :headerName="'قائمة الإشعار'"
            :fieldsList="NotifacationFieldsList"
            :showSortControls="false"
          >
          </ListItems>
        </b-col>
        <b-col :lg="12" v-for="index in learningPathCount" :key="index">
          <learningPathCollapse
            :index="index"
            :videosList="videosList[index - 1]"
            :videosFieldsList="videosFieldsList"
            :exercisesList="exercisesList[index - 1]"
            :exercisesFieldsList="exercisesFieldsList"
          />
        </b-col>
        <b-col :lg="12">
          <ListItems
            class="seasonal-mission-custom-list-item"
            :tableItems="prizesList"
            :headerName="'قائمة الجوائز'"
            :fieldsList="prizeFieldsList"
            :showSortControls="false"
          >
          </ListItems>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="12">
          <div class="buttons-container">
            <slot></slot>
            <div class="steps">
              <Button custom-class="cancel-btn margin" v-if="currentStep > 0" @click="prevStep">
                السابق
              </Button>

              <Button custom-class="submit-btn" @click="submitForm"> إنهاء </Button>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
  </section>
</template>

<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import PreviewMedia from "@/components/Shared/PreviewMedia/PreviewMedia.vue";
import ListItems from "@/components/ListItems/index.vue";
import learningPathCollapse from "./learningPathCollapse.vue";
import { mapGetters } from "vuex";
import {
  postCreateSeasonalMissionRequest,
  putUpdateSeasonalMissionRequest,
} from "@/api/seasonal-mission.js";
import moment from "moment";

export default {
  components: {
    ShowItem,
    PreviewMedia,
    ListItems,
    learningPathCollapse,
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
    learningPathCount: {
      type: Number,
      default: () => 0,
    },
  },
  data() {
    return {
      filesUploadedTypes: ["image", "audio", "video"],
      prizesList: [],
      notificationsList: [],
      videosList: [],
      exercisesList: [],
      videosFieldsList: [
        { key: "id", label: "التسلسل" },
        { key: "title", label: "عنوان الفيديو" },
        { key: "actions", label: "الاجراء" },
      ],
      exercisesFieldsList: [
        { key: "id", label: "التسلسل" },
        { key: "name", label: "عنوان التمرين" },
        { key: "actions", label: "الاجراء" },
      ],
      prizeFieldsList: [
        { key: "id", label: "التسلسل" },
        { key: "main_percentage", label: "من نسبة" },
        { key: "max_percentage", label: "إلى نسبة" },
        { key: "prizeable_type_name", label: "نوع الجائزة" },
        { key: "prizeable_id_name", label: "الجائزة" },
      ],
      NotifacationFieldsList: [
        { key: "id", label: "التسلسل" },
        { key: "name", label: "عنوان اللإشعار" },
        { key: "start_date", label: "تاريخ ووقت الإشعار" },
        { key: "original_url", label: "صوت الإشعار" },
        { key: "description", label: "نص الإشعار" },
      ],
      submittedForm: {
        learningpaths: {
          videos: [],
          quizzes: [],
        },
      },
      loading: false,
    };
  },
  methods: {
    async submitForm() {
      await this.updateFields();
      if (this.$route.params.id) this.handleEditSeasonalMission();
      else this.handleAddSeasonalMission();
    },
    handleAddSeasonalMission() {
      this.ApiService(postCreateSeasonalMissionRequest(this.submittedForm)).then(() => {
        this.$router.push("/dashboard/seasonal-mission");
      });
    },
    async handleEditSeasonalMission() {
      await this.handleDateToUpdate();
      console.log(this.submittedForm);
      this.submittedForm["_method"] = "PUT";
      this.ApiService(
        putUpdateSeasonalMissionRequest(this.submittedForm, this.$route.params.id)
      ).then(() => {
        this.$router.push("/dashboard/seasonal-mission");
      });
    },
    prevStep() {
      this.$emit("prevStep");
    },
    async updateFields() {
      this.stepForm.forEach((field) => {
        try {
          if (field.type === "date")
            this.$set(
              this.submittedForm,
              field.key,
              moment(field.value, "DD-MM-YYYY").format("YYYY-MM-DD")
            );
          else if (field.key != "learningpaths")
            this.$set(this.submittedForm, field.key, field.value);
        } catch (error) {
          console.error(`Error updating field ${field.key}:`, error);
        }
      });
      this.submittedForm["prizes"] = this.prizesList;
      this.submittedForm["notifications"] = this.notificationsList;
      this.submittedForm["learningpaths"] = this.getLearningPaths;
    },

    handleArray(key) {
      this.submittedForm[key] = this.submittedForm[key].map((item) => item.id);
    },
    handleObject(key) {
      this.submittedForm[key] = this.submittedForm[key].id;
    },
    processArray(arr) {
      // Check if the array is not empty
      if (arr.length > 0) {
        // Get the type of the first element
        const firstElementType = typeof arr[0];
        // Check if the first element is an object
        if (firstElementType === "object") {
          // Array of objects
          return true;
        } else if (firstElementType === "string") {
          // Array of strings
          return false;
        } else {
          return false;
        }
      } else {
        // Handle empty array if needed
        console.log("Empty array");
      }
    },

    async handleDateToUpdate() {
      if (this.processArray(this.submittedForm["countries"])) this.handleArray("countries");
      if (this.processArray(this.submittedForm["lessons"])) this.handleArray("lessons");
      if (this.processArray(this.submittedForm["religions"])) this.handleArray("religions");
      if (this.processArray(this.submittedForm["types"])) this.handleArray("types");
      this.handleObject("seasonal_mission_group_id");
      this.handleObject("level_id");
    },
  },
  async mounted() {},
  computed: {
    ...mapGetters([
      "getPrizesList",
      "getNotificationsList",
      "getVideosList",
      "getExercisesList",
      "getLearningPaths",
    ]),

    showValue(values) {
      if (typeof values == Array) {
        return "array";
      }
      return values;
    },
  },
  mounted() {
    this.videosList = this.getVideosList;
    this.exercisesList = this.getExercisesList;
    this.prizesList = this.getPrizesList;
    this.notificationsList = this.getNotificationsList;
  },
  watch: {
    getPrizesList() {
      this.prizesList = this.getPrizesList;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../index.scss";

.adding {
  display: flex;
  align-items: end;
  justify-content: flex-end;
}
</style>
