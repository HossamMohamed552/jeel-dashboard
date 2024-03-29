<template>
  <div class="add-question">
    <Modal :content-message="'تمت الإضافة بنجاح'" :showModal="showModal" :is-success="true"/>
    <AddEditQuestionPatternForm
      v-show="currentStep === -1"
      :loading="loading"
      :question-types="questionTypes"
      :question-sub-types="questionSubTypes"
      @getSubQuestionTypes="getQuestionSubTypes"
      @handleCancel="handleCancel"
      @onSubmit="getQuestionPatternData"
    />
    <Stepper
      v-show="currentStep === 0 || currentStep === 1 || currentStep === 2"
      class="mt-5 mb-3"
      :steps="steps"
      :current-step="currentStep"
    />
    <AddEditQuestionFieldsForm
      v-show="currentStep === 0"
      :question-types="questionTypes"
      :question-sub-types="questionSubTypes"
      :question-types-values="questionTypesValues"
      :learning-paths="learningPaths"
      :language-skills="languageSkills"
      :question-difficulties="questionDifficulties"
      :bloom-categories="bloomCategories"
      :learning-methods="learningMethods"
      :levels="levels"
      @handleBack="goToQuestionPatternForm"
      @handleCancel="handleCancel"
      @onSubmit="getFirstStepData"
    />

    <AddEditQuestionAnswersForm
      v-show="currentStep === 1"
      :questionSlug="collectData.question_slug"
      @handleBack="goToQuestionFieldsForm"
      @handleCancel="handleCancel"
      @onSubmit="getSecondStepData"
    />

    <div v-show="currentStep === 2" class="qustion-review">
      <b-container>
        <b-row>
          <b-col lg="3">
            <h6>{{ $t('QUESTIONS.QUESTION_PATTERN') }}</h6>
            <p>{{ getName(this.questionTypes, this.collectData.question_type_id) }}</p>
          </b-col>
          <b-col lg="3">
            <h6>{{ $t('QUESTIONS.QUESTION_SUB_PATTERN') }}</h6>
            <p>{{ getName(this.questionSubTypes, this.collectData.question_type_sub_id) }}</p>
          </b-col>
          <b-col lg="3">
            <h6>{{ $t('QUESTIONS.LEARNING_PATH') }}</h6>
            <p>{{ getName(this.learningPaths, this.collectData.learning_path_id) }}</p>
          </b-col>
          <b-col lg="3">
            <h6>{{ $t('QUESTIONS.LANGUAGE_SKILLS') }}</h6>
            <p>{{ getName(this.languageSkills, this.collectData.language_skill_id) }}</p>
          </b-col>
          <b-col lg="3">
            <h6>{{ $t('QUESTIONS.QUESTIONDIFFICULTIES') }}</h6>
            <p>{{ getName(this.questionDifficulties, this.collectData.question_difficulty_id) }}</p>
          </b-col>
          <b-col lg="3">
            <h6>{{ $t('QUESTIONS.BLOOM_CATEGORIES') }}</h6>
            <p>{{ getName(this.bloomCategories, this.collectData.bloom_category_id) }}</p>
          </b-col>
          <b-col lg="3">
            <h6>{{ $t('QUESTIONS.LEARNING_METHOD') }}</h6>
            <p>{{ getName(this.learningMethods, this.collectData.language_method_id) }}</p>
          </b-col>
          <b-col lg="3">
            <h6>{{ $t('QUESTIONS.TYPE') }}</h6>
            <p>{{ this.collectData.question_pattern }}</p>
          </b-col>
          <b-col lg="3">
            <h6>{{ $t('QUESTIONS.LEVELS') }}</h6>
            <p>{{ getName(this.levels, this.collectData.level_id) }}</p>
          </b-col>
        </b-row>
        <hr/>
        <b-row>
          <b-col lg="6">
            <h6>{{ $t('QUESTIONS.QUESTION') }}</h6>
            <p>{{ this.collectData.question }}</p>
          </b-col>
          <b-col lg="6">
            <h6>{{ $t('QUESTIONS.HINT') }}</h6>
            <p>{{ this.collectData.hint }}</p>
          </b-col>
          <b-col v-for="(answer, idx) in this.collectData.answers" :key="idx" lg="3">
            <h6>{{ `${$t('QUESTIONS.ANSWER')} ${idx + 1}` }}</h6>
            <p>{{ answer && answer.answer }}</p>
          </b-col>
          <b-col lg="6" v-if="questionTypeSlug !== 'drag_and_drop_many'">
            <h6>{{ $t('QUESTIONS.RIGHT_ANSWER') }}</h6>
            <p v-if="getCorrectAnswer">
              {{ getCorrectAnswer(this.collectData.answers, this.correct_id) }}</p>
          </b-col>
        </b-row>
        <b-row>
          <div class="action-holder">
            <div>
              <Button :loading="loading" custom-class="submit-btn" @click="saveQuestion">
                {{ $t("GLOBAL_SAVE") }}
              </Button>
              <Button class="mx-3" @click="goToAnswersForm" custom-class="submit-btn back-btn">
                {{ $t("GLOBAL_BACK") }}
              </Button>
            </div>
            <Button @click="handleCancel" custom-class="cancel-btn margin">
              {{ $t("GLOBAL_CANCEL") }}
            </Button>
          </div>
        </b-row>
      </b-container>
    </div>
  </div>
