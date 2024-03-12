<template>
  <div class="add-edit-competition">
    <div class="container-fluid custom-container">
      <div class="add-edit-competition-form">
        <validation-observer ref="addEditCompetitionForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <div v-if="!isGeneratedQuestion" class="question-counter-container">
              <b-row>
                <h5 class="title">الاسئلة</h5>
                <p v-if="disableRandomQuestionBtn" class="warning-error">
                  * يجب ان يكون مجموع عدد انواع الاسئلة الثلاثة مساوى لعدد الاسئلة الكلى
                </p>
              </b-row>

              <div class="question-counter-holder">
                <div class="question-counter">
                  <div class="total-count">
                    <div class="hold-field">
                      <SelectSearch
                        v-model="totalQuestionCount"
                        :label="$t('COMPETITIONS.QUESTION_NUMBER')"
                        :name="$t('COMPETITIONS.QUESTION_NUMBER')"
                        :options="totalQuestionCountList"
                        :reduce="(option) => option"
                        :get-option-label="(option) => option"
                        @input="checkTotalNumbers"
                      ></SelectSearch>
                    </div>
                  </div>
                  <div class="question-types">
                    <div class="hold-field">
                      <SelectSearch
                        v-model="totalEsay"
                        :label="$t('COMPETITIONS.EASY_QUESTIONS')"
                        :name="$t('COMPETITIONS.EASY_QUESTIONS')"
                        :options="totalEsayList"
                        :reduce="(option) => option"
                        :get-option-label="(option) => option"
                        @input="checkTotalNumbers"
                      ></SelectSearch>
                    </div>
                    <div class="hold-field">
                      <SelectSearch
                        v-model="totalMedium"
                        :label="$t('COMPETITIONS.MEDIUM_QUESTIONS')"
                        :name="$t('COMPETITIONS.MEDIUM_QUESTIONS')"
                        :options="totalMediumList"
                        :reduce="(option) => option"
                        :get-option-label="(option) => option"
                        @input="checkTotalNumbers"
                      ></SelectSearch>
                    </div>
                    <div class="hold-field">
                      <SelectSearch
                        v-model="totalHard"
                        :label="$t('COMPETITIONS.DIFFICULT_QUESTIONS')"
                        :name="$t('COMPETITIONS.DIFFICULT_QUESTIONS')"
                        :options="totalHardList"
                        :reduce="(option) => option"
                        :get-option-label="(option) => option"
                        @input="checkTotalNumbers"
                      ></SelectSearch>
                    </div>
                  </div>
                </div>
                <div class="counter-actions">
                  <Button
                    :loading="loading"
                    :custom-class="'submit-btn'"
                    :disabled="disableRandomQuestionBtn"
                    @click="handleDataForgenerateRandomQuestions"
                  >
                    إنشاء الأسئلة
                  </Button>
                </div>
              </div>
            </div>

            <div v-else class="question-counter-container">
              <b-row>
                <h5 class="title">الاسئلة</h5>
              </b-row>

              <div class="question-counter-holder">
                <div class="question-counter">
                  <div class="total-count">
                    <div class="hold-count-filed">
                      <p>{{ $t("COMPETITIONS.QUESTION_NUMBER") }}</p>
                      <p>{{ totalQuestionCount }}</p>
                    </div>
                  </div>
                  <div class="question-types">
                    <div class="hold-count-filed">
                      <p>
                        {{ $t("COMPETITIONS.EASY_QUESTIONS") }}
                      </p>
                      <p>{{ totalEsay }}</p>
                    </div>
                    <div class="hold-count-filed">
                      <p>{{ $t("COMPETITIONS.MEDIUM_QUESTIONS") }}</p>
                      <p>{{ totalMedium }}</p>
                    </div>
                    <div class="hold-count-filed">
                      <p>{{ $t("COMPETITIONS.DIFFICULT_QUESTIONS") }}</p>
                      <p>{{ totalHard }}</p>
                    </div>
                  </div>
                </div>
                <div class="counter-actions">
                  <Button
                    :loading="loading"
                    :custom-class="'cancel-btn'"
                    @click="isGeneratedQuestion = !isGeneratedQuestion"
                  >
                    إعادة الضبط
                  </Button>
                </div>
              </div>
            </div>

            <!--generated question table -->
            <div v-if="isGeneratedQuestion && tableLoading" class="hold-table">
              <b-table
                striped
                :head-variant="'gradient'"
                :tbody-class="'custom-body'"
                :items="getQuestionsList"
                :fields="fieldsList"
              >
                <template v-slot:cell(question_difficulty)="data">
                  <div :class="data.item.question_difficulty.slug">
                    {{ data.item.question_difficulty.name }}
                  </div>
                </template>
                <template v-slot:cell(question)="data">
                  <div v-if="typeof data.item.question === 'object'">
                    <audio v-if="isAudio(data.item.question.question)" controls>
                      <source :src="data.item.question.question" type="audio/mp3" />
                      Your browser does not support the audio tag.
                    </audio>
                    <img
                      v-else-if="isImage(data.item.question.question)"
                      class="question-image"
                      :src="data.item.question.question"
                      alt="Image"
                    />
                    <div v-else>{{ data.item.question.question }}</div>
                  </div>
                  <div v-else>{{ data.item.question }}</div>
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
                      src="@/assets/images/icons/random-question.svg"
                      @click="changeSingleRandomQuestion(data.item.id)"
                    />
                    <img
                      class="cursor-pointer"
                      src="@/assets/images/icons/view-random-question.svg"
                      @click="viewQuestion(data.item.id)"
                    />
                  </div>
                </template>
              </b-table>
            </div>
            <div class="loadingContainer" v-if="!tableLoading">
              <b-spinner label="Spinning"></b-spinner>
            </div>

            <b-row>
              <div class="action-holder">
                <Button @click="handleCancel" :custom-class="'cancel-btn margin'">
                  {{ $t("GLOBAL_CANCEL") }}
                </Button>
                <div>
                  <Button @click="handleBack" custom-class="submit-btn back-btn">
                    {{ $t("GLOBAL_BACK") }}
                  </Button>
                  <Button
                    class="mx-3"
                    type="submit"
                    :loading="loading"
                    :disabled="!isGeneratedQuestion"
                    :custom-class="'submit-btn'"
                  >
                    {{ $t("GLOBAL_NEXT") }}
                  </Button>
                </div>
              </div>
            </b-row>
          </form>
        </validation-observer>
      </div>
      <viewQuestionModal
        :question="cloneQuestion"
        :showModal="showModal"
        @cancel="cancel($event)"
      />
    </div>
  </div>
