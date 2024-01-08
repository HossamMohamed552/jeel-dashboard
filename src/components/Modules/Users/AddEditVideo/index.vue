<template>
  <div class="add-edit-group">
    <div class="container-fluid custom-container">
      <div class="add-edit-group-form">
        <h3>{{ $route.params.id ? $t("VIDEO.EDIT") : $t("VIDEO.ADD_NEW") }}</h3>
        <validation-observer v-slot="{ invalid }" ref="addEditVideoForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="createVideo.name"
                    :label="$t('VIDEO.VIDEONAME')"
                    :name="$t('VIDEO.VIDEONAME')"
                    :placeholder="$t('VIDEO.placeVIDEONAME')"
                    :rules="'required|min:3|max:30'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="6">
                <UploadAttachment v-if="!$route.params.id || createVideo.videoChangedRequest" :type-of-attachment="'video'"
                                  :dropIdRef="'VideFile'"
                                  :accept-files="'.mp4'" :label="'ملف الفيديو'" :name="'VideFile'"
                                  :rules="'required'" @setFileId="setVideoFileId($event)"/>
                <PreviewMedia v-if="$route.params.id && createVideo.videoChanged === false && !createVideo.videoChangedRequest" :header="'ملف الفيديو'"
                              :media-name="createVideo.videoPreview_name"
                              :file-size="createVideo.videoPreview_size"
                              :typeOfMedia="'video'"
                              :show-remove-button="true"
                              @removeFile="removeFile('video','videoChanged','videoChangedRequest')"
                              @showModal="showModal(videoDetail,'withMusic')"/>
                <p v-if="$route.params.id && createVideo.videoChangedRequest" class="invalid-feedback d-block">ملف الفيديو مطلوب</p>
              </b-col>
              <b-col lg="6">
                <UploadAttachment v-if="!$route.params.id || createVideo.video_without_musicChangedRequest" :type-of-attachment="'video'" :label="'ملف الفيديو بدون موسيقى'"
                                  :name="'VideoWithout'" :rules="'required'"
                                  :dropIdRef="'VideoWithout'"
                                  :accept-files="'.mp4'"
                                  @setFileId="setVideoWithoutFileId($event)"/>
                <PreviewMedia v-if="$route.params.id && createVideo.video_without_musicChanged === false && !createVideo.video_without_musicChangedRequest" :header="'ملف الفيديو بدون موسيقى'"
                              :media-name="createVideo.video_without_musicPreview_name"
                              :file-size="createVideo.video_without_musicPreview_size"
                              :typeOfMedia="'video'"
                              :show-remove-button="true"
                              @removeFile="removeFile('video_without_music','video_without_musicChanged','video_without_musicChangedRequest')"
                              @showModal="showModal(videoDetail,'withOutMusic')"/>
                <p v-if="createVideo.video_without_musicChangedRequest" class="invalid-feedback d-block">ملف الفيديو بدون موسيقى مطلوب</p>
              </b-col>
              <b-col lg="12" class="mb-3">
                <div class="hold-field mt-4">
                  <UploadAttachment v-if="!$route.params.id || createVideo.thumbnailChangedRequest" :type-of-attachment="'image'"
                                    :label="'صورة الفيديو'"
                                    :dropImage="true" :name="'image'" :rules="'required'"
                                    :dropIdRef="'VideImage'"
                                    :accept-files="'image/*'" @setFileId="setFileImageId($event)"/>
                  <PreviewMedia v-if="$route.params.id && createVideo.thumbnailChanged === false && !createVideo.thumbnailChangedRequest" :header="$t('VIDEO.UPLOAD_IMAGE')"
                                :media-name="createVideo.thumbnailPreview_name"
                                :file-size="createVideo.thumbnailPreview_size"
                                :image-url="createVideo.thumbnailPreview"
                                :typeOfMedia="'image'"
                                :showRemoveButton="true"
                                @removeFile="removeFile('thumbnail','thumbnailChanged','thumbnailChangedRequest')"
                  />
                  <p v-if="createVideo.thumbnailChangedRequest" class="invalid-feedback d-block">صورة الفيديو مطلوب</p>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="6" class="mb-3 mt-3">
                <div class="hold-field">
                  <ValidationProvider v-slot="{ errors, invalid }">
                    <SelectSearch
                      v-model="createVideo.learning_path_id"
                      :label="$t('VIDEO.learning_path')"
                      :placeholder="$t('VIDEO.selectPath')"
                      :name="'learning_path'"
                      :options="paths"
                      :get-option-label="(option) => option.name"
                      :reduce="(option) => option.id"
                      :rules="'required'"
                      @input="getAllLessonBasedOnPath"
                    />
                  </ValidationProvider>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3 mt-3">
                <div class="hold-field">
                  <ValidationProvider v-slot="{ errors, invalid }" rules="required">
                    <SelectSearch
                      v-model="createVideo.lesson_id"
                      :label="$t('LESSONS.videoNAME')"
                      :placeholder="$t('LESSONS.selectLesson')"
                      :name="'lesson'"
                      :options="lessons"
                      :get-option-label="(option) => option.name"
                      :reduce="(option) => option.id"
                      :rules="'required'"
                      :disabled="!createVideo.learning_path_id"
                    />
                  </ValidationProvider>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3 mt-3">
                <div class="hold-field">
                  <ValidationProvider v-slot="{ errors, invalid }">
                    <SelectSearch
                      v-model="createVideo.blooms"
                      :label="$t('VIDEO.bloom')"
                      :placeholder="$t('VIDEO.selectBloom')"
                      :name="'bloom'"
                      :options="bloom"
                      :get-option-label="(option) => option.name"
                      :reduce="(option) => option.id"
                      :rules="'required'"
                    />
                  </ValidationProvider>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3 mt-3">
                <div class="hold-field">
                  <ValidationProvider v-slot="{ errors, invalid }">
                    <SelectSearch
                      v-model="createVideo.learning_styles"
                      :label="$t('VIDEO.languageMethods')"
                      :placeholder="$t('VIDEO.selectLanguageMethods')"
                      :name="'languageMethods'"
                      :options="languageMethods"
                      :get-option-label="(option) => option.name"
                      :reduce="(option) => option.id"
                      :rules="'required'"
                      multiple
                    />
                  </ValidationProvider>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3 mt-3">
                <div class="hold-field">
                  <ValidationProvider v-slot="{ errors, invalid }">
                    <SelectSearch
                      v-model="createVideo.language_skills"
                      :label="$t('VIDEO.learningSkills')"
                      :placeholder="$t('VIDEO.selectLearningSkills')"
                      :name="'learningSkills'"
                      :options="learningSkills"
                      :get-option-label="(option) => option.name"
                      :reduce="(option) => option.id"
                      multiple
                      :rules="'required'"
                    />
                  </ValidationProvider>
                </div>
              </b-col>
              <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <b-form-group
                    :label="$t('VIDEO.Description')"
                    v-slot="{ ariaDescribedby }"
                    class="description"
                  >
                    <TextAreaField
                      v-model="createVideo.description"
                      rows="5"
                      :name="$t('VIDEO.Description')"
                      :placeholder="$t('VIDEO.Description')"
                      :rules="'max:250'"
                    >
                    </TextAreaField>
                  </b-form-group>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <div class="hold-btns-form">
                <Button @click="handleCancel" custom-class="cancel-btn margin">
                  {{ $t("GLOBAL_CANCEL") }}
                </Button>
                <Button
                  v-if="!$route.params.id"
                  type="submit"
                  :loading="loading"
                  :disabled="invalid || checkVideosInputs"
                  custom-class="submit-btn"
                >
                  {{ $t("GLOBAL_SAVE") }}
                </Button>
                <Button
                  v-if="$route.params.id"
                  type="submit"
                  :loading="loading"
                  :disabled="invalid || checkVideosInputsUpdate"
                  custom-class="submit-btn"
                >
                  {{ $t("GLOBAL_EDIT") }}
                </Button>
                <!--                $route.params.id ? $t("GLOBAL_EDIT") :-->
              </div>
            </b-row>
          </form>
        </validation-observer>
      </div>
    </div>
    <GeneralModal :id="'holdContent'" :size="'lg'" :hide-header="true">
      <template #modalBody>
        <div class="text-center">
          <vimeo-player
            v-if="videoUrl && (videoDetail.vimeo_video_with_music_transcode || videoDetail.vimeo_video_without_music_transcode)"
            class="vimeo-player my-3"
            ref="videoPlayer"
            :video-url="`${videoUrl}`"
            :options="{'responsive':true}"
          ></vimeo-player>
          <video v-else width="90%"
                 class="my-3"
                 :src="videoUrl"
                 ref="player"
                 autoplay="autoplay"
                 controls="controls"
          />
          <Button @click="hideModal" :custom-class="'rounded-btn transparent-btn'">
            {{ $t("BACK") }}
          </Button>
        </div>
      </template>
    </GeneralModal>
  </div>
