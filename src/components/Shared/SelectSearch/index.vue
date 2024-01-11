<template>
  <ValidationProvider v-slot="{ errors, invalid }" :name="name" :rules="rules">
    <label v-if="label" :class="isRequired && 'required-flag'"> {{ label }}</label>
    <v-select
      :disabled="disabled"
      v-model="innerValue"
      v-bind="$attrs"
      v-on="$listeners"
      :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'"
      :options="options"
      :clearable="false"
      :class="{
        'input-disabled': $attrs.disabled,
        'is-invalid': invalid & errors.length,
      }"
      :placeholder="placeholder"
    >
      <template #no-options="">
        {{ $t("NO_MATCHING") }}
      </template>
    </v-select>

    <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
      {{ error }}
    </b-form-invalid-feedback>
  </ValidationProvider>
</template>

<script>
import { FieldMixin } from "@/mixins/FieldMixin";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  mixins: [FieldMixin],
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default: () => [],
    },

    placeholder: {
      type: String,
      default: "",
    },
  },
  components: {
    vSelect,
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
