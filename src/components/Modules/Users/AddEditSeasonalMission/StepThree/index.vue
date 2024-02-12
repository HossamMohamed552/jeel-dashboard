<template>
  <validation-observer v-slot="{ invalid }" ref="stepThreeForm">
    <GenericForm
      :schema="stepForm"
      @handleInput="handleInput"
      :loading="loading"
      :submitedForm="false"
      :invalid="invalid"
    >
      <template v-slot:customSubmit>
        <b-col class="add-prize" lg="4">
          <Button
            :disabled="invalid"
            type="submit"
            :loading="loading"
            @click="handleAdd"
            custom-class="submit-btn"
          >
            إضافة
          </Button>
        </b-col>
      </template>
      <ListItems
        class="seasonal-mission-custom-list-item"
        :tableItems="prizeGroup"
        :headerName="'قائمة الجوائز'"
        :fieldsList="fieldsList"
        :showSortControls="false"
      >
      </ListItems>
      <div class="buttons-container">
        <slot></slot>
        <div class="steps">
          <Button custom-class="cancel-btn margin" v-if="currentStep > 0" @click="prevStep">
            السابق
          </Button>

          <Button custom-class="submit-btn" @click="nextStep"> التالي </Button>
        </div>
      </div>
    </GenericForm>
  </validation-observer>
</template>

<script>
import Stepper from "@/components/Shared/Stepper/index.vue";
import GenericForm from "@/components/Shared/GenericForm";
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import { mapActions } from "vuex";
import {
  getAllPrizeSeasonalMissionType,
  getCharacterType,
  getCharacterContent,
  getLibraryType,
  getLibraryContent,
} from "@/services/dropdownService";
import _ from "lodash";

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
      loading: false,
      entry: {},
      prizeIndex: 0,
      prizeGroup: [],
      prizeType: "",
      fieldsList: [
        { key: "id", label: "التسلسل" },
        { key: "main_percentage", label: "من نسبة" },
        { key: "max_percentage", label: "إلى نسبة" },
        { key: "prizeable_type_name", label: "نوع الجائزة" },
        { key: "prizeable_id_name", label: "الجائزة" },
      ],
    };
  },
  methods: {
    ...mapActions(["addPrize"]),

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
        const optionName = selectedOption ? selectedOption.name : "";
        field.name = optionName;
      }

      if (key === "prizeable_type") {
        let selected = this.stepForm[2].options.find((option) => option.id === value);
        this.prizeType = selected.name;
        if (selected.name == "المكتبة" || selected.name == "شخصيات") {
          this.stepForm[3].type = "select";
          this.stepForm[4].type = "select";
          this.stepForm[3].value = "";

          if (selected.name == "المكتبة") getLibraryType(this.stepForm, "prizeable_id");
          else if (selected.name == "شخصيات") getCharacterType(this.stepForm, "prizeable_id");
        } else {
          this.stepForm[3].type = "hidden";
          this.stepForm[4].type = "hidden";
        }
      }

      if (key === "prizeable_id") {
        if (this.prizeType == "المكتبة") getLibraryContent(this.stepForm, "type_id", value);
        else if (this.prizeType == "شخصيات") getCharacterContent(this.stepForm, "type_id", value);
      }
    }, 300),
    handleAdd() {
      this.stepForm.forEach((field) => {
        try {
          if (field.type == "select") {
            if (field.multiple) {
              this.$set(this.entry, field.key, field.value);
              this.$set(this.entry, `${field.key}_name`, field.name.join(", "));
            } else {
              this.$set(this.entry, `${field.key}_name`, field.name);
              this.$set(this.entry, field.key, field.value);
            }
          } else this.$set(this.entry, field.key, field.value);
          field.value = "";
        } catch (error) {
          console.error(`Error updating field ${field.key}:`, error);
        }
      });
      this.prizeIndex++;
      this.entry.id = this.prizeIndex;
      this.addPrize(this.entry);
      this.prizeGroup.push(this.entry);
      this.entry = {};
    },
  },
  computed: {},
  async mounted() {
    getAllPrizeSeasonalMissionType(this.stepForm, "prizeable_type");
  },
};
</script>

<style lang="scss" scoped>
@import "../index.scss";

.add-prize {
  display: flex;
  align-items: end;
  justify-content: flex-end;
}
</style>
