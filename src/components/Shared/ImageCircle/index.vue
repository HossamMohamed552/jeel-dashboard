<template>
  <div>
    <div
      class="img-wrapper"
      :style="{
        height: height + 'px',
        width: width + 'px',
      }"
    >
      <img v-if="background" :src="background" />
      <b-icon
        v-else
        class="default-img"
        icon="person-fill"
        :style="{
          height: iconHeight + 'px',
          width: iconWidth + 'px',
        }"
      ></b-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    defaultImage: {
      type: String,
      default: "",
    },

    text: {
      type: String,
      default: "",
    },
    width: {
      type: Number,
      default: 45,
    },
    height: {
      type: Number,
      default: 45,
    },
    iconWidth: {
      type: Number,
      default: 20,
    },
    iconHeight: {
      type: Number,
      default: 20,
    },
  },
  data() {
    return {
      background: null,
    };
  },
  created() {
    this.background = this.defaultImage;
  },
  watch: {
    defaultImage() {
      this.background = this.defaultImage;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./index";
</style>
