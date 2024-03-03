<template>
  <div class="container-fluid custom-container">
    <div class="add-edit-form">
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
    </div>
  </div>
</template>

<script>
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

export default {
  components: {
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
        let optionName;
        if (this.prizeType == "المكتبة")
          optionName = selectedOption ? selectedOption.file_name : "";
        else optionName = selectedOption ? selectedOption.name : "";
        field.name = optionName;
      }

      if (key === "type_id") {
        let selected = this.stepForm[2].options.find((option) => option.id === value);
        this.prizeType = selected.name;
        this.stepForm[3].disabled = false;
        if (selected.name == "المكتبة" || selected.name == "شخصيات") {
          this.stepForm[3].type = "select";
          this.stepForm[4].type = "select";
          this.stepForm[3].value = "";

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
          } else this.$set(this.entry, field.key, field.value);
          field.value = "";
        } catch (error) {
          console.error(`Error updating field ${field.key}:`, error);
        }
      });
      console.log(this.prizeGroup);
      if (this.prizeGroup.length == 0) this.prizeIndex++;
      else this.prizeIndex = this.prizeGroup[this.prizeGroup.length - 1].id + 1;
      this.entry.id = this.prizeIndex;
      this.addPrize(this.entry);
      this.entry = {};
      this.resetInput();
    },
  },
  computed: {
    ...mapGetters(["getPrizesList"]),
  },
  async mounted() {
    getAllPrizeSeasonalMissionType(this.stepForm, "type_id");
    this.prizeGroup = this.getPrizesList;
    if (this.$route.params.id) {
      this.prizeGroup.forEach((prize) => {
        prize["prizeable_type_name"] = prize.type.name;
        if (prize?.type?.key == "characters") prize["prizeable_id_name"] = prize.character.name;
        if (prize?.type?.key == "library") prize["prizeable_id_name"] = prize.library.name;
      });
    }
  },
  watch: {
    getPrizesList() {
      this.prizeGroup = this.getPrizesList;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";

.add-prize {
  display: flex;
  align-items: end;
  justify-content: flex-end;
}
</style>
