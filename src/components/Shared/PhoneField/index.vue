<template>
  <ValidationProvider
    v-slot="{ errors, invalid }"
    :name="name"
    :rules="rules"
    class="p-relative"
  >
    <label v-if="label">{{ label }}</label>
    <vue-tel-input
      style="direction: ltr"
      v-model="innerValue"
      v-bind="$attrs"
      v-on="$listeners"
      v-on:country-changed="countryChanged"
      mode="international"
      defaultCountry="sa"
      :placeholder="phonePlaceholder"
      :validCharactersOnly="false"
      @validate="phoneValidate = $event"
      :class="{
        'input-disabled': $attrs.disabled,
        'is-invalid':
          invalid & errors.length || (innerValue && !phoneValidate.isValid),
      }"
    ></vue-tel-input>

    <b-form-invalid-feedback v-if="innerValue && !phoneValidate.isValid">
      {{ $t("VALID_PHONE") }}
    </b-form-invalid-feedback>
    <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
      {{ error }}
    </b-form-invalid-feedback>
  </ValidationProvider>
</template>

<script>
import { FieldMixin } from "@/mixins/FieldMixin";
import { VueTelInput } from "vue-tel-input";

export default {
  mixins: [FieldMixin],
  components: {
    VueTelInput,
  },
  data() {
    return {
      phonePlaceholder: "",
      phoneValidate: false,
    };
  },
  methods: {
    countryChanged(country) {
      this.phonePlaceholder = `+${country.dialCode} xxxxxxxxx`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
