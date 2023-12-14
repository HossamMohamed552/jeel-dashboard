<template>
  <div>
    <b-modal v-model="innerModal" class="custom-rounded" @hide="cancel()" size="lg"
             title="BootstrapVue" hide-footer hide-header>
      <div class="all-content">
        <div class="flexContent">
          <p class="text-right add-title">إضافة سؤال</p>
          <div class="add-question">
            <validation-observer v-slot="{ invalid }" ref="addEditUserForm">
              <form @submit.prevent="addQuestion" class="mt-5">
                <b-row>
                  <b-col lg="3">
                    <TextField
                      v-model="questionVideo.question_time"
                      :label="$t('VIDEO.duration')"
                      :name="$t('VIDEO.duration')"
                      :rules="'required'"
                    ></TextField>
                  </b-col>
                  <b-col lg="9">
                    <ValidationProvider v-slot="{errors, invalid}" rules="'required'">
                      <b-form-group :label="$t('نوع السؤال')" class="group-type">
                        <b-form-radio v-model="questionVideo.question_slug" value="true_false"
                                      name="group-music_type" @input="changeQuestionType($event)">صح وخطأ
                        </b-form-radio>
                        <b-form-radio v-model="questionVideo.question_slug" value="mcq"
                                      name="group-music_type" @input="changeQuestionType($event)">
                          إختيارات
                        </b-form-radio>
                      </b-form-group>
                    </ValidationProvider>
                  </b-col>
                  <b-col lg="12">
                    <TextField
                      v-model="questionVideo.question"
                      :label="$t('VIDEO.question')"
                      :name="$t('VIDEO.duration')"
                      :rules="'required'"
                    ></TextField>
                  </b-col>
                  <b-col lg="6">
                    <div class="hold-field question-label">
                      <label><span><i class="fa-solid fa-asterisk"></i></span>{{
                          $t("QUESTIONS.QUESTION_TITLE_AUDIO")
                        }}</label>
                      <ValidationProvider
                        v-slot="{ errors }"
                        :rules="'required|audio'"
                        name="questionAudio"
                      >
                        <b-form-file
                          accept="audio/*"
                          :placeholder="questionVideo.question_audio ? questionVideo.question_audio : 'اختر ملف'"
                          v-model="questionVideo.question_audio"
                          name="audio"
                        >
                        </b-form-file>
                        <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                          {{ error }}
                        </b-form-invalid-feedback>
                      </ValidationProvider>
                    </div>
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
                  <b-col lg="4" v-if="questionVideo.question_slug === 'mcq'">
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
                  <b-col lg="12" v-if="questionVideo.question_slug === 'mcq'">
                    <b-row v-if="questionVideo.question_slug === 'mcq'" v-for="(answer,index) in questionVideo.answers" :key="answer.id">
                      <b-col lg="6">
                        <TextField
                          v-model="answer.answer"
                          :rules="'required'"
                          :label="$t('VIDEO.answerSort',{ index:`${index + 1 }`})"
                          :name="$t('VIDEO.answerSort',{ index:`${index + 1 }`})"
                        ></TextField>
                      </b-col>
                      <b-col lg="6">
                        <div class="hold-field question-label">
                          <label><span><i class="fa-solid fa-asterisk"></i></span>{{
                              $t("QUESTIONS.QUESTION_TITLE_AUDIO")
                            }}</label>
                          <ValidationProvider
                            v-slot="{ errors }"
                            :rules="'required|audio'"
                            :name="`answerAudio${index}`"
                          >
                            <b-form-file
                              accept="audio/*"
                              :placeholder="answer.audio ? answer.audio : 'اختر ملف'"
                              v-model="answer.audio"
                              name="audio"
                            >
                            </b-form-file>
                            <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                              {{ error }}
                            </b-form-invalid-feedback>
                          </ValidationProvider>
                        </div>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col lg="6" v-if="questionVideo.question_slug === 'true_false'">
                    <SelectSearch
                      :rules="'required'"
                      v-model="questionVideo.answers_id"
                      :label="$t('VIDEO.answer')"
                      :name="$t('VIDEO.answer')"
                      :options="questionVideo.answers"
                      :reduce="(option) => option.id"
                      :get-option-label="(option) => option.answer"
                      @input="assignCorrectAnswer($event)"
                    ></SelectSearch>
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
                </b-row>
                <b-row>
                  <b-col lg="12">
                    <div class="action-holder">
                      <Button :custom-class="'cancel-btn margin'" @click="cancel">
                        {{ $t("GLOBAL_CANCEL") }}
                      </Button>
                      <Button :custom-class="'submit-btn'" @click="addQuestion" :disabled="invalid">
                        {{ $t("GLOBAL_SAVE") }}
                      </Button>
                    </div>
                  </b-col>
                </b-row>
              </form>
            </validation-observer>
          </div>
        </div>
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
    TextField,
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
        question_audio: null,
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
      answerHasEmpty: false,
      durationTime: 0,
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
    },
    duration: {
      type: Number,
      default: 0
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
      this.questionVideo.question_audio = null;
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
          audio: "",
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
    this.questionVideo.question_time = this.duration
  }
}
</script>
<style scoped lang="scss">
@import "src/assets/style/scss/_mixin";
@import "./index";

</style>
