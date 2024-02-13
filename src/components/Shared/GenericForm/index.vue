<template>
  <form @submit.prevent="onSubmit">
    <div class="container-fluid">
      <b-row>
        <b-col v-for="(field, index) in schema" :key="index" :lg="field.col">
          <h3 class="list-title" :class="field.classList" v-if="field.type == 'title'">
            {{ field.label }}
          </h3>
          <div class="hold-field">
            <SelectSearch
              v-if="field.type === 'select'"
              v-model="field.value"
              :label="field.label"
              :name="field.label"
              :options="field.options"
              :reduce="(option) => option[field.listen]"
              :get-option-label="(option) => option[field.optionValue]"
              :rules="field.rules"
              :deselectFromDropdown="field.deselectFromDropdown"
              :multiple="field.multiple"
              @input="handleInput(field.key, field.value, field)"
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
            <DatePicker
              v-if="field.type === 'date' || field.type === 'datetime'"
              v-model="field.value"
              :placeholder="field.placeholder"
              :label="field.label"
              valueType="format"
              :name="field.label"
              :rules="field.rules"
            ></DatePicker>

            <div class="hold-field" v-if="filesUploadedTypes.includes(field.type)">
              <UploadAttachment
                v-if="!$route.params.id"
                :type-of-attachment="field.type"
                :label="field.label"
                :dropImage="true"
                :name="field.type"
                :rules="'required'"
                :dropIdRef="'audioFile'"
                :accept-files="`${field.type}/*`"
                @setFileId="handleInput(field.key, $event, field)"
                @setFile="handleInput(field.key, $event)"
              />
              <PreviewMedia
                v-if="$route.params.id"
                :header="field.label"
                :media-name="field.task_audio_name"
                :file-size="field.task_audio_size"
                :typeOfMedia="field.type"
                :showRemoveButton="true"
                @removeFile="
                  removeFile('task_image', 'taskImageChanged', 'taskImageChangedRequest')
                "
              />
            </div>
            <div class="hold-field" v-if="field.type == 'audio'">
              <UploadAttachment
                v-if="!$route.params.id"
                :type-of-attachment="field.type"
                :label="field.label"
                :dropImage="true"
                :name="field.type"
                :rules="'required'"
                :dropIdRef="'audioFile'"
                :accept-files="`${field.type}/*`"
                @setFile="handleInput(field.key, $event)"
              />
              <PreviewMedia
                v-if="$route.params.id"
                :header="field.label"
                :media-name="field.task_audio_name"
                :file-size="field.task_audio_size"
                :typeOfMedia="field.type"
                :showRemoveButton="true"
                @removeFile="
                  removeFile('task_image', 'taskImageChanged', 'taskImageChangedRequest')
                "
              />
            </div>
          </div>
        </b-col>
        <slot name="customSubmit"></slot>
      </b-row>

      <slot></slot>
      <b-row v-if="submitedForm">
        <div class="hold-btns-form">
          <Button @click="handleCancel" custom-class="cancel-btn margin">
            {{ cancelButton }}
          </Button>
          <Button :disabled="invalid" type="submit" :loading="loading" custom-class="submit-btn">
            {{ submitButton }}
          </Button>
        </div>
      </b-row>
    </div>
  </form>
</template>

<script>
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import TextField from "@/components/Shared/TextField/index.vue";
import TextAreaField from "@/components/Shared/TextAreaField/index.vue";
import DatePicker from "@/components/Shared/DatePicker/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import UploadAttachment from "@/components/Shared/UploadAttachment";
import PreviewMedia from "@/components/Shared/PreviewMedia/PreviewMedia.vue";

export default {
  name: "Generic-Form",
  components: {
    TextField,
    SelectSearch,
    TextAreaField,
    DatePicker,
    UploadAttachment,
    PreviewMedia,
    Button,
  },
  data() {
    return {
      values: {},
      filesUploadedTypes: ["image", "video"],
      formInvalid: false,
    };
  },
  props: {
    schema: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    submitedForm: {
      type: Boolean,
      default: true,
    },
    submitButton: {
      type: String,
      default: () => "",
    },
    cancelButton: {
      type: String,
      default: () => "",
    },
    index: {
      type: Number,
      default: () => 0,
    },
    invalid: {
      type: Boolean,
      default: () => false,
    },
  },
  methods: {
    handleCancel() {
      this.$emit("handleCancel");
    },
    onSubmit() {
      this.updateFields();
      this.$emit("onSubmit", this.values);
    },
    handleInput(key, value, field) {
      this.$emit("handleInput", key, value, field, this.index);
    },
    updateFields() {
      // Generic method to update createSchool object based on the fieldArray
      this.schema.forEach((field) => {
        try {
          this.$set(this.values, field.key, field.value);
        } catch (error) {
          console.error(`Error updating field ${field.key}:`, error);
        }
      });
    },
    removeFile(fileName, fileChange, fileRequest) {
      console.log("File removed in parent component:", fileName, fileChange, fileRequest);
    },
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
