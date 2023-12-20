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
              <b-col lg="6" class="mb-3">

              </b-col>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <ValidationProvider v-slot="{errors}" :rules="$route.params.id ? '' : 'required'"
                                      name="video_without_music">
                    <span v-if="!$route.params.id"
                          class="video-label"><label>{{ $t('VIDEO.videoWithoutMusic') }}</label><i
                      class="fa-solid fa-asterisk"></i></span>
                    <b-form-file @change="checkEditVideoWithOut($event)"
                                 accept="video/mp4,video/x-m4v,video/*"
                                 placeholder="اسم ملف"
                                 v-model="createVideo.video_without_music" name="video">
                    </b-form-file>
                    <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                      {{ error }}
                    </b-form-invalid-feedback>
                  </ValidationProvider>
                </div>
                <div class="hold-progress">
                  <b-progress max="100" height="2rem" v-if="progressWithOutMusic">
                    <b-progress-bar :value="progressWithOutMusic"
                                    :label="`${progressWithOutMusic}%`">
                    </b-progress-bar>
                  </b-progress>
                  <p v-if="errorVideoWithOut" class="error-status">حدث خطأ ما عند رفع الفيديو</p>
                  <p v-if="successVideoWithOut" class="success-status">تم رفع الفيديو بنجاح</p>
                </div>
              </b-col>
              <b-col lg="12" class="mb-3">
                <div class="hold-field mt-4">
                  <UploadAttachment :type-of-attachment="'image'" :accept-files="'image/*'"/>
                  <!--                  @vdropzone-file-added="fileAdded($event)"-->
                  <!--                  <ImageUploader-->
                  <!--                    :is-required="true"-->
                  <!--                    v-model="createVideo.img_url"-->
                  <!--                    :name="'videoThumbnail'"-->
                  <!--                    :text="$t('VIDEO.UPLOAD_IMAGE')"-->
                  <!--                    @imageUpload="handleUploadImage"-->
                  <!--                    :item-image="videoImage"-->
                  <!--                    @deleteImage="videoImage = null"-->
                  <!--                  />-->
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="6" class="mb-3 mt-3">
                <div class="hold-field">
                  <ValidationProvider v-slot="{errors, invalid}">
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
                  <ValidationProvider v-slot="{errors, invalid}" rules="required">
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

              <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <b-form-group :label="$t('VIDEO.Description')" v-slot="{ ariaDescribedby }"
                                class="description">
                    <TextAreaField v-model="createVideo.description" rows="5"
                                   :name="$t('VIDEO.Description')"
                                   :placeholder="$t('VIDEO.Description')" :rules="'max:60'">
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
                  type="submit"
                  :loading="loading"
                  :disabled="invalid"
                  custom-class="submit-btn"
                >
                  {{ $route.params.id ? $t("GLOBAL_EDIT") : $t("GLOBAL_SAVE") }}
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
import UploadAttachment from "@/components/Shared/UploadAttachment"
import VueCookies from "vue-cookies";
export default {
  components: {
    SelectSearch,
    Modal,
    TextField,
    TextAreaField,
    Button,
    SelectField,
    ImageUploader,
    UploadAttachment
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
      videoImage: null,
      progressWithMusic: 0,
      progressWithOutMusic: 0,
      errorVideo: false,
      successVideo: false,
      errorVideoWithOut: false,
      successVideoWithOut: false,
      createVideo: {
        name: "",
        description: "",
        video: null,
        video_without_music: null,
        learning_path_id: "",
        lesson_id: "",
        title: '',
        original_name: '',
        level_id: '',
        term_id: '',
        img_url: null,
        thumbnail: null,
        uploadVideo: false,
        uploadVideoWithoutMusic: false,
      }
    };
  },
  methods: {
    checkEditVideo($event) {
      this.createVideo.uploadVideo = !!$event;
    },
    checkEditVideoWithOut($event) {
      this.createVideo.uploadVideoWithoutMusic = !!$event;
    },
    handleUploadImage(e) {
      this.videoImage = URL.createObjectURL(e.target.files[0]);
      if (e) {
        this.createVideo.thumbnail = e.target.files[0];
      } else return;
    },
    onSubmit() {
      this.$refs.addEditVideoForm.validate().then((success) => {
        if (!success) return;
      });
      if (this.$route.params.id) {
        this.$emit('handleEditVideo', this.createVideo)
      } else {
        this.$emit('handleAddVideo', this.createVideo)
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getVideoToEdit() {
      if (this.$route.params.id) {
        this.ApiService(getSingleVideoRequest(this.$route.params.id)).then((response) => {
          this.createVideo.name = response.data.data.title
          this.createVideo.description = response.data.data.description
          this.createVideo.video = response.data.data.url
          this.createVideo.learning_path_id = response.data.data.learningPath.id
          this.createVideo.level_id = response.data.data.level.id
          this.createVideo.term_id = response.data.data.term.id
          this.createVideo.img_url = response.data.data.thumbnail
          this.videoImage = response.data.data.thumbnail
        })
      }
    },
    getAllLearningPaths() {
      this.ApiService(getAllLearningPathsRequest()).then((response) => {
        this.paths = response.data.data;
      })
    },
    getAllLevels() {
      this.ApiService(getAllLevelsRequest()).then((response) => {
        const levelsArr = response.data.data;
        this.levels = levelsArr.map(path => {
          return {value: path.id, text: path.name}
        })
      })
    },
    getAllLessonBasedOnPath() {
      this.ApiService(getLessonsRequest({learning_path_id: this.createVideo.learning_path_id})).then((response) => {
        this.lessons = response.data.data
      })
    },
    getTerms() {
      const params =
        {
          level_id: this.createVideo.level_id
        }
      this.ApiService(getAllTermsRequest(params)).then((response) => {
        const termsArr = response.data.data;
        this.terms = termsArr.map((path) => {
          return {value: path.id, text: path.name};
        });
      });
    },
    sendImage(file, xhr, formData) {
      formData.append('type', 'image');
    },
  },
  mounted() {
    this.getVideoToEdit();
    this.getAllLearningPaths();
    this.getAllLevels();
    if (this.$route.params.id) this.getTerms()
  }
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
