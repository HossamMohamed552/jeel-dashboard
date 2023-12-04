<template>
  <div class="add-edit-competition">
    <div class="container-fluid custom-container">
      <div class="add-edit-competition-form">
        <!-- <h3>{{ $route.params.id ? $t("MISSIONS.EDIT") : $t("MISSIONS.ADD_NEW") }}</h3> -->
        <validation-observer v-slot="{ invalid }" ref="addEditCompetitionForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="mission.name"
                    :label="$t('COMPETITIONS.NAME')"
                    :name="$t('COMPETITIONS.NAME')"
                    :rules="'required|max:30'"
                  ></TextField>
                </div>
              </b-col>
              <b-col class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="mission.level_id"
                    :label="$t('COMPETITIONS.LEVEL')"
                    :name="$t('COMPETITIONS.LEVEL')"
                    :options="levels"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="mission.level_id"
                    :label="$t('COMPETITIONS.MISSIONS')"
                    :name="$t('COMPETITIONS.MISSIONS')"
                    :options="levels"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                  ></SelectSearch>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="mission.level_id"
                    :label="$t('COMPETITIONS.GOALS')"
                    :name="$t('COMPETITIONS.GOALS')"
                    :options="levels"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="mission.level_id"
                    :label="$t('COMPETITIONS.OUTPUTS')"
                    :name="$t('COMPETITIONS.OUTPUTS')"
                    :options="levels"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col class="mb-3">
                <b-row>
                  <b-col>
                    <div class="hold-field">
                      <ValidationProvider rules="required">
                        <label>
                          <span><i class="fa-solid fa-asterisk"></i></span>
                          {{ $t("COMPETITIONS.COMPETITION_PERIOD") }}</label
                        >
                        <date-picker
                          :lang="en"
                          :placeholder="$t('COMPETITIONS.FROM')"
                          v-model="mission.name"
                          @change="changeDate"
                          valueType="format"
                        ></date-picker>
                        <p class="show-date" v-if="showDate">
                          alaa
                          <!-- {{ createSchool.startDate }} -->
                        </p>
                      </ValidationProvider>
                    </div>
                  </b-col>
                  <b-col>
                    <div class="hold-field mt-4">
                      <ValidationProvider rules="required">
                        <label>
                          <!-- <span><i class="fa-solid fa-asterisk"></i></span> -->
                        </label>
                        <date-picker
                          :lang="en"
                          :placeholder="$t('COMPETITIONS.TO')"
                          v-model="mission.name"
                          @change="changeDate"
                          valueType="format"
                        ></date-picker>
                        <p class="show-date" v-if="showDate">
                          Alaa
                          <!-- {{ createSchool.startDate }} -->
                        </p>
                      </ValidationProvider>
                    </div>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="mission.name"
                    :label="$t('COMPETITIONS.TIME_PERIOD')"
                    :name="$t('COMPETITIONS.TIME_PERIOD')"
                    :rules="'required|max:30'"
                  ></TextField>
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
import TextField from "@/components/Shared/TextField/index.vue";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import TextAreaField from "@/components/Shared/TextAreaField/index.vue";
import { getSingleMissionsRequest } from "@/api/missios";
import ImageUploader from "@/components/Shared/ImageUploader/index.vue";
import { getLevelsRequest } from "@/api/level";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/locale/en";
import "vue2-datepicker/index.css";

export default {
  components: {
    TextField,
    SelectSearch,
    Button,
    TextAreaField,
    ImageUploader,
    DatePicker,
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
      showDate: true,
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
    changeDate() {
      this.showDate = false;
    },
    deleteImage() {
      this.mission.mission_image = null;
      this.mission.itemImage = null;
    },
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
      this.mission.itemImage = URL.createObjectURL(e.target.files[0]);
      if (e) this.mission.mission_image = e.target.files[0];
      else return;
    },
  },
  mounted() {
    if (this.$route.params.id) {
      this.ApiService(getSingleMissionsRequest(this.$route.params.id)).then(
        (response) => {
          this.mission.name = response.data.data.name;
          this.mission.level_id = response.data.data.level.id;
          this.mission.duration = response.data.data.data_range;
          this.mission.description = response.data.data.description;
          this.mission.country_id = response.data.data.country.id;
          this.mission.term_id = response.data.data.term.id;
          this.mission.learning_path_ids = response.data.data.learningpaths.map(
            (item) => item.id
          );
          this.mission.itemImage = response.data.data.mission_image;
          this.mission.mission_image = response.data.data.mission_image;
        }
      );
    }
  },
};
</script>
  <style scoped lang="scss">
@import "./index";
</style>
  