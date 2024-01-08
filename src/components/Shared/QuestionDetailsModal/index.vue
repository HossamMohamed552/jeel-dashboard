<template>
  <b-modal
    id="question-details-modal"
    class="question-modal"
    hide-footer
    size="xl"
    centered
    @hide="handleCloseModal()"
  >
    <template v-slot:modal-header="{ close }">
      <span>{{ $t("QUESTION_DETAILS") }}</span>
      <b-icon class="close-modal-icon" icon="x" @click="close" />
    </template>
    <div :class="$i18n.locale == 'en' ? '' : 'rtl'">
      <div class="w-100">
        <div v-if="loading" class="text-center font-weight-bold">
          {{ $t("GLOBAL_LOADING") }}
        </div>
        <div v-else class="px-4">
          <div class="hold-fields" v-if="question">
            <div class="divider">
              <b-row>
                <b-col lg="5">
                  <ShowItem :title="$t('QUESTIONS.QUESTION')" />
                  <div class="d-flex align-items-center mb-4 mt-3">
                    <ShowItem :subtitle="question.question" v-if="question.question_pattern === 'text'"/>
                    <img class="question_img mb-3" v-else-if="question.question_pattern === 'image'" :src="question.question">
                    <audio controls v-else-if="question.question_pattern === 'audio'" class="mb-3">
                      <source :src="question.question" />
                    </audio>
                    <div v-if="question.question_audio">
                      <b-icon
                        v-if="isPlaying && currentActiveId === question.id"
                        variant="primary"
                        class="mx-2 cursor-pointer"
                        @click="playAudio(question.id)"
                        icon="volume-up-fill"
                      />
                      <b-icon
                        v-else
                        variant="primary"
                        class="mx-2 cursor-pointer"
                        @click="playAudio(question.question_audio, question.id)"
                        icon="volume-up"
                      />
                    </div>
                  </div>
                </b-col>
                <b-col lg="4" class="mb-4 mt-3" v-if="question.question_type && question.question_type.name">
                  <ShowItem
                    :title="$t('QUESTIONS.QUESTION_PATTERN')"
                    :subtitle="question.question_type.name"
                  />
                </b-col>
                <b-col lg="3" class="mb-4 mt-3">
                  <ShowItem
                    :title="$t('QUESTIONS.TYPE')"
                    :subtitle="question.question_pattern"
                  />
                </b-col>
              </b-row>
            </div>
            <div class="divider">
              <b-row>
                <b-col lg="5" class="mb-4 mt-3" v-if="question.sub_question_type">
                  <ShowItem
                    :title="$t('QUESTIONS.TYPE_NAME')"
                    :subtitle="question.sub_question_type.name"
                  />
                </b-col>
                <b-col lg="4" class="mb-4 mt-3" v-if="question.language_skill">
                  <ShowItem
                    :title="$t('QUESTIONS.LANGUAGE_SKILL')"
                    :subtitle="question.language_skill.name"
                  />
                </b-col>
                <b-col lg="3" class="mb-4 mt-3" v-if="question.language_method">
                  <ShowItem
                    :title="$t('QUESTIONS.LANGUAGE_METHOD')"
                    :subtitle="question.language_method.name"
                  />
                </b-col>
              </b-row>
            </div>
            <div class="divider">
              <b-row>
                <b-col lg="5" class="mb-4 mt-1" v-if="question.hint">
                  <ShowItem
                    :title="$t('QUESTIONS.HINT')"
                    :subtitle="question.hint"
                  />
                </b-col>
                <b-col lg="4" class="mb-4 mt-1" v-if="question.level">
                  <ShowItem
                    :title="$t('QUESTIONS.LEVEL')"
                    :subtitle="question.level.name"
                  />
                </b-col>
                <b-col lg="3" class="mb-4 mt-1" v-if="question.learningPath">
                  <ShowItem
                    :title="$t('QUESTIONS.LEARNING_PATH')"
                    :subtitle="question.learningPath.name"
                  />
                </b-col>
              </b-row>
            </div>

            <div class="divider">
              <b-row>
                <b-col lg="5" class="mb-4 mt-1" v-if="question.question_difficulty">
                  <ShowItem
                    :title="$t('QUESTIONS.QUESTIONDIFFICULTIES')"
                    :subtitle="question.question_difficulty.name"
                  />
                </b-col>
                <b-col lg="4" class="mb-4 mt-1" v-if="question.bloom_category">
                  <ShowItem
                    :title="$t('QUESTIONS.BLOOM_CATEGORIES')"
                    :subtitle="question.bloom_category.name"
                  />
                </b-col>
                <b-col lg="3"></b-col>
              </b-row>
            </div>
            <div class="divider-bottom">
              <ShowItem :title="$t('QUESTIONS.ANSWERS')"/>
              <div v-if="question.answers">
                <div v-for="(answer, ind) in question.answers" :key="ind" class="d-flex justify-content-start align-items-end">
                  <div v-if="answer.answer_pattern === 'text'" class="d-flex justify-content-start align-items-center">
                    <span class="sub-title" >{{ answer.answer }}</span><span v-if="answer.correct" class="px-2 the-right-answer">({{ $t("QUESTIONS.THE_RIGHT_ANSWER") }})</span>
                    <div v-if="answer.audio">
                      <b-icon
                        v-if="isPlaying && currentActiveId === answer.id + '-' + ind"
                        variant="primary"
                        class="mx-2 cursor-pointer"
                        @click="playAudio(answer.audio, answer.id + '-' + ind)"
                        icon="volume-up-fill"
                      />
                      <b-icon
                        v-else
                        variant="primary"
                        class="mx-2 cursor-pointer"
                        @click="playAudio(answer.audio, answer.id + '-' + ind)"
                        icon="volume-up"
                      />
                    </div>
                  </div>
                  <div v-else-if="answer.answer_pattern === 'image'" class="d-flex justify-content-start align-items-center">
                    <img :src="answer.answer" class="answer-img"><span v-if="answer.correct" class="px-2 the-right-answer">({{ $t("QUESTIONS.THE_RIGHT_ANSWER") }})</span>
                    <div v-if="answer.audio">
                      <b-icon
                        v-if="isPlaying && currentActiveId === answer.id + '-' + ind"
                        variant="primary"
                        class="mx-2 cursor-pointer"
                        @click="playAudio(answer.audio, answer.id + '-' + ind)"
                        icon="volume-up-fill"
                      />
                      <b-icon
                        v-else
                        variant="primary"
                        class="mx-2 cursor-pointer"
                        @click="playAudio(answer.audio, answer.id + '-' + ind)"
                        icon="volume-up"
                      />
                    </div>
                  </div>
                  <div v-else-if="answer.answer_pattern === 'audio'" class="d-flex justify-content-start align-items-center mb-3">
                    <audio controls>
                      <source :src="answer.answer" />
                    </audio>
                    <span v-if="answer.correct" class="px-2 the-right-answer">({{ $t("QUESTIONS.THE_RIGHT_ANSWER") }})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </b-modal>