</template>
<script>
import viewQuestionModal from "@/components/Modules/ViewQuestionModal/index.vue";

import TextField from "@/components/Shared/TextField/index.vue";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import TextAreaField from "@/components/Shared/TextAreaField/index.vue";
import ImageUploader from "@/components/Shared/ImageUploader/index.vue";
import { debounce } from "lodash";
import { mapGetters, mapActions } from "vuex";

import {
  getCompetitonQuestionNumberRequest,
  getRandomQuestionRequest,
  getSingleCompetitionQuestionRequest,
  postChangeQuestion,
} from "@/api/competition";

export default {
  components: {
    viewQuestionModal,
    TextField,
    SelectSearch,
    Button,
    TextAreaField,
    ImageUploader,
  },
  props: {
    missions_ids: {
      type: Array,
      default: () => [],
    },
    level_id: {
      type: Number,
    },
  },
  data() {
    return {
      loading: false,
      tableLoading: true,
      showModal: false,
      cloneQuestion: {},
      questionsNumbers: [],
      randomQuestions: [],
      actions: [],
      fieldsList: [
        {
          key: "id",
          label: this.$i18n.t("#"),
        },
        {
          key: "question_type.name",
          label: this.$i18n.t("QUESTION_TYPE"),
        },
        {
          key: "sub_question_type.name",
          label: this.$i18n.t("SUB_QUESTION_TYPE"),
        },
        {
          key: "question",
          label: this.$i18n.t("QUESTION"),
        },
        {
          key: "question_difficulty",
          label: this.$i18n.t("QUESTION_DIFFICULTY_TABLE"),
        },
        {
          key: "random_question_action",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ],
      totalQuestionCount: 0,
      totalEsay: 0,
      totalMedium: 0,
      totalHard: 0,
      totalQuestionCountList: [],
      totalEsayList: [],
      totalMediumList: [],
      totalHardList: [],
      disableRandomQuestionBtn: false,
      isGeneratedQuestion: false,
    };
  },
  watch: {
    questionsNumbers(val) {
      this.totalQuestionCount = this.questionsNumbers.meta.total_question;
      this.totalEsay = this.questionsNumbers.data[0].questions_count;
      this.totalMedium = this.questionsNumbers.data[1].questions_count;
      this.totalHard = this.questionsNumbers.data[2].questions_count;
      this.createTotalsLists();
    },
    getQuestionsList() {
      // this.actions = this.getQuestionsList;
      this.randomQuestions = this.getQuestionsList;
      if (this.getQuestionsList.length > 0) {
        this.isGeneratedQuestion = true;
      }
    },
  },
  methods: {
    ...mapActions(["addQuestions", "changeQuestionByID"]),
    isAudio(url) {
      return /\.(mp3|ogg|wav)$/i.test(url);
    },
    isImage(url) {
      return /\.(png|jpg|jpeg|gif)$/i.test(url);
    },
    onSubmit() {
      const questionsIds = this.randomQuestions.map((obj) => obj.id);
      this.$emit("onSubmit", questionsIds);
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    handleBack() {
      this.$emit("handleBack");
    },
    createTotalsLists() {
      for (let i = 0; i <= this.totalQuestionCount; i++) {
        this.totalQuestionCountList.push(i);
      }

      for (let i = 0; i <= this.totalEsay; i++) {
        this.totalEsayList.push(i);
      }

      for (let i = 0; i <= this.totalMedium; i++) {
        this.totalMediumList.push(i);
      }

      for (let i = 0; i <= this.totalHard; i++) {
        this.totalHardList.push(i);
      }
    },
    checkTotalNumbers: debounce(function () {
      const total = this.totalEsay + this.totalMedium + this.totalHard;
      if (total > this.totalQuestionCount || total != this.totalQuestionCount)
        this.disableRandomQuestionBtn = true;
      else this.disableRandomQuestionBtn = false;
    }, 500),
    handleDataForgenerateRandomQuestions() {
      let question_difficuly = [];

      const easy = {
        question_difficulty_id: 1,
        questions_count: this.totalEsay,
      };

      question_difficuly.push(easy);

      const medium = {
        question_difficulty_id: 2,
        questions_count: this.totalMedium,
      };

      question_difficuly.push(medium);

      const hard = {
        question_difficulty_id: 3,
        questions_count: this.totalHard,
      };

      question_difficuly.push(hard);

      this.generateRandomQuestions(question_difficuly);
    },
    generateRandomQuestions(questionDifficulties) {
      const data = {
        level_id: this.level_id,
        missions: this.missions_ids,
        question_difficuly: questionDifficulties,
      };

      this.ApiService(getRandomQuestionRequest(data)).then((response) => {
        this.addQuestions(response.data.data);
      });
    },
    changeSingleRandomQuestion(questionID) {
      let questionsIDs = this.getQuestionsList.map((obj) => obj.id);
      let payload = {
        question_id: questionID,
        question_same_type_ids: questionsIDs,
      };
      this.tableLoading = false;
      this.ApiService(postChangeQuestion(payload)).then((response) => {
        let payload = {
          id: questionID,
          question: response.data.data,
        };
        console.log(payload);
        // this.changeQuestionByID(payload);
        this.changeQuestionByID(payload);
        this.tableLoading = true;
      });
    },
    viewQuestion(questionId) {
      this.ApiService(getSingleCompetitionQuestionRequest(questionId)).then((response) => {
        this.showModal = true;
        this.cloneQuestion = response.data.data;
      });
    },
    getQuestionsNumbers() {
      const missionsIds = this.missions_ids.join(",");
      this.ApiService(
        getCompetitonQuestionNumberRequest({
          missions: missionsIds,
          level_id: this.level_id,
        })
      ).then((response) => {
        this.questionsNumbers = response.data;
      });
    },
    cancel($event) {
      this.showModal = $event;
    },
  },
  mounted() {
    this.getQuestionsNumbers();
  },
  computed: {
    ...mapGetters(["getQuestionsList"]),
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
