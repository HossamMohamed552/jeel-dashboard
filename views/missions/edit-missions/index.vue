<template>
  <div class="add-mission">
    <Modal :content-message="'تمت التعديل بنجاح'" :showModal="showModal" :is-success="true"/>
    <Stepper
      v-show="currentStep === 0 || currentStep === 1 || currentStep === 2"
      class="mt-5 mb-3"
      :steps="steps"
      :current-step="currentStep"
    />
    <AddEditMissionDataForm
      v-if="currentStep === 0"
      :levels="levels"
      :learning-paths="learningPaths"
      :terms="terms"
      :countries="countries"
      @onSubmit="goToFillContent"
      @handleCancel="handleCancel"
    />
    <AddEditContent
      v-if="currentStep === 1"
      :learningPathSelected="learningPathSelected"
      :level="level"
      @handleCancel="handleCancel"
      @handleBack="goToMissionDataForm"
      @goToFinalStep="goToFinalStep"/>
    <div class="container-fluid custom-container" v-if="currentStep === 2">
      <div class="mission-review ">
        <b-row>
          <b-col lg="4">
            <h6>السنة الدراسية</h6>
            <p>{{ levels.find((item) => item.id === collectData.level_id).name }}</p>
          </b-col>
          <b-col lg="4">
            <h6>إسم المرحلة</h6>
            <p>{{ collectData.name }}</p>
          </b-col>
          <b-col lg="4">
            <h6>الدولة</h6>
            <p>{{ countries.find((item) => item.id === collectData.country_id).name }}</p>
          </b-col>
          <b-col lg="4">
            <h6>الصف الدراسى</h6>
            <p>{{ terms.find((item) => item.id === collectData.term_id).name }}</p>
          </b-col>
          <b-col lg="4">
            <h6>الوصف</h6>
            <p>{{ collectData.description }}</p>
          </b-col>
          <b-col lg="4">
            <h6>المدة الزمنية</h6>
            <p>{{ collectData.duration }}</p>
          </b-col>
          <b-col lg="12">
            <div>
              <p>المحتوى</p>
              <div v-for="path in collectData.paths" :key="path.id">
                <b-row>
                  <b-col lg="12">
                    <h6>المسار</h6>
                    <p>{{ path.name }}</p>
                  </b-col>
                  <b-col lg="4">
                    <div>
                      <h6>الفيديوهات</h6>
                      <span v-for="(video,index) in Array.from(path.videos).filter((item)=> path.videoIds.includes(item.id))" :key="`${video.id} ${index}`">{{video.title}}</span>
                    </div>
                  </b-col>
                  <b-col lg="4">
                    <div>
                      <h6>اوراق العمل</h6>
                      <span v-for="(paperWork,index) in Array.from(path.paperWorks).filter((item)=> path.paperWorkIds.includes(item.id))" :key="`${paperWork.id} ${index}`">{{paperWork.name}}</span>
                    </div>
                  </b-col>
                  <b-col lg="4">
                    <div>
                      <h6>التمارين</h6>
                      <span v-for="(quiz,index) in Array.from(path.quizzes).filter((item)=> path.quizzesIds.includes(item.id))" :key="`${quiz.id} ${index}`">{{quiz.name}}</span>
                    </div>
                  </b-col>
                </b-row>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <div class="action-holder">
            <div>
              <Button :loading="loading" custom-class="submit-btn" @click="createMission">
                {{ $t("GLOBAL_SAVE") }}
              </Button>
              <Button class="mx-3" @click="backToFillContent" custom-class="submit-btn back-btn">
                {{ $t("GLOBAL_BACK") }}
              </Button>
            </div>
            <Button @click="handleCancel" custom-class="cancel-btn margin">
              {{ $t("GLOBAL_CANCEL") }}
            </Button>
          </div>
        </b-row>
      </div>
    </div>
  </div>
</template>
<script>
import AddEditMissionDataForm from "@/components/Modules/Missions/AddEditMissionDataForm/index.vue";
import AddEditContent from "@/components/Modules/Missions/AddEditContent/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import Stepper from "@/components/Shared/Stepper/index.vue";
import axios from "axios";
import VueCookies from "vue-cookies";
import globalAssetData from "@/mixins/getData/globalAssetData";
import tr from "vue2-datepicker/locale/es/tr";

