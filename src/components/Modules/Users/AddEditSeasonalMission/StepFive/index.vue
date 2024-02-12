<template>
  <section>
    <div class="container-fluid">
      <b-row>
        <b-col v-for="field in stepForm" :key="field.key" :lg="field.col">
          <PreviewMedia
            v-if="filesUploadedTypes.includes(field.type)"
            :header="field.label"
            :media-name="''"
            :file-size="''"
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
import { postCreateSeasonalMissionRequest } from "@/api/seasonal-mission.js";

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
        { key: "audio", label: "صوت الإشعار" },
        { key: "description", label: "نص الإشعار" },
      ],
      submittedForm: {},
      loading: false,
    };
  },
  methods: {
    submitForm() {
      this.updateFields();
      this.ApiService(postCreateSeasonalMissionRequest(this.submittedForm)).then(() => {});
    },
    prevStep() {
      this.$emit("prevStep");
    },
    handleCancel() {
      this.$emit("onSubmit", this.stepForm);
    },

    updateFields() {
      // Generic method to update createSchool object based on the fieldArray
      this.stepForm.forEach((field) => {
        try {
          this.$set(this.submittedForm, field.key, field.value);
        } catch (error) {
          console.error(`Error updating field ${field.key}:`, error);
        }
      });
      this.submittedForm["prizes"] = this.prizesList;
      this.submittedForm["notifications"] = this.notificationsList;
      this.submittedForm["learningpaths"] = this.stepForm[6].learningpaths;
    },
  },
  async mounted() {},
  computed: {
    ...mapGetters(["getPrizesList", "getNotificationsList", "getVideosList", "getExercisesList"]),

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
