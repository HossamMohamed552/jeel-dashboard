<template>
  <div class="add-edit-user">
    <b-container>
      <div class="add-edit-question-form">
        <h3>{{ $t("QUESTIONS.CHOOSE_Question_PATTERN") }}</h3>

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
                  custom-class="submit-btn"
                >
                  {{ $t("GLOBAL_NEXT") }}
                </Button>
              </div>
            </b-row>
          </form>
        </validation-observer>
      </div>
    </b-container>
  </div>
</template>
<script>
// import TextField from "@/components/Shared/TextField/index.vue";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import { debounce } from "lodash";
export default {
  components: {
    // TextField,
    SelectSearch,
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
      },
    };
  },
  methods: {
    onSubmit() {
      this.$emit("onSubmit", this.formValues)
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getSubQuestionTypes: debounce(function (id) {
      this.$emit("getSubQuestionTypes", id);
    }, 100),
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
