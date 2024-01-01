<template>
  <div class="add-edit-group">
    <div class="container-fluid custom-container">
      <div class="add-edit-group-form">
        <h3>
          {{ $route.params.id ? $t("PAPER_WORK.EDIT") : $t("PAPER_WORK.ADD_NEW") }}
        </h3>
        <validation-observer v-slot="{ invalid }" ref="addEditPaperWorkForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="8" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="createPaperWork.name"
                    :label="$t('PAPER_WORK.NAME')"
                    :name="$t('PAPER_WORK.NAME')"
                    :rules="'required|min:3|max:100'"
                    :placeholder="$t('PAPER_WORK.PAPER_WORK_NAME_PLACEHOLDER')"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <ValidationProvider name="PAPER_WORKAudio">
                    <div class="hold-field">
                      <TextField
                        v-model="createPaperWork.paper_work_final_degree"
                        :label="$t('PAPER_WORK.paper_work_final_degree')"
                        :name="$t('PAPER_WORK.paper_work_final_degree')"
                        :rules="'required|numeric'"
                        :placeholder="$t('PAPER_WORK.DEGREE_INPUT_PLACEHOLDER')"
                      ></TextField>
                    </div>
                  </ValidationProvider>
                </div>
              </b-col>
              <b-col lg="12" class="mb-3">
                <div class="hold-field mt-4">
                  <UploadAttachment
                    v-if="!$route.params.id || createPaperWork.audioChangedRequest"
                    @setFileId="setAudioId"
                    :type-of-attachment="'audio'"
                    :accept-files="'audio/*'"
                  />
                  <PreviewMedia
                    v-if="$route.params.id && createPaperWork.audioChanged === false && !createPaperWork.audioChangedRequest"
                    :header="`${$t('PAPER_WORK.AUDIO')}`"
                    :media-name="createPaperWork.audio_name"
                    :file-size="createPaperWork.audio_size"
                    :typeOfMedia="'audio'"
                    :show-remove-button="true"
                    @removeFile="removeFile('audio','audioChanged','audioChangedRequest')"
                    @showModal="showModal(createPaperWork,$event)"/>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3 mt-4">
                <div class="hold-field">
                  <SelectSearch
                    :label="$t('PAPER_WORK.type')"
                    :placeholder="$t('PAPER_WORK.TYPE_INPUT_PLACEHOLDER')"
                    class="type custom-form-group"
                    :rules="'required'"
                    v-model="createPaperWork.type"
                    name="type"
                    :options="paperWorkTypes"
                    :get-option-label="(option) => option.text"
                    :reduce="(option) => option.value"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3 mt-1"></b-col>
              <b-col lg="6" class="mb-3 mt-4">
                <UploadAttachment
                  v-if="!$route.params.id || createPaperWork.fileChangedRequest"
                  @setFileId="setColoredFileId"
                  :type-of-attachment="'image'"
                  :accept-files="'image/*'"
                />
                <PreviewMedia
                  v-if="$route.params.id && createPaperWork.fileChanged === false && !createPaperWork.fileChangedRequest"
                  :header="`${$t('PAPER_WORK.color')}`"
                  :media-name="createPaperWork.paper_work_with_color_name"
                  :file-size="createPaperWork.paper_work_with_color_size"
                  :image-url="createPaperWork.file"
                  :typeOfMedia="'image'"
                  :show-remove-button="true"
                  @removeFile="removeFile('file','fileChanged','fileChangedRequest')"
                  @showModal="showModal(createPaperWork,$event,createPaperWork.file)"/>
              </b-col>
              <b-col lg="6" class="mb-3 mt-4">
                <UploadAttachment
                  v-if="!$route.params.id || createPaperWork.paper_work_without_colorChangedRequest"
                  @setFileId="setPrintFileId"
                  :type-of-attachment="'image'"
                  :accept-files="'image/*'"
                />
                <PreviewMedia
                  v-if="$route.params.id && createPaperWork.paper_work_without_colorChanged === false && !createPaperWork.paper_work_without_colorChangedRequest"
                  :header="`${$t('PAPER_WORK.print')}`"
                  :media-name="createPaperWork.paper_work_without_color_name"
                  :file-size="createPaperWork.paper_work_without_color_size"
                  :image-url="createPaperWork.paper_work_without_color"
                  :typeOfMedia="'image'"
                  :show-remove-button="true"
                  @removeFile="removeFile('paper_work_without_color','paper_work_without_colorChanged','paper_work_without_colorChangedRequest')"
                  @showModal="showModal(createPaperWork,$event,createPaperWork.paper_work_without_color)"/>
              </b-col>
              <b-col lg="6" class="mb-3 mt-3">
                <div class="hold-field">
                  <ValidationProvider>
                    <SelectSearch
                      v-model="createPaperWork.learning_path_id"
                      :label="$t('VIDEO.learning_path')"
                      :placeholder="$t('VIDEO.selectPath')"
                      :name="'learning_path'"
                      :options="paths"
                      :get-option-label="(option) => option.text"
                      :reduce="(option) => option.value"
                      :rules="'required'"
                      @input="getAllLessonBasedOnPath"
                    />
                  </ValidationProvider>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3 mt-3">
                <div class="hold-field">
                  <ValidationProvider rules="required">
                    <SelectSearch
                      v-model="createPaperWork.lesson_id"
                      :label="$t('LESSONS.videoNAME')"
                      :placeholder="$t('LESSONS.selectLesson')"
                      :name="'lesson'"
                      :options="lessons"
                      :get-option-label="(option) => option.name"
                      :reduce="(option) => option.id"
                      :rules="'required'"
                      :disabled="!createPaperWork.learning_path_id"
                    />
                  </ValidationProvider>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3 mt-3">
                <div class="hold-field">
                  <ValidationProvider>
                    <SelectSearch
                      v-model="createPaperWork.blooms"
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
                  <ValidationProvider>
                    <SelectSearch
                      v-model="createPaperWork.learning_styles"
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
                  <ValidationProvider>
                    <SelectSearch
                      v-model="createPaperWork.language_skills"
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
              <b-col lg="12" class="mb-3 mt-4">
                <UploadAttachment
                  v-if="!$route.params.id || createPaperWork.thumbnailChangedRequest"
                  @setFileId="setImageId"
                  :type-of-attachment="'image'"
                  :accept-files="'image/*'"
                />
                <PreviewMedia
                  v-if="$route.params.id && createPaperWork.thumbnailChanged === false && !createPaperWork.thumbnailChangedRequest"
                  :header="`${$t('PAPER_WORK.paperWorkThumbnail')}`"
                  :media-name="createPaperWork.thumbnail_name"
                  :file-size="createPaperWork.thumbnail_size"
                  :image-url="createPaperWork.thumbnail"
                  :typeOfMedia="'image'"
                  :show-remove-button="true"
                  @removeFile="removeFile('thumbnail','thumbnailChanged','thumbnailChangedRequest')"
                  @showModal="showModal(createPaperWork,$event,createPaperWork.thumbnail)"/>
              </b-col>
              <b-col lg="12" class="mb-3">
                <span class="custom-label">{{ $t("PAPER_WORK.Description") }} </span>
                <TextAreaField
                  v-model="createPaperWork.description"
                  :rules="'min:5|max:250'"
                  rows="5"
                  :name="$t('PAPER_WORK.Description')"
                  :placeholder="$t('PAPER_WORK.DESCRIPTION_INPUT_PLACEHOLDER')"
                >
                </TextAreaField>
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
                  :disabled="invalid || checkPaperWorkInputs"
                  custom-class="submit-btn"
                >
                  {{ $t("GLOBAL_SAVE") }}
                </Button>
                <Button
                  v-if="$route.params.id"
                  type="submit"
                  :loading="loading"
                  :disabled="invalid || checkPaperWorkInputsUpdate"
                  custom-class="submit-btn"
                >
                  {{ $t("GLOBAL_EDIT") }}
                </Button>
              </div>
            </b-row>
          </form>
        </validation-observer>
      </div>
    </div>
    <GeneralModal :id="'holdContent'" :size="'lg'" :hide-header="true">
      <template #modalBody>
        <div class="text-center">
          <div v-if="mediaType === 'audio'">
            <audio :src="url"
                   ref="player"
                   autoplay="autoplay"
                   controls="controls"></audio>
          </div>
          <div v-else class="height-modal">
            <img :src="url" class="image-modal">
          </div>
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
import {getSinglePaperworkRequest} from "@/api/paperWork";
import {getAllLearningPathsRequest} from "@/api/learningPath";
import {getAllLevelsRequest} from "@/api/level";
import ImageUploader from "@/components/Shared/ImageUploader/index.vue";
import {getAllTermsRequest} from "@/api/term";
import axios from "axios";
import {decode} from "qs/lib/utils";
import UploadAttachment from "@/components/Shared/UploadAttachment";
import {getLessonsRequest} from "@/api/lessons";
import {getAllLearningMethodsRequest} from "@/api/question";
import {getLearningSkillsRequest} from "@/api/learning-skill";
import {getBloomCategoriesRequest} from "@/api/bloom";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import PreviewMedia from "@/components/Shared/PreviewMedia/PreviewMedia.vue";
import GeneralModal from "@/components/Shared/GeneralModal/index.vue";