</template>
<script>
import TextField from "@/components/Shared/TextField/index.vue";
import TextAreaField from "@/components/Shared/TextAreaField/index.vue";
import SelectField from "@/components/Shared/SelectField/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {getSingleVideoRequest} from "@/api/videos";
import {getAllLearningPathsRequest} from "@/api/learningPath";
import {getAllLevelsRequest} from "@/api/level";
import ImageUploader from "@/components/Shared/ImageUploader/index.vue";
import {getAllTermsRequest} from "@/api/term";
import {getLessonsRequest} from "@/api/lessons";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import UploadAttachment from "@/components/Shared/UploadAttachment";
import {getBloomCategoriesRequest} from "@/api/bloom";
import {getAllLearningMethodsRequest} from "@/api/question";
import {getLearningSkillsRequest} from "@/api/learning-skill";
import PreviewMedia from "@/components/Shared/PreviewMedia/PreviewMedia.vue";
import GeneralModal from "@/components/Shared/GeneralModal/index.vue";
import {vueVimeoPlayer} from "vue-vimeo-player";

export default {
  components: {
    PreviewMedia,
    SelectSearch,
    Modal,
    TextField,
    TextAreaField,
    Button,
    SelectField,
    ImageUploader,
    UploadAttachment,
    GeneralModal,
    VimeoPlayer: vueVimeoPlayer
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      paths: [],
      levels: [],
      terms: [],
      lessons: [],
      bloom: [],
      languageMethods: [],
      learningSkills: [],
      videoImage: null,
      progressWithMusic: 0,
      progressWithOutMusic: 0,
      errorVideo: false,
      successVideo: false,
      errorVideoWithOut: false,
      successVideoWithOut: false,
      videoDetail: {},
      videoUrl: null,
      createVideo: {
        blooms: null,
        learning_styles: [],
        language_skills: [],
        name: "",
        description: "",
        video: null,
        videoChanged: false,
        videoChangedRequest: false,
        videoPreview_name: null,
        videoPreview_size: null,
        video_without_music: null,
        video_without_musicPreview_name: null,
        video_without_musicPreview_size: null,
        video_without_musicChanged: false,
        video_without_musicChangedRequest: false,
        learning_path_id: "",
        lesson_id: "",
        title: "",
        original_name: "",
        level_id: "",
        term_id: "",
        thumbnail: null,
        thumbnailChanged: false,
        thumbnailChangedRequest: false,
        thumbnailPreview: null,
        uploadVideo: false,
        uploadVideoWithoutMusic: false,
      },
    };
  },
  methods: {
    showModal(video, typeOfVideo) {
      this.$bvModal.show('holdContent')
      if (typeOfVideo === 'withMusic' && video.vimeo_video_with_music_transcode) {
        this.videoUrl = video.vimeo_video_with_music_url.replace("https", "http")
      } else if (typeOfVideo === 'withOutMusic' && video.vimeo_video_without_music_transcode) {
        this.videoUrl = video.vimeo_video_without_music_url.replace("https", "http")
      } else if (typeOfVideo === 'withMusic' && !video.vimeo_video_with_music_transcode) {
        this.videoUrl = video.video_with_muisc
      } else {
        this.videoUrl = video.video_without_muisc
      }
    },
    hideModal() {
      this.$bvModal.hide('holdContent')
    },
    async registerPlayerEvents(player) {
      this.player = player
    },
    handleUploadImage(e) {
      this.videoImage = URL.createObjectURL(e.target.files[0]);
      if (e) {
        this.createVideo.thumbnail = e.target.files[0];
      } else return;
    },
    setFileImageId($event) {
      this.createVideo.thumbnail = $event
      this.createVideo.thumbnailRequest = true
      this.createVideo.thumbnailChanged = false
    },
    setVideoFileId($event) {
      this.createVideo.video = $event
      this.createVideo.videoChangedRequest = true
      this.createVideo.videoChanged = false
    },
    setVideoWithoutFileId($event) {
      this.createVideo.video_without_music = $event
      this.createVideo.video_without_musicRequest = true
      this.createVideo.video_without_musicChanged = false
    },
    removeFile(fileName,fileChange,fileRequest){
      this.createVideo[fileChange] = true
      this.createVideo[fileName] = null
      this.createVideo[fileRequest] = true
    },
    getBloomCategories() {
      this.ApiService(getBloomCategoriesRequest())
        .then((response) => {
          this.bloom = response.data.data;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onSubmit() {
      this.$refs.addEditVideoForm.validate().then((success) => {
        if (!success) return;
      });
      if (this.$route.params.id) {
        this.$emit("handleEditVideo", this.createVideo);
      } else {
        this.$emit("handleAddVideo", this.createVideo);
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getVideoToEdit() {
      if (this.$route.params.id) {
        this.ApiService(getSingleVideoRequest(this.$route.params.id)).then((response) => {
          this.createVideo.name = response.data.data.title;
          this.createVideo.description = response.data.data.description;
          this.createVideo.learning_path_id = response.data.data.learningPath.id;
          this.createVideo.blooms = response.data.data.blooms.id
          this.createVideo.lesson_id = response.data.data.lesson.id
          this.createVideo.learning_styles = response.data.data.learning_styles.map((item) => {
            return item.id
          })
          this.createVideo.language_skills = response.data.data.language_skills.map((item) => {
            return item.id
          })
          this.createVideo.thumbnailPreview = response.data.data.thumbnail;
          this.createVideo.thumbnailPreview_name = response.data.data.thumbnail_name;
          this.createVideo.thumbnailPreview_size = response.data.data.thumbnail_size;
          this.createVideo.video = response.data.data.video_with_music_uuid
          this.createVideo.video_without_music = response.data.data.video_without_muisc_uuid
          this.createVideo.thumbnail = response.data.data.thumbnail_uuid
          this.videoDetail = response.data.data
          this.createVideo.videoPreview_name = response.data.data.video_with_music_name
          this.createVideo.videoPreview_size = response.data.data.video_with_muisc_size
          this.createVideo.video_without_musicPreview_name = response.data.data.video_without_muisc_name
          this.createVideo.video_without_musicPreview_size = response.data.data.video_without_muisc_size
        }).then(()=>{
          this.registerPlayerEvents()
        })
      }
    },
    getAllLearningPaths() {
      this.ApiService(getAllLearningPathsRequest()).then((response) => {
        this.paths = response.data.data;
      });
    },
    getAllLevels() {
      this.ApiService(getAllLevelsRequest()).then((response) => {
        const levelsArr = response.data.data;
        this.levels = levelsArr.map((path) => {
          return {value: path.id, text: path.name};
        });
      });
    },
    getAllLessonBasedOnPath() {
      this.ApiService(
        getLessonsRequest({learning_path_id: this.createVideo.learning_path_id})
      ).then((response) => {
        this.lessons = response.data.data;
      });
    },
    getTerms() {
      const params = {
        level_id: this.createVideo.level_id,
      };
      this.ApiService(getAllTermsRequest(params)).then((response) => {
        const termsArr = response.data.data;
        this.terms = termsArr.map((path) => {
          return {value: path.id, text: path.name};
        });
      });
    },
    getLanguageMethod() {
      this.ApiService(getAllLearningMethodsRequest())
        .then((response) => {
          this.languageMethods = response.data.data;
        })
    },
    getLearningSkills() {
      this.ApiService(getLearningSkillsRequest())
        .then((response) => {
          this.learningSkills = response.data.data;
        })
    },
  },
  computed: {
    checkVideosInputs() {
      if (this.createVideo.video === null || this.createVideo.thumbnail === null || this.createVideo.video_without_music === null) {
        return true
      } else {
        return false
      }
    },
    checkVideosInputsUpdate(){
      if (this.createVideo.videoChanged === true || this.createVideo.thumbnailChanged === true || this.createVideo.video_without_musicChanged === true) {
        return true
      } else {
        return false
      }
    }
  },
  mounted() {
    this.getVideoToEdit();
    this.getAllLearningPaths();
    this.getAllLevels();
    this.getBloomCategories();
    this.getLanguageMethod();
    this.getLearningSkills();
    if (this.$route.params.id) this.getTerms();
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
