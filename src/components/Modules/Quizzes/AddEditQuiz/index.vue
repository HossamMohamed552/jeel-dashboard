<template>
  <div class="add-edit-term">
    <div class="container-fluid custom-container">
      <div class="add-edit-quiz-form">
        <h3>
          {{ $route.params.id ? $t("QUIZZES.EDIT") : $t("QUIZZES.ADD_NEW") }}
        </h3>
        <validation-observer v-slot="{ invalid }" ref="addEditQuizForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="createQuiz.name"
                    :label="$t('QUIZZES.name')"
                    :name="$t('QUIZZES.name')"
                    :rules="'required|min:3'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="createQuiz.level_id"
                    :label="$t('QUIZZES.level')"
                    :name="$t('QUIZZES.level')"
                    :options="levels"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                    @input="getTerms"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="createQuiz.term_id"
                    :label="$t('MISSIONS.terms')"
                    :name="$t('MISSIONS.terms')"
                    :options="terms"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                    :disabled="!createQuiz.level_id"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="createQuiz.learning_path_id"
                    :label="$t('QUIZZES.LEARNING_PATH')"
                    :name="$t('QUIZZES.LEARNING_PATH')"
                    :options="learningPaths"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    @input="changeQuestionType"
                    v-model="createQuiz.type"
                    :label="$t('QUIZZES.type')"
                    :name="$t('QUIZZES.type')"
                    :options="typeList"
                    :reduce="(option) => option.value"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <ValidationProvider v-slot="{errors, invalid}">
                    <label>{{ $t('QUIZZES.sort') }}</label>
                    <b-form-group v-slot="{ ariaDescribedby }" class="group-type">
                      <b-form-radio v-model="createQuiz.sort" value="0" name="sort_type">مرتب
                      </b-form-radio>
                      <b-form-radio v-model="createQuiz.sort" value="1" name="sort_type">
                        عشوائى
                      </b-form-radio>
                    </b-form-group>
                  </ValidationProvider>
                </div>
              </b-col>
              <b-col
                v-if="
                  createQuiz.level_id !== null &&
                  createQuiz.learning_path_id !== null
                "
                lg="12"
                class="mt-3 mb-4"
              >
                <h3>{{ $t("QUIZZES.systemQuestion") }}</h3>
              </b-col>
              <b-col
                v-if=" createQuiz.level_id !== null && createQuiz.learning_path_id !== null "
                lg="12" class="mb-4">
                <b-col v-if="createQuiz.level_id !== null && createQuiz.learning_path_id !== null"
                       lg="12" class="mt-3 mb-4">
                  <h3>{{ $t("QUIZZES.systemQuestion") }}</h3>
                </b-col>
                <div class="hold-system-question">
                  <b-row>
                    <b-col lg="12" class="mb-4">
                      <div>
                        <h5>
                          {{
                            $t("QUIZZES.totalNumberOfQuestions", {
                              number: createQuiz.total_question,
                            })
                          }}
                        </h5>
                      </div>
                    </b-col>
                    <b-col lg="5">
                      <b-row>
                        <b-col lg="4" v-for="question in question_difficulty">
                          <p
                            :class="
                              isEditable ? 'question-type' : 'question-type-alt'
                            "
                          >
                            {{ question.name }}
                          </p>
                          <span class="numberOfQuestions" v-if="!isEditable">{{
                              question.questions_count
                            }}</span>
                          <div class="hold-field" v-if="isEditable">
                            <select
                              v-model="question.numberSelected"
                              class="custom-selectBox form-control"
                              @change="changeQuizTypeGetQuestions"
                            >
                              <option
                                v-for="questionNumber in question.questions_count"
                                :key="questionNumber"
                                :value="questionNumber"
                              >
                                {{ questionNumber }}
                              </option>
                            </select>
                          </div>
                        </b-col>
                      </b-row>
                    </b-col>
                    <b-col lg="7">
                      <div class="hold-btn">
                        <Button
                          v-if="!isEditable"
                          :disabled="createQuiz.total_question === 0"
                          custom-class="transparent-btn rounded-btn"
                          @click="editOnQuestions"
                        >
                          {{ $t("QUIZZES.editQuestion") }}
                        </Button>
                        <Button
                          v-if="isEditable"
                          :disabled="createQuiz.total_question === 0"
                          custom-class="transparent-btn rounded-btn"
                          @click="isEditable = false"
                        >
                          {{ $t("QUIZZES.reset") }}
                        </Button>
                        <Button
                          custom-class="transparent-btn rounded-btn"
                          class="ml-2"
                          :disabled="createQuiz.total_question === 0"
                          @click="showQuestions"
                        >
                          {{ $t("QUIZZES.showQuestions") }}
                        </Button>
                      </div>
                    </b-col>
                    <b-col lg="12">
                      <b-row>
                        <b-col lg="6" class="mt-3" v-if="questions.length > 0">
                          <h3>بنك الاسئلة</h3>
                          <draggable
                            v-model="questionBank"
                            group="items"
                            :animation="150"
                            class="list-group"
                          >
                            <div
                              v-for="item in questionBank"
                              :key="item.id"
                              class="list-group-item"
                            >
                              {{ item.name }}
                            </div>
                          </draggable>
                        </b-col>
                        <b-col lg="6" class="mt-3" v-if="questions.length > 0">
                          <h3>الاسئلة المختاره</h3>
                          <draggable
                            v-model="questionsToSend"
                            group="items"
                            :animation="150"
                            class="list-group"
                            :sort="false"
                            @change="log"
                          >
                            <div
                              v-for="item in questionsToSend"
                              :key="item.id"
                              class="list-group-item"
                            >
                              <div class="question-holder-details">
                                <p class="mb-0 font-weight-bold">
                                  {{ item.name }}
                                </p>
                                <Button
                                  @click="handleShowQuestionDetails(item.id)"
                                >{{ $t("GLOBAL_DETAILS") }}
                                </Button
                                >
                              </div>
                            </div>
                          </draggable>
                        </b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                </div>
              </b-col>
              <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <TextAreaField
                    :label="$t('QUIZZES.description')"
                    :rules="'required|min:3'"
                    v-model="createQuiz.description"
                  />
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
                  :disabled="invalid || !enableToSendData"
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
    <QuestionDetailsModal
      :question-id="selectedQuestion"
      @closeModal="handleCloseQuestionDetailsModal"
    />
  </div>
