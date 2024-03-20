<template>
  <div class="add-edit-school">
    <div class="container-fluid custom-container">
      <div class="add-edit-school-form">
        <!-- <h3>
          {{ $route.params.id ? $t("SCHOOL.EDIT") : $t("SCHOOL.ADD_NEW") }}
        </h3> -->
        <validation-observer v-slot="{ invalid }" ref="addEditSchoolForm">
          <form @submit.prevent="onSubmit">
            <div class="inputs-group">
              <h3>{{ $t("SCHOOL.SCHOOL_INFO") }}</h3>
              <b-row>
                <b-col v-for="(field, index) in schoolInfoFields" :key="index" :lg="field.col">
                  <div class="hold-field">
                    <SelectSearch
                      v-if="field.type === 'select'"
                      v-model="field.value"
                      :label="field.label"
                      :name="field.label"
                      :options="field.options"
                      :reduce="(option) => option.id"
                      :get-option-label="(option) => option.name"
                      :rules="field.rules"
                      :deselectFromDropdown="field.deselectFromDropdown"
                      :multiple="field.multiple"
                    ></SelectSearch>
                    <TextField
                      v-if="field.type === 'text'"
                      v-model="field.value"
                      :label="field.label"
                      :name="field.label"
                      :rules="field.rules"
                    ></TextField>
                  </div>
                </b-col>
                <b-col lg="12">
                  <div class="hold-field mt-4">
                    <UploadAttachment
                      v-if="!$route.params.id || createSchool.taskImageChangedRequest"
                      :type-of-attachment="'image'"
                      :label="$t('SCHOOL.SCHOOL_LOGO')"
                      :dropImage="true"
                      :name="'image'"
                      :rules="'required'"
                      :dropIdRef="'VideImage'"
                      :accept-files="'image/*'"
                      @setFileId="setFileImageId($event)"
                    />
                    <PreviewMedia
                      v-if="
                        $route.params.id &&
                        createSchool.taskImageChanged === false &&
                        !createSchool.taskImageChangedRequest
                      "
                      :header="$t('صورة السؤال')"
                      :media-name="createSchool.task_file_name"
                      :file-size="createSchool.task_file_size"
                      :image-url="createSchool.task"
                      :typeOfMedia="'image'"
                      :showRemoveButton="true"
                      @removeFile="
                        removeFile('task_image', 'taskImageChanged', 'taskImageChangedRequest')
                      "
                    />
                  </div>
                </b-col>
              </b-row>
            </div>

            <div class="inputs-group">
              <h3>{{ $t("SCHOOL.SCHOOL_MANAGER_INFO") }}</h3>
              <b-row>
                <b-col v-for="(field, index) in schoolManangerFields" :key="index" :lg="field.col">
                  <div class="hold-field">
                    <SelectSearch
                      v-if="field.type === 'select'"
                      v-model="field.value"
                      :label="field.label"
                      :name="field.label"
                      :options="schoolGroups"
                      :reduce="(option) => option.id"
                      :get-option-label="(option) => option.name"
                      :rules="field.rules"
                      :deselectFromDropdown="field.deselectFromDropdown"
                      :multiple="field.multiple"
                    ></SelectSearch>
                    <TextField
                      v-if="field.type === 'text'"
                      v-model="field.value"
                      :label="field.label"
                      :name="field.label"
                      :rules="field.rules"
                    ></TextField>
                  </div>
                </b-col>
              </b-row>
            </div>
            <div class="inputs-group">
              <h3>{{ $t("SCHOOL.address") }}</h3>
              <b-row>
                <b-col v-for="(field, index) in addressFields" :key="index" :lg="field.col">
                  <div class="hold-field">
                    <SelectSearch
                      v-if="field.type === 'select'"
                      v-model="field.value"
                      :label="field.label"
                      :name="field.label"
                      :options="schoolGroups"
                      :reduce="(option) => option.id"
                      :get-option-label="(option) => option.name"
                      :rules="field.rules"
                      :deselectFromDropdown="field.deselectFromDropdown"
                      :multiple="field.multiple"
                    ></SelectSearch>
                    <TextField
                      v-if="field.type === 'text'"
                      v-model="field.value"
                      :label="field.label"
                      :name="field.label"
                      :rules="field.rules"
                    ></TextField>
                    <TextAreaField
                      v-if="field.type === 'textarea'"
                      v-model="field.value"
                      :label="field.label"
                      :name="field.label"
                      :rules="field.rules"
                    ></TextAreaField>
                  </div>
                </b-col>
              </b-row>
            </div>

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
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import TextField from "@/components/Shared/TextField/index.vue";
import TextAreaField from "@/components/Shared/TextAreaField/index.vue";
import UploadAttachment from "@/components/Shared/UploadAttachment";
import Button from "@/components/Shared/Button/index.vue";
import {getSingleSchoolsRequest} from "@/api/school";
import Modal from "@/components/Shared/Modal/index.vue";
// Dropdown List
import {getAllSchoolGroupRequest} from "@/api/schoolGroup";
import {getSchoolDepartmentTypesRequest} from "@/api/school-department-type";
import {getAllCountryRequest} from "@/api/country";
import {getSchoolDegreeTypesRequest} from "@/api/school-degree-type";
import {getSchoolLanguagesRequest} from "@/api/school-languages";
import {
  getAllMusicStatusRequest,
  getAllStatusRequest,
  getAllStudentsTypeRequest,
} from "@/api/system";
//
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/locale/en";
import "vue2-datepicker/index.css";
import ImageUploader from "@/components/Shared/ImageUploader/index.vue";
import axios from "axios";
import VueCookies from "vue-cookies";
import {mapGetters} from "vuex";

