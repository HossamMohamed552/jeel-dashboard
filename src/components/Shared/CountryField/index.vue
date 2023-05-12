<template>
  <ValidationProvider
    v-slot="{ errors, invalid }"
    :name="name"
    :rules="rules"
    class="p-relative"
  >
    <label v-if="label">{{ label }}</label>
    <vue-country-code
      v-model="innerValue"
      v-bind="$attrs"
      v-on="$listeners"
      defaultCountry="sa"
      @onSelect="onSelect"
      :class="{
        'input-disabled': $attrs.disabled,
        'is-invalid': invalid & errors.length,
      }"
    >
    </vue-country-code>

    <span class="country-title"> {{ innerValue }} </span>

    <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
      {{ error }}
    </b-form-invalid-feedback>
  </ValidationProvider>
</template>

<script>
import { FieldMixin } from "@/mixins/FieldMixin";
import VueCountryCode from "vue-country-code";

export default {
  mixins: [FieldMixin],
  components: {
    VueCountryCode,
  },
  data() {
    return {};
  },
  methods: {
    onSelect({ name }) {
      this.innerValue = name;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
