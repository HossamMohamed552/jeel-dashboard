<template>
  <div class="add-edit-user">
    <div class="container-fluid custom-container">
      <div class="add-edit-question-form">
        <h3>{{
            $route.params.id ? $t("QUESTIONS.EDIT_Question_PATTERN") : $t("QUESTIONS.CHOOSE_Question_PATTERN")
          }}</h3>
        <validation-observer v-slot="{ invalid }" ref="addEditUserForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="formValues.question_type_id"
                    :label="$t('QUESTIONS.QUESTION_PATTERN')"
                    :name="$t('QUESTIONS.QUESTION_PATTERN')"
                    :options="questionTypes"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                    @input="getSubQuestionTypes(formValues.question_type_id)"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="formValues.question_type_sub_id"
                    :label="$t('QUESTIONS.QUESTION_SUB_PATTERN')"
                    :name="$t('QUESTIONS.QUESTION_SUB_PATTERN')"
                    :options="questionSubTypes"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                    :disabled="!formValues.question_type_id"
                    @input="setQuestionSlug($event)"
                  ></SelectSearch>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <div class="action-holder">
                <Button @click="handleCancel" custom-class="cancel-btn margin">
                  {{ $t("GLOBAL_CANCEL") }}
                </Button>
                <Button
                  type="submit"
                  :loading="loading"
                  :disabled="invalid"
                  :custom-class="'submit-btn'"
                >
                  {{ $t("GLOBAL_NEXT") }}
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

import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import {debounce} from "lodash";
import getData from "@/mixins/getData/getData";

export default {
  mixins: [getData('question')],
  components: {
    SelectSearch,
    Button,
  },
  props: {
    questionTypes: {
      type: Array,
      default: () => [],
    },
    questionSubTypes: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formValues: {
        question_type_id: null,
        question_type_sub_id: null,
        question_slug: null,
        main_question_slug: null
      },
    };
  },
  watch: {
    question(question) {
      this.formValues.question_type_id = question.question_type.id
      this.formValues.question_type_sub_id = question.sub_question_type.id
    }
  },
  methods: {
    setQuestionSlug($event) {
      this.formValues.question_slug = this.questionSubTypes.filter((item) => item.id === $event)[0]
    },
    setMainQuestionSlug($event) {
      this.formValues.main_question_slug = this.questionTypes.filter((item) => item.id === $event)[0]
    },
    onSubmit() {
      this.$emit("onSubmit", this.formValues)
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getSubQuestionTypes: debounce(function (id) {
      this.setMainQuestionSlug(id)
      this.$emit("getSubQuestionTypes", id);
    }, 100),
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
