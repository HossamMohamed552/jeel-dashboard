<template>
  <div class="add-edit-group">
    <div class="container-fluid custom-container">
      <div class="add-edit-group-form">
        <h3>{{ $route.params.id ? $t("VIDEO.EDIT") : $t("VIDEO.ADD_NEW") }}</h3>
        <validation-observer v-slot="{ invalid }" ref="addEditVideoForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="3" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="createVideo.name"
                    :label="$t('VIDEO.NAME')"
                    :name="$t('VIDEO.NAME')"
                    :rules="'required|min:3'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <b-form-group :label="$t('VIDEO.Description')" v-slot="{ ariaDescribedby }" class="description">
                    <TextAreaField v-model="createVideo.description" :rules="'required'" rows="5" :name="$t('VIDEO.Description')">
                    </TextAreaField>
                  </b-form-group>
                </div>
              </b-col>
              <b-col lg="5" class="mb-3">
                <div class="hold-field">
                  <ValidationProvider v-slot="{errors}" :rules="$route.params.id ? '' : 'required'" name="video">
                    <b-form-file accept="video/mp4,video/x-m4v,video/*" placeholder="اختر ملف" v-model="createVideo.video" name="video">
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
                    <b-form-group :label="$t('VIDEO.learning_path')" v-slot="{ ariaDescribedby }" class="learning_path">
                      <SelectField :rules="'required'" v-model="createVideo.learning_path_id" name="learning_path" :options="paths">
                      </SelectField>
                    </b-form-group>
                  </ValidationProvider>
                </div>
              </b-col>
              <b-col lg="5" class="mb-3 mt-3">
                <div class="hold-field">
                  <ValidationProvider v-slot="{errors, invalid}" rules="required">
                    <b-form-group :label="$t('VIDEO.level')" v-slot="{ ariaDescribedby }" class="level">
                      <SelectField :rules="'required'" v-model="createVideo.level_id" name="level" :options="levels">
                      </SelectField>
                    </b-form-group>
                  </ValidationProvider>
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
import {getSingleVideoRequest} from "@/api/videos";
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
      levels:[],
      createVideo: {
        name: "",
        description: "",
        video: null,
        learning_path_id: "",
        title:'',
        original_name:'',
        level_id:''
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.addEditVideoForm.validate().then((success) => {
        if (!success) return;
      });
      if (this.$route.params.id) {
        this.$emit('handleEditVideo', this.createVideo)
      } else {
        this.$emit('handleAddVideo', this.createVideo)
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getVideoToEdit() {
      if (this.$route.params.id) {
        this.ApiService(getSingleVideoRequest(this.$route.params.id)).then((response) => {
          this.createVideo.name =response.data.data.title
          this.createVideo.description =response.data.data.description
          this.createVideo.video = response.data.data.url
          this.createVideo.learning_path_id = response.data.data.learningPath.id
          this.createVideo.level_id=response.data.data.level.id
        })
      }
    },
    getAllLearningPaths() {
      this.ApiService(getLearningPathsRequest()).then((response) => {
        const pathsArr= response.data.data;
        this.paths = pathsArr.map(path=>{return {value:path.id,text:path.name}})
      })
    },
    getAllLevels() {
      this.ApiService(getLevelsRequest()).then((response) => {
        const levelsArr = response.data.data;
        this.levels = levelsArr.map(path=>{return {value:path.id,text:path.name}})
      })
    },
  },
  mounted() {
    this.getVideoToEdit();
    this.getAllLearningPaths();
    this.getAllLevels();
  }
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
