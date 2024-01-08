<template>
  <div>
    <b-modal v-model="innerModal" class="custom-rounded" @hide="cancel()" size="xl"
             title="BootstrapVue" hide-footer hide-header>
      <div class="all-content">
        <div class="flexContent">
          <div class="add-question">
            <validation-observer v-slot="{ invalid }" immediate ref="addEditUserForm">
              <form @submit.prevent="addQuestion">
                <b-row>
                  <b-col lg="12">
                    <p class="text-right add-title">إضافة سؤال</p>
                  </b-col>
                  <b-col lg="6">
                    <TextField
                      v-model="questionVideo.question_time"
                      :label="$t('VIDEO.duration')"
                      :placeholder="$t('VIDEO.duration')"
                      :name="$t('VIDEO.duration')"
                      :rules="'required'"
                    >
                      <div class="hold-icon"><img src="@/assets/images/icons/clock.png"/></div>
                    </TextField>
                  </b-col>
                  <b-col lg="6" class="fix-margin">
                    <SelectSearch
                      v-model="questionVideo.question_slug"
                      :label="$t('QUESTIONS.QUESTION_TYPE')"
                      :placeholder="$t('QUESTIONS.QUESTION_TYPE')"
                      :name="$t('QUESTIONS.QUESTION_TYPE')"
                      :options="questionType"
                      :reduce="(option) => option.id"
                      :get-option-label="(option) => option.type"
                      :rules="'required'"
                      @input="changeQuestionType($event)"
                      :disabled="isEdit"
                    ></SelectSearch>
                  </b-col>
                  <b-col lg="12">
                    <TextField
                      v-model="questionVideo.head_question"
                      :label="$t('QUESTIONS.headQUESTION')"
                      :placeholder="$t('QUESTIONS.headQUESTION')"
                      :name="$t('QUESTIONS.headQUESTION')"
                      :rules="'required'"
                    ></TextField>
                  </b-col>
                  <b-col lg="12">
                    <UploadAttachment :type-of-attachment="'audio'"
                                      :label="$t('QUESTIONS.QUESTION_header_AUDIO')"
                                      :name="'QUESTION_header_AUDIO'" :rules="'required'"
                                      :dropIdRef="'questionHeaderAUDIO'"
                                      :accept-files="'audio/*'"
                                      @setFileId="setQuestionAudioFileId($event,'head_question_audio','headerQuestionAudioNotChange')"/>
                    <p v-if="fileType.headerQuestionAudioNotChange"
                       class="invalid-feedback d-block">مطلوب
                      {{ $t('QUESTIONS.QUESTION_header_AUDIO') }}</p>
                  </b-col>
                  <b-col lg="12">
                    <TextField
                      v-model="questionVideo.question"
                      :label="$t('QUESTIONS.videoQUESTION')"
                      :placeholder="$t('QUESTIONS.videoQUESTION')"
                      :name="$t('QUESTIONS.videoQUESTION')"
                      :rules="'required'"
                    ></TextField>
                  </b-col>
                  <b-col lg="12">
                    <UploadAttachment :type-of-attachment="'audio'"
                                      :label="$t('QUESTIONS.QUESTION_TITLE_AUDIO')"
                                      :name="'QUESTION_TITLE_AUDIO'" :rules="'required'"
                                      :dropIdRef="'questionHeaderAUDIO'"
                                      :accept-files="'audio/*'"
                                      @setFileId="setQuestionAudioFileId($event,'video_question_audio','questionAudioNotChange')"/>
                    <p v-if="fileType.questionAudioNotChange" class="invalid-feedback d-block">مطلوب
                      {{ $t('QUESTIONS.QUESTION_TITLE_AUDIO') }}</p>
                  </b-col>
                  <b-col lg="6" class="mt-3">
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
                  <b-col lg="6" class="mt-3" v-if="questionVideo.question_slug === 'mcq'">
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
                    <div class="hold-answers" v-if="questionVideo.answers.length >=1">
                      <b-row v-for="(answer,index) in questionVideo.answers" :key="answer.id">
                        <b-col lg="6">
                          <TextField
                            v-model="answer.answer"
                            :rules="'required'"
                            :label="$t('VIDEO.answerSort',{ index:`${index + 1 }`})"
                            :placeholder="$t('VIDEO.answerSort',{ index:`${index + 1 }`})"
                            :name="$t('VIDEO.answerSort',{ index:`${index + 1 }`})"
                          ></TextField>
                        </b-col>
                        <b-col lg="12">
                          <UploadAttachment :type-of-attachment="'audio'"
                                            :label="$t('VIDEO.answerSortAudio',{ index:`${index + 1 }`})"
                                            :name="`answerAudio${index}`" :rules="'required'"
                                            :dropIdRef="`answerAudio${index}`"
                                            :accept-files="'audio/*'"
                                            @setFileId="setAnswersAudioId($event,index)"
                          />
                          <p class="invalid-feedback d-block" v-if="answer.audioNotChanged">
                            {{ $t('VIDEO.answerSortAudioRequired', {index: `${index + 1}`}) }}</p>
                        </b-col>
                      </b-row>
                    </div>
                  </b-col>
                  <b-col lg="6" class="mt-3" v-if="questionVideo.question_slug === 'true_false'">
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
                  <b-col lg="6" class="mt-3" v-if="questionVideo.question_slug === 'mcq'">
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
                      <Button :custom-class="'submit-btn'" @click="addQuestion"
                              :disabled="invalid || fileType.headerQuestionAudioNotChange || fileType.questionAudioNotChange"
                              v-if="answerSelected === 1">
                        {{ $t("GLOBAL_SAVE") }}
                      </Button>
                      <Button :custom-class="'submit-btn'" @click="addQuestion"
                              :disabled="invalid || answerHasNotAudio ||fileType.headerQuestionAudioNotChange || fileType.questionAudioNotChange"
                              v-if="answerSelected === 2">
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
import UploadAttachment from "@/components/Shared/UploadAttachment/index.vue";

