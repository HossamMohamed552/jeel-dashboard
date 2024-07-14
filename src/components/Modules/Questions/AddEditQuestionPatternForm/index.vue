<template>
  <validation-observer v-slot="{ invalid }" ref="addEditUserForm">
    <form @submit.prevent="onSubmit" class="mt-5">
      <b-row>
        <b-col lg="6" class="mb-3">
          <div class="hold-field">
            <SelectSearch
              v-model="formValues.question_type_id"
              :label="$t('QUESTIONS.QUESTION_PATTERN')"
              :name="$t('QUESTIONS.QUESTION_PATTERN')"
              :placeholder="$t('QUESTIONS.selectQUESTION_PATTERN')"
              :options="questionTypes"
              :reduce="(option) => option.id"
              :get-option-label="(option) => option.name"
              :rules="'required'"
              :disabled="$route.name.includes('edit')"
              @input="getSubQuestionTypes(formValues.question_type_id)"
            ></SelectSearch>
          </div>
        </b-col>
        <b-col lg="6" class="mb-3">
          <div class="hold-field">
            <SelectSearch
              v-model="formValues.question_type_sub_id"
              :label="$t('QUESTIONS.QUESTION_SUB_PATTERN')"
              :name="$t('QUESTIONS.QUESTION_SUB_PATTERN')"
              :placeholder="$t('QUESTIONS.selectQUESTION_SUB_PATTERN')"
              :options="questionSubTypes"
              :reduce="(option) => option.id"
              :get-option-label="(option) => option.name"
              :rules="'required'"
              :disabled="!formValues.question_type_id || $route.name.includes('edit')"
              @input="setQuestionSlug($event)"
            ></SelectSearch>
          </div>
        </b-col>
        <b-col lg="12">
          <img v-if="formValues.question_slug === null" src="@/assets/images/bg/login.png"
               class="question_img cover mb-3" alt="question image">
          <img :src="formValues.question_slug.question_type_image"
               v-if="formValues.question_slug && formValues.question_slug.question_type_image"
               class="question_img cover mb-3" alt="question image" @error="altImage">
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="12" class="mb-3">
          <TextField
            v-model="formValues.head_question"
            :label="$t('QUESTIONS.headQUESTION')"
            :name="$t('QUESTIONS.headQUESTION')"
            :placeholder="$t('QUESTIONS.enterHeadQUESTION')"
            :rules="'required|max:150'"
          ></TextField>
        </b-col>
        <b-col lg="12" class="mb-3">
          <UploadAttachment v-if="!$route.params.id || formValues.head_question_audioChangedRequest"
                            :type-of-attachment="'audio'"
                            :dropIdRef="'headerQuestionFile'"
                            :accept-files="'audio/*'" :label="$t('QUESTIONS.headerQuestionAudio')"
                            :name="'headerQuestionFile'"
                            :rules="'required'"
                            @setFileId="setQuestionAudioId('head_question_audio',$event)"
                            @setFileUrl="setQuestionAudioUrl('head_question_audioUser',$event)"/>
          <PreviewMedia
            v-if="$route.params.id && formValues.head_question_audioChanged === false && !formValues.head_question_audioChangedRequest"
            :header="$t('QUESTIONS.headerQuestionAudio')"
            :media-name="formValues.head_question_audio_name"
            :file-size="formValues.head_question_audio_size"
            :image-url="formValues.head_question_audioPreview"
            :typeOfMedia="'audio'"
            :showRemoveButton="true"
            @removeFile="removeFile('head_question_audio','head_question_audioChanged','head_question_audioChangedRequest')"
          />
        </b-col>
        <b-col lg="4" class="mb-3">
          <div class="hold-field">
            <SelectSearch
              v-model="formValues.learning_path_id"
              :label="$t('QUESTIONS.questionLearningPath')"
              :name="$t('QUESTIONS.questionLearningPath')"
              :placeholder="$t('QUESTIONS.selectQuestionLearningPath')"
              :options="learningPaths"
              :reduce="(option) => option.id"
              :get-option-label="(option) => option.name"
              :rules="'required'"
              :disabled="$route.name.includes('edit')"
              @input="setLessonsBasedLearningPathId($event)"
            ></SelectSearch>
          </div>
        </b-col>
        <b-col lg="8" class="mb-3">
          <div class="hold-field">
            <SelectSearch
              v-model="formValues.lesson_id"
              :label="$t('LESSONS.videoNAME')"
              :name="$t('LESSONS.videoNAME')"
              :placeholder="$t('LESSONS.selectLesson')"
              :options="lessons"
              :reduce="(option) => option.id"
              :get-option-label="(option) => option.name"
              :rules="'required'"
              :disabled="!formValues.learning_path_id || $route.name.includes('edit')"
            ></SelectSearch>
          </div>
        </b-col>
        <b-col lg="4" class="mb-3">
          <div class="hold-field">
            <SelectSearch
              v-model="formValues.bloom_category_id"
              :label="$t('QUESTIONS.BLOOM_CATEGORIES')"
              :name="$t('QUESTIONS.BLOOM_CATEGORIES')"
              :placeholder="$t('QUESTIONS.selectBLOOM_CATEGORIES')"
              :options="bloomCategories"
              :reduce="(option) => option.id"
              :get-option-label="(option) => option.name"
              :disabled="$route.name.includes('edit')"
              :rules="'required'"
            ></SelectSearch>
          </div>
        </b-col>
        <b-col lg="4" class="mb-3">
          <div class="hold-field">
            <SelectSearch
              v-model="formValues.language_method_id"
              :label="$t('QUESTIONS.LEARNING_METHOD')"
              :name="$t('QUESTIONS.LEARNING_METHOD')"
              :placeholder="$t('QUESTIONS.selectLEARNING_METHOD')"
              :options="learningMethods"
              :reduce="(option) => option.id"
              :get-option-label="(option) => option.name"
              :disabled="$route.name.includes('edit')"
              :rules="'required'"
              multiple="multiple"
            ></SelectSearch>
          </div>
        </b-col>
        <b-col lg="4" class="mb-3">
          <div class="hold-field">
            <SelectSearch
              v-model="formValues.language_skill_id"
              :label="$t('QUESTIONS.LANGUAGE_SKILLS')"
              :name="$t('QUESTIONS.LANGUAGE_SKILLS')"
              :placeholder="$t('QUESTIONS.selectLANGUAGE_SKILLS')"
              :options="languageSkills"
              :reduce="(option) => option.id"
              :get-option-label="(option) => option.name"
              :rules="'required'"
              :disabled="$route.name.includes('edit')"
              multiple="multiple"
            ></SelectSearch>
          </div>
        </b-col>
        <b-col lg="4" class="mb-3">
          <div class="hold-field">
            <SelectSearch
              v-model="formValues.question_objective_id"
              :label="$t('OBJECTIVE.OBJECTIVE')"
              :name="$t('OBJECTIVE.OBJECTIVE')"
              :placeholder="$t('OBJECTIVE.selectOBJECTIVE')"
              :options="objectives"
              :reduce="(option) => option.id"
              :get-option-label="(option) => option.name"
              :rules="'required'"
              :disabled="!formValues.learning_path_id || !formValues.lesson_id || $route.name.includes('edit')"
            ></SelectSearch>
          </div>
        </b-col>
        <b-col lg="4" class="mb-3">
          <div class="hold-field">
            <SelectSearch
              v-model="formValues.question_outcome_id"
              :label="$t('OUTCOME.OUTCOME')"
              :name="$t('OUTCOME.OUTCOME')"
              :placeholder="$t('OUTCOME.selectOUTCOME')"
              :options="outcomes"
              :reduce="(option) => option.id"
              :get-option-label="(option) => option.name"
              :rules="'required'"
              :disabled="!formValues.learning_path_id || !formValues.lesson_id || $route.name.includes('edit')"
            ></SelectSearch>
          </div>
        </b-col>
        <b-col lg="4" class="mb-3">
          <div class="hold-field">
            <SelectSearch
              v-model="formValues.question_difficulty_id"
              :label="$t('QUESTIONS.QUESTIONDIFFICULTIES')"
              :name="$t('QUESTIONS.QUESTIONDIFFICULTIES')"
              :placeholder="$t('QUESTIONS.selectQUESTIONDIFFICULTIES')"
              :options="questionDifficulties"
              :reduce="(option) => option.id"
              :get-option-label="(option) => option.name"
              :disabled="$route.name.includes('edit')"
              :rules="'required'"
            ></SelectSearch>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="12">
          <div class="action-holder d-flex justify-content-between align-items-center">
            <Button @click="handleCancel" custom-class="cancel-btn margin mr-0">
              {{ $t("GLOBAL_CANCEL") }}
            </Button>
            <Button v-if="!$route.params.id"
              type="submit"
              :loading="loading"
              :disabled="invalid"
              :custom-class="'submit-btn'"
            >
              {{ $t("GLOBAL_NEXT") }}
            </Button>
            <Button
              v-else
              type="submit"
              :loading="loading"
              :disabled="invalid || checkHeadOfQuestion"
              :custom-class="'submit-btn'"
            >
              {{ $t("GLOBAL_NEXT") }}
            </Button>
          </div>
        </b-col>
      </b-row>
    </form>
  </validation-observer>