export default {
  components: {
    GeneralModal,
    PreviewMedia,
    ImageUploader,
    Modal,
    TextField,
    TextAreaField,
    Button,
    SelectField,
    UploadAttachment,
    SelectSearch,
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
      languageMethods: [],
      learningSkills: [],
      bloom: [],
      paperWorkTypes: [
        {value: "single", text: "اوراق عمل فردية"},
        {value: "participatory", text: "اوراق عمل تشاركية"},
      ],
      image: {
        fileImg: null,
        fileWithoutColor: null,
        img_url: null,
      },
      url: null,
      mediaType: null,
      createPaperWork: {
        // audio
        audio: null,
        audioChanged: false,
        audioChangedRequest: false,
        // file color
        file: null,
        fileChanged: false,
        fileChangedRequest: false,
        // file without
        paper_work_without_color: null,
        paper_work_without_colorChanged: false,
        paper_work_without_colorChangedRequest: false,
        //  thumbnail
        thumbnail: null,
        thumbnailChanged: false,
        thumbnailChangedRequest: false,
        //
        audio_name: '',
        audio_size: null,
        name: "",
        description: "",
        type: "",
        learning_path_id: "",
        level_id: "",
        term_id: "",
        paper_work_final_degree: null,
        uploadPrint: false,
        uploadColor: false,
        lesson_id: "",
        blooms: "",
        learning_styles: "",
        language_skills: "",
      },
    };
  },
  computed: {
    checkPaperWorkInputs() {
      if (this.createPaperWork.audio === null || this.createPaperWork.file === null || this.createPaperWork.paper_work_without_color === null || this.createPaperWork.thumbnail === null) {
        return true
      } else {
        return false
      }
    },
    checkPaperWorkInputsUpdate() {
      if (this.createPaperWork.audioChanged === true || this.createPaperWork.fileChanged === true || this.createPaperWork.paper_work_without_colorChanged === true || this.createPaperWork.thumbnailChanged === true) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    setAudioId(id) {
      this.createPaperWork.audio = id;
      this.createPaperWork.audioChanged = false
      this.createPaperWork.audioChangedRequest = true
    },
    setColoredFileId(id) {
      this.createPaperWork.file = id;
      this.createPaperWork.fileChanged = false
      this.createPaperWork.fileChangedRequest = true
    },
    setPrintFileId(id) {
      this.createPaperWork.paper_work_without_color = id;
      this.createPaperWork.paper_work_without_colorChanged = false
      this.createPaperWork.paper_work_without_colorChangedRequest = true
    },
    setImageId(id) {
      this.createPaperWork.thumbnail = id;
      this.createPaperWork.thumbnailChanged = false
      this.createPaperWork.thumbnailChangedRequest = true
    },
    removeFile(fileName, fileChange, fileRequest) {
      this.createPaperWork[fileName] = null
      this.createPaperWork[fileChange] = true
      this.createPaperWork[fileRequest] = true
    },
    showModal(paperWork, $event, fileUrl='') {
      this.$bvModal.show('holdContent')
      this.mediaType = $event
      if (this.mediaType === 'audio') {
        this.url = paperWork.audio
      } else {
        this.url = fileUrl
      }
    },
    hideModal() {
      this.$bvModal.hide('holdContent')
    },
    deleteImage(keyToShow, keyToSend) {
      this.image[keyToShow] = null;
      this.createPaperWork[keyToSend] = null;
    },
    checkEditPaperWork($event) {
      this.createPaperWork.uploadPrint = !!$event;
    },
    checkEditPaperWorkColor($event) {
      this.createPaperWork.uploadColor = !!$event;
    },
    handleUploadImage(e, keyToShow, keyToSend) {
      this.image[keyToShow] = URL.createObjectURL(e.target.files[0]);
      if (e) this.createPaperWork[keyToSend] = e.target.files[0];
      else return;
    },
    onSubmit() {
      // this.$refs.addEditPaperWorkForm.validate().then((success) => {
      //   if (!success) return;
      // });
      if (this.$route.params.id) {
        this.$emit("handleEditPaperWork", this.createPaperWork);
      } else {
        this.$emit("handleAddPaperWork", this.createPaperWork);
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getPaperWorkToEdit() {
      if (this.$route.params.id) {
        this.ApiService(getSinglePaperworkRequest(this.$route.params.id)).then((response) => {
          this.createPaperWork.name = response.data.data.name;
          // audio
          this.createPaperWork.audio = response.data.data.audio;
          this.createPaperWork.audio_size = response.data.data.audio_size;
          this.createPaperWork.audio_name = response.data.data.audio_name;
          // file
          this.createPaperWork.file = response.data.data.paper_work_with_color_full_url;
          this.createPaperWork.paper_work_with_color_size = response.data.data.paper_work_with_color_size;
          this.createPaperWork.paper_work_with_color_name = response.data.data.paper_work_with_color_name;
          // without color
          this.createPaperWork.paper_work_without_color = response.data.data.paper_work_without_color_full_url;
          this.createPaperWork.paper_work_without_color_size = response.data.data.paper_work_without_color_size;
          this.createPaperWork.paper_work_without_color_name = response.data.data.paper_work_without_color_name;
          //thumbnail

          this.createPaperWork.thumbnail = response.data.data.thumbnail;
          this.createPaperWork.thumbnail_size = response.data.data.thumbnail_size;
          this.createPaperWork.thumbnail_name = response.data.data.thumbnail_name;



          this.createPaperWork.type = response.data.data.type;
          this.createPaperWork.description = response.data.data.description;


          this.createPaperWork.learning_path_id = response.data.data.learningPath.id;
          this.createPaperWork.paper_work_final_degree = response.data.data.paper_work_final_degree;
          this.createPaperWork.blooms = response.data.data.blooms.id
          this.createPaperWork.lesson_id = response.data.data.lesson.id
          this.createPaperWork.learning_styles = response.data.data.learning_styles.map((item) => {
            return item.id
          })
          this.createPaperWork.language_skills = response.data.data.language_skills.map((item) => {
            return item.id
          })
          this.image.img_url = response.data.data.thumbnail;
        });
      }
    },
    getAllLearningPaths() {
      this.ApiService(getAllLearningPathsRequest()).then((response) => {
        const pathsArr = response.data.data;
        this.paths = pathsArr.map((path) => {
          return {value: path.id, text: path.name};
        });
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
    getTerms() {
      const params = {
        level_id: this.createPaperWork.level_id,
      };
      this.ApiService(getAllTermsRequest(params)).then((response) => {
        const termsArr = response.data.data;
        this.terms = termsArr.map((path) => {
          return {value: path.id, text: path.name};
        });
      });
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
    getAllLessonBasedOnPath() {
      this.ApiService(
        getLessonsRequest({learning_path_id: this.createPaperWork.learning_path_id})
      ).then((response) => {
        this.lessons = response.data.data;
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
  mounted() {
    this.getBloomCategories();
    this.getLanguageMethod();
    this.getLearningSkills();
    this.getPaperWorkToEdit();
    this.getAllLearningPaths();
    this.getAllLevels();
    if (this.$route.params.id) this.getTerms();
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
