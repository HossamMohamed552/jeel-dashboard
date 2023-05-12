<template>
  <ValidationProvider v-slot="{ errors, invalid }" :name="name" :rules="rules">
    <label v-if="label">{{ label }}</label>

    <b-form-select
      v-model="innerValue"
      :options="options"
      v-bind="$attrs"
      v-on="$listeners"
      :class="{
        'input-disabled': $attrs.disabled,
        'is-invalid': invalid & errors.length,
      }"
    >
      <template v-if="placeholder" #first>
        <b-form-select-option :value="null" disabled>
          {{ placeholder }}
        </b-form-select-option>
      </template>
    </b-form-select>

    <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
      {{ error }}
    </b-form-invalid-feedback>
  </ValidationProvider>
</template>

<script>
import { FieldMixin } from "@/mixins/FieldMixin";

export default {
  mixins: [FieldMixin],
  props: {
    options: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
