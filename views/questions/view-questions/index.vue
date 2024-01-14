<template>
  <section class="container-fluid custom-container">
    <div class="show-question">
      <div class="hold-fields" v-if="question">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("QUESTIONS.ShowDetails") }}</h2>
          </b-col>
        </b-row>
        <div class="divider">
          <b-row>
            <b-col lg="4">
              <ShowItem :title="$t('QUESTIONS.TYPE')" :subtitle="question.question_pattern"/>
            </b-col>

            <b-col lg="4" class="d-flex align-items-end">
              <div v-if="question.question_pattern === 'text'"
                   class="d-flex justify-content-start align-items-lg-end">
                <ShowItem :title="$t('QUESTIONS.QUESTION')" :subtitle="question.question"/>
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
              <div v-else-if="question.question_pattern === 'image'">
                <ShowItem :title="$t('QUESTIONS.QUESTION')"/>
                <div class="d-flex justify-content-start align-items-center">
                  <img class="question_img" :src="question.question">
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
              </div>
              <div v-else-if="question.question_pattern === 'audio'">
                <ShowItem :title="$t('QUESTIONS.QUESTION')"/>
                <audio controls>
                  <source :src="question.question"/>
                </audio>
              </div>
            </b-col>
            <b-col lg="4">
              <ShowItem
                :title="$t('QUESTIONS.QUESTION_PATTERN')"
                :subtitle="question.question_type.name"
              />
            </b-col>
          </b-row>
        </div>
        <div class="divider">
          <b-row>
            <b-col lg="4" v-if="question.sub_question_type">
              <ShowItem
                :title="$t('QUESTIONS.TYPE_NAME')"
                :subtitle="question.sub_question_type.name"
              />
            </b-col>
            <b-col lg="4" v-if="question.language_skill">
              <ShowItem
                :title="$t('QUESTIONS.LANGUAGE_SKILL')"
                :subtitle="question.language_skill.name"
              />
            </b-col>
            <b-col lg="4" v-if="question.language_method">
              <ShowItem
                :title="$t('QUESTIONS.LANGUAGE_METHOD')"
                :subtitle="question.language_method.name"
              />
            </b-col>
          </b-row>
        </div>
        <div class="divider">
          <b-row>
            <b-col lg="4" v-if="question.hint">
              <ShowItem :title="$t('QUESTIONS.HINT')" :subtitle="question.hint"/>
            </b-col>
            <b-col lg="4" v-if="question.level">
              <ShowItem :title="$t('QUESTIONS.LEVEL')" :subtitle="question.level.name"/>
            </b-col>
          </b-row>
        </div>
        <div class="divider">
          <b-row>
            <b-col lg="4">
              <ShowItem
                :title="$t('QUESTIONS.QUESTIONDIFFICULTIES')"
                :subtitle="question.question_difficulty.name"
              />
            </b-col>
            <b-col lg="4">
              <ShowItem
                :title="$t('QUESTIONS.BLOOM_CATEGORIES')"
                :subtitle="question.blooms.name"
              />
            </b-col>
            <b-col lg="4">
              <ShowItem
                :title="$t('QUESTIONS.LEARNING_METHOD')"
                :subtitle="question.learningPath.name"
              />
            </b-col>
          </b-row>
        </div>
        <div class="divider-bottom">
          <div>
            <h4 class="heading title">{{ $t("QUESTIONS.ANSWERS") }}</h4>
          </div>
          <div
            v-if="question.answers && question.question_type.name !== 'مطابقة الاجابات الصحيحة و التوصيل'">
            <div v-for="(answer, ind) in question.answers" :key="ind">
              <div v-if="answer.answer_pattern === 'text'"
                   class="d-flex justify-content-start align-items-center">
                <span class="sub-title">{{ answer.answer }}</span><span v-if="answer.correct"
                                                                        class="px-2 the-right-answer">({{
                  $t("QUESTIONS.THE_RIGHT_ANSWER")
                }})</span>
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
              <div v-else-if="answer.answer_pattern === 'image'"
                   class="d-flex justify-content-start align-items-center">
                <img :src="answer.answer" class="answer-img"><span v-if="answer.correct"
                                                                   class="px-2 the-right-answer">({{
                  $t("QUESTIONS.THE_RIGHT_ANSWER")
                }})</span>
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
              <div v-else-if="answer.answer_pattern === 'audio'"
                   class="d-flex justify-content-start align-items-center mb-3">
                <audio controls>
                  <source :src="answer.answer"/>
                </audio>
                <span v-if="answer.correct"
                      class="px-2 the-right-answer">({{ $t("QUESTIONS.THE_RIGHT_ANSWER") }})</span>
              </div>
            </div>
          </div>
          <div
            v-if="question.answers && question.question_type.name === 'مطابقة الاجابات الصحيحة و التوصيل'">
            <p>الإجابه من</p>
            <div v-for="(itemAnswerTo, ind) in answersTo" :key="ind" class="d-flex justify-content-start align-items-center">
              <div>
                <div v-if="itemAnswerTo.answer_pattern === 'text'"><span class="sub-title">{{ itemAnswerTo.answer }}</span><div v-if="itemAnswerTo.audio">
                    <b-icon
                      v-if="isPlaying && currentActiveId === itemAnswerTo.id + '-' + ind"
                      variant="primary"
                      class="mx-2 cursor-pointer"
                      @click="playAudio(itemAnswerTo.audio, itemAnswerTo.id + '-' + ind)"
                      icon="volume-up-fill"
                    />
                    <b-icon
                      v-else
                      variant="primary"
                      class="mx-2 cursor-pointer"
                      @click="playAudio(itemAnswerTo.audio, itemAnswerTo.id + '-' + ind)"
                      icon="volume-up"
                    />
                  </div></div>
                <div v-else-if="itemAnswerTo.answer_pattern === 'image'">
                  <img :src="itemAnswerTo.answer" class="answer-img">
                  <div v-if="itemAnswerTo.audio">
                    <b-icon
                      v-if="isPlaying && currentActiveId === itemAnswerTo.id + '-' + ind"
                      variant="primary"
                      class="mx-2 cursor-pointer"
                      @click="playAudio(itemAnswerTo.audio, itemAnswerTo.id + '-' + ind)"
                      icon="volume-up-fill"
                    />
                    <b-icon
                      v-else
                      variant="primary"
                      class="mx-2 cursor-pointer"
                      @click="playAudio(itemAnswerTo.audio, itemAnswerTo.id + '-' + ind)"
                      icon="volume-up"
                    />
                  </div>
                </div>
                <div v-else-if="itemAnswerTo.answer_pattern === 'audio'">
                  <audio controls>
                    <source :src="itemAnswerTo.answer"/>
                  </audio>
                  <span v-if="itemAnswerTo.correct"
                        class="px-2 the-right-answer">({{
                      $t("QUESTIONS.THE_RIGHT_ANSWER")
                    }})</span>
                </div>
              </div>
              <div class="mx-2">الى</div>
              <div>
                <div v-for="answer in itemAnswerTo.answerCorrect" :key="answer.id">
                  <div v-if="answer.answer_pattern === 'text'" class="mb-3"><span class="sub-title">{{ answer.answer }}</span><div v-if="answer.audio">
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
                  </div></div>
                  <div v-else-if="answer.answer_pattern === 'image'" class="mb-3">
                    <img :src="answer.answer" class="answer-img"><span
                    v-if="answer.correct"
                    class="px-2 the-right-answer">({{
                      $t("QUESTIONS.THE_RIGHT_ANSWER")
                    }})</span>
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
                  <div v-else-if="answer.answer_pattern === 'audio'" class="mb-3">
                    <audio controls>
                      <source :src="answer.answer"/>
                    </audio>
                    <span v-if="answer.correct"
                          class="px-2 the-right-answer">({{
                        $t("QUESTIONS.THE_RIGHT_ANSWER")
                      }})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import {getSingleQuestionRequest} from "@/api/question";

export default {
  name: "index",
  components: {ShowItem},
  data() {
    return {
      question: null,
      isPlaying: false,
      currentActiveId: null,
      answersFrom: [],
      answersTo: [],
    };
  },
  mounted() {
    this.ApiService(getSingleQuestionRequest(this.$route.params.id)).then((response) => {
      this.question = response.data.data;
    }).then(() => {
      if (this.question.question_type.name === 'مطابقة الاجابات الصحيحة و التوصيل') {
        this.answersTo = this.question.answers.filter((item) => {
          return item.match_to === 1
        })
        this.answersFrom = this.question.answers.filter((item) => {
          return item.match_from === 1
        })
        this.answersTo.forEach((item) => {
          let answerCorrect = this.answersFrom.filter((from) => {
            return item.correct_answers.includes(from.id)
          })
          Object.assign(item, {answerCorrect: answerCorrect})
        })
      }
    })
  },
  methods: {
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
<style scoped lang="scss">
@import "./index";
</style>
