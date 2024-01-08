<template>
  <ValidationProvider
    v-slot="{ errors, invalid }"
    :name="name"
    :rules="rules"
    class="p-relative text-field"
  >
    <label v-if="label" :class="isRequired && 'required-flag'">
      <!-- <span v-if="typeof rules === 'string' && rules.includes('required')"><i class="fa-solid fa-asterisk"></i></span>
      <span v-else-if="typeof rules === 'object' && rules.required"><i class="fa-solid fa-asterisk"></i></span> -->
      {{ label }}
    </label>
    <b-form-input
      v-model="innerValue"
      v-bind="$attrs"
      v-on="$listeners"
      :placeholder="placeholder"
      :class="{
        'input-disabled': $attrs.disabled,
        'is-invalid': invalid & errors.length,
      }"
    />

    <slot/>

    <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
      {{ error }}
    </b-form-invalid-feedback>
  </ValidationProvider>
</template>

<script>
import {FieldMixin} from "@/mixins/FieldMixin";

export default {
  mixins: [FieldMixin],
  props: {
    showPassword: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: ""
    }
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
