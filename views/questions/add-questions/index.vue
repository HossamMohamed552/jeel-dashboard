<template>
  <div class="add-question">
    <Modal :content-message="'تمت الإضافة بنجاح'" :showModal="showModal" :is-success="true"/>
    <AddEditQuestionPatternForm
      v-if="currentStep === -1"
      :loading="loading"
      :question-types="questionTypes"
      :question-sub-types="questionSubTypes"
      @getSubQuestionTypes="getQuestionSubTypes"
      @handleCancel="handleCancel"
      @onSubmit="getQuestionPatternData"
    />
    <Stepper
      v-if="currentStep === 0 || currentStep === 1 || currentStep === 2"
      class="mt-5 mb-3"
      :steps="steps"
      :current-step="currentStep"
    />
    <AddEditQuestionFieldsForm
      v-if="currentStep === 0"
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
      v-if="currentStep === 1"
      :questionSlug="collectData.question_slug"
      :question-pattern="questionPattern"
      @handleBack="goToQuestionFieldsForm"
      @handleCancel="handleCancel"
      @onSubmit="getSecondStepData"
    />
    <div v-if="currentStep === 2" class="qustion-review">
      <b-container>
        <b-row>
          <b-col lg="3">
            <h6>{{ $t("QUESTIONS.QUESTION_PATTERN") }}</h6>
            <p>{{ getName(this.questionTypes, this.collectData.question_type_id) }}</p>
          </b-col>
          <b-col lg="3">
            <h6>{{ $t("QUESTIONS.QUESTION_SUB_PATTERN") }}</h6>
            <p>{{ getName(this.questionSubTypes, this.collectData.question_type_sub_id) }}</p>
          </b-col>
          <b-col lg="3">
            <h6>{{ $t("QUESTIONS.LEARNING_PATH") }}</h6>
            <p>{{ getName(this.learningPaths, this.collectData.learning_path_id) }}</p>
          </b-col>
          <b-col lg="3">
            <h6>{{ $t("QUESTIONS.LANGUAGE_SKILLS") }}</h6>
            <p>{{ getName(this.languageSkills, this.collectData.language_skill_id) }}</p>
          </b-col>
          <b-col lg="3">
            <h6>{{ $t("QUESTIONS.QUESTIONDIFFICULTIES") }}</h6>
            <p>{{ getName(this.questionDifficulties, this.collectData.question_difficulty_id) }}</p>
          </b-col>
          <b-col lg="3">
            <h6>{{ $t("QUESTIONS.BLOOM_CATEGORIES") }}</h6>
            <p>{{ getName(this.bloomCategories, this.collectData.bloom_category_id) }}</p>
          </b-col>
          <b-col lg="3">
            <h6>{{ $t("QUESTIONS.LEARNING_METHOD") }}</h6>
            <p>{{ getName(this.learningMethods, this.collectData.language_method_id) }}</p>
          </b-col>
          <b-col lg="3">
            <h6>{{ $t("QUESTIONS.TYPE") }}</h6>
            <p>{{ this.collectData.question_pattern }}</p>
          </b-col>
          <b-col lg="3">
            <h6>{{ $t("QUESTIONS.LEVELS") }}</h6>
            <p>{{ getName(this.levels, this.collectData.level_id) }}</p>
          </b-col>
        </b-row>
        <hr/>
        <b-row>
          <b-col lg="6">
            <h6
              v-if="collectData.question_pattern === 'text' || collectData.question_pattern === 'audio'">
              {{ $t('QUESTIONS.QUESTION') }}</h6>
            <p v-if="collectData.question_pattern === 'text' &&  collectData.question">
              {{ collectData.question }}</p>
            <h6 v-if="collectData.questionImage">{{ $t('QUESTIONS.QUESTIONIMAGE') }}</h6>
            <img class="question_img" v-if="collectData.questionImage"
                 :src="collectData.questionImage">
            <img class="question_img"
                 v-else-if="collectData.question_pattern === 'image' &&  collectData.questionImage"
                 :src="collectData.questionImage">
            <p v-if="collectData.question_pattern === 'audio' &&  collectData.question">
              {{ collectData.question.name }}</p>
          </b-col>
          <b-col lg="6">
            <h6 v-if="collectData.hint">{{ $t('QUESTIONS.HINT') }}</h6>
            <p v-if="collectData.hint"> {{ collectData.hint }}</p>
          </b-col>
          <b-col v-for="(answer, idx) in collectData.answers" :key="idx" lg="3">
            <h6>{{ `${$t('QUESTIONS.ANSWER')} ${idx + 1}` }}</h6>
            <p v-if="answer.answer_pattern === 'text'">{{ answer && answer.answer }}</p>
            <img class="question_img" v-else-if="answer.answer_pattern === 'image'"
                 :src="answer.answerImage">
            <p v-if="answer.answer_pattern === 'audio'">
              {{ answer.audioName ? answer.audioName : answer.answer.name }}</p>
          </b-col>
          <b-col lg="12"
                 v-if="!questionTypeSlug.includes('order') || !questionTypeSlug.includes('match')">
            <h6>{{ $t('QUESTIONS.RIGHT_ANSWER') }}</h6>
            <b-row>
              <b-col v-for="correctAnswer in getCorrectAnswer(collectData.answers,1)"
                     :key="correctAnswer.id">
                <p v-if="correctAnswer.answer_pattern === 'text'">{{ correctAnswer.answer }}</p>
                <img v-if="correctAnswer.answer_pattern === 'image'" class="question_img"
                     :src="correctAnswer.answerImage"/>
                <p v-if="correctAnswer.answer_pattern === 'audio'">{{
                    correctAnswer.audioName ? correctAnswer.audioName : correctAnswer.answer.name
                  }}</p>
              </b-col>
            </b-row>
          </b-col>
          <b-col lg="12" v-if="questionTypeSlug.includes('order')">
            <h6>{{ $t('QUESTIONS.RIGHT_sequence') }}</h6>
            <b-row>
              <b-col v-for="correctAnswer in collectData.answers" :key="correctAnswer.id" lg="12">
                <p v-if="correctAnswer.answer_pattern === 'text'">{{ correctAnswer.answer }}</p>
                <img class="question_img" v-else-if="correctAnswer.answer_pattern === 'image'"
                     :src="correctAnswer.answerImage">
                <p v-if="correctAnswer.answer_pattern === 'audio'">{{
                    correctAnswer.audioName ? correctAnswer.audioName : correctAnswer.answer.name
                  }}</p>
              </b-col>
            </b-row>
          </b-col>
          <b-col lg="12" v-if="questionTypeSlug.includes('match')">
            <div v-for="(matchAnswer,index) in collectData.answers" :key="index" class="d-flex justify-content-start align-items-center answer_match my-3">
              <p>{{ index + 1 }} - </p>
              <p v-if="matchAnswer.answer_pattern === 'text'">{{ matchAnswer.answer }}</p>
              <p v-if="matchAnswer.answer_pattern === 'audio'">{{matchAnswer.answer.name}}</p>
              <p class="to">إلى</p>
              <div v-for="(matchAnswerTo,index) in matchAnswer.answers_to" :key="index">
                <p v-if="matchAnswerTo.answer_pattern === 'text'">{{ matchAnswerTo.answer }}</p>
                <p v-if="matchAnswerTo.answer_pattern === 'audio'">{{matchAnswerTo.answer.name}}</p>
                <p v-if="matchAnswerTo.answer_pattern === 'image'"><img :src="matchAnswerTo.answerImage" alt="answer image" class="answer_image"></p>
              </div>
            </div>
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
    <ProgressModal :show="loading" :value="progress" :title="'السؤال'"
                   @cancel="cancelUpload()"></ProgressModal>
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
  getAllQuestionDifficultiesRequest,
  getAllLearningMethodsRequest,
} from "@/api/question";
import Stepper from "@/components/Shared/Stepper/index.vue";
import axios from "axios";
import VueCookies from "vue-cookies";
import globalAssetData from "@/mixins/getData/globalAssetData";
import ProgressModal from "@/components/Shared/ProgressModal/index.vue";

