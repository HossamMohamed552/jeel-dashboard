<template>
  <div class="add-edit-competition">
    <div class="container-fluid custom-container">
      <div class="add-edit-competition-form">
        <validation-observer v-slot="{ invalid }" ref="addEditCompetitionForm">
          <GenericForm
            @handleInput="handleInput"
            :schema="stepForm"
            :loading="loading"
            :submitedForm="false"
            :invalid="invalid"
          >
            <div class="buttons-container">
              <slot></slot>
              <div class="steps">
                <Button :custom-class="'submit-btn'" @click="nextStep"> التالي </Button>
              </div>
            </div>
          </GenericForm>
        </validation-observer>
      </div>
    </div>
  </div>
</template>
<script>
import { debounce } from "lodash";
import GenericForm from "@/components/Shared/GenericForm";
import {
  getLevelsForSuperVisor,
  getMissionForCompetiton,
  getGoalsForCompetiton,
  getOutcomesForCompetiton,
} from "@/services/dropdownService";
import Button from "@/components/Shared/Button/index.vue";
import _ from "lodash";

export default {
  components: {
    Button,
    GenericForm,
  },
  props: {
    stepForm: {
      type: Array,
      default: () => [],
    },
    currentStep: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      loading: false,
      showDate: true,
    };
  },
  methods: {
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
        const optionName = selectedOption ? selectedOption.name : "";
        field.name = optionName;
      }

      if (key === "level_id") {
        getMissionForCompetiton(this.stepForm, "missions", value);
        this.stepForm[2].disabled = false;
        this.stepForm[2].value = [];
        this.stepForm[3].value = [];
        this.stepForm[4].value = [];

      }
      if (key === "missions") {
        getGoalsForCompetiton(this.stepForm, "objective_id", value);
        this.stepForm[3].disabled = false;
        getOutcomesForCompetiton(this.stepForm, "outcome_id", value);
        this.stepForm[4].disabled = false;
      }
    }, 300),

    handleValueName(field) {},

    nextStep() {
      this.$emit("nextStep");
    },
  },
  async mounted() {
    await getLevelsForSuperVisor(this.stepForm, "level_id");
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
