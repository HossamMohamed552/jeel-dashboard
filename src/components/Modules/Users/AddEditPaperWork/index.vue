<template>
  <div class="add-edit-group">
    <div class="container-fluid custom-container">
      <div class="add-edit-group-form">
        <h3>{{ $route.params.id ? $t("PAPER_WORK.EDIT") : $t("PAPER_WORK.ADD_NEW") }}</h3>
        <validation-observer v-slot="{ invalid }" ref="addEditPaperWorkForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="createPaperWork.name"
                    :label="$t('PAPER_WORK.NAME')"
                    :name="$t('PAPER_WORK.NAME')"
                    :rules="'required|min:3'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3 mt-1">
                <div class="hold-field">
                  <ValidationProvider v-slot="{errors, invalid}" rules="required">
                    <b-form-group :label="$t('PAPER_WORK.type')" v-slot="{ ariaDescribedby }"
                                  class="type">
                      <SelectField :rules="'required'" v-model="createPaperWork.type" name="type"
                                   :options="paperWorkTypes">
                      </SelectField>
                    </b-form-group>
                  </ValidationProvider>
                </div>
              </b-col>
              <b-col lg="5" class="mb-3">
                <div class="hold-field">
                  <ValidationProvider v-slot="{errors}" :rules="$route.params.id ? '' : 'required'"
                                      name="file">
                    <b-form-file accept="application/pdf" placeholder="اختر ملف"
                                 v-model="createPaperWork.file" name="file">
                    </b-form-file>
                    <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                      {{ error }}
                    </b-form-invalid-feedback>
                  </ValidationProvider>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="5" class="mb-3 mt-3">
                <div class="hold-field">
                  <ValidationProvider v-slot="{errors, invalid}" rules="required">
                    <b-form-group :label="$t('PAPER_WORK.learning_path')"
                                  v-slot="{ ariaDescribedby }" class="learning_path">
                      <SelectField :rules="'required'" v-model="createPaperWork.learning_path_id"
                                   name="learning_path" :options="paths">
                      </SelectField>
                    </b-form-group>
                  </ValidationProvider>
                </div>
              </b-col>
              <b-col lg="5" class="mb-3 mt-3">
                <div class="hold-field">
                  <ValidationProvider v-slot="{errors, invalid}" rules="required">
                    <b-form-group :label="$t('PAPER_WORK.level')" v-slot="{ ariaDescribedby }"
                                  class="level">
                      <SelectField :rules="'required'" v-model="createPaperWork.level_id"
                                   name="level" :options="levels">
                      </SelectField>
                    </b-form-group>
                  </ValidationProvider>
                </div>
              </b-col>
              <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <b-form-group :label="$t('PAPER_WORK.Description')" v-slot="{ ariaDescribedby }"
                                class="description">
                    <TextAreaField v-model="createPaperWork.description" :rules="'required|min:5'"
                                   rows="5" :name="$t('PAPER_WORK.Description')">
                    </TextAreaField>
                  </b-form-group>
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
                  {{ $route.params.id ? $t("GLOBAL_EDIT") : $t("GLOBAL_SAVE") }}
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
import TextAreaField from "@/components/Shared/TextAreaField/index.vue";
import SelectField from "@/components/Shared/SelectField/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {getSinglePaperworkRequest} from "@/api/paperWork";
import {getLearningPathsRequest} from "@/api/learningPath";
import {getLevelsRequest} from "@/api/level";


export default {
  components: {
    Modal,
    TextField,
    TextAreaField,
    Button,
    SelectField
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      paths: [],
      levels: [],
      paperWorkTypes: [
        {value: 'single', text: 'single'},
        {value: 'multi', text: 'multi'},
      ],
      createPaperWork: {
        name: "",
        description: "",
        type: "",
        file: null,
        learning_path_id: "",
        level_id: ''
      }
    };
  },
  methods: {
    onSubmit() {
      // this.$refs.addEditPaperWorkForm.validate().then((success) => {
      //   if (!success) return;
      // });
      if (this.$route.params.id) {
        this.$emit('handleEditPaperWork', this.createPaperWork)
      } else {
        this.$emit('handleAddPaperWork', this.createPaperWork)
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getPaperWorkToEdit() {
      if (this.$route.params.id) {
        this.ApiService(getSinglePaperworkRequest(this.$route.params.id)).then((response) => {
          this.createPaperWork.name = response.data.data.name
          this.createPaperWork.type = response.data.data.type
          this.createPaperWork.description = response.data.data.description
          this.createPaperWork.file = response.data.data.url
          this.createPaperWork.learning_path_id = response.data.data.learningPath.id
          this.createPaperWork.level_id = response.data.data.level.id
          console.log('this.createPaperWork.file',this.createPaperWork.file)
        })
      }
    },
    getAllLearningPaths() {
      this.ApiService(getLearningPathsRequest()).then((response) => {
        const pathsArr = response.data.data;
        this.paths = pathsArr.map(path => {
          return {value: path.id, text: path.name}
        })
      })
    },
    getAllLevels() {
      this.ApiService(getLevelsRequest()).then((response) => {
        const levelsArr = response.data.data;
        this.levels = levelsArr.map(path => {
          return {value: path.id, text: path.name}
        })
      })
    },
  },
  mounted() {
    this.getPaperWorkToEdit();
    this.getAllLearningPaths();
    this.getAllLevels();
  }
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
