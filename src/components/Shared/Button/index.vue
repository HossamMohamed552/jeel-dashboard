<template>
  <b-overlay
    :show="loading"
    rounded
    opacity="0.6"
    spinner-small
    spinner-variant="primary"
    :class="dBlock ? 'd-block' : 'd-inline-block'"
  >
    <b-button
      :variant="color"
      :disabled="disabled"
      v-bind="$attrs"
      v-on="$listeners"
      class="base-btn"
      :class="{
        [customClass]: customClass,
      }"
    >
      <slot />
    </b-button>
  </b-overlay>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: null,
      default: "",
    },
    dBlock: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "primary",
      validator: (prop) =>
        [
          "primary",
          "gray",
          "secondary",
          "success",
          "danger",
          "warning",
          "info",
          "light",
          "dark",
          "opacity",
          "light-danger",
          "light-dark",
          "outline",
          "outline-radius",
        ].includes(prop),
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
