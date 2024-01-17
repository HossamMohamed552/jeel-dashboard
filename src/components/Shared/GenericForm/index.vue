<template>
  <validation-observer v-slot="{}" ref="addEditSchoolForm">
    <form @submit.prevent="onSubmit">
      <div class="container-fluid">
        <b-row>
          <b-col v-for="(field, index) in schema" :key="index" :lg="field.col">
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
                @input="handleInput(field.key, field.value)"
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
        <b-row>
          <div class="hold-btns-form">
            <Button @click="handleCancel" custom-class="cancel-btn margin">
              {{ cancelButton }}
            </Button>
            <Button type="submit" :loading="loading" custom-class="submit-btn">
              {{ submitButton }}
            </Button>
          </div>
        </b-row>
      </div>
    </form>
  </validation-observer>
</template>

<script>
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import TextField from "@/components/Shared/TextField/index.vue";
import TextAreaField from "@/components/Shared/TextAreaField/index.vue";
import Button from "@/components/Shared/Button/index.vue";

export default {
  name: "Generic-Form",
  components: {
    TextField,
    SelectSearch,
    TextAreaField,
    Button,
  },
  data() {
    return {
      values: {},
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
    submitButton: {
      type: String,
      default: () => "",
    },
    cancelButton: {
      type: String,
      default: () => "",
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
    handleInput(key, value) {
      this.$emit("handleInput", key, value);
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
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
