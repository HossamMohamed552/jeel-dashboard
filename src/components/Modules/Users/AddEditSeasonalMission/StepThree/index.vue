<template>
  <div>
    <validation-observer v-slot="{ invalid }" ref="stepThreeForm">
      <GenericForm
        :schema="stepForm"
        @handleInput="handleInput"
        :loading="loading"
        :submitedForm="false"
        :invalid="invalid"
      >
        <template v-slot:customSubmit>
          <b-col class="add-prize" lg="12">
            <Button
              :disabled="invalid"
              type="submit"
              :loading="loading"
              @click="handleAdd"
              custom-class="submit-btn"
            >
              {{ $t('ADD_ANSWER') }}
            </Button>
          </b-col>
        </template>

      </GenericForm>
    </validation-observer>
    <ListItems
      class="seasonal-mission-custom-list-item"
      :tableItems="prizeGroup"
      :headerName="$t('seasonalMission.prize')"
      :fieldsList="fieldsList"
      :permission_delete="'add-seasonal-missions'"
      :showSortControls="false"
      :not-hide-pagination="false"
      @deleteItem="deleteItem($event)"
    >
    </ListItems>
    <div class="buttons-container">
      <slot></slot>
      <div class="steps">
        <Button custom-class="cancel-btn margin" v-if="currentStep > 0" @click="prevStep">
          {{ $t('GLOBAL_BACK') }}
        </Button>
        <Button
          custom-class="submit-btn"
          :disabled="!isNextStep && prizeGroup.length === 0"
          @click="nextStep"
        >
          {{ $t('GLOBAL_NEXT') }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Stepper from "@/components/Shared/Stepper/index.vue";
import GenericForm from "@/components/Shared/GenericForm";
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import { mapActions, mapGetters } from "vuex";
import {
  getAllPrizeSeasonalMissionType,
  getCharacterType,
  getCharacterContent,
  getLibraryType,
  getLibraryContent,
} from "@/services/dropdownService";
import _ from "lodash";
import {log} from "video.js";

export default {
  components: {
    Stepper,
    GenericForm,
    Button,
    ListItems,
  },
  props: {
    currentStep: {
      type: Number,
      default: 0,
    },
    stepForm: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isNextStep: false,
      loading: false,
      entry: {},
      prizeIndex: 0,
      prizeGroup: [],
      prizeType: "",
    };
  },
  methods: {
    ...mapActions(["addPrize"]),
    deleteItem($event){
      this.$store.commit('DELETE_PRIZE_FROM_LIST',$event)
    },
    nextStep() {
      this.$emit("nextStep");
    },
    prevStep() {
      this.$emit("prevStep");
    },
    handleCancel() {
      this.$emit("onSubmit", this.stepForm);
    },
    handleInput: _.debounce(function (key, value, field) {
      if (field.multiple) {
        const selectedOptionNames = value.map((singleValue) => {
          const selectedOption = field.options.find(
            (option) => option[field.listen] === singleValue
          );
          return selectedOption ? selectedOption.name : "";
        });
        field.name = selectedOptionNames;
      } else {
        const selectedOption = field.options.find((option) => option[field.listen] === value);
        let optionName;
        if (this.prizeType == "المكتبة")
          optionName = selectedOption ? selectedOption.file_name : "";
        else optionName = selectedOption ? selectedOption.name : "";
        field.name = optionName;
      }

      if (key === "type_id") {
        let selected = this.stepForm[2].options.find((option) => option.id === value);
        this.prizeType = selected ? selected?.name : '';
        this.stepForm[3].disabled = false;
        if (selected.name === "المكتبة" || selected.name === "شخصيات") {
          this.stepForm[3].type = "select";
          this.stepForm[4].type = "select";
          this.stepForm[3].value = "";
          this.stepForm[5].type = "hidden";
          this.stepForm[5].value = "";

          if (selected.name == "المكتبة") {
            this.stepForm[4].optionValue = "file_name";
            getLibraryType(this.stepForm, "prizeable_type");
          } else if (selected.name == "شخصيات") {
            this.stepForm[4].optionValue = "name";
            getCharacterType(this.stepForm, "prizeable_type");
          }
        } else {
          this.stepForm[3].type = "hidden";
          this.stepForm[4].type = "hidden";
          this.stepForm[5].type = "number";
          this.stepForm[5].disabled = false;
        }
      }

      if (key === "prizeable_type") {
        this.stepForm[4].disabled = false;
        if (this.prizeType == "المكتبة") {
          field.models = "App\\Models\\Library";
          getLibraryContent(this.stepForm, "prizeable_id", value);
        } else if (this.prizeType == "شخصيات") {
          field.models = "App\\Models\\PrizeCharacter";
          getCharacterContent(this.stepForm, "prizeable_id", value);
        }
      }
    }, 300),
    resetInput() {
      this.stepForm[3].disabled = true;
      this.stepForm[4].disabled = true;
    },
    handleAdd() {
      this.stepForm.forEach((field) => {
        try {
          if (field.type == "select") {
            if (field.multiple) {
              if (field.key == "prizeable_type") this.$set(this.entry, field.key, field.models);
              else this.$set(this.entry, field.key, field.value);
              this.$set(this.entry, `${field.key}_name`, field.name.join(", "));
            } else {
              this.$set(this.entry, `${field.key}_name`, field.name);
              this.$set(this.entry, field.key, field.value);
            }
          } else if (field.type == "number" && field.key == "jeel_coins") {
            this.$set(this.entry, `prizeable_id_name`, field.value);
            this.$set(this.entry, field.key, field.value);
          } else this.$set(this.entry, field.key, field.value);
          field.value = "";
        } catch (error) {
          console.error(`Error updating field ${field.key}:`, error);
        }
      });
      if (this.prizeGroup.length == 0) this.prizeIndex++;
      else this.prizeIndex = this.prizeGroup[this.prizeGroup.length - 1].id + 1;
      this.entry.id = this.prizeIndex;
      this.addPrize(this.entry);
      this.entry = {};
      this.$refs.stepThreeForm.reset()
      this.resetInput();
      this.isNextStep = true;
    },
    validateForm(val) {
      // Find the rule for the max_percentage field
      const maxPercentageRule = this.stepForm.find((rule) => rule.key === "max_percentage");

      // If the rule is found, construct the new rules string with val
      if (maxPercentageRule) {
        // Split existing rules by "|" and filter out any occurrences of "custom_greater_than:"
        const existingRules = maxPercentageRule.rules
          .split("|")
          .filter((rule) => !rule.includes("min_value:"));

        // Concatenate the existing rules with the new rule containing val
        maxPercentageRule.rules = existingRules.concat(`min_value:${val}`).join("|");
      }
    },
  },
  computed: {
    fieldsList(){
      return  [
        { key: "vid", label: this.$i18n.t('TABLE_FIELDS.id') },
        { key: "main_percentage", label: this.$i18n.t('seasonalMission.minPercentage') },
        { key: "max_percentage", label: this.$i18n.t('seasonalMission.maxPercentage') },
        { key: "type_id_name", label: this.$i18n.t('seasonalMission.prizeType') },
        { key: "prizeable_id_name", label: this.$i18n.t('seasonalMission.singlePrize') },
        {key: "actions", label: this.$i18n.t('TABLE_FIELDS.actions')},
      ]
    },
    ...mapGetters(["getPrizesList"]),
  },
  async mounted() {
    getAllPrizeSeasonalMissionType(this.stepForm, "type_id");
    this.prizeGroup = this.getPrizesList;
    if (this.$route.params.id) {
      this.prizeGroup.forEach((prize) => {
        prize["prizeable_type_name"] = prize.type.name;
        if (prize.type.key === "characters"){
          prize["prizeable_id_name"] = prize.prizeable_type_name;
        } else if(prize.type.key === "library"){
          prize["prizeable_id_name"] = prize.library.file_name;
        } else if(prize.type.key === "jeel_gem"){
          prize["prizeable_id_name"] = prize.jeel_coins;
        }
      });
    }
    this.$watch(() => {
        // return this.$refs.stepThreeForm.refs["نسبة من"].value;
        },
      (val) => {this.validateForm(val);}
    );
  },

  watch: {
    getPrizesList() {
      this.prizeGroup = this.getPrizesList;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../index.scss";

.add-prize {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}
</style>