export default {
  mixins: [globalAssetData],
  components: {
    ProgressModal,
    Modal,
    Button,
    AddEditQuestionPatternForm,
    AddEditQuestionFieldsForm,
    Stepper,
    AddEditQuestionAnswersForm,
  },
  destroyed() {
    localStorage.removeItem('collectData')
  },
  data() {
    return {
      questionPattern: "",
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
      isDragSort: "",
      questionTypeSlug: "",
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
      correctAnswers: [],
      answerPattern: '',
      progress: 0
    };
  },
  mounted() {
    this.getQuestionTypes();
    this.getLanguageSkills();
    this.getQuestionDifficulties();
    this.getBloomCategories();
    this.getLearningMethods();
  },
  // watch:{
  //   collectData: {
  //     handler(newVal){
  //
  //     },
  //     deep: true
  //   }
  // },
  methods: {
    getQuestionTypes() {
      const params = {
        page: 1,
        main_questions: 1,
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
      this.questionTypeSlug = data.question_slug.slug;
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

      //set qestion pattern to step 2 (text, image or audio)
      this.questionPattern = data.question_pattern;
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
      localStorage.setItem("collectData", JSON.stringify(data));
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
      if (this.questionTypeSlug !== "order_text_with_question" || !this.questionTypeSlug.includes('match')) {
        let correctAnswer;
        if (list && list.length) {
          correctAnswer = list.filter((item) => item.correct === id);
          this.answerPattern = correctAnswer[0] ? correctAnswer[0].answer_pattern : ""
          this.correctAnswers = correctAnswer
          return correctAnswer
        }
      } else {
        return [];
      }
    },
    saveQuestion() {
      this.loading = true
      const formData = new FormData();
      formData.append("question_type_id", this.collectData.question_type_id);
      formData.append("question_type_slug", this.collectData.main_question_slug.slug);
      formData.append("question_type_sub_id", this.collectData.question_type_sub_id);
      formData.append("question_sub_type_slug", this.collectData.question_slug.slug);
      formData.append("learning_path_id", this.collectData.learning_path_id);
      formData.append("language_skill_id", this.collectData.language_skill_id);
      formData.append("question_difficulty_id", this.collectData.question_difficulty_id);
      formData.append("bloom_category_id", this.collectData.bloom_category_id);
      formData.append("language_method_id", this.collectData.language_method_id);
      formData.append("question_objective_id", this.collectData.question_objective_id);
      formData.append("question_outcome_id", this.collectData.question_outcome_id);
      formData.append("question_pattern", this.collectData.question_pattern);
      formData.append("level_id", this.collectData.level_id);
      if (this.collectData.question !== null) {
        formData.append("question", this.collectData.question);
      }
      if (this.collectData.question_image !== null && this.collectData.question_pattern === 'text') {
        formData.append("question_image", this.collectData.question_image);
      }
      if (this.collectData.question_pattern !== 'audio') {
        formData.append("question_audio", this.collectData.question_audio);
      }
      if (!this.questionTypeSlug.includes('true_false')) {
        formData.append("hint_audio", this.collectData.hint_audio);
        formData.append("hint", this.collectData.hint);
      }
      if (this.questionTypeSlug.includes('order_text_with_question') || this.questionTypeSlug.includes('order_text_without_question') || this.questionTypeSlug.includes('order_image_without_question')) {
        for (let answer = 0; answer < this.collectData.answers.length; answer++) {
          formData.append(`answers[${answer}][answer]`, this.collectData.answers[answer]?.answer);
          formData.append(`answers[${answer}][audio]`, this.collectData.answers[answer].audio);
          formData.append(`answers[${answer}][order]`, this.collectData.answers[answer].order);
          formData.append(`answers[${answer}][answer_pattern]`, this.collectData.answers[answer].answer_pattern);
        }
      } else if (this.questionTypeSlug === "order_voice_without_question") {
        for (let answer = 0; answer < this.collectData.answers.length; answer++) {
          formData.append(`answers[${answer}][answer]`, this.collectData.answers[answer]?.answer);
          formData.append(`answers[${answer}][order]`, this.collectData.answers[answer].order);
          formData.append(`answers[${answer}][answer_pattern]`, this.collectData.answers[answer].answer_pattern);
        }
      } else if (this.questionTypeSlug.includes('match')) {
        for (let answer = 0; answer < this.collectData.answers.length; answer++) {
          formData.append(`answers[${answer}][answer]`, this.collectData.answers[answer]?.answer);
          formData.append(`answers[${answer}][match_from]`, this.collectData.answers[answer]?.match_from);
          if (this.collectData.answers[answer]?.audio) {
            formData.append(`answers[${answer}][audio]`, this.collectData.answers[answer]?.audio);
          }
          formData.append(`answers[${answer}][answer_pattern]`, this.collectData.answers[answer]?.answer_pattern);
          for (let answerTo = 0; answerTo < this.collectData.answers[answer].answers_to.length; answerTo++) {
            formData.append(`answers[${answer}][answers_to][${answerTo}][answer]`, this.collectData.answers[answer].answers_to[answerTo]?.answer);
            formData.append(`answers[${answer}][answers_to][${answerTo}][match_to]`, this.collectData.answers[answer].answers_to[answerTo]?.match_to);
            if (this.collectData.answers[answer].answers_to[answerTo]?.audio) {
              formData.append(`answers[${answer}][answers_to][${answerTo}][audio]`, this.collectData.answers[answer].answers_to[answerTo]?.audio);
            }
            formData.append(`answers[${answer}][answers_to][${answerTo}][answer_pattern]`, this.collectData.answers[answer].answers_to[answerTo]?.answer_pattern);
          }
        }
      } else if (this.questionTypeSlug.includes('true_false')) {
        for (let answer = 0; answer < this.collectData.answers.length; answer++) {
          formData.append(`answers[${answer}][answer]`, this.collectData.answers[answer]?.answer);
          formData.append(`answers[${answer}][correct]`, this.collectData.answers[answer].correct);
          formData.append(`answers[${answer}][answer_pattern]`, this.collectData.answers[answer].answer_pattern);
        }
      } else {
        for (let answer = 0; answer < this.collectData.answers.length; answer++) {
          formData.append(`answers[${answer}][answer]`, this.collectData.answers[answer]?.answer);
          if (this.collectData.answers[answer].audio) {
            formData.append(`answers[${answer}][audio]`, this.collectData.answers[answer].audio);
          }
          formData.append(`answers[${answer}][correct]`, this.collectData.answers[answer].correct);
          formData.append(`answers[${answer}][answer_pattern]`, this.collectData.answers[answer].answer_pattern);
        }
      }
      axios
        .post("/questions", formData, {
          headers: {
            Authorization: `Bearer ${VueCookies.get("token")}`,
            locale: "ar",
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: ({loaded, total}) => {
            this.progress = Math.floor((loaded / total) * 100)
          }
        })
        .then((res) => {
          this.loading = false
          this.$router.push("/dashboard/questions");
        }).catch(() => this.loading = false);
    },
    cancelUpload() {
      this.loading = false
      this.cancelSource.cancel();
    }
  }
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
