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
                    placeholder="أدخل اسم التمرين"
                    :rules="'required|min:3|max:100'"
                  ></TextField>
                </div>
              </b-col>
              <!--              <b-col lg="6" class="mb-3">-->
              <!--                <div class="hold-field">-->
              <!--                  <SelectSearch-->
              <!--                    v-model="createQuiz.level_id"-->
              <!--                    :label="$t('QUIZZES.level')"-->
              <!--                    :name="$t('QUIZZES.level')"-->
              <!--                    :options="levels"-->
              <!--                    :reduce="(option) => option.id"-->
              <!--                    :get-option-label="(option) => option.name"-->
              <!--                    :rules="'required'"-->
              <!--                    @input="getTerms"-->
              <!--                  ></SelectSearch>-->
              <!--                </div>-->
              <!--              </b-col>-->
              <!--              <b-col lg="6" class="mb-3">-->
              <!--                <div class="hold-field">-->
              <!--                  <SelectSearch-->
              <!--                    v-model="createQuiz.term_id"-->
              <!--                    :label="$t('MISSIONS.terms')"-->
              <!--                    :name="$t('MISSIONS.terms')"-->
              <!--                    :options="terms"-->
              <!--                    :reduce="(option) => option.id"-->
              <!--                    :get-option-label="(option) => option.name"-->
              <!--                    :rules="'required'"-->
              <!--                    :disabled="!createQuiz.level_id"-->
              <!--                  ></SelectSearch>-->
              <!--                </div>-->
              <!--              </b-col>-->
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="createQuiz.learning_path_id"
                    label="المسار التعليمي"
                    name="المسار التعليمي"
                    placeholder="أختر المسار التعليمي"
                    :options="learningPaths"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                    @input="setLessonsBasedLearningPathId($event)"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="8" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="createQuiz.lessons"
                    :label="$t('LESSONS.videoNAME')"
                    :name="$t('LESSONS.videoNAME')"
                    :placeholder="$t('LESSONS.selectLesson')"
                    :options="lessons"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                    :disabled="!createQuiz.learning_path_id"
                    multiple="multiple"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="createQuiz.blooms"
                    :label="$t('QUESTIONS.BLOOM_CATEGORIES')"
                    :name="$t('QUESTIONS.BLOOM_CATEGORIES')"
                    :placeholder="createQuiz.blooms.length === 0 ? 'اختيار الكل' : $t('QUESTIONS.selectBLOOM_CATEGORIES')"
                    :options="bloomCategories"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :disabled="!createQuiz.learning_path_id"
                    multiple="multiple"
                    @input="selectAllCheckBloom(createQuiz.blooms)"
                  ></SelectSearch>
                  <!--                  multiple="multiple"-->
                </div>
              </b-col>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="createQuiz.learning_styles"
                    :label="$t('QUESTIONS.LEARNING_METHOD')"
                    :name="$t('QUESTIONS.LEARNING_METHOD')"
                    :placeholder="createQuiz.learning_styles.length === 0 ? 'اختيار الكل' : $t('QUESTIONS.selectLEARNING_METHOD')"
                    :options="learningMethods"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :disabled="!createQuiz.learning_path_id"
                    multiple="multiple"
                    @input="selectAllCheckLearning(createQuiz.learning_styles)"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="createQuiz.language_skills"
                    :label="$t('QUESTIONS.LANGUAGE_SKILLS')"
                    :name="$t('QUESTIONS.LANGUAGE_SKILLS')"
                    :placeholder="createQuiz.language_skills.length === 0 ? 'اختيار الكل' : $t('QUESTIONS.selectLANGUAGE_SKILLS')"
                    :options="languageSkills"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :disabled="!createQuiz.learning_path_id"
                    multiple="multiple"
                    @input="selectAllCheckSkills(createQuiz.language_skills)"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <!-- @input="changeQuestionType" -->
                  <SelectSearch
                    v-model="createQuiz.type"
                    :label="$t('QUIZZES.type')"
                    :name="$t('QUIZZES.type')"
                    placeholder="أختر نوع التمرين"
                    :options="typeList"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                    @input="setQuizType"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="createQuiz.order_type"
                    :label="$t('QUIZZES.sort')"
                    :name="$t('QUIZZES.sort')"
                    placeholder="أختر الترتيب"
                    :options="sortList"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <b-form-group
                    :label="$t('QUIZZES.description')"
                    v-slot="{ ariaDescribedby }"
                    class="description"
                  >
