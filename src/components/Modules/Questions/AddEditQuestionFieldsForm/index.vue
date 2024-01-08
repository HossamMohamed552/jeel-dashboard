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
export default {
  props: {
    questionTypes: {
      type: Array,
      default: () => [],
    },
    questionSubTypes: {
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
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
