<template>
  <ValidationProvider v-slot="{ errors, invalid }" :name="name" :rules="rules">
    <label v-if="label">
      <span v-if="typeof rules === 'string' && rules.includes('required')"><i class="fa-solid fa-asterisk"></i></span>
      <span v-else-if="typeof rules === 'object' && rules.required"><i class="fa-solid fa-asterisk"></i></span>{{ label }}
    </label>
    <b-form-textarea
      v-model="innerValue"
      v-bind="$attrs"
      v-on="$listeners"
      class="custom-text-area"
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
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