</template>
  <script>
import { getSingleQuestionDetailsRequest } from "@/api/detailsModal.js";
import ShowItem from "@/components/Shared/ShowItem/index.vue";
export default {
  name: "QuestionDetailsModal",
  components: {
    ShowItem,
  },
  props: {
    questionId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      question: {},
      loading: false,
      isPlaying: false,
      currentActiveId: null,
    };
  },
  watch: {
    questionId(newVal) {
      if (this.questionId) {
        this.questionId = newVal;
        this.getSingleQuestionDetails();
      }
    },
  },
  methods: {
    getSingleQuestionDetails() {
      this.loading = true;
      this.ApiService(getSingleQuestionDetailsRequest(this.questionId)).then(
        (response) => {
          this.question = response.data.data;
          this.loading = false;
        }
      );
    },
    handleCloseModal() {
      this.$emit("closeModal");
      this.$bvModal.hide("question-details-modal");
      this.question = {};
    },
    playAudio(link, id) {
      this.currentActiveId = id;
      if (this.audio) {
        this.audio.pause();
        this.audio = null;
        this.isPlaying = false;
        return;
      }
      this.audio = new Audio(link);
      this.audio.play();
      this.isPlaying = true;
    },
  },
  destroyed() {
    this.audio.pause();
  }
};
</script>
  <style lang="scss" scoped>
@import "./index.scss";
</style>
