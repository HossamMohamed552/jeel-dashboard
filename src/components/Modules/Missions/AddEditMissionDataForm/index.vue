<template>
  <div class="add-edit-mission">
    <div class="container-fluid custom-container">
      <div class="add-edit-mission-form">
        <h3>{{ $route.params.id ? $t("MISSIONS.EDIT") : $t("MISSIONS.ADD_NEW") }}</h3>
        <validation-observer v-slot="{ invalid }" ref="addEditMissionDataForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="mission.level_id"
                    :label="$t('MISSIONS.level')"
                    :name="$t('MISSIONS.level')"
                    :options="levels"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="mission.name"
                    :label="$t('MISSIONS.name')"
                    :name="$t('MISSIONS.name')"
                    :rules="'required'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="mission.learning_path_ids"
                    :label="$t('MISSIONS.LEARNING_PATH')"
                    :name="$t('MISSIONS.LEARNING_PATH')"
                    :options="learningPaths"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                    multiple
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="mission.term_id"
                    :label="$t('MISSIONS.terms')"
                    :name="$t('MISSIONS.terms')"
                    :options="terms"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="mission.country_id"
                    :label="$t('MISSIONS.country')"
                    :name="$t('MISSIONS.country')"
                    :options="countries"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="mission.duration"
                    :label="$t('MISSIONS.duration')"
                    :name="$t('MISSIONS.duration')"
                    :rules="'required|numeric'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <TextAreaField
                    v-model="mission.description"
                    :label="$t('MISSIONS.description')"
                    :name="$t('MISSIONS.description')"
                    :rules="'required'"
                  ></TextAreaField>
                </div>
              </b-col>
              <b-col lg="12" class="mb-3">
                <div class="hold-field mt-4">
                  <ImageUploader
                    :name="'logoSchool'"
                    :text="$t('MISSIONS.UPLOAD_IMAGE')"
                    @imageUpload="handleUploadImage"
                    :item-image="mission.itemImage"
                  />
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
                    :custom-class="'submit-btn'"
                  >
                    {{ $t("GLOBAL_NEXT") }}
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
import TextAreaField from "@/components/Shared/TextAreaField/index.vue";
import { getSingleMissionsRequest } from "@/api/missios";
import ImageUploader from "@/components/Shared/ImageUploader/index.vue";

export default {
  components: {
    TextField,
    SelectSearch,
    Button,
    TextAreaField,
    ImageUploader,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    levels: {
      type: Array,
      default: () => [],
    },
    learningPaths: {
      type: Array,
      default: () => [],
    },
    terms: {
      type: Array,
      default: () => [],
    },
    countries: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      mission: {
        name: "",
        level_id: null,
        learning_path_ids: null,
        country_id: null,
        term_id: null,
        duration: null,
        description: null,
        itemImage: null,

        mission_image: null,
      },
    };
  },
  methods: {
    onSubmit() {
      this.$emit("onSubmit", this.mission);
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    handleBack() {
      this.$emit("handleBack");
    },
    handleUploadImage(e) {
      this.mission.itemImage = URL.createObjectURL(e.target.files[0])
      if (e) this.mission.mission_image = e.target.files[0];
      else return;
    },
  },
  mounted() {
    if (this.$route.params.id) {
      this.ApiService(getSingleMissionsRequest(this.$route.params.id)).then((response) => {
        this.mission.name = response.data.data.name;
        this.mission.level_id = response.data.data.level.id;
        this.mission.duration = response.data.data.data_range;
        this.mission.description = response.data.data.description;
        this.mission.country_id = response.data.data.country.id;
        this.mission.term_id = response.data.data.term.id;
        this.mission.learning_path_ids = response.data.data.learningpaths.map((item) => item.id);
        this.mission.itemImage = response.data.data.mission_image
      });
    }
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