export default {
  components: {
    SelectSearch,
    TextField,
    TextAreaField,
    UploadAttachment,
    ImageUploader,
    Modal,
    Button,
    DatePicker,
  },
  computed: {
    ...mapGetters(["user"]),
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      en: "en",
      schoolGroups: [
        {
          id: 1,
          name: "test",
          label: "test",
        },
      ],
      packages: [],
      schoolTypes: [],
      itemImage: null,
      showDate: true,

      schoolInfoFields: [
        {
          key: "name",
          col: "4",
          type: "text",
          label: this.$t("SCHOOL.name"),
          value: "",
          rules: "required|min:3|max:100",
        },
        {
          key: "country_id",
          col: "4",
          type: "select",
          label: this.$t("SCHOOL.COUNTRY"),
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "required",
        },
        {
          key: "school_group_id",
          col: "4",
          type: "select",
          label: this.$t("SCHOOL.SCHOOL_COLLECTION"),
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "required",
        },
        {
          key: "management_type_id",
          col: "4",
          type: "select",
          label: this.$t("SCHOOL.SCHOOL_TYPE"),
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "required",
        },
        {
          key: "certificate_id",
          col: "4",
          type: "select",
          label: this.$t("SCHOOL.SCHOOL_CERTIFICATE_TYPE"),
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "required",
        },
        {
          key: "teaching_language_id",
          col: "4",
          type: "select",
          label: this.$t("SCHOOL.LEARNING_LANGAUAGE"),
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "required",
        },
        {
          key: "students_type",
          col: "4",
          type: "select",
          label: this.$t("SCHOOL.STUDENT_TYPE"),
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "required",
        },
        {
          key: "phone",
          col: "4",
          type: "text",
          label: this.$t("SCHOOL.MOBILE"),
          value: "",
          rules: "required",
        },
        {
          key: "music_status",
          col: "4",
          type: "select",
          label: this.$t("SCHOOL.VOICE"),
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "required",
        },
        {
          key: "status",
          col: "4",
          type: "select",
          label: this.$t("SCHOOL.status"),
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "required",
        },
      ],
      schoolManangerFields: [
        {
          key: "owner_name",
          col: "4",
          type: "text",
          label: this.$t("SCHOOL.MANAGER_NAME"),
          value: "",
          rules: "required|min:3|max:100",
        },
        {
          key: "owner_role",
          col: "4",
          type: "text",
          label: this.$t("SCHOOL.MANAGER_TYPE"),
          value: "",
          rules: "required|min:3|max:100",
        },
        {
          key: "owner_phone",
          col: "4",
          type: "text",
          label: this.$t("SCHOOL.MANAGER_MOBILE"),
          value: "",
          rules: "required|min:3|max:100",
        },
      ],
      addressFields: [
        {
          key: "address",
          col: "12",
          type: "text",
          label: this.$t("SCHOOL.SCHOOL_ADDRESS"),
          value: "",
          rules: "required|min:3|max:100",
        },
        {
          key: "notes",
          col: "12",
          type: "textarea",
          label: this.$t("SCHOOL.NOTES"),
          value: "",
          rules: "required|min:3|max:100",
        },
      ],

      createSchool: {},
    };
  },
  methods: {
    setFileImageId($event) {
      this.createSchool.logo = $event;
    },
    handleInputValue() {
      const allFields = [this.schoolInfoFields, this.schoolManangerFields, this.addressFields];
      allFields.forEach((fieldArray) => {
        this.updateFields(fieldArray);
      });
    },

    updateFields(fieldArray) {
      // Generic method to update createSchool object based on the fieldArray
      fieldArray.forEach((field) => {
        try {
          this.$set(this.createSchool, field.key, field.value);
        } catch (error) {
          console.error(`Error updating field ${field.key}:`, error);
        }
      });
    },

    deleteImage() {
      this.createSchool.logo = null;
      this.itemImage = null;
    },

    sendDataNewSchool() {
      this.handleInputValue();
      const formData = new FormData();
      // Append form data using a loop
      Object.entries(this.createSchool).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          // Handle special cases or custom conditions if needed
          if (key === "logo" && typeof value !== "string") {
            formData.append(key, value);
          } else {
            formData.append(key, value);
          }
        }
      });
      if (this.$route.params.id)
        formData.append("_method", "put")
      const requestConfig = {
        headers: {
          Authorization: `Bearer ${VueCookies.get("token")}`,
          locale: "ar",
          "Content-Type": "multipart/form-data",
        },
      };

      const endpoint = this.$route.params.id ? `/schools/${this.$route.params.id}` : "/schools";
      const httpMethod = this.$route.params.id ? "POST" : "POST";

      axios
        .request({
          url: endpoint,
          method: httpMethod,
          data: formData,
          ...requestConfig,
        })
        .then(() => {
          this.$router.push("/dashboard/schools");
        })
        .catch((error) => {
          console.error("Error sending school data:", error);
        });
    },
    onSubmit() {
      this.sendDataNewSchool();
    },
    handleCancel() {
      this.$emit("handleCancel");
    },

    setValuesInArray(array, sourceObject) {
      array.forEach((field) => {
        // Check if the field key exists in the sourceObject
        if (sourceObject.hasOwnProperty(field.key)) {
          this.$set(field, "value", sourceObject[field.key]);
        }
      });
    },

    async getSchoolToEdit() {
      if (this.$route.params.id) {
        const response = await this.ApiService(getSingleSchoolsRequest(this.$route.params.id));
        const {data} = response.data;

        this.createSchool = {
          name: data.name,
          country_id: data.country.id,
          management_type_id: data.management_type.id,
          school_group_id: data.school_group.id,
          certificate_id: data.certificate.id,
          teaching_language_id: data.teaching_language.id,
          students_type: data.students_type.id,
          music_status: data.music_status.id,
          status: data.status.id,
          phone: data.phone,
          owner_name: data.owner_name,
          owner_role: data.owner_role,
          owner_phone: data.owner_phone,
          address: data.address,
          notes: data.notes,
        };

        this.setValuesInArray(this.schoolInfoFields, this.createSchool);
        this.setValuesInArray(this.schoolManangerFields, this.createSchool);
        this.setValuesInArray(this.addressFields, this.createSchool);

        this.itemImage = logo;
      }
    },

    async fetchDataAndUpdateOptions(apiRequest, label) {
      try {
        const response = await this.ApiService(apiRequest);
        this.updateFieldOptions(label, response.data.data);
      } catch (error) {
        console.error(`Error fetching ${label}:`, error);
      }
    },
    async getAlSchoolGroups() {
      await this.fetchDataAndUpdateOptions(getAllSchoolGroupRequest(), "SCHOOL.SCHOOL_COLLECTION");
    },

    async getALLCountries() {
      await this.fetchDataAndUpdateOptions(getAllCountryRequest(), "SCHOOL.COUNTRY");
    },

    async getSchoolDepartmentTypes() {
      await this.fetchDataAndUpdateOptions(getSchoolDepartmentTypesRequest({list_all:true}), "SCHOOL.SCHOOL_TYPE");
    },

    async getSchoolDegreeTypes() {
      await this.fetchDataAndUpdateOptions(
        getSchoolDegreeTypesRequest({list_all: true}),
        "SCHOOL.SCHOOL_CERTIFICATE_TYPE"
      );
    },

    async getSchoolLanguages() {
      await this.fetchDataAndUpdateOptions(
        getSchoolLanguagesRequest({list_all: true}),
        "SCHOOL.LEARNING_LANGAUAGE"
      );
    },
    async getAllMusicStatus() {
      await this.fetchDataAndUpdateOptions(getAllMusicStatusRequest(), "SCHOOL.VOICE");
    },
    async getAllStatus() {
      await this.fetchDataAndUpdateOptions(getAllStatusRequest(), "SCHOOL.status");
    },
    async getAllStudentsType() {
      await this.fetchDataAndUpdateOptions(getAllStudentsTypeRequest(), "SCHOOL.STUDENT_TYPE");
    },

    updateFieldOptions(label, data) {
      const selectOptionsField = this.schoolInfoFields.find(
        (field) => field.label === this.$t(label)
      );
      if (selectOptionsField) {
        selectOptionsField.options = data;
      }
    },
  },
  mounted() {
    if (this.$route.params.id) this.getSchoolToEdit();
    this.getAlSchoolGroups();
    this.getALLCountries();
    this.getSchoolDepartmentTypes();
    this.getSchoolDegreeTypes();
    this.getSchoolLanguages();
    this.getAllMusicStatus();
    this.getAllStudentsType();
    this.getAllStatus();
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