<!--                    required|min:3|-->
                    <TextAreaField
                      :name="$t('QUIZZES.description')"
                      placeholder="وصف التمرين"
                      :rules="'max:250'"
                      v-model="createQuiz.description"
                    />
                  </b-form-group>
                </div>
              </b-col>
              <div class="question-bank-holder">
                <div class="header">
                  <h4 class="mb-0">بنك الأسئلة</h4>
                  <div
                    v-if="easyCount || mediumCount || hardCount"
                    class="question-statistics"
                  >
                    <p class="mb-0">
                      الاسئلة السهلة <span>{{ easyCount }}</span>
                    </p>
                    <p class="mb-0">
                      الاسئلة المتوسطة <span>{{ mediumCount }}</span>
                    </p>
                    <p class="mb-0">
                      الاسئلة الصعبة <span>{{ hardCount }}</span>
                    </p>
                  </div>
                </div>
                <div class="statistics-content">
                  <b-row>
                    <b-col lg="2">
                      <div class="hold-field">
                        <SelectSearch
                          v-model="easyCount"
                          label="الاسئلة السهلة"
                          name="الاسئلة السهلة"
                          placeholder="أختر العدد"
                          :options="easyCountList"
                          :reduce="(option) => option"
                          :get-option-label="(option) => option"
                          :rules="'required'"
                          :disabled="
                            easyCountList.length == 0 || isGetQuestions
                          "
                        ></SelectSearch>
                      </div>
                    </b-col>
                    <b-col lg="2">
                      <div class="hold-field">
                        <SelectSearch
                          v-model="mediumCount"
                          label="الاسئلة المتوسطة"
                          name="الاسئلة المتوسطة"
                          placeholder="أختر العدد"
                          :options="mediumCountList"
                          :reduce="(option) => option"
                          :get-option-label="(option) => option"
                          :rules="'required'"
                          :disabled="
                            mediumCountList.length == 0 || isGetQuestions
                          "
                        ></SelectSearch>
                      </div>
                    </b-col>
                    <b-col lg="2">
                      <div class="hold-field">
                        <SelectSearch
                          v-model="hardCount"
                          label="الاسئلة الصعبة"
                          name="الاسئلة الصعبة"
                          placeholder="أختر العدد"
                          :options="hardCountList"
                          :reduce="(option) => option"
                          :get-option-label="(option) => option"
                          :rules="'required'"
                          :disabled="
                            hardCountList.length == 0 || isGetQuestions
                          "
                        ></SelectSearch>
                      </div>
                    </b-col>
                    <b-col lg="6">
                      <div class="mt-4">
                        <Button
                          custom-class="cancel-btn margin"
                          :disabled="isGetQuestions"
                          @click="getStatistics"
                        >
                          إستعادة
                        </Button>
                        <Button
                          v-if="isGetQuestions"
                          custom-class="submit-btn"
                          @click="resetGettingQuestion"
                        >إعادة ضبط
                        </Button
                        >
                        <Button
                          v-else
                          custom-class="submit-btn"
                          @click="getQuestionsList"
                          :disabled="!easyCount && !mediumCount && !hardCount"
                        >عرض الأسئلة
                        </Button
                        >
                      </div>
                    </b-col>
                  </b-row>
                </div>
              </div>

              <!--generated question table -->
              <div class="hold-table">
                <b-table
                  striped
                  :head-variant="'gradient'"
                  :tbody-class="'custom-body'"
                  :items="actions"
                  :fields="fieldsList"
                >
                  <template v-if="quizType == 92" #cell(#)="data">
                    <b-form-checkbox
                      v-model="selectedQestions"
                      :value="data.item.id"
                      class="permission-item item"
                    />
                  </template>
                  <template #cell(question_difficulty.name)="data">
                    <div
                      v-if="data.item.question_difficulty && data.item.question_difficulty.id == 1"
                      class="easy">
                      {{ data.item.question_difficulty.name }}
                    </div>
                    <div
                      v-else-if="data.item.question_difficulty && data.item.question_difficulty.id == 2"
                      class="medium">
                      {{ data.item.question_difficulty.name }}
                    </div>
                    <div
                      v-else-if="data.item.question_difficulty && data.item.question_difficulty.id == 3"
                      class="hard">
                      {{ data.item.question_difficulty.name }}
                    </div>
                  </template>
                  <template #empty>
                    <div class="text-center p-5">لا يوجد اسئلة لعرضها</div>
                  </template>
                  <template #cell(id)="data">
                    <div>
                      {{ data.index + 1 }}
                    </div>
                  </template>
                  <template #cell(random_question_action)="data">
                    <div class="random-question-actions">
                      <img
                        class="cursor-pointer"
                        src="@/assets/images/icons/view-random-question.svg"
                        @click="handleShowQuestionDetails(data.item.id)"
                      />
                    </div>
                  </template>
                  <template #cell(question)="data">
                    <span v-if="data.item.question_pattern === 'text'">{{
                        data.item.question ? data.item.question : data.item.name | cutString
                      }}</span>
                    <img
                      v-else-if="data.item.question_pattern === 'image'"
                      :src="data.item.question ? data.item.question : data.item.name"
                      class="question-image-show"
                    />
                    <audio
                      v-else-if="data.item.question_pattern === 'audio'"
                      controls
                    >
                      <source :src="data.item.question ? data.item.question : data.item.name"/>
                    </audio>
                  </template>
                </b-table>
              </div>
              <!-- <b-col
                v-if="createQuiz.level_id !== null && createQuiz.learning_path_id !== null"
                lg="12"
                class="mt-3 mb-4"
              >
                <h3>{{ $t("QUIZZES.systemQuestion") }}</h3>
              </b-col>
              <b-col
                v-if="createQuiz.level_id !== null && createQuiz.learning_path_id !== null"
                lg="12"
                class="mb-4"
              >
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
                          <p :class="isEditable ? 'question-type' : 'question-type-alt'">
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
                                <Button @click="handleShowQuestionDetails(item.id)"
                                  >{{ $t("GLOBAL_DETAILS") }}
                                </Button>
                              </div>
                            </div>
                          </draggable>
                        </b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                </div>
              </b-col> -->
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
import {
  getAllBloomCategoriesRequest,
  getAllLearningMethodsRequest,
  getAllLearningPathsRequest,
  getLaguageSkillsRequest,
} from "@/api/question";
import {
  getGeneralQuestionRequest,
  getQuestionDifficultyLevelLearnRequest,
  getQuizQuestionStatisticsRequest,
  getSingleQuizRequest,
  postRandomQuizRequest,
} from "@/api/quiz";
import draggable from "vuedraggable";
import QuestionDetailsModal from "@/components/Shared/QuestionDetailsModal/index.vue";
import {getAllLessonsRequest, getLessonsRequest} from "@/api/lessons";
import {getQuizTypeListRequest, getSortQuizTypeRequest} from "@/api/system";
import {debounce} from "lodash";
import {log} from "video.js";

