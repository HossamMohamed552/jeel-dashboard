<template>
  <div class="add-edit-country">
    <div class="container-fluid custom-container">
      <div class="add-edit-country-form">
        <h3>
          {{ lessonId ? $t("LESSONS.EDIT") : $t("LESSONS.ADD") }}
        </h3>
        <validation-observer v-slot="{ invalid }" ref="addEditLessonForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="formValues.name"
                    :label="$t('LESSONS.NAME')"
                    :name="$t('LESSONS.NAME')"
                    :placeholder="$t('LESSONS.ENTER_LESSON_NAME')"
                    :rules="'required|max:30'"
                  ></TextField>
                </div>
              </b-col>

              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <label>
                    {{ $t("LEARNING_PATH.LEARNING_PATH") }}
                    <span><i class="fa-solid fa-asterisk"></i></span>
                  </label>
                  <SelectSearch
                    v-model="formValues.learning_path_id"
                    :name="$t('LEARNING_PATH.LEARNING_PATH')"
                    :placeholder="$t('LEARNING_PATH.CHOOSE_LEARNING_PATH')"
                    :options="learningPaths"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    rules="required"
                    :deselectFromDropdown="true"
                  ></SelectSearch>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <div class="hold-btns-form">
                <Button @click="handleCancel" custom-class="cancel-btn margin">
                  {{ $t("GLOBAL_CANCEL") }}
                </Button>
                <Button
                  type="submit"
                  :loading="loading"
                  :disabled="invalid"
                  custom-class="submit-btn"
                >
                  {{ lessonId ? $t("GLOBAL_EDIT") : $t("GLOBAL_SAVE") }}
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
import Button from "@/components/Shared/Button/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import { getAllLearningPathsRequest } from "@/api/learningPath";
import { getLessonByIdRequest } from "@/api/lessons";
export default {
  components: {
    SelectSearch,
    Modal,
    TextField,
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
        name: "",
        learning_path_id: ""
      },
      lessonId: this.$route.params.id,
      learningPaths: [],
    };
  },
  methods: {
    onSubmit() {
      this.$refs.addEditLessonForm.validate().then((success) => {
        if (!success) return;
      });
      if (this.lessonId) {
        this.$emit("editLessons", this.formValues);
      } else {
        this.$emit("addLessons", this.formValues);
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getLessonById() {
      if (this.lessonId) {
        this.ApiService(getLessonByIdRequest(this.lessonId)).then(
          (response) => {
            this.formValues = response.data.data;
            this.formValues.learning_path_id = response.data.data.learningPath.id;
          }
        );
      }
    },
    getLearningPaths() {
      this.ApiService(getAllLearningPathsRequest()).then((response) => {
        this.learningPaths = response.data.data;
      });
    },
  },
  mounted() {
    this.getLessonById();
    this.getLearningPaths();
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
