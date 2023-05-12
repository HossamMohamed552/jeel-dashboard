<template>
  <ValidationProvider v-slot="{ errors, invalid }" :name="name" :rules="rules">
    <label v-if="label">{{ label }}</label>

    <b-form-radio-group
      v-model="innerValue"
      v-bind="$attrs"
      v-on="$listeners"
      :options="options"
      :class="{
        'input-disabled': $attrs.disabled,
        'is-invalid': invalid & errors.length,
      }"
    ></b-form-radio-group>

    <slot></slot>

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
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