export default {
  mixins: [globalAssetData],
  components: {
    Modal,
    Button,
    Stepper,
    AddEditMissionDataForm,
    AddEditContent
  },
  data() {
    return {
      loading: false,
      showModal: false,
      learningPaths: [],
      languageSkills: [],
      levels: [],
      level: null,
      collectData: {},
      steps: [
        {
          icon: "1",
          title: this.$t("MISSIONS.STEP_ONE"),
        },
        {
          icon: "2",
          title: this.$t("MISSIONS.STEP_TWO"),
        },
        {
          icon: "3",
          title: this.$t("MISSIONS.STEP_THREE"),
        },
      ],
      currentStep: 0,
      learningPathSelected: []
    };
  },
  methods: {
    handleCancel() {
      this.$router.push("/dashboard/missions");
    },
    goToFillContent(data) {
      this.handleAssignObject(data)
      this.handleNavigation(1)
      let learningPath = this.collectData.learning_path_ids
      this.learningPathSelected = this.learningPaths.filter((item) => learningPath.includes(item.id))
      this.level = this.collectData.level_id
    },
    goToMissionDataForm() {
      this.handleNavigation(0)
    },
    backToFillContent() {
      this.handleNavigation(1)
    },
    goToFinalStep(data) {
      Object.assign(this.collectData, {paths: [...data]})
      this.handleSaveCollectedData(data)
      this.handleNavigation(2)
    },
    createMission() {
      const formData = new FormData()
      formData.append('name', this.collectData.name);
      formData.append('country_id', this.collectData.country_id);
      formData.append('level_id', this.collectData.level_id);
      formData.append('data_range', this.collectData.duration);
      formData.append('description', this.collectData.description);
      formData.append('term_id', this.collectData.term_id);
      formData.append('_method', 'PUT');
      // for to get learnPaths
      for (let learnPath = 0; learnPath < this.collectData.paths.length;) {
        formData.append(`learningpaths[${learnPath}][id]`, this.collectData.paths[learnPath].id);
        for (let video = 0; video < this.collectData.paths[learnPath].videoIds.length;) {
          formData.append(`learningpaths[${learnPath}][videos][${video}][id]`, this.collectData.paths[learnPath].videoIds[video]);
          formData.append(`learningpaths[${learnPath}][videos][${video}][order]`, video + 1);
          formData.append(`learningpaths[${learnPath}][videos][${video}][is_selected]`, 1);
          video++
        }
        for (let paperWork = 0; paperWork < this.collectData.paths[learnPath].paperWorkIds.length;) {
          formData.append(`learningpaths[${learnPath}][papersworks][${paperWork}][id]`, this.collectData.paths[learnPath].paperWorkIds[paperWork]);
          formData.append(`learningpaths[${learnPath}][papersworks][${paperWork}][order]`, paperWork + 1);
          formData.append(`learningpaths[${learnPath}][papersworks][${paperWork}][is_selected]`, 1);
          paperWork++
        }
        for (let quiz = 0; quiz < this.collectData.paths[learnPath].quizzesIds.length;) {
          formData.append(`learningpaths[${learnPath}][quizzes][${quiz}][id]`, this.collectData.paths[learnPath].quizzesIds[quiz]);
          formData.append(`learningpaths[${learnPath}][quizzes][${quiz}][order]`, quiz + 1);
          formData.append(`learningpaths[${learnPath}][quizzes][${quiz}][is_selected]`, 1);
          quiz++
        }
        learnPath++
      }
      this.loading = true
      this.showModal = true
      axios
        .post(`/missions/${this.$route.params.id}`, formData, {
          headers: {
            Authorization: `Bearer ${VueCookies.get("token")}`,
            locale: "ar",
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.loading = false
          setTimeout(() => {
            this.showModal = false
          }, 3000)
          this.$router.push("/dashboard/missions");
        });
    },
    handleAssignObject(data) {
      Object.assign(this.collectData, {...data})
      this.handleSaveCollectedData(data)
    },
    handleSaveCollectedData(data) {
      sessionStorage.setItem("collectData", data)
    },
    handleNavigation(nextStep) {
      this.currentStep = nextStep;
    }
  }
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
