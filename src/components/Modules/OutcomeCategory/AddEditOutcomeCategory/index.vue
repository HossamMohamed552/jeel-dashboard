<template>
  <div class="add-edit-country">
    <div class="container-fluid custom-container">
      <div class="add-edit-country-form">
        <h3>
          {{ outcomeId ? $t("OUTCOME.EDIT") : $t("OUTCOME.ADD") }}
        </h3>
        <validation-observer v-slot="{ invalid }" ref="addEditSchoolTyeForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="formValues.name"
                    :label="$t('GLOBAL_NAME')"
                    :name="$t('GLOBAL_NAME')"
                    :rules="'required'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3">
              <div class="hold-field">
                <TextField
                  v-model="formValues.slug"
                  :label="$t('SLUG')"
                  :name="$t('SLUG')"
                  :rules="'required'"
                ></TextField>
              </div>
            </b-col>
              <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <label>
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
                  {{ outcomeId ? $t("GLOBAL_EDIT") : $t("GLOBAL_SAVE") }}
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
import {getAllLearningPathsRequest} from "@/api/learningPath";
import {getOutcomeCategoryByIdRequest} from "@/api/outcome";
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
        slug: "",
        learning_path_id: ""
      },
      outcomeId: this.$route.params.id,
      learningPaths:[],
    };
  },
  methods: {
    onSubmit() {
      this.$refs.addEditSchoolTyeForm.validate().then((success) => {
        if (!success) return;
      });
      if (this.outcomeId) {
        this.$emit("editOutcomeCategory", this.formValues);
      } else {
        this.$emit("addOutcomeCategory", this.formValues);
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getOutcomeCategoryById() {
      if (this.outcomeId) {
        this.ApiService(getOutcomeCategoryByIdRequest(this.outcomeId)).then((response) => {
          this.formValues = response.data.data;
          this.formValues.learning_path_id = response.data.data.learning_path.id
        });
      }
    },
    getLearningPaths() {
      this.ApiService(getAllLearningPathsRequest()).then((response) => {
        this.learningPaths = response.data.data;
      });
    }
  },
  mounted() {
    this.getOutcomeCategoryById();
    this.getLearningPaths();
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
