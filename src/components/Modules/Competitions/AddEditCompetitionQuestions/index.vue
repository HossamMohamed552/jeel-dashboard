<template>
  <div class="add-edit-competition">
    <div class="container-fluid custom-container">
      <div class="add-edit-competition-form">
        <validation-observer v-slot="{ invalid }" ref="addEditCompetitionForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <div v-if="!isGeneratedQuestion" class="question-counter-container">
              <b-row>
                <h5 class="title">الاسئلة</h5>
                <p v-if="disableRandomQuestionBtn" class="warning-error">
                  * يجب ان يكون مجموع عدد انواع الاسئلة الثلاثة مساوى لعدد
                  الاسئلة الكلى
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
                    @click="generateRandomQuestions"
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
            <div v-if="isGeneratedQuestion" class="hold-table">
              <b-table
                striped
                :head-variant="'gradient'"
                :tbody-class="'custom-body'"
                :items="actions"
                :fields="fieldsList"
              >
                <template #cell(question_difficulty.name)="data">
                  <div
                    v-if="data.item.question_difficulty.id == 1"
                    class="easy"
                  >
                    {{ data.item.question_difficulty.name }}
                  </div>
                  <div
                    v-else-if="data.item.question_difficulty.id == 2"
                    class="medium"
                  >
                    {{ data.item.question_difficulty.name }}
                  </div>
                  <div
                    v-else-if="data.item.question_difficulty.id == 3"
                    class="hard"
                  >
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
                      src="@/assets/images/icons/random-question.svg"
                      @click="changeSingleRandomQuestion(data.item.id)"
                    />
                    <img
                      class="cursor-pointer"
                      src="@/assets/images/icons/view-random-question.svg"
                    />
                  </div>
                </template>
              </b-table>
            </div>

            <b-row>
              <div class="action-holder">
                <div>
                  <Button
                    type="submit"
                    :loading="loading"
                    :disabled="invalid"
                    :custom-class="'submit-btn'"
                  >
                    {{ $t("GLOBAL_NEXT") }}
                  </Button>
                  <Button
                    class="mx-3"
                    @click="handleBack"
                    custom-class="submit-btn back-btn"
                  >
                    {{ $t("GLOBAL_BACK") }}
                  </Button>
                </div>
                <Button
                  @click="handleCancel"
                  :custom-class="'cancel-btn margin'"
                >
                  {{ $t("GLOBAL_CANCEL") }}
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
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import TextAreaField from "@/components/Shared/TextAreaField/index.vue";
import ImageUploader from "@/components/Shared/ImageUploader/index.vue";
import { debounce } from "lodash";

export default {
  components: {
    TextField,
    SelectSearch,
    Button,
    TextAreaField,
    ImageUploader,
  },
  props: {
    questionsNumbers: {
      type: Object,
      default: () => {},
    },
    randomQuestions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      loading: false,
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
          key: "question_difficulty.name",
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
      // this.totalQuestionCount = 10;
      // this.totalEsay = 3;
      // this.totalMedium = 2;
      // this.totalHard = 5;

      this.createTotalsLists();
    },
    randomQuestions(val) {
      this.actions = this.randomQuestions;
      this.isGeneratedQuestion = true;
    },
  },
  methods: {
    onSubmit() {
      const questionsIds = this.randomQuestions.map(obj => obj.id);
      this.$emit("onSubmit", {'questions': questionsIds});
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
    generateRandomQuestions() {
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

      this.$emit("generateRandomQuestions", question_difficuly);
    },
    changeSingleRandomQuestion(questionId) {
      // console.log(questionId);
    }
  },
  mounted() {
    // if (this.$route.params.id) {
    // }
  },
};
</script>
  <style scoped lang="scss">
@import "./index";
</style>
