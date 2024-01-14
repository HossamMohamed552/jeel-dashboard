<template>
  <div class="add-edit-mission">
    <div class="container-fluid custom-container">
      <div class="add-edit-mission-form">
        <h3>{{ $route.params.id ? $t("MISSIONS.EDIT") : $t("MISSIONS.ADD_NEW") }}</h3>
        <validation-observer v-slot="{ invalid }" ref="addEditMissionDataForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col cols="8" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="mission.name"
                    :label="$t('MISSIONS.name')"
                    :name="$t('MISSIONS.name')"
                    :rules="'required|max:100'"
                  ></TextField>
                </div>
              </b-col>

              <b-col class="mb-3" cols="4">
                <div class="hold-field">
                  <SelectSearch
                    v-model="mission.country_id"
                    :label="$t('MISSIONS.country')"
                    :name="$t('MISSIONS.country')"
                    :options="countries"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                  ></SelectSearch>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="mission.level_id"
                    :label="$t('MISSIONS.level')"
                    :name="$t('MISSIONS.level')"
                    :options="levels"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                  ></SelectSearch>
                </div>
              </b-col>
            
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="mission.learning_path_ids"
                    @input="getLessonsByLearningPathIds($event)"
                    :label="$t('MISSIONS.LEARNING_PATH')"
                    :name="$t('MISSIONS.LEARNING_PATH')"
                    :options="learningPaths"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                    :deselectFromDropdown="true"
                    multiple
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="mission.term_id"
                    :label="$t('MISSIONS.terms')"
                    :name="$t('MISSIONS.terms')"
                    :options="terms"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="8" class="mb-3">
                <!-- depend on learning path  -->
                <div class="hold-field">
                  <SelectSearch
                    v-model="mission.lessons_ids"
                    :label="$t('MISSIONS.lesson')"
                    :name="$t('MISSIONS.lesson')"
                    :options="lessons"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                    :deselectFromDropdown="true"
                    multiple
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="mission.duration"
                    :label="$t('MISSIONS.duration')"
                    :name="$t('MISSIONS.duration')"
                    :rules="'required|numeric|max_value:60'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <TextAreaField
                    v-model="mission.description"
                    :label="$t('MISSIONS.description')"
                    :name="$t('MISSIONS.description')"
                    :rules="'required|max:250'"
                  ></TextAreaField>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3">
                <div class="hold-field mt-4">
                  <UploadAttachment v-if="!$route.params.id || mission?.thumbnailChangedRequest" :type-of-attachment="'image'"
                                    :label="$t('MISSIONS.UPLOAD_IMAGE')"
                                    :dropImage="true" :name="'logoMission'" :rules="'required'"
                                    :dropIdRef="'missionImgRef'"
                                    :accept-files="'image/*'" @setFileId="setFileImageId($event)"/>
                  <PreviewMedia v-if="$route.params.id && mission.thumbnailChanged === false && !mission.thumbnailChangedRequest" :header="$t('MISSIONS.UPLOAD_IMAGE')"
                                :media-name="mission.thumbnailPreview_name"
                                :file-size="mission.thumbnailPreview_size"
                                :image-url="mission.thumbnailPreview"
                                :typeOfMedia="'image'"
                                :showRemoveButton="true"
                                @removeFile="removeFile('thumbnail','thumbnailChanged','thumbnailChangedRequest')"
                  />
                  <p v-if="mission.thumbnailChangedRequest" class="invalid-feedback d-block">صورة المهمة مطلوب</p>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3">
                <div class="hold-field mt-4">
                  <UploadAttachment v-if="!$route.params.id" :type-of-attachment="'audio'"
                                    :label="$t('MISSIONS.UPLOAD_AUDIO')"
                                    :dropImage="true" :name="'audioMission'" 
                                    :rules="'required'"
                                    :dropIdRef="'missionAudioRef'"
                                    :accept-files="'audio/*'" @setFileId="setFileAudioId($event)"/>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <div class="action-holder">
                <div>
                  <Button
                    v-if="!$route.params.id"
                    type="submit"
                    :loading="loading"
                    :disabled="invalid || checkInputs"
                    custom-class="submit-btn"
                  >
                    {{ $t("GLOBAL_SAVE") }}
                  </Button>
                  <Button
                    v-if="$route.params.id"
                    type="submit"
                    :loading="loading"
                    :disabled="invalid || checkInputsUpdate"
                    custom-class="submit-btn"
                  >
                    {{ $t("GLOBAL_EDIT") }}
                  </Button>
                </div>
                <Button @click="handleCancel" :custom-class="'cancel-btn margin'">
                  {{ $t("GLOBAL_CANCEL") }}
                </Button>
              </div>
            </b-row>
          </form>
        </validation-observer>
      </div>
    </div>
  </div>