export default {
  name: "questionModal",
  components: {
    UploadAttachment,
    SelectSearch,
    Button,
    DatePicker,
    TextField,
  },
  data() {
    return {
      innerModal: false,
      answerHasNotAudio: false,
      fileType: {
        headerQuestionAudioNotChange: true,
        questionAudioNotChange: true,
      },
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
      questionType: [
        {
          id: 'true_false',
          type: "صح و خطأ",
        },
        {
          id: 'mcq',
          type: "إختيارات",
        }
      ],
      questionDifficulties: [],
      answersCountSelected: null,
      answerSelected: 1,
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
        head_question: "",
        video_question_audio: null,
        head_question_audio: null,
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
        let audioNotChanged = newVal.filter((item) => item.audioNotChanged === true)
        this.answerHasEmpty = empty.length !== 0
        this.answerHasNotAudio = audioNotChanged.length !== 0
      },
      deep: true
    },
    currentTime: {
      handler(newVal) {
        let min = Math.floor(newVal / 60)
        let second = Math.floor(newVal - (min * 60))
        let minute = min < 10 ? `0${min}` : `${min}`;
        let minSecond = second < 10 ? `0${second}` : `${second}`;
        this.questionVideo.question_time = `${minute}:${minSecond}`
      }
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
    totalDuration: {
      type: Number,
      default: 0
    },
    currentTime: {
      type: Number,
      default: 0
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    questionEdit: {
      default: null
    }
  },
  methods: {
    setQuestionAudioFileId($event, fileName, fileChange) {
      if ($event) {
        this.questionVideo[fileName] = $event
        this.fileType[fileChange] = false
      } else {
        this.questionVideo[fileName] = null
        this.fileType[fileChange] = true
      }
    },
    async setAnswersAudioId($event, indexWillChange = 0) {
      if ($event) {
        this.questionVideo.answers[indexWillChange]['video_question_answer_audio'] = $event
        this.questionVideo.answers[indexWillChange]['audioNotChanged'] = false
      } else {
        this.questionVideo.answers[indexWillChange]['video_question_answer_audio'] = null
        this.questionVideo.answers[indexWillChange]['audioNotChanged'] = true
      }
    },
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
          video_question_answer_audio: "",
          audioNotChanged: true,
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
  updated() {
    if (this.isEdit) {
      this.questionVideo.question_time = this.questionEdit.question_time
      if (this.questionEdit?.question_type && this.questionEdit?.question_type?.id === 1) {
        this.questionVideo.question_slug = 'mcq'
        this.questionVideo.question_type_id = 1;
        this.questionVideo.question_type_sub_id = 14;
      }
      else if (this.questionEdit?.question_type && this.questionEdit?.question_type?.id === 2) {
        this.questionVideo.question_slug = 'true_false'
        this.questionVideo.question_type_id = 2;
        this.questionVideo.question_type_sub_id = 13;
      }
    }
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
