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
                  v-if="!$route.params.id || formValues.taskAudioChangedRequest"
                  :type-of-attachment="'audio'"
                  :dropIdRef="'audioFile'"
                  :accept-files="'audio/*'"
                  :label="'ملف الصوت'"
                  :name="'audioFile'"
                  :rules="'required'"
                  @setFileId="setAudioFileId($event)"
                />
                <PreviewMedia
                  v-if="
                    $route.params.id &&
                    formValues.taskAudioChanged === false &&
                    !formValues.taskAudioChangedRequest
                  "
                  :header="$t('ملف الصوت')"
                  :media-name="formValues.task_audio_name"
                  :file-size="formValues.task_audio_size"
                  :image-url="formValues.task_audio"
                  :typeOfMedia="'audio'"
                  :showRemoveButton="true"
                  @playAudio="playAudio(formValues.task_audio)"
                  @removeFile.stop="
                    removeFile(
                      'task_audio_uuid',
                      'taskAudioChanged',
                      'taskAudioChangedRequest'
                    )
                  "
                />
                <p
                  v-if="formValues.taskAudioChangedRequest"
                  class="invalid-feedback d-block"
                >
                  ملف الصوت مطلوب
                </p>
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
                    v-slot="{ ariaDescribedby }"
                    class="description"
                  >
                    <label
                      >{{ $t("AUDIOS.QUESTION_TITLE") }}
                      <span><i class="fa-solid fa-asterisk"></i></span
                    ></label>
                    <TextAreaField
                      v-model="formValues.task"
                      rows="5"
                      :name="$t('AUDIOS.QUESTION_TITLE')"
                      :placeholder="$t('AUDIOS.QUESTION_TITLE_PLACEHOLDER')"
                      :rules="'required|min:3|max:250'"
                    >
                    </TextAreaField>
                  </b-form-group>
                </div>
              </b-col>
              <b-col v-else lg="12" class="mb-3">
                <div class="hold-field mt-4">
                  <UploadAttachment
                    v-if="
                      !$route.params.id || formValues.taskImageChangedRequest
                    "
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
                    v-if="
                      $route.params.id &&
                      formValues.taskImageChanged === false &&
                      !formValues.taskImageChangedRequest
                    "
                    :header="$t('صورة السؤال')"
                    :media-name="formValues.task_file_name"
                    :file-size="formValues.task_file_size"
                    :image-url="formValues.task"
                    :typeOfMedia="'image'"
                    :showRemoveButton="true"
                    @removeFile="
                      removeFile(
                        'task_file_uuid',
                        'taskImageChanged',
                        'taskImageChangedRequest'
                      )
                    "
                  />
                  <p
                    v-if="formValues.taskImageChangedRequest"
                    class="invalid-feedback d-block"
                  >
                    صورة السؤال مطلوبه
                  </p>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="4" class="mb-3 mt-3">
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
              <b-col lg="8" class="mb-3 mt-3">
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
                  :disabled="invalid || checkAudioInput"
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
import { getSingleAudioRequest } from "@/api/audios";
import { getAllLearningPathsRequest } from "@/api/learningPath";
import { getAllLevelsRequest } from "@/api/level";
import ImageUploader from "@/components/Shared/ImageUploader/index.vue";
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
        task_audio: "",
        task: "",
        task_image: "",
        learning_path_id: "",
        blooms: "",
        lesson_id: "",
        learning_styles: [],
        language_skills: [],
        task_audio_size: "",
        task_audio_name: "",
        task_audio_uuid: "",
        task_file_size: "",
        task_file_name: "",
        task_file_uuid: "",
        taskImageChanged: false,
        taskImageChangedRequest: false,
        taskAudioChanged: false,
        taskAudioChangedRequest: false,
      },
      //OLLLD
      paths: [],
      levels: [],
      lessons: [],
      bloom: [],
      languageMethods: [],
      learningSkills: [],
      audioImage: null,
      isPlaying: false,
      audioValue: null,
    };
  },
  methods: {
    playAudio(link) {
      if (this.audioValue) {
        this.audioValue.pause();
        this.audioValue = null;
        this.isPlaying = false;
        return;
      }
      this.audioValue = new Audio(link);
      this.audioValue.play();
      this.isPlaying = true;
    },
    setQuestionType: debounce(function (type) {
      this.questionType = type;
      // if (this.$route.params.id) {
      //   if (type == 'text') {
      //     this.formValues.task_file_name = ""
      //     this.formValues.task_file_size = ""
      //     this.formValues.task_file_uuid = ""
      //     this.formValues.taskImageChanged = false
      //     this.formValues.taskAudioChangedRequest = false
      //   } else {
      //     this.formValues.task = ""
      //   }
      // }
    }, 500),

    //// ollld
    // checkEditVideo($event) {
    //   this.formValues.uploadVideo = !!$event;
    // },
    // checkEditVideoWithOut($event) {
    //   this.formValues.uploadVideoWithoutMusic = !!$event;
    // },
    handleUploadImage(e) {
      this.audioImage = URL.createObjectURL(e.target.files[0]);
      if (e) {
        this.formValues.task_image = e.target.files[0];
      } else return;
    },
    setFileImageId($event) {
      this.formValues.task_image = $event;
    },
    setAudioFileId($event) {
      this.formValues.task_audio = $event;
    },
    // setVideoWithoutFileId($event) {
    //   this.formValues.video_without_music = $event;
    // },
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
        this.$emit("handleEditAudio", this.formValues);
      } else {
        this.$emit("handleAddAudio", this.formValues);
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    removeFile(fileName, fileChange, fileRequest) {
      this.formValues[fileChange] = true;
      this.formValues[fileName] = null;
      this.formValues[fileRequest] = true;
    },
    getAudioToEdit() {
      if (this.$route.params.id) {
        this.ApiService(getSingleAudioRequest(this.$route.params.id)).then(
          (response) => {
            this.formValues.name = response.data.data.name;
            this.formValues.task_degree = response.data.data.task_degree;
            this.formValues.type = response.data.data.type;
            this.formValues.task = response.data.data.task;
            this.formValues.task_audio = response.data.data.task_audio;
            this.formValues.task_audio_size =
              response.data.data.task_audio_size;
            this.formValues.task_audio_name =
              response.data.data.task_audio_name;
            this.formValues.task_audio_uuid =
              response.data.data.task_audio_uuid;
            this.formValues.task_file_size = response.data.data.task_file_size;
            this.formValues.task_file_name = response.data.data.task_file_name;
            this.formValues.task_file_uuid = response.data.data.task_file_uuid;
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
    checkAudioInput() {
      if (
        this.formValues.task_audio === "" ||
        (this.questionType == "image" && this.formValues.task_image === "")
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    this.getAudioToEdit();
    this.getAllLearningPaths();
    this.getAllLevels();
    this.getBloomCategories();
    this.getLanguageMethod();
    this.getLearningSkills();
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
