<template>
  <ValidationProvider v-slot="{ errors, invalid }" :name="name" :rules="rules" class="p-relative">
    <label v-if="label">{{ label }}</label>
    <date-picker
      v-model="innerValue"
      v-bind="$attrs"
      v-on="$listeners"
      :format="$attrs.format"
      :type="$attrs.type"
      :ref="refValue"
      :disabled-date="disableDate"
      :disabled-time="disableTime"
      :lang="en"
      :class="{
        'input-disabled': $attrs.disabled,
        'is-invalid': invalid & errors.length,
      }"
    ></date-picker>
    <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
      {{ error }}
    </b-form-invalid-feedback>
  </ValidationProvider>
</template>

<script>
import { FieldMixin } from "@/mixins/FieldMixin";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/locale/en";
import "vue2-datepicker/index.css";

export default {
  mixins: [FieldMixin],
  data() {
    return {
      en: "en",
    };
  },
  props: {
    refValue: {
      type: String,
      default: "",
    },
    preventTimeBefore: {
      type: Date,
    },
    preventDateBefore: {
      type: Date,
    },
  },
  components: {
    DatePicker,
  },
  methods: {
    disableDate(date) {
      const disabledDate = this.preventDateBefore;
      return date < disabledDate;
    },
    disableTime(date) {
      const currentDate = this.preventTimeBefore;
      return date < currentDate;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index";
</style>
