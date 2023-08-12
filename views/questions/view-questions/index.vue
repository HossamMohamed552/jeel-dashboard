<template>
  <section class="container-fluid custom-container">
    <div class="show-question">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("QUESTIONS.ShowDetails") }}</h2>
          </b-col>
        </b-row>
        <div class="divider">
          <b-row>
            <b-col lg="4">
              <ShowItem :title="$t('QUESTIONS.TYPE')" :subtitle="question.question_pattern" />
            </b-col>

            <b-col lg="4" class="d-flex align-items-end">
              <ShowItem :title="$t('QUESTIONS.QUESTION')" :subtitle="question.question" />
              <b-icon
                v-if="isPlaying"
                variant="primary"
                class="mx-2 cursor-pointer"
                @click="toggleAudio(question.id)"
                icon="volume-up-fill"
              />
              <b-icon
                v-else
                variant="primary"
                class="mx-2 cursor-pointer"
                @click="toggleAudio(question.id)"
                icon="volume-up"
              />
              <audio :ref="question.id" :src="question.question_audio"></audio>
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
              <ShowItem :title="$t('QUESTIONS.HINT')" :subtitle="question.hint" />
            </b-col>
            <b-col lg="4" v-if="question.level">
              <ShowItem :title="$t('QUESTIONS.LEVEL')" :subtitle="question.level.name" />
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
                :subtitle="question.bloom_category.name"
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
          <div v-if="question.answers">
            <div
              v-for="(answer, ind) in question.answers"
              :key="ind"
              class="d-flex justify-content-start align-items-end"
            >
              <span class="sub-title">{{ answer.answer }}</span
              ><span v-if="answer.correct" class="px-2 the-right-answer"
                >({{ $t("QUESTIONS.THE_RIGHT_ANSWER") }})</span
              >
              <b-icon
                v-if="isPlaying"
                variant="primary"
                class="mx-2 cursor-pointer"
                @click="toggleAudio(answer.answer)"
                icon="volume-up-fill"
              />
              <b-icon
                v-else
                variant="primary"
                class="mx-2 cursor-pointer"
                @click="toggleAudio(answer.answer)"
                icon="volume-up"
              />
              <audio :ref="answer.answer" :src="answer.audio"></audio>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import { getSingleQuestionRequest } from "@/api/question";

export default {
  name: "index",
  components: { ShowItem },
  data() {
    return {
      question: null,
      isPlaying: false,
    };
  },
  mounted() {
    this.ApiService(getSingleQuestionRequest(this.$route.params.id)).then((response) => {
      this.question = response.data.data;
    });
  },
  methods: {
    toggleAudio(id) {
    console.log('id', id)
      const audio = this.$refs[id];
      if (this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      this.isPlaying = !this.isPlaying;
    },
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
