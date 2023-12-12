<template>
  <div>
    <b-modal v-model="innerModal" class="custom-rounded" @hide="cancel()" size="lg"
             title="BootstrapVue" hide-footer hide-header>
      <div class="all-content">
        <div class="flexContent">
          <p class="text-right add-title">إضافة سؤال</p>
          <div class="add-question">
            <b-row>
              <b-col lg="3">
                <TextField
                  v-model="questionVideo.question_time"
                  :label="$t('VIDEO.duration')"
                  :name="$t('VIDEO.duration')"
                  :rules="'numeric'"
                ></TextField>
              </b-col>
              <b-col lg="9">
                <b-form-group :label="$t('نوع السؤال')" class="group-type">
                  <b-form-radio v-model="questionVideo.question_slug" value="true_false"
                                name="group-music_type" @input="changeQuestionType($event)">صح وخطأ
                  </b-form-radio>
                  <b-form-radio v-model="questionVideo.question_slug" value="mcq"
                                name="group-music_type" @input="changeQuestionType($event)">
                    إختيارات
                  </b-form-radio>
                </b-form-group>
              </b-col>
              <b-col :lg="questionVideo.question_slug === 'true_false'? 12 : 8">
                <TextField
                  v-model="questionVideo.question"
                  :label="$t('VIDEO.question')"
                  :name="$t('VIDEO.duration')"
                  :rules="'required'"
                ></TextField>
              </b-col>
              <b-col lg="4" v-if="questionVideo.question_slug === 'mcq'" class="mt-3">
                <SelectSearch
                  v-model="answersCountSelected"
                  :label="$t('VIDEO.answersCount')"
                  :name="$t('VIDEO.answersCount')"
                  :options="answersCount"
                  :reduce="(option) => option.id"
                  :get-option-label="(option) => option.number"
                  :rules="'required'"
                  @input="assignAnswers($event)"
                ></SelectSearch>
              </b-col>
              <b-col lg="6" v-if="questionVideo.question_slug === 'true_false'">
                <SelectSearch
                  v-model="questionVideo.answers_id"
                  :label="$t('VIDEO.answer')"
                  :name="$t('VIDEO.answer')"
                  :options="questionVideo.answers"
                  :reduce="(option) => option.id"
                  :get-option-label="(option) => option.answer"
                  @input="assignCorrectAnswer($event)"
                ></SelectSearch>
              </b-col>
              <b-col lg="12" v-if="questionVideo.question_slug === 'mcq'">
                <b-row v-if="questionVideo.question_slug === 'mcq'">
                  <b-col v-for="(answer,index) in questionVideo.answers" :key="answer.id">
                    <TextField
                      v-model="answer.answer"
                      :label="$t('VIDEO.answerSort',{ index:`${index + 1 }`})"
                      :name="$t('VIDEO.answerSort',{ index:`${index + 1 }`})"
                    ></TextField>
                  </b-col>
                </b-row>
              </b-col>
              <b-col lg="6" v-if="questionVideo.question_slug === 'mcq'">
                <SelectSearch
                  v-model="answerSelected"
                  :label="$t('VIDEO.correctAnswer')"
                  :name="$t('VIDEO.correctAnswer')"
                  :options="questionVideo.answers"
                  :reduce="(option) => option.id"
                  :get-option-label="(option) => option.answer"
                  :rules="'required'"
                  :disabled="questionVideo.answers.length === 0|| answerHasEmpty"
                  @input="assignAnswerCorrect($event)"
                ></SelectSearch>
              </b-col>
              <b-col lg="6">
                <SelectSearch
                  v-model="questionVideo.question_difficulty_id"
                  :label="$t('QUESTIONS.QUESTIONDIFFICULTIES')"
                  :name="$t('QUESTIONS.QUESTIONDIFFICULTIES')"
                  :options="questionDifficulties"
                  :reduce="(option) => option.id"
                  :get-option-label="(option) => option.name"
                  :rules="'required'"
                ></SelectSearch>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="12">
                <div class="action-holder">
                  <Button :custom-class="'cancel-btn margin'" @click="cancel">
                    {{ $t("GLOBAL_CANCEL") }}
                  </Button>
                  <Button :custom-class="'submit-btn'" @click="addQuestion">
                    {{ $t("GLOBAL_SAVE") }}
                  </Button>
                </div>
              </b-col>
            </b-row>
          </div>
        </div>
        <template>
          <div class="controls" v-if="isWarning">
            <Button :custom-class="'rounded-btn'" @click="cancelWithConfirm()">
              {{ $t('GLOBAL_CONFIRM') }}
            </Button>
            <Button :custom-class="'rounded-btn transparent-btn'" @click="cancel()">
              {{ $t('GLOBAL_CANCEL') }}
            </Button>
          </div>
          <div class="controls mt-3" style="justify-content: center;" v-if="isFailed">
            <Button :custom-class="'rounded-btn transparent-btn'" @click="cancel()">
              {{ $t('GLOBAL_CANCEL') }}
            </Button>
          </div>
        </template>
      </div>
    </b-modal>
  </div>