</template>
<script>
import AddEditQuestionPatternForm
  from "@/components/Modules/Questions/AddEditQuestionPatternForm/index.vue";
import AddEditQuestionFieldsForm
  from "@/components/Modules/Questions/AddEditQuestionFieldsForm/index.vue";
import AddEditQuestionAnswersForm
  from "@/components/Modules/Questions/AddEditQuestionAnswersForm/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {
  getQuestionTypsRequest,
  getQuestionSubTypsRequest,
  getLaguageSkillsRequest,
  getQuestionDifficultiesRequest,
  getBloomCategoriesRequest,
  getLearningMethodsRequest,
  getAllLearningPathsRequest,
  getAllBloomCategoriesRequest,
  getAllQuestionDifficultiesRequest, getAllLearningMethodsRequest,
} from "@/api/question";
import Stepper from "@/components/Shared/Stepper/index.vue";
import axios from "axios";
import VueCookies from "vue-cookies";
import globalAssetData from "@/mixins/getData/globalAssetData";

export default {
  mixins: [globalAssetData],
  components: {
    Modal,
    Button,
    AddEditQuestionPatternForm,
    AddEditQuestionFieldsForm,
    Stepper,
    AddEditQuestionAnswersForm,
  },

  data() {
    return {
      loading: false,
      showModal: false,
      questionTypes: [],
      questionSubTypes: [],
      languageSkills: [],
      questionDifficulties: [],
      bloomCategories: [],
      learningMethods: [],
      collectData: {},
      questionTypesValues: {},
      correct_id: 1,
      isDragSort: '',
      questionTypeSlug: '',
      steps: [
        {
          icon: "1",
          title: this.$t("QUESTIONS.STEP_ONE"),
        },
        {
          icon: "2",
          title: this.$t("QUESTIONS.STEP_TWO"),
        },
        {
          icon: "3",
          title: this.$t("QUESTIONS.STEP_THREE"),
        },
      ],
      currentStep: -1,
    };
  },
  mounted() {
    this.getQuestionTypes();
    this.getLanguageSkills();
    this.getQuestionDifficulties();
    this.getBloomCategories();
    this.getLearningMethods();
  },
  methods: {
    getQuestionTypes() {
      const params = {
        page: 1,
        main_questions: 1
      };

      this.ApiService(getQuestionTypsRequest(params)).then((response) => {
        this.questionTypes = response.data.data;
      });
    },
    getQuestionSubTypes(parentId) {
      const params = {
        page: 1,
        parent_id: parentId,
      };

      this.ApiService(getQuestionSubTypsRequest(params)).then((response) => {
        this.questionSubTypes = response.data.data;
      });
    },
    getLanguageSkills() {
      const params = {
        page: 1,
      };

      this.ApiService(getLaguageSkillsRequest(params)).then((response) => {
        this.languageSkills = response.data.data;
      });
    },
    getQuestionDifficulties() {
      const params = {
        page: 1,
      };

      this.ApiService(getAllQuestionDifficultiesRequest(params)).then((response) => {
        this.questionDifficulties = response.data.data;
      });
    },
    getBloomCategories() {
      const params = {
        page: 1,
      };

      this.ApiService(getAllBloomCategoriesRequest(params)).then((response) => {
        this.bloomCategories = response.data.data;
      });
    },
    getLearningMethods() {
      // const params = {
      //   page: 1,
      // };

      this.ApiService(getAllLearningMethodsRequest()).then((response) => {
        this.learningMethods = response.data.data;
      });
    },

    goToQuestionPatternForm() {
      this.currentStep = -1;
    },
    goToQuestionFieldsForm() {
      this.currentStep = 0;
    },
    goToAnswersForm() {
      this.currentStep = 1;
    },

    handleCancel() {
      this.$router.push("/dashboard/questions");
    },
    getQuestionPatternData(data) {
      this.questionTypeSlug = data.question_slug.slug
      this.questionTypesValues = data;
      const object = {
        ...data,
      };
      this.handleAssignObject(object);
      this.handleNavigation(0);
    },

    getFirstStepData(data) {
      // data.choices_number = this.choicesNumber;
      // delete data.choices_number;
      const object = {
        ...data,
      };
      this.handleAssignObject(object);
      this.handleNavigation(1);
    },
    getSecondStepData(data) {
      const object = {
        ...data,
      };
      this.handleAssignObject(object);
      this.handleNavigation(2);
    },
    handleNavigation(value) {
      this.currentStep = value;
    },
    handleSaveCollectedData(data) {
      sessionStorage.setItem("collectData", data);
    },
    handleAssignObject(object) {
      Object.assign(this.collectData, {...object});
      this.handleSaveCollectedData(this.collectData);
    },
    getName(list, id) {
      if (id) {
        const name = list.find((item) => item.id == id).name;
        return name;
      }
    },
    getCorrectAnswer(list, id) {
      if (this.questionTypeSlug !== 'drag_and_drop_many') {
        let correctAnswer;
        if (list && list.length) {
          correctAnswer = list.find((item) => item.correct == id)?.answer;
          return correctAnswer;
        }
      } else {
        return []
      }
    },
    saveQuestion() {
      const formData = new FormData();
      formData.append("question_type_id", this.collectData.question_type_id);
      formData.append("question_type_sub_id", this.collectData.question_type_sub_id);
      formData.append("learning_path_id", this.collectData.learning_path_id);
      formData.append("language_skill_id", this.collectData.language_skill_id);
      formData.append("question_difficulty_id", this.collectData.question_difficulty_id);
      formData.append("bloom_category_id", this.collectData.bloom_category_id);
      formData.append("language_method_id", this.collectData.language_method_id);
      formData.append("question_pattern", this.collectData.question_pattern);
      formData.append("question_type_id", this.collectData.question_type_id);
      formData.append("level_id", this.collectData.level_id);
      formData.append("question", this.collectData.question);
      formData.append("question_audio", this.collectData.question_audio);
      formData.append("hint", this.collectData.hint);
      console.log(this.questionTypeSlug, "questionTypeSlug");
      console.log(typeof this.questionTypeSlug);
      if (this.questionTypeSlug === 'drag_and_drop_many') {
        for (let answer = 0; answer < this.collectData.answers.length; answer++) {
          formData.append(`answers[${answer}][answer]`, this.collectData.answers[answer]?.answer);
          formData.append(`answers[${answer}][audio]`, this.collectData.answers[answer].audio);
          formData.append(`answers[${answer}][order]`, this.collectData.answers[answer].order);
        }
      } else if (this.questionTypeSlug == 'match_one_to_one') {
        for (let answer = 0; answer < this.collectData.answers.length; answer++) {
          console.log(answer);
          formData.append(`answers[${answer}][answer]`, this.collectData.answers[answer]?.answer);
          formData.append(`answers[${answer}][match_from]`, this.collectData.answers[answer]?.match_from);
          formData.append(`answers[${answer}][audio]`, this.collectData.answers[answer]?.audio);
          formData.append(`answers[${answer}][answers_to][${0}][answer]`, this.collectData.answers[answer].answers_to[0]?.answer);
          formData.append(`answers[${answer}][answers_to][${0}][match_to]`, this.collectData.answers[answer].answers_to[0]?.match_to);
          formData.append(`answers[${answer}][answers_to][${0}][audio]`, this.collectData.answers[answer].answers_to[0]?.audio);
        }
      } else {
        for (let answer = 0; answer < this.collectData.answers.length; answer++) {
          formData.append(`answers[${answer}][answer]`, this.collectData.answers[answer]?.answer);
          formData.append(`answers[${answer}][audio]`, this.collectData.answers[answer].audio);
          formData.append(`answers[${answer}][correct]`, this.collectData.answers[answer].correct);
        }
      }
      axios
        .post("/questions", formData, {
          headers: {
            Authorization: `Bearer ${VueCookies.get("token")}`,
            locale: "ar",
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          this.$router.push("/dashboard/questions");
        });
    },
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