export default {
  filters: {
    cutString(value) {
      if (value.length > 40) {
        return `${value.slice(0, 40)}...`;
      } else {
        return value;
      }
    },
  },
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
      quizId: this.$route.params.id,
      selectedQuestion: null,
      // levels: [],
      // terms: [],
      learningPaths: [],
      learningMethods: [],
      bloomCategories: [],
      languageSkills: [],
      typeList: [],
      sortList: [],
      easyCount: null,
      mediumCount: null,
      hardCount: null,
      easyCountList: [],
      mediumCountList: [],
      hardCountList: [],
      isGetQuestions: false,
      actions: [],
      selectedQestions: [],
      quizType: "",
      fieldsList: [
        {
          key: "#",
          label: "",
        },
        {
          key: "id",
          label: "التسلسل",
        },
        {
          key: "question",
          label: "نص السؤال",
        },
        {
          key: "question_type.name",
          label: "نوع السؤال",
        },
        {
          key: "sub_question_type.name",
          label: "نوع السؤال الفرعى",
        },
        {
          key: "question_difficulty.name",
          label: "مستوى السؤال",
        },
        {
          key: "random_question_action",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ],
      createQuiz: {
        name: "",
        // level_id: null,
        // term_id: null,
        total_question: 0,
        questions: [],
        learning_path_id: null,
        blooms: [],
        learning_styles: [],
        language_skills: [],
        lessons: [],
        description: "",
        type: "",
        order_type: "",
        selectAllOptionBloom: false,
        selectAllOptionLearning: false,
        selectAllOptionSkills: false,
      },
      lessons: [],
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
    // "createQuiz.level_id"() {
    //   this.showSystem();
    //   this.getGeneralQuestions();
    // },
    // "createQuiz.learning_path_id"() {
    //   this.showSystem();
    //   this.getGeneralQuestions();
    // },
    "createQuiz.lessons"() {
      this.getStatistics();
    },
    "createQuiz.blooms"() {
      this.getStatistics();
    },
    "createQuiz.learning_styles"() {
      this.getStatistics();
    },
    "createQuiz.language_skills"() {
      this.getStatistics();
    },
  },
  methods: {
    selectAllCheckBloom(bloom) {
      this.createQuiz.selectAllOptionBloom = bloom.includes("selectAll" || "اختيار الكل")
      if (this.createQuiz.selectAllOptionBloom) {
        return this.createQuiz.blooms = []
      }
    },
    selectAllCheckLearning(learning) {
      this.createQuiz.selectAllOptionLearning = learning.includes("selectAll" || "اختيار الكل")
      if (this.createQuiz.selectAllOptionLearning) {
        return this.createQuiz.learning_styles = []
      }
    },
    selectAllCheckSkills(Skills) {
      this.createQuiz.selectAllOptionSkills = Skills.includes("selectAll" || "اختيار الكل")
      if (this.createQuiz.selectAllOptionSkills) {
        return this.createQuiz.language_skills = []
      }
    },
    setQuizType: debounce(function () {
      this.quizType = this.createQuiz.type;
      this.isGetQuestions = false;
      this.actions = [];
    }, 200),
    resetGettingQuestion() {
      this.isGetQuestions = false;
      this.actions = [];
    },
    getStatistics: debounce(function () {
      if (this.createQuiz.lessons && this.createQuiz.lessons > 0) {
        let params = {
          learning_path_id: this.createQuiz.learning_path_id,
          lessons: this.createQuiz.lessons,
        };
        if (typeof this.createQuiz.blooms === 'object' && this.createQuiz.blooms && this.createQuiz.blooms.length > 0) {
          Object.assign(params, {blooms: this.createQuiz.blooms})
        }
        if (typeof this.createQuiz.learning_styles === 'object' && this.createQuiz.learning_styles && this.createQuiz.learning_styles.length > 0) {
          Object.assign(params, {learning_styles: this.createQuiz.learning_styles})
        }
        if (typeof this.createQuiz.learning_styles === 'object' && this.createQuiz.language_skills && this.createQuiz.language_skills.length > 0) {
          Object.assign(params, {language_skills: this.createQuiz.language_skills})
        }
        // language_skills: this.createQuiz.language_skills,
        // let lessons = this.createQuiz.lessons;
        // let blooms = this.createQuiz.blooms;
        // let learning_styles = this.createQuiz.learning_styles;
        // let language_skills = this.createQuiz.language_skills;
        // if (lessons && lessons.length > 0) params.lessons = lessons;
        // // else this.params.lessons = ''
        // if (blooms && blooms.length > 0) params.blooms = blooms;
        // // else this.params.blooms = ''
        // if (learning_styles && learning_styles.length > 0)
        //   params.learning_styles = learning_styles;
        // // else this.params.learning_styles = ''
        // if (language_skills && language_skills.length > 0)
        //   params.language_skills = language_skills;
        // // else this.params.language_skills = ''

        this.ApiService(getQuizQuestionStatisticsRequest(params)).then(
          (response) => {
            const data = response.data.data;
            this.easyCount = data[0].questions_count;
            this.mediumCount = data[1].questions_count;
            this.hardCount = data[2].questions_count;
            this.createTotalsLists();
            this.actions = [];
            this.isGetQuestions = false;
          }
        );
      } else return;
    }, 500),
    getQuestionsList() {
      const data = {
        learning_path_id: this.createQuiz.learning_path_id,
        lessons: this.createQuiz.lessons,
        // 'blooms[]': this.createQuiz.blooms,
        question_difficuly: [
          {
            question_difficulty_id: 1,
            questions_count: this.easyCount,
          },
          {
            question_difficulty_id: 2,
            questions_count: this.mediumCount,
          },
          {
            question_difficulty_id: 3,
            questions_count: this.hardCount,
          },
        ],
      };
      if (typeof this.createQuiz.blooms === 'object' && this.createQuiz.blooms && this.createQuiz.blooms.length > 0) {
        Object.assign(data, {blooms: this.createQuiz.blooms})
      }
      if (typeof this.createQuiz.learning_styles === 'object' && this.createQuiz.learning_styles && this.createQuiz.learning_styles.length > 0) {
        Object.assign(data, {learning_styles: this.createQuiz.learning_styles})
      }
      if (typeof this.createQuiz.learning_styles === 'object' && this.createQuiz.language_skills && this.createQuiz.language_skills.length > 0) {
        Object.assign(data, {language_skills: this.createQuiz.language_skills})
      }
      // learning_styles: this.createQuiz.learning_styles,
      //   language_skills: this.createQuiz.language_skills,
      //

      this.ApiService(postRandomQuizRequest(data)).then((response) => {
        this.actions = response.data.data;
        this.isGetQuestions = true;
        this.selectedQestions = this.actions.map((obj) => obj.id);
      });
    },
    createTotalsLists() {
      this.easyCountList = [];
      this.mediumCountList = [];
      this.hardCountList = [];

      for (let i = 0; i <= this.easyCount; i++) {
        this.easyCountList.push(i);
      }

      for (let i = 0; i <= this.mediumCount; i++) {
        this.mediumCountList.push(i);
      }

      for (let i = 0; i <= this.hardCount; i++) {
        this.hardCountList.push(i);
      }
    },
    handleShowQuestionDetails(questionId) {
      this.selectedQuestion = questionId;
      this.$bvModal.show("question-details-modal");
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
    // log() {
    //   this.createQuiz.type = "manual";
    // },
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
    setLessonsBasedLearningPathId: debounce(function ($event) {
      this.ApiService(getAllLessonsRequest({learning_path_id: $event})).then(
        (response) => {
          this.lessons = response.data.data;
          if (!this.$route.params.id) {
            this.createQuiz.lessons = null;
          }
        }
      );
    }, 500),
    onSubmit() {
      this.$refs.addEditQuizForm.validate().then((success) => {
        if (!success) return;
      });
      this.createQuiz.total_question = this.selectedQestions.length
      this.createQuiz.questions = this.selectedQestions
      if (this.$route.params.id) {
        this.$emit("handleEditQuiz", this.createQuiz);
      } else {
        this.$emit("handleAddQuiz", this.createQuiz);
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    // getAllLevels() {
    //   this.ApiService(getAllLevelsRequest()).then((response) => {
    //     this.levels = response.data.data;
    //   });
    // },
    getLearningPaths() {
      // const params = {page: 1};
      this.ApiService(getAllLearningPathsRequest()).then((response) => {
        this.learningPaths = response.data.data;
      });
    },
    // getQuestions() {
    //   let defaultQuiz = {
    //     level_id: this.createQuiz.level_id,
    //     learning_path_id: this.createQuiz.learning_path_id,
    //     question_difficuly: this.createQuiz.question_difficulty,
    //   };
    //   this.ApiService(
    //     getGeneralQuestionRequest({
    //       levelId: this.createQuiz.level_id,
    //       learnPathId: this.createQuiz.learning_path_id,
    //     })
    //   )
    //     .then((response) => {
    //       this.questionBank = response.data.data;
    //     })
    //     .then(
    //       () =>
    //         (this.questionBank = this.questionBank.map((item) => {
    //           return { id: item.id, name: item.question, fixed: false };
    //         }))
    //     )
    //     .finally(() => {
    //       this.ApiService(postRandomQuizRequest(defaultQuiz))
    //         .then((response) => {
    //           this.questions = response.data.data;
    //         })
    //         .then(() => {
    //           this.questions = this.questions.map((item) => {
    //             return { ...item, fixed: false };
    //           });
    //           this.questionsToSend = this.questionBank.filter((item) =>
    //             this.questions.map((item) => item.id).includes(item.id)
    //           );
    //           this.questionBank = this.questionBank.filter(
    //             (item) =>
    //               !this.questions.map((item) => item.id).includes(item.id)
    //           );
    //           this.createQuiz.questions = this.questionsToSend;
    //           this.enableToSendData = true;
    //         });
    //     });
    // },
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
    // getTerms() {
    //   const params = {
    //     level_id: this.createQuiz.level_id,
    //   };
    //   this.ApiService(getAllTermsRequest(params)).then((response) => {
    //     this.terms = response.data.data;
    //   });
    // },
    getBloomCategories() {
      this.ApiService(getAllBloomCategoriesRequest()).then((response) => {
        this.bloomCategories = response.data.data;
        this.bloomCategories.unshift({id: "selectAll", name: "اختيار الكل"})
      });
    },
    getLearningMethods() {
      this.ApiService(getAllLearningMethodsRequest()).then((response) => {
        this.learningMethods = response.data.data;
        this.learningMethods.unshift({id: "selectAll", name: "اختيار الكل"})
      });
    },
    getLanguageSkills() {
      this.ApiService(getLaguageSkillsRequest()).then((response) => {
        this.languageSkills = response.data.data;
        this.languageSkills.unshift({id: "selectAll", name: "اختيار الكل"})
      });
    },
    getQuizTypeList() {
      this.ApiService(getQuizTypeListRequest()).then((response) => {
        this.typeList = response.data.data;
      });
    },
    getSortQuizType() {
      this.ApiService(getSortQuizTypeRequest()).then((response) => {
        this.sortList = response.data.data;
      });
    },
  },
  mounted() {
    // if (this.$route.params.id) this.getTerms();
    // this.getAllLevels();
    if (this.createQuiz.learning_path_id && this.quizId)
      this.setLessonsBasedLearningPathId();
    this.getLearningPaths();
    this.getBloomCategories();
    this.getLearningMethods();
    this.getLanguageSkills();
    this.getQuizTypeList();
    this.getSortQuizType();
    // this.ApiService(getQuestionRequest()).then((response) => {
    //   this.questionBank = response.data.data
    // })
    if (this.$route.params.id) {
      let quizData;
      this.ApiService(getSingleQuizRequest(this.$route.params.id)).then((response) => {
        quizData = response.data.data
        this.createQuiz.name = quizData.name;
        this.createQuiz.description = quizData.description;
        this.createQuiz.learning_path_id = quizData.learning_path.id;
        this.createQuiz.lessons = quizData.lessons.map((item) => item.id)
        // this.createQuiz.blooms = quizData.blooms.id
        if (typeof quizData.blooms === 'object') {
          this.createQuiz.blooms = quizData.blooms.map((item) => item.id)
        } else {
          this.createQuiz.blooms = ["selectAll"]
        }
        if (typeof quizData.learning_styles === 'object') {
          this.createQuiz.learning_styles = quizData.learning_styles.map((item) => item.id)
        } else {
          this.createQuiz.learning_styles = ["selectAll"]
        }
        if (typeof quizData.language_skills === 'object') {
          this.createQuiz.language_skills = quizData.language_skills.map((item) => item.id)
        } else {
          this.createQuiz.language_skills = ["selectAll"]
        }
        this.createQuiz.type = quizData.type.id;
        this.createQuiz.order_type = quizData.order_type.id;
      }).then(() => {
        setTimeout(() => {
          this.question_difficulty = quizData.questions_difficulties.map((item) => Object.assign(item, {numberSelected: item.total_question}));
          this.createQuiz.total_question = this.question_difficulty.reduce((accumulator, currentValue) => accumulator + currentValue.numberSelected, 0);
          this.easyCount = this.question_difficulty.filter((item) => item.name === 'سهل')?.[0]?.numberSelected ? this.question_difficulty.filter((item) => item.name === 'سهل')?.[0]?.numberSelected : 0
          this.mediumCount = this.question_difficulty.filter((item) => item.name === 'متوسط')?.[0]?.numberSelected ? this.question_difficulty.filter((item) => item.name === 'متوسط')?.[0]?.numberSelected : 0
          this.hardCount = this.question_difficulty.filter((item) => item.name === 'صعب')?.[0]?.numberSelected ? this.question_difficulty.filter((item) => item.name === 'صعب')?.[0]?.numberSelected : 0
          this.createTotalsLists();
          // this.questionsToSend = this.questionBank.filter((item) => quizData.questions.map((item) => item.id).includes(item.id));
          this.actions = quizData.questions
          this.selectedQestions = quizData.questions.map(item => item.id)
        }, 1000)
      })
    }
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
