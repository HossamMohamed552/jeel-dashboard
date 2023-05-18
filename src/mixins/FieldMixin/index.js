export const FieldMixin = {
  props: {
    value: {
      type: null,
      required: true,
    },
    name: {
      type: String,
    },
    rules: {
      type: [Object, String],
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    labelStyles: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    innerValue: "",
    customFormat:"DD-MM-YYYY"
  }),
  watch: {
    // Handles internal model changes.
    innerValue(newVal) {
      this.$emit("input", newVal);
    },
    // Handles external model changes.
    value(newVal) {
      this.innerValue = newVal;
    },
  },
  created() {
    if (this.value !== null) {
      this.innerValue = this.value;
    }
  },
};
