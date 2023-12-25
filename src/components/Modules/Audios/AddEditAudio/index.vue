<template>
  <div class="add-edit-group">
    <div class="container-fluid custom-container">
      <div class="add-edit-group-form">
        <h3>
          {{ $route.params.id ? $t("AUDIOS.EDIT") : $t("AUDIOS.ADD_NEW") }}
        </h3>
        <validation-observer v-slot="{ invalid }" ref="addEditAudioForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="8" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="formValues.name"
                    :label="$t('AUDIOS.AUDIO_TITLE')"
                    :name="$t('AUDIOS.AUDIO_TITLE')"
                    :placeholder="$t('AUDIOS.AUDIO_TITLE_PLACEHOLDER')"
                    :rules="'required|min:3|max:30'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="formValues.task_degree"
                    :label="$t('AUDIOS.DEGREE')"
                    :name="$t('AUDIOS.DEGREE')"
                    :placeholder="$t('AUDIOS.DEGREE_PLACEHOLDER')"
                    :rules="'required'"
                    type="number"
                    min="0"
                  ></TextField>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="12">
                <UploadAttachment
                  :type-of-attachment="'video'"
                  :dropIdRef="'VideFile'"
                  :accept-files="'.mp4'"
                  :label="'ملف الصوت'"
                  :name="'VideFile'"
                  :rules="'required'"
                  @setFileId="setAudioFileId($event)"
                />
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="6" class="mb-3 mt-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="formValues.type"
                    :label="$t('AUDIOS.QUESTION_TYPE')"
                    :name="$t('AUDIOS.QUESTION_TYPE')"
                    :placeholder="$t('AUDIOS.QUESTION_TYPE_PLACEHOLDER')"
                    :options="qustionTypes"
                    :get-option-label="(option) => option.name"
                    :reduce="(option) => option.value"
                    :rules="'required'"
                    @input="setQuestionType(formValues.type)"
                  />
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col v-if="questionType == 'text'" lg="12" class="mb-3">
                <div class="hold-field">
                  <b-form-group
                    :label="$t('AUDIOS.QUESTION_TITLE')"
                    v-slot="{ ariaDescribedby }"
                    class="description"
                  >
                    <TextAreaField
                      v-model="formValues.task"
                      rows="5"
                      :name="$t('AUDIOS.QUESTION_TITLE')"
                      :placeholder="$t('AUDIOS.QUESTION_TITLE_PLACEHOLDER')"
                      :rules="'max:250'"
                    >
                    </TextAreaField>
                  </b-form-group>
                </div>
              </b-col>
              <b-col v-else lg="12" class="mb-3">
                <div class="hold-field mt-4">
                  <UploadAttachment
                    v-if="!$route.params.id"
                    :type-of-attachment="'image'"
                    :label="'صورة السؤال'"
                    :dropImage="true"
                    :name="'image'"
                    :rules="'required'"
                    :dropIdRef="'VideImage'"
                    :accept-files="'image/*'"
                    @setFileId="setFileImageId($event)"
                  />
                  <PreviewMedia
                    v-if="$route.params.id"
                    :header="$t('VIDEO.UPLOAD_IMAGE')"
                    :media-name="formValues.thumbnail_name"
                    :file-size="formValues.thumbnail_size"
                    :image-url="formValues.thumbnail"
                    :typeOfMedia="'image'"
                    :showRemoveButton="true"
                  />
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="6" class="mb-3 mt-3">
                <div class="hold-field">
                  <ValidationProvider v-slot="{ errors, invalid }">
                    <SelectSearch
                      v-model="formValues.learning_path_id"
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
                  <ValidationProvider
                    v-slot="{ errors, invalid }"
                    rules="required"
                  >
                    <SelectSearch
                      v-model="formValues.lesson_id"
                      :label="$t('LESSONS.videoNAME')"
                      :placeholder="$t('LESSONS.selectLesson')"
                      :name="'lesson'"
                      :options="lessons"
                      :get-option-label="(option) => option.name"
                      :reduce="(option) => option.id"
                      :rules="'required'"
                      :disabled="!formValues.learning_path_id"
                    />
                  </ValidationProvider>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3 mt-3">
                <div class="hold-field">
                  <ValidationProvider v-slot="{ errors, invalid }">
                    <SelectSearch
                      v-model="formValues.blooms"
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
                      v-model="formValues.learning_styles"
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
                      v-model="formValues.language_skills"
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
                  :disabled="invalid"
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
  </div>
