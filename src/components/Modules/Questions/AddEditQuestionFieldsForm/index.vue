<template>
  <div class="add-edit-user">
    <div class="container-fluid custom-container">
      <div class="add-edit-question-form">
        <validation-observer v-slot="{ invalid }" ref="addEditUserForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="3" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="questionTypesValues.question_type_id"
                    :label="$t('QUESTIONS.QUESTION_PATTERN')"
                    :name="$t('QUESTIONS.QUESTION_PATTERN')"
                    :options="questionTypes"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :disabled="true"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="3" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="questionTypesValues.question_type_sub_id"
                    :label="$t('QUESTIONS.QUESTION_SUB_PATTERN')"
                    :name="$t('QUESTIONS.QUESTION_SUB_PATTERN')"
                    :options="questionSubTypes"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :disabled="true"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="3" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="formValues.level_id"
                    :label="$t('QUESTIONS.LEVELS')"
                    :name="$t('QUESTIONS.LEVELS')"
                    :options="levels"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                    @input="setItems($event)"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="3" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="formValues.learning_path_id"
                    :label="$t('QUESTIONS.LEARNING_PATH')"
                    :name="$t('QUESTIONS.LEARNING_PATH')"
                    :options="learningPaths"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                    @input="setItems($event)"
                  ></SelectSearch>
                </div>
              </b-col>
              <!--bloom -->
              <b-col lg="3" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="formValues.bloom_category_id"
                    :label="$t('QUESTIONS.BLOOM_CATEGORIES')"
                    :name="$t('QUESTIONS.BLOOM_CATEGORIES')"
                    :options="bloomCategories"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                  ></SelectSearch>
                </div>
              </b-col>
              <!--objective-->
              <b-col lg="3" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="formValues.question_objective_id"
                    :label="$t('OBJECTIVE.OBJECTIVE')"
                    :name="$t('OBJECTIVE.OBJECTIVE')"
                    :options="objectives"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                    :disabled="!formValues.learning_path_id || !formValues.level_id"
                  ></SelectSearch>
                </div>
              </b-col>
              <!--outcome-->
              <b-col lg="3" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="formValues.question_outcome_id"
                    :label="$t('OUTCOME.OUTCOME')"
                    :name="$t('OUTCOME.OUTCOME')"
                    :options="outcomes"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                    :disabled="!formValues.learning_path_id || !formValues.level_id"
                  ></SelectSearch>
                </div>
              </b-col>

              <b-col lg="3" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="formValues.language_skill_id"
                    :label="$t('QUESTIONS.LANGUAGE_SKILLS')"
                    :name="$t('QUESTIONS.LANGUAGE_SKILLS')"
                    :options="languageSkills"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="3" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="formValues.question_difficulty_id"
                    :label="$t('QUESTIONS.QUESTIONDIFFICULTIES')"
                    :name="$t('QUESTIONS.QUESTIONDIFFICULTIES')"
                    :options="questionDifficulties"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="3" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="formValues.language_method_id"
                    :label="$t('QUESTIONS.LEARNING_METHOD')"
                    :name="$t('QUESTIONS.LEARNING_METHOD')"
                    :options="learningMethods"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                  ></SelectSearch>
                </div>
              </b-col>
<!--              <b-col lg="3" class="mb-3">-->
<!--                <div class="hold-field">-->
<!--                  <ValidationProvider rules="required">-->
<!--                    <b-form-group :label="$t('QUESTIONS.TYPE')" class="group-type">-->
<!--                      <b-form-radio-->
<!--                        v-model="formValues.question_pattern"-->
<!--                        value="text"-->
<!--                        name="group-type"-->
<!--                      >نص-->
<!--                      </b-form-radio>-->
<!--                      <b-form-radio-->
<!--                        v-model="formValues.question_pattern"-->
<!--                        value="image"-->
<!--                        name="group-type"-->
<!--                      >صورة-->
<!--                      </b-form-radio>-->
<!--                    </b-form-group>-->
<!--                  </ValidationProvider>-->
<!--                </div>-->
<!--              </b-col>-->
            </b-row>
            <b-row>
              <div class="action-holder">
                <div>
                  <Button
                    type="submit"
                    :loading="loading"
                    :disabled="invalid"
                    custom-class="submit-btn"
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
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import getData from "@/mixins/getData/getData";
import {getAllObjectivesRequest} from "@/api/objective";
import {getAllOutcomesRequest} from "@/api/outcome";

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
    learningPaths: {
      type: Array,
      default: () => [],
    },
    languageSkills: {
      type: Array,
      default: () => [],
    },
    questionDifficulties: {
      type: Array,
      default: () => [],
    },
    bloomCategories: {
      type: Array,
      default: () => [],
    },
    learningMethods: {
      type: Array,
      default: () => [],
    },
    levels: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    questionTypesValues: {
      type: Object,
      default: () => {
      },
    },
  },
  data() {
    return {
      formValues: {
        learning_path_id: null,
        language_skill_id: null,
        question_difficulty_id: null,
        bloom_category_id: null,
        language_method_id: null,
        level_id: null,
        question_objective_id: null,
        question_outcome_id: null,
        question_pattern: "text",
      },
      objectives: [],
      outcomes: []
    };
  },
  watch: {
    question(question) {
      console.log('question', question)
      this.formValues.learning_path_id = question.learningPath.id
      this.formValues.language_skill_id = question.language_skill.id
      this.formValues.question_difficulty_id = question.question_difficulty.id
      this.formValues.bloom_category_id = question.bloom_category.id
      this.formValues.language_method_id = question.learningPath.id
      this.formValues.question_objective_id = question.question_objective_id.id
      this.formValues.question_outcome_id = question.question_outcome_id.id
      this.formValues.level_id = question.level.id
      this.formValues.question_pattern = question.question_pattern
    }
  },
  methods: {
    onSubmit() {
      this.$emit("onSubmit", this.formValues)
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    handleBack() {
      this.$emit("handleBack")
    },
    setItems() {
      this.ApiService(getAllObjectivesRequest({
        learning_path_id: this.formValues.learning_path_id,
        level_id: this.formValues.level_id
      })).then((response) => {
        this.objectives = response.data.data
      })
      this.ApiService(getAllOutcomesRequest({
        learning_path_id: this.formValues.learning_path_id,
        level_id: this.formValues.level_id
      })).then((response) => {
        this.outcomes = response.data.data
      })
    }
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