</template>
<script>
import Button from "@/components/Shared/Button/index.vue";
import DatePicker from "vue2-datepicker";
import TextField from "@/components/Shared/TextField";
import 'vue2-datepicker/locale/en'
import "vue2-datepicker/index.css";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import {getAllQuestionDifficultiesRequest} from "@/api/question";

export default {
  name: "index",
  components: {
    SelectSearch,
    Button,
    DatePicker,
    TextField
  },
  data() {
    return {
      innerModal: false,
      // question_time: '',
      // questionTypeSlug: 'true_false',
      // // questionTypeSlug: 'mcq',
      // question_type_id: 2,
      // // question_type_id mcq 1
      // question_type_sub_id: 13,
      // // question_type_sub_id: 14,
      // question_difficulty_id: '',
      // answers_id: 1,
      // answers: [
      //   {
      //     id: 1,
      //     answer: "صح",
      //     correct: 0,
      //     order: 1
      //   },
      //   {
      //     id: 2,
      //     answer: "خطأ",
      //     correct: 0,
      //     order: 2
      //   },
      // ],
      questionDifficulties: [],
      answersCountSelected: null,
      answerSelected: null,
      answersCount: [
        {
          id: 2,
          number: 2
        },
        {
          id: 3,
          number: 3
        },
        {
          id: 4,
          number: 4
        },
      ],
      questionVideo: {
        video_id: "",
        question: "",
        question_slug: "true_false",
        question_type_id: 2,
        question_type_sub_id: 13,
        question_difficulty_id: 1,
        question_time: null,
        answers_id: 1,
        answers: [
          {
            id: 1,
            answer: "صح",
            correct: 0,
            order: 1
          },
          {
            id: 2,
            answer: "خطأ",
            correct: 0,
            order: 2
          },
        ],
      },
      answerHasEmpty: false
    }
  },
  watch: {
    showModal(newVal) {
      this.innerModal = newVal
    },
    "questionVideo.answers": {
      handler(newVal) {
        let empty = newVal.filter((item) => item.answer.length === 0)
        this.answerHasEmpty = empty.length !== 0
      },
      deep: true
    }
  },
  props: {
    isSuccess: {
      type: Boolean,
      default: false
    },
    isWarning: {
      type: Boolean,
      default: false
    },
    isVerify: {
      type: Boolean,
      default: false
    },
    isVerifyCheck: {
      type: Boolean,
      default: false
    },
    isFailed: {
      type: Boolean,
      default: false
    },
    showModal: {
      type: Boolean,
      default: false
    },
    contentMessage: {
      type: String,
      default: ""
    },
    contentMessageQuestion: {
      type: String,
      default: ""
    }
  },
  methods: {
    cancel() {
      this.$emit('cancelQuestion', false)
    },
    getAllDifficulties() {
      this.ApiService(getAllQuestionDifficultiesRequest()).then((response) => {
        this.questionDifficulties = response.data.data;
      });
    },
    assignCorrectAnswer($event) {
      if (this.questionVideo.answers) {
        this.questionVideo.answers = this.questionVideo.answers.map((item) => {
          return {...item, correct: 0}
        })
        let indexToBeChange = this.questionVideo.answers.findIndex((item) => item.id === $event)
        this.questionVideo.answers[indexToBeChange].correct = 1
      }
    },
    addQuestion() {
      this.$emit('addQuestion', this.questionVideo)
      this.questionVideo.question = "";
      this.questionVideo.question_slug = "true_false";
      this.questionVideo.question_type_id = 2;
      this.questionVideo.question_type_sub_id = 13;
      this.questionVideo.question_difficulty_id = 1;
      this.questionVideo.question_time = null;
      this.questionVideo.answers_id = 1;
      this.questionVideo.answers = [
        {
          id: 1,
          answer: "صح",
          correct: 0,
          order: 1
        },
        {
          id: 2,
          answer: "خطأ",
          correct: 0,
          order: 2
        },
      ]
    },
    changeQuestionType($event) {
      if ($event === 'true_false') {
        this.questionVideo.question_slug = "true_false";
        this.questionVideo.question_type_id = 2;
        this.questionVideo.question_type_sub_id = 13;
        this.questionVideo.answers = [
          {
            id: 1,
            answer: "صح",
            correct: 0,
            order: 1
          },
          {
            id: 2,
            answer: "خطأ",
            correct: 0,
            order: 2
          },
        ]
      } else {
        this.questionVideo.question_slug = "mcq";
        this.questionVideo.question_type_id = 1;
        this.questionVideo.question_type_sub_id = 14;
        this.questionVideo.answers = []
      }
    },
    assignAnswers() {
      this.questionVideo.answers = []
      for (let answer = 0; answer < this.answersCountSelected; answer++) {
        this.questionVideo.answers.push({
          id: answer + 1,
          answer: "",
          correct: 0,
          order: answer + 1
        })
      }
    },
    assignAnswerCorrect($event) {
      this.answerSelected = $event
      this.assignCorrectAnswer(this.answerSelected)
    },
  },
  mounted() {
    this.questionVideo.video_id = Number(this.$route.params.id)
    this.getAllDifficulties()
  }
}
</script>
<style scoped lang="scss">
@import "src/assets/style/scss/_mixin";
@import "./index";

</style>