</template>
<script>
import TextField from "@/components/Shared/TextField/index.vue";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import TextAreaField from "@/components/Shared/TextAreaField/index.vue";
import { getSingleMissionsRequest } from "@/api/missios";
import ImageUploader from "@/components/Shared/ImageUploader/index.vue";
import UploadAttachment from "@/components/Shared/UploadAttachment";
import PreviewMedia from "@/components/Shared/PreviewMedia/PreviewMedia.vue";
import { getLessonsByLearningPathRequest } from "@/api/lessons"

export default {
  components: {
    TextField,
    SelectSearch,
    Button,
    TextAreaField,
    ImageUploader,
    PreviewMedia,
    UploadAttachment
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    levels: {
      type: Array,
      default: () => [],
    },
    learningPaths: {
      type: Array,
      default: () => [],
    },
    terms: {
      type: Array,
      default: () => [],
    },
    countries: {
      type: Array,
      default: () => [],
    }
  },
  data() {
    return {
      mission: {
        name: "",
        level_id: null,
        learning_path_ids: null,
        country_id: null,
        lessons_ids: null,
        term_id: null,
        duration: null,
        description: null,
        itemImage: null,
        mission_image: null,
        thumbnail: null,
        thumbnailChanged: false,
        thumbnailChangedRequest: false,
        thumbnailPreview: null,
        missionAudio:null
      },
      lessons:[]
    };
  },
  methods: {
    deleteImage() {
      this.mission.mission_image = null;
      this.mission.itemImage = null;
    },
    onSubmit() {
      this.$emit("onSubmit", this.mission);
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    handleBack() {
      this.$emit("handleBack");
    },
    //SHOULD DELETE
    handleUploadImage(e) {
      this.mission.itemImage = URL.createObjectURL(e.target.files[0]);
      if (e) this.mission.mission_image = e.target.files[0];
      else return;
    },
    setFileImageId($event) {
      if ($event) { 
        this.mission.thumbnail = $event
        this.mission.thumbnailRequest = true
        this.mission.thumbnailChanged = false
      }
    },
    setFileAudioId($event) { 
      this.mission.missionAudio = $event
    },
    removeFile(fileName,fileChange,fileRequest){
      this.mission[fileChange] = true
      this.mission[fileName] = null
      this.mission[fileRequest] = true
    },
    removeAudioId() { 
      this.mission.missionAudio = null
    },
    getLessonsByLearningPathIdsRequest(learningPathIds) { 
      this.ApiService(getLessonsByLearningPathRequest(learningPathIds)).then(res => { 
        // set lessons options
        this.lessons = res.data.data;
        if (Object.keys(learningPathIds).length == 0) {
          this.lessons = [];
        } else { 
          this.lessons = res.data.data;
        }
        if (!this.$route.params.id) { 
          this.mission.lessons_ids = [];
        }
      })
    },
    getLessonsByLearningPathIds(pathsIds) { 
      let obj = {};
      pathsIds.forEach((pathId, index) => {
        obj[`learning_paths[${index}]`]= pathId
      });
      this.getLessonsByLearningPathIdsRequest(obj)
    }
  },
  computed: {
    checkInputs() {
      if (this.mission.thumbnail === null || this.mission.missionAudio === null) {
        return true
      } else {
        return false
      }
    },
    checkInputsUpdate(){
      if (this.mission.thumbnailChanged === true) {
        return true
      } else {
        return false
      }
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.ApiService(getSingleMissionsRequest(this.$route.params.id)).then((response) => {
        this.mission.name = response.data.data.name;
        this.mission.level_id = response.data.data.level.id;
        this.mission.duration = response.data.data.data_range;
        this.mission.description = response.data.data.description;
        this.mission.country_id = response.data.data.country.id;
        this.mission.term_id = response.data.data.term.id;
        this.mission.lessons_ids = response.data.data.lessonsIds.map((item) => item.id);
        this.mission.learning_path_ids = response.data.data.learningpaths.map((item) => item.id);
        this.mission.itemImage = response.data.data.mission_image;
        this.mission.mission_image = response.data.data.mission_image;
        this.mission.thumbnail = response.data.data.thumbnail_uuid
        this.mission.thumbnailPreview = response.data.data.thumbnail;
        this.mission.thumbnailPreview_name = response.data.data.thumbnail_name;
        this.mission.thumbnailPreview_size = response.data.data.thumbnail_size;
        this.getLessonsByLearningPathIds(this.mission.learning_path_ids)
      });
    }
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