</template>
<script>
import TextField from "@/components/Shared/TextField/index.vue";
import TextAreaField from "@/components/Shared/TextAreaField/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import SelectField from "@/components/Shared/SelectField/index.vue";
import {getAllLevelsRequest} from "@/api/level";
import {getAllLearningPathsRequest, getQuestionRequest} from "@/api/question";
import {
  getGeneralQuestionRequest,
  getQuestionDifficultyLevelLearnRequest,
  getSingleQuizRequest,
  postRandomQuizRequest,
} from "@/api/quiz";
import draggable from "vuedraggable";
import {getAllTermsRequest} from "@/api/term";
import QuestionDetailsModal from "@/components/Shared/QuestionDetailsModal/index.vue";

export default {
  components: {
    Modal,
    TextField,
    TextAreaField,
    Button,
    SelectSearch,
    SelectField,
    draggable,
    QuestionDetailsModal,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedQuestion: null,
      levels: [],
      terms: [],
      learningPaths: [],
      typeList: [
        {
          id: 1,
          name: "افتراضى",
          value: "default",
        },
        {
          id: 2,
          name: "اوتوماك",
          value: "automatic",
        },
        {
          id: 3,
          name: "يدوى",
          value: "manual",
        },
      ],
      createQuiz: {
        name: "",
        level_id: null,
        term_id: null,
        learning_path_id: null,
        total_question: null,
        description: "",
        type: "default",
        sort: "",
        questions: [],
      },
      question_difficulty: [],
      questionBank: [],
      questions: [],
      questionsToSend: [],
      isEditable: false,
      delayedDragging: false,
      editableDrag: true,
      enableToSendData: false,
    };
  },
  watch: {
    "createQuiz.level_id"() {
      this.showSystem();
      this.getGeneralQuestions();
    },
    "createQuiz.learning_path_id"() {
      this.showSystem();
      this.getGeneralQuestions();
    },
  },
  methods: {
    handleShowQuestionDetails(questionId) {
      this.selectedQuestion = questionId;
      this.$bvModal.show("question-details-modal");
      console.log("questionId: ", questionId);
    },
    handleCloseQuestionDetailsModal() {
      this.$bvModal.hide("question-details-modal");
      this.selectedQuestion = null;
    },
    getGeneralQuestions() {
      if (
        this.createQuiz.level_id !== null &&
        this.createQuiz.learning_path_id !== null
      ) {
        this.ApiService(
          getGeneralQuestionRequest({
            levelId: this.createQuiz.level_id,
            learnPathId: this.createQuiz.learning_path_id,
          })
        ).then((response) => {
          this.questionBank = response.data.data;
        });
      }
    },
    changeQuestionType() {
      if (this.createQuiz.type !== "default") {
        this.isEditable = true;
      } else if (this.createQuiz.type === "default") {
        this.isEditable = false;
      }
    },
    log() {
      this.createQuiz.type = "manual";
    },
    changeQuizTypeGetQuestions() {
      this.createQuiz.type = "automatic";
      this.getNumberQuestionDifficulty();
      this.showQuestions();
    },
    getNumberQuestionDifficulty() {
      this.createQuiz.total_question = this.question_difficulty.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.numberSelected,
        0
      );
    },
    showSystem() {
      if (
        this.createQuiz.level_id !== null &&
        this.createQuiz.learning_path_id !== null
      ) {
        this.getQuestionsDifficultyLevelLearn();
      }
    },
    getQuestionsDifficultyLevelLearn() {
      this.ApiService(
        getQuestionDifficultyLevelLearnRequest({
          levelId: this.createQuiz.level_id,
          learnPathId: this.createQuiz.learning_path_id,
        })
      ).then((response) => {
        let allQuestionsLevel = response.data.data;
        this.question_difficulty = allQuestionsLevel.map((item) =>
          Object.assign(item, {numberSelected: item.questions_count})
        );
        this.getNumberQuestionDifficulty();
      });
    },
    editOnQuestions() {
      this.isEditable = true;
    },
    onSubmit() {
      this.$refs.addEditQuizForm.validate().then((success) => {
        if (!success) return;
      });
      if (this.$route.params.id) {
        this.$emit("handleEditQuiz", this.createQuiz);
      } else {
        this.$emit("handleAddQuiz", this.createQuiz);
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getAllLevels() {
      this.ApiService(getAllLevelsRequest()).then((response) => {
        this.levels = response.data.data;
      });
    },
    getLearningPaths() {
      // const params = {page: 1};
      this.ApiService(getAllLearningPathsRequest()).then((response) => {
        this.learningPaths = response.data.data;
      });
    },
    getQuestions() {
      let defaultQuiz = {
        level_id: this.createQuiz.level_id,
        learning_path_id: this.createQuiz.learning_path_id,
        question_difficuly: this.createQuiz.question_difficulty,
      };
      this.ApiService(
        getGeneralQuestionRequest({
          levelId: this.createQuiz.level_id,
          learnPathId: this.createQuiz.learning_path_id,
        })
      )
        .then((response) => {
          this.questionBank = response.data.data;
        })
        .then(
          () =>
            (this.questionBank = this.questionBank.map((item) => {
              return {id: item.id, name: item.question, fixed: false};
            }))
        )
        .finally(() => {
          this.ApiService(postRandomQuizRequest(defaultQuiz))
            .then((response) => {
              this.questions = response.data.data;
            })
            .then(() => {
              this.questions = this.questions.map((item) => {
                return {...item, fixed: false};
              });
              this.questionsToSend = this.questionBank.filter((item) =>
                this.questions.map((item) => item.id).includes(item.id)
              );
              this.questionBank = this.questionBank.filter(
                (item) =>
                  !this.questions.map((item) => item.id).includes(item.id)
              );
              this.createQuiz.questions = this.questionsToSend;
              this.enableToSendData = true;
            });
        });
    },
    showQuestions() {
      let questionDifficultyMapped = [];
      questionDifficultyMapped = this.question_difficulty.map((item) => {
        return {
          question_difficulty_id: item.id,
          questions_count: item.numberSelected,
        };
      });
      this.createQuiz.question_difficulty = [...questionDifficultyMapped];
      this.getQuestions();
    },
    getTerms() {
      const params = {
        level_id: this.createQuiz.level_id,
      };
      this.ApiService(getAllTermsRequest(params)).then((response) => {
        this.terms = response.data.data;
      });
    },
  },
  mounted() {
    if (this.$route.params.id) this.getTerms();
    this.getAllLevels();
    this.getLearningPaths();
    // this.ApiService(getQuestionRequest()).then((response) => {
    //   this.questionBank = response.data.data
    // })
    if (this.$route.params.id) {
      this.ApiService(getSingleQuizRequest(this.$route.params.id)).then(
        (response) => {
          console.log("edit", response.data.data);
          this.createQuiz.name = response.data.data.name;
          this.createQuiz.description = response.data.data.description;
          this.createQuiz.level_id = response.data.data.level.id;
          this.createQuiz.term_id = response.data.data.term.id;
          this.createQuiz.learning_path_id =
            response.data.data.learning_path.id;
          this.createQuiz.type = response.data.data.type;
          this.question_difficulty =
            response.data.data.questions_difficulties.map((item) =>
              Object.assign(item, {numberSelected: item.questions_count})
            );
          this.createQuiz.total_question = this.question_difficulty.reduce(
            (accumulator, currentValue) =>
              accumulator + currentValue.numberSelected,
            0
          );
          this.questionsToSend = this.questionBank.filter((item) =>
            response.data.data.questions
              .map((item) => item.id)
              .includes(item.id)
          );
        }
      );
    }
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
