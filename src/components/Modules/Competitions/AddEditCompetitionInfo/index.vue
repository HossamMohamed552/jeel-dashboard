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
                    v-model="formValues.name"
                    :label="$t('COMPETITIONS.NAME')"
                    :name="$t('COMPETITIONS.NAME')"
                    :rules="'required|max:30'"
                  ></TextField>
                </div>
              </b-col>
              <b-col class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="formValues.level_id"
                    :label="$t('COMPETITIONS.LEVEL')"
                    :name="$t('COMPETITIONS.LEVEL')"
                    :options="levels"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    @input="getMissions()"
                    :rules="'required'" 
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    :multiple="true"
                    v-model="formValues.missions"
                    :label="$t('COMPETITIONS.MISSIONS')"
                    :name="$t('COMPETITIONS.MISSIONS')"
                    :options="missions"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :disabled="!formValues.level_id"
                    @input="getGoalsAndOutcomes"
                    :rules="'required'"
                  ></SelectSearch>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="formValues.objective_id"
                    :label="$t('COMPETITIONS.GOALS')"
                    :name="$t('COMPETITIONS.GOALS')"
                    :options="goals"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :disabled="!formValues.missions.length"
                  ></SelectSearch>
                  <!-- :rules="'required'" -->
                </div>
              </b-col>
              <b-col class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="formValues.outcome_id"
                    :label="$t('COMPETITIONS.OUTPUTS')"
                    :name="$t('COMPETITIONS.OUTPUTS')"
                    :options="outcomes"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :disabled="!formValues.missions.length"
                  ></SelectSearch>
                  <!-- :rules="'required'" -->
                </div>
              </b-col>
              <b-col class="mb-3">
                <b-row>
                  <b-col>
                    <div class="hold-field">
                      <!-- rules="required" -->
                      <ValidationProvider>
                        <label>
                          <span><i class="fa-solid fa-asterisk"></i></span>
                          {{ $t("COMPETITIONS.COMPETITION_PERIOD") }}</label
                        >
                        <date-picker
                          :lang="en"
                          :placeholder="$t('COMPETITIONS.FROM')"
                          v-model="formValues.start_date"
                          @change="changeDate"
                          valueType="format"
                          :rules="'required'"
                        ></date-picker>
                        <p class="show-date" v-if="showDate">
                          <!-- {{ createSchool.startDate }} -->
                        </p>
                      </ValidationProvider>
                    </div>
                  </b-col>
                  <b-col>
                    <div class="hold-field mt-4">
                      <!-- rules="required" -->
                      <ValidationProvider>
                        <label>
                          <!-- <span><i class="fa-solid fa-asterisk"></i></span> -->
                        </label>
                        <date-picker
                          :lang="en"
                          :placeholder="$t('COMPETITIONS.TO')"
                          v-model="formValues.end_date"
                          @change="changeDate"
                          valueType="format"
                          :rules="'required'"
                        ></date-picker>
                        <p class="show-date" v-if="showDate">
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
                    v-model="formValues.competition_time"
                    :label="$t('COMPETITIONS.TIME_PERIOD')"
                    :name="$t('COMPETITIONS.TIME_PERIOD')"
                    placeholder="مثال: 01:30"
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
                </div>
                <Button
                  @click="handleCancel"
                  :custom-class="'cancel-btn margin'"
                >
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
import { debounce } from "lodash";

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
    missions: {
      type: Array,
      default: () => [],
    },
    goals: {
      type: Array,
      default: () => [],
    },
    outcomes: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      en: "en",
      showDate: true,
      formValues: {
        name: "",
        level_id: null,
        missions: [],
        start_date: null,
        end_date: null,
        competition_time: null,
        objective_id: null,
        outcome_id: null,
      },
    };
  },
  methods: {
    changeDate() {
      this.showDate = false;
    },
    onSubmit() {
      this.$emit("onSubmit", this.formValues);
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    handleBack() {
      this.$emit("handleBack");
    },
    getMissions: debounce(function () {
      this.$emit("getMissions", this.formValues.level_id);
    }, 500),

    getGoalsAndOutcomes: debounce(function () {
      if (this.formValues.missions?.length) {
        const missions = this.formValues.missions.join(",");
        this.$emit("getGoalsAndOutcomes", missions);
      }
    }, 500),
  },
  mounted() {
    // if (this.$route.params.id) {
    // }
  },
};
</script>
  <style scoped lang="scss">
@import "./index";
</style>
  