<template>
  <div class="add-edit-academic-year">
    <div class="container-fluid custom-container">
      <div class="add-edit-academic-year-form">
        <h3>{{ $route.params.id ? "تعديل الترم الدراسى" : "إضافة ترم الدراسى" }}</h3>
        <validation-observer v-slot="{ invalid }" ref="addEditAcademicYearForm">
          <GenericForm
            :schema="academicYearSchema"
            @handleCancel="handleCancel"
            @onSubmit="onSubmit"
            :loading="loading"
            :submitButton="$route.params.id ? 'حفظ' : 'أضافة'"
            cancelButton="إلغاء"
            :invalid="invalid"
          ></GenericForm>
        </validation-observer>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from "@/components/Shared/Modal/index.vue";
import GenericForm from "@/components/Shared/GenericForm";
import { geAllTerms, getAllStudyYear } from "@/services/dropdownService";
import moment from "moment";
import { getSingleAcademicYearRequest } from "@/api/academicYear";

export default {
  components: {
    Modal,
    GenericForm,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      academicYearSchema: [
        {
          key: "study_year_id",
          col: "3",
          listen: "id",
          type: "select",
          optionValue: "name",
          label: "العام الدراسى",
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "",
        },
        {
          key: "term_id",
          col: "3",
          listen: "id",
          type: "select",
          optionValue: "name",
          label: "الترم الدراسى",
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "",
        },
        {
          key: "start_date",
          label: "تاريخ البداية",
          col: "3",
          listen: "id",
          value: "",
          type: "date",
          rules: "required",
          placeholder: "أختر تاريخ البداية",
        },
        {
          key: "end_date",
          label: "تاريخ النهاية",
          col: "3",
          listen: "id",
          value: "",
          type: "date",
          rules: "required",
          placeholder: "أختر تاريخ النهاية",
        },
      ],
      academicYear: {},
    };
  },
  methods: {
    onSubmit() {
      this.$refs.addEditAcademicYearForm.validate().then((success) => {
        if (!success) return;
      });
      this.updateFields();
      this.$emit("handleAddAcademicYear", this.academicYear);
    },
    updateFields() {
      this.academicYearSchema.forEach((field) => {
        try {
          if (field.type === "date")
            this.$set(
              this.academicYear,
              field.key,
              moment(field.value, "DD-MM-YYYY").format("YYYY-MM-DD")
            );
          else this.$set(this.academicYear, field.key, field.value);
        } catch (error) {
          console.error(`Error updating field ${field.key}:`, error);
        }
      });
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getAcademicYearToEdit() {
      if (this.$route.params.id) {
        this.ApiService(getSingleAcademicYearRequest(this.$route.params.id))
          .then((response) => {
            console.log(response.data.data);
            this.academicYearSchema[0].value = response.data.data.studyYear.id;
            this.academicYearSchema[1].value = response.data.data.term.id;
            this.academicYearSchema[2].value = response.data.data.start_date;
            this.academicYearSchema[3].value = response.data.data.end_date;
          })
          .then(() => {
            this.showPermissionItemsSelected();
          });
      }
    },
  },
  mounted() {
    if (this.$route.params.id) this.getAcademicYearToEdit(this.$route.params.id);
    getAllStudyYear(this.academicYearSchema, "study_year_id");
    geAllTerms(this.academicYearSchema, "term_id");
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