</template>
<script>
import TextField from "@/components/Shared/TextField/index.vue";
import TextAreaField from "@/components/Shared/TextAreaField/index.vue";
import SelectField from "@/components/Shared/SelectField/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import { getSingleVideoRequest } from "@/api/videos";
import { getAllLearningPathsRequest } from "@/api/learningPath";
import { getAllLevelsRequest } from "@/api/level";
import ImageUploader from "@/components/Shared/ImageUploader/index.vue";
import { getAllTermsRequest } from "@/api/term";
import { getLessonsRequest } from "@/api/lessons";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import UploadAttachment from "@/components/Shared/UploadAttachment";
import { getBloomCategoriesRequest } from "@/api/bloom";
import { getAllLearningMethodsRequest } from "@/api/question";
import { getLearningSkillsRequest } from "@/api/learning-skill";
import PreviewMedia from "@/components/Shared/PreviewMedia/PreviewMedia.vue";
import { debounce } from "lodash";

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
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      qustionTypes: [
        {
          name: "صورة",
          value: "image",
        },
        {
          name: "نص",
          value: "text",
        },
      ],
      questionType: "text",
      formValues: {
        name: "",
        task_degree: "",
        type: "text",
      },
      //OLLLD
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
      // formValues: {
      //   blooms: null,
      //   learning_styles: [],
      //   language_skills: [],
      //   name: "",
      //   description: "",
      //   video: null,
      //   video_without_music: null,
      //   learning_path_id: "",
      //   lesson_id: "",
      //   title: "",
      //   original_name: "",
      //   level_id: "",
      //   term_id: "",
      //   img_url: null,
      //   thumbnail: null,
      //   uploadVideo: false,
      //   uploadVideoWithoutMusic: false,
      // },
    };
  },
  methods: {
    setQuestionType: debounce(function (type) {
      this.questionType = type;
    }, 500),

    //// ollld
    checkEditVideo($event) {
      this.formValues.uploadVideo = !!$event;
    },
    checkEditVideoWithOut($event) {
      this.formValues.uploadVideoWithoutMusic = !!$event;
    },
    handleUploadImage(e) {
      this.videoImage = URL.createObjectURL(e.target.files[0]);
      if (e) {
        this.formValues.thumbnail = e.target.files[0];
      } else return;
    },
    setFileImageId($event) {
      this.formValues.thumbnail = $event;
    },
    setAudioFileId($event) {
      this.formValues.video = $event;
    },
    setVideoWithoutFileId($event) {
      this.formValues.video_without_music = $event;
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
      this.$refs.addEditAudioForm.validate().then((success) => {
        if (!success) return;
      });
      if (this.$route.params.id) {
        this.$emit("handleEditVideo", this.formValues);
      } else {
        this.$emit("handleAddVideo", this.formValues);
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getVideoToEdit() {
      if (this.$route.params.id) {
        this.ApiService(getSingleVideoRequest(this.$route.params.id)).then(
          (response) => {
            this.formValues.name = response.data.data.title;
            this.formValues.description = response.data.data.description;
            this.formValues.video = response.data.data.url;
            this.formValues.learning_path_id =
              response.data.data.learningPath.id;
            this.formValues.blooms = response.data.data.blooms.id;
            this.formValues.lesson_id = response.data.data.lesson.id;
            this.formValues.learning_styles =
              response.data.data.learning_styles.map((item) => {
                return item.id;
              });
            this.formValues.language_skills =
              response.data.data.language_skills.map((item) => {
                return item.id;
              });
            this.formValues.thumbnail = response.data.data.thumbnail;
            this.formValues.thumbnail_name = response.data.data.thumbnail_name;
            this.formValues.thumbnail_size = response.data.data.thumbnail_size;
          }
        );
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
          return { value: path.id, text: path.name };
        });
      });
    },
    getAllLessonBasedOnPath: debounce(function (name) {
      this.ApiService(
        getLessonsRequest({
          learning_path_id: this.formValues.learning_path_id,
        })
      ).then((response) => {
        this.lessons = response.data.data;
      });
    }, 500),
    getTerms() {
      const params = {
        level_id: this.formValues.level_id,
      };
      this.ApiService(getAllTermsRequest(params)).then((response) => {
        const termsArr = response.data.data;
        this.terms = termsArr.map((path) => {
          return { value: path.id, text: path.name };
        });
      });
    },
    getLanguageMethod() {
      this.ApiService(getAllLearningMethodsRequest()).then((response) => {
        this.languageMethods = response.data.data;
      });
    },
    getLearningSkills() {
      this.ApiService(getLearningSkillsRequest()).then((response) => {
        this.learningSkills = response.data.data;
      });
    },
  },
  computed: {
    checkVideosInputs() {
      if (
        this.formValues.video === null ||
        this.formValues.thumbnail === null ||
        this.formValues.video_without_music === null
      ) {
        return true;
      } else {
        return false;
      }
    },
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
