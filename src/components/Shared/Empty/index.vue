<template>
  <div class="empty-container">
    <h4 v-if="title">
      {{ title }}
    </h4>
    <h5 v-if="message">
      {{ message }}
    </h5>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index";
</style>
