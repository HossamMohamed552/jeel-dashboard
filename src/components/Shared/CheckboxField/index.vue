<template>
  <ValidationProvider v-slot="{ errors, invalid }" :name="name" :rules="rules">
    <div :class="{ 'multiple-container': multipleContainer }">
      <b-form-checkbox-group
        v-if="options.length"
        v-model="innerValue"
        v-bind="$attrs"
        v-on="$listeners"
        :options="options"
        :class="{
          'input-disabled': $attrs.disabled,
          'is-invalid': invalid & errors.length,
        }"
      ></b-form-checkbox-group>

      <b-form-checkbox
        v-else
        v-model="innerValue"
        v-bind="$attrs"
        v-on="$listeners"
        :class="{
          'input-disabled': $attrs.disabled,
          'is-invalid': invalid & errors.length,
        }"
      >
        {{ name }}
      </b-form-checkbox>

      <slot />

      <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
        {{ error }}
      </b-form-invalid-feedback>
    </div>
  </ValidationProvider>
</template>

<script>
import { FieldMixin } from "@/mixins/FieldMixin";

export default {
  mixins: [FieldMixin],
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    multipleContainer: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
