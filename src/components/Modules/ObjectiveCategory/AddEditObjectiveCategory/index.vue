<template>
  <div class="add-edit-country">
    <div class="container-fluid custom-container">
      <div class="add-edit-country-form">
        <h3>
          {{ objectiveId ? $t("OBJECTIVE.EDIT") : $t("OBJECTIVE.ADD") }}
        </h3>
        <validation-observer v-slot="{ invalid }" ref="addEditSchoolTyeForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="formValues.name"
                    :label="$t('GLOBAL_NAME')"
                    :name="$t('GLOBAL_NAME')"
                    :rules="'required|max:30'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <label>
                    <span><i class="fa-solid fa-asterisk"></i></span>
                    {{$t('QUESTIONS.LEVELS')}}
                  </label>
                  <SelectSearch
                    v-model="formValues.level_id"
                    :name="$t('QUESTIONS.LEVELS')"
                    :options="levels"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                    :deselectFromDropdown="true"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <label>
                    <span><i class="fa-solid fa-asterisk"></i></span>
                    {{$t('MISSIONS.LEARNING_PATH')}}
                  </label>
                  <SelectSearch
                    v-model="formValues.learning_path_id"
                    :name="$t('MISSIONS.LEARNING_PATH')"
                    :options="learningPaths"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
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
                  {{ objectiveId ? $t("GLOBAL_EDIT") : $t("GLOBAL_SAVE") }}
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
import {getObjectiveCategoryByIdRequest} from "@/api/objective";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import {getAllLearningPathsRequest} from "@/api/learningPath";
import {getAllLevelsRequest} from "@/api/level";
import levels from "../../../../../views/levels/index.vue";
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
        learning_path_id: "",
        level_id: ""
      },
      objectiveId: this.$route.params.id,
      learningPaths:[],
      levels:[],
    };
  },
  methods: {
    onSubmit() {
      this.$refs.addEditSchoolTyeForm.validate().then((success) => {
        if (!success) return;
      });
      if (this.objectiveId) {
        this.$emit("editObjectiveCategory", this.formValues);
      } else {
        this.$emit("addObjectiveCategory", this.formValues);
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getObjectiveCategoryById() {
      if (this.objectiveId) {
        this.ApiService(getObjectiveCategoryByIdRequest(this.objectiveId)).then((response) => {
          this.formValues = response.data.data;
          this.formValues.learning_path_id = response.data.data.learning_path.id
          this.formValues.level_id = response.data.data.level.id
        });
      }
    },
    getLearningPaths() {
      this.ApiService(getAllLearningPathsRequest()).then((response) => {
        this.learningPaths = response.data.data;
      });
    },
    getAllLevels(){
      this.ApiService(getAllLevelsRequest()).then((response) => {
        this.levels = response.data.data
      })
    }
  },
  mounted() {
    this.getAllLevels()
    this.getObjectiveCategoryById();
    this.getLearningPaths();
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
