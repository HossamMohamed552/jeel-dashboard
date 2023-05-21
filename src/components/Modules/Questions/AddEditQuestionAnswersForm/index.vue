<template>
  <div class="add-edit-user">
    <div class="container-fluid custom-container">
      <div class="add-edit-question-form">
        <validation-observer v-slot="{ invalid }" ref="addEditUserForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="formValues.question"
                    :label="$t('QUESTIONS.QUESTION')"
                    :name="$t('QUESTIONS.QUESTION')"
                    :rules="'required'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="formValues.hint"
                    :label="$t('QUESTIONS.HINT')"
                    :name="$t('QUESTIONS.HINT')"
                    :rules="'required'"
                  ></TextField>
                </div>
              </b-col>
            </b-row>
            <!-- --answersList: {{ answersList }} -->
            <b-row v-for="(answer, idx) in answersList" :key="idx">
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="answer.answer"
                    :label="$t('QUESTIONS.ANSWER')"
                    :name="`${$t('QUESTIONS.ANSWER')} ${idx}`"
                    :id="`ANSWER ${idx}`"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="answer.correct"
                    :label="$t('QUESTIONS.ANSWER_TYPE')"
                    :name="`${$t('QUESTIONS.ANSWER_TYPE')} ${idx + 1}`"
                    :id="idx"
                    :options="correctList"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="2" class=" btn-holder">
                <div class="hold-field">
                  <span class="success" v-if="answersList.length - 1 === idx" @click="addAnswer">إضافة</span>
                  <span
                    class="mx-3 danger"
                    v-if="answersList.length > 1"
                    @click="answersList.splice(idx, 1)">حذف</span>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <div class="action-holder">
                <div>
                  ---- {{ answersList.length }}
                  ---- {{ answersList }}
                  <Button
                    type="submit"
                    :loading="loading"
                    :disabled="invalid || answersList.length <= 0 || answersList[0].answer.length<=0"
                    :custom-class="'submit-btn'"
                  >
                    {{ $t("GLOBAL_NEXT") }}
                  </Button>
                  <Button class="mx-3" @click="handleBack" :custom-class="'submit-btn back-btn'">
                    {{ $t("GLOBAL_BACK") }}
                  </Button>
                </div>
                <Button @click="handleCancel" :custom-class="'cancel-btn margin'">
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

export default {
  components: {
    TextField,
    SelectSearch,
    Button,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formValues: {
        question: "",
        hint: "",
        answers: [],
      },
      answersList: [
        {
          answer: "",
          correct: 0,
        },
      ],
      correctList: [
        {
          id: 1,
          name: "إجابة صحيحة",
        },
        {
          id: 0,
          name: "إجابة خطأ",
        },
      ],
    };
  },
  methods: {
    onSubmit() {
      this.assignAnswers()
      this.$emit("onSubmit", this.formValues)
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    handleBack() {
      this.$emit("handleBack");
    },
    addAnswer() {
      this.answersList.push({
        answer: "",
        correct: 0,
      });
    },
    assignAnswers() {
      this.formValues.answers = this.answersList.filter((answer) => answer.answer);
    },
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