</template>
<script>

import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import {debounce} from "lodash";
import TextField from "@/components/Shared/TextField/index.vue";
import UploadAttachment from "@/components/Shared/UploadAttachment/index.vue";
import {getAllLessonsRequest, getLessonsRequest} from "@/api/lessons";
import {getAllObjectivesRequest} from "@/api/objective";
import {getAllOutcomesRequest} from "@/api/outcome";
import ApiService from "@/api/ApiService";
import {getSingleQuestionRequest} from "@/api/question";
import PreviewMedia from "@/components/Shared/PreviewMedia/PreviewMedia.vue";

export default {
  components: {
    PreviewMedia,
    UploadAttachment,
    TextField,
    SelectSearch,
    Button,
  },
  props: {
    questionTypes: {
      type: Array,
      default: () => [],
    },
    questionSubTypes: {
      type: Array,
      default: () => [],
    },
    learningPaths: {
      type: Array,
      default: () => [],
    },
    bloomCategories: {
      type: Array,
      default: () => [],
    },
    learningMethods: {
      type: Array,
      default: () => [],
    },
    languageSkills: {
      type: Array,
      default: () => [],
    },
    questionDifficulties: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      lessons: [],
      objectives: [],
      outcomes: [],
      question: null,
      formValues: {
        question_type_id: null,
        question_type_sub_id: null,
        question_slug: null,
        main_question_slug: null,
        learning_path_id: null,
        language_skill_id: null,
        question_difficulty_id: null,
        bloom_category_id: null,
        lesson_id: null,
        language_method_id: null,
        question_objective_id: null,
        question_outcome_id: null,
        question_pattern: "text",
        head_question: "",
        head_question_audio: "",
        header_question_audioUser: "",
        head_question_audioChanged: false,
        head_question_audioChangedRequest: false,
        head_question_audioPreview:"",
        head_question_audio_name:"",
        head_question_audio_size:"",
      },
    };
  },
  watch: {
    "formValues.lesson_id"(newVal) {
      let params = {
        learning_path_id: this.formValues.learning_path_id,
        lesson_id: newVal
      }
      this.getObjectivesRequest(params)
      this.getOutcomesRequest(params)
    }
  },
  computed:{
    checkHeadOfQuestion() {
      return this.formValues.head_question_audio === null;
    },
  },
  methods: {
    setMainQuestionSlug($event) {
      this.formValues.main_question_slug = this.questionTypes.filter((item) => item.id === $event)[0]
    },
    setQuestionSlug($event) {
      this.formValues.question_slug = this.questionSubTypes.filter((item) => item.id === $event)[0]
    },
    onSubmit() {
      this.$emit("onSubmit", this.formValues)
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    removeFile(fileName, fileChange, fileRequest) {
      this.formValues[fileChange] = true
      this.formValues[fileName] = null
      this.formValues[fileRequest] = true
    },
    getSubQuestionTypes: debounce(function (id) {
      this.setMainQuestionSlug(id)
      this.$emit("getSubQuestionTypes", id);
    }, 300),
    altImage($event) {
      $event.target.src = require("@/assets/images/logo-white.png")
    },
    setQuestionAudioId(keyName, $event) {
      this.formValues[keyName] = $event
    },
    setQuestionAudioUrl(keyName, $event) {
      this.formValues[keyName] = $event
    },
    setLessonsBasedLearningPathId($event) {
      this.ApiService(getAllLessonsRequest({learning_path_id: $event})).then((response) => {
        this.lessons = response.data.data
        this.formValues.lesson_id = null
        if (this.$route.params.id) {
          this.formValues.lesson_id = this.question.lesson.id
        }
      })
    },
    getObjectivesRequest(params) {
      this.ApiService(getAllObjectivesRequest(params)).then((response) => {
        this.objectives = response.data.data
      })
    },
    getOutcomesRequest(params) {
      this.ApiService(getAllOutcomesRequest(params)).then((response) => {
        this.outcomes = response.data.data
      })
    },
    getQuestionById() {
      ApiService(getSingleQuestionRequest(this.$route.params.id)).then((response) => {
        this.question = response.data.data
        this.formValues.question_type_id = this.question.question_type.id
        this.getSubQuestionTypes(this.formValues.question_type_id)
        this.formValues.question_type_sub_id = this.question?.sub_question_type?.id
        this.formValues.head_question = this.question.head_question
        this.formValues.learning_path_id = this.question.learningPath.id
        this.formValues.bloom_category_id = this.question.blooms.id
        this.formValues.language_method_id = this.question.learning_styles.map(item => item.id)
        this.formValues.language_skill_id = this.question.language_skills.map(item => item.id)
        this.formValues.question_objective_id = this.question.question_objective.id
        this.formValues.question_outcome_id = this.question.question_outcome.id
        this.formValues.question_difficulty_id = this.question.question_difficulty.id
        this.formValues.head_question_audio_name  = this.question.head_question_audio_name
        this.formValues.head_question_audio_size  = this.question.head_question_audio_size
        this.formValues.head_question_audioPreview  = this.question.head_question_audio
        setTimeout(() => {
          this.setQuestionSlug(this.formValues.question_type_sub_id)
        }, 1500)
      })
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.getQuestionById()
    }
  }
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
