<template>
  <ValidationProvider
    v-slot="{ errors, invalid }"
    :name="name"
    :rules="rules"
    class="p-relative"
  >
    <label v-if="label">{{ label }}</label>
    <date-picker
      v-model="innerValue"
      v-bind="$attrs"
      v-on="$listeners"
      :format="customFormat"
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
import 'vue2-datepicker/locale/en'
import "vue2-datepicker/index.css";

export default {
  mixins: [FieldMixin],
  data(){
    return{
      en:'en'
    }
  },
  components: {
    DatePicker,
  },
  methods:{
  }
};
</script>

<style lang="scss" scoped>
@import "./index";
</style>
