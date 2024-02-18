<template>
  <div class="container-fluid custom-container">
    <div class="add-edit-learning-skill">
      <div class="add-edit-term-form">
        <h3>تفاصيل المهمة الموسمية</h3>
        <div class="container-fluid">
          <b-row>
            <b-col lg="8">
              <ShowItem class="divider-show" title="اسم المهمة" :subtitle="seasonalMissing?.name" />
            </b-col>
            <b-col lg="4">
              <ShowItem
                class="divider-show"
                title="الدولة"
                :subtitle="seasonalMissing?.countries?.map((row) => row.name).join(', ')"
              />
            </b-col>
            <b-col lg="4">
              <ShowItem
                class="divider-show"
                title="اسم المجموعة الموسمية"
                :subtitle="seasonalMissing?.sesonalMissionGroup?.name"
              />
            </b-col>
            <b-col lg="4">
              <ShowItem
                class="divider-show"
                title="تاريخ بدء المهمة"
                :subtitle="seasonalMissing?.start_date"
              />
            </b-col>
            <b-col lg="4">
              <ShowItem
                class="divider-show"
                title="تاريخ نهاية المهمة"
                :subtitle="seasonalMissing?.end_date"
              />
            </b-col>
            <b-col lg="6">
              <ShowItem
                class="divider-show"
                title="الصف الدراسي"
                :subtitle="seasonalMissing?.level?.name"
              />
            </b-col>
            <b-col lg="6">
              <ShowItem
                class="divider-show"
                title="المسار التعليمي"
                :subtitle="seasonalMissing?.learningpaths?.map((row) => row.name).join(', ')"
              />
            </b-col>
            <b-col lg="6">
              <ShowItem
                class="divider-show"
                title="الدرس"
                :subtitle="seasonalMissing?.lessons?.map((row) => row.name).join(', ')"
              />
            </b-col>
            <b-col lg="3">
              <ShowItem
                class="divider-show"
                title="الديانة"
                :subtitle="seasonalMissing?.religions?.map((row) => row.name).join(', ')"
              />
            </b-col>
            <b-col lg="3">
              <ShowItem
                class="divider-show"
                title="النوع"
                :subtitle="seasonalMissing?.types?.map((row) => row.name).join(', ')"
              />
            </b-col>
            <b-col lg="12">
              <PreviewMedia
                header="لوجو المهمة"
                :media-name="seasonalMissing.image_name"
                :file-size="seasonalMissing.image_size"
                :showRemoveButton="false"
                :typeOfMedia="'image'"
                :image-url="seasonalMissing.image"
              />
            </b-col>
            <b-col :lg="12" class="mt-5">
              <ListItems
                class="seasonal-mission-custom-list-item"
                :tableItems="seasonalMissing.notifications"
                :headerName="'قائمة الإشعار'"
                :fieldsList="NotifacationFieldsList"
                :showSortControls="false"
              >
              </ListItems>
            </b-col>
            <b-col :lg="12" v-for="index in seasonalMissing?.learningpaths?.length" :key="index">
              <learningPathCollapse
                :index="index"
                :videosList="seasonalMissing?.learningpaths[index - 1].videos"
                :exercisesList="seasonalMissing?.learningpaths[index - 1].quizzes"
                :videosFieldsList="videosFieldsList"
                :exercisesFieldsList="exercisesFieldsList"
              />
            </b-col>
            <b-col :lg="12">
              <ListItems
                class="seasonal-mission-custom-list-item"
                :tableItems="seasonalMissing.prizes"
                :headerName="'قائمة الجوائز'"
                :fieldsList="prizeFieldsList"
                :showSortControls="false"
              >
              </ListItems>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSeasonalMissionByIdRequest } from "@/api/seasonal-mission";
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import PreviewMedia from "@/components/Shared/PreviewMedia/PreviewMedia.vue";
import ListItems from "@/components/ListItems/index.vue";
import learningPathCollapse from "@/components/Modules/Users/AddEditSeasonalMission/StepFive/learningPathCollapse.vue";

export default {
  name: "index",
  components: {
    ShowItem,
    PreviewMedia,
    ListItems,
    learningPathCollapse,
  },
  data() {
    return {
      loading: false,
      seasonalMissing: {},
      NotifacationFieldsList: [
        { key: "id", label: "التسلسل" },
        { key: "name", label: "عنوان اللإشعار" },
        { key: "start_date", label: "تاريخ ووقت الإشعار" },
        { key: "audio", label: "صوت الإشعار" },
        { key: "description", label: "نص الإشعار" },
      ],
      prizeFieldsList: [
        { key: "id", label: "التسلسل" },
        { key: "main_percentage", label: "من نسبة" },
        { key: "max_percentage", label: "إلى نسبة" },
        { key: "type.name", label: "نوع الجائزة" },
      ],
      videosFieldsList: [
        { key: "id", label: "التسلسل" },
        { key: "title", label: "عنوان الفيديو" },
      ],
      exercisesFieldsList: [
        { key: "id", label: "التسلسل" },
        { key: "name", label: "عنوان التمرين" },
      ],
    };
  },
  created() {},
  mounted() {
    this.ApiService(getSeasonalMissionByIdRequest(this.$route.params.id)).then((response) => {
      this.seasonalMissing = response.data.data;
    });
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
