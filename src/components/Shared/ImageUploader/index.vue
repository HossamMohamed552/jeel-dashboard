<template>
  <ValidationProvider
    ref="provider"
    v-slot="{ errors }"
    :rules="{ image: true, size: maxSize }"
    :name="name"
    class="image-uploader"
  >
    <div>
      <h5 class="file-title">
        {{ $t(text) }}
      </h5>
      <div class="file-input-container">
        <input
          v-bind="$attrs"
          v-on="$listeners"
          class="file-input"
          ref="attachment"
          type="file"
          accept="image/*"
          @change="onFileChange"
        />
        <Button color="gray" class="btn-file" @click="$refs.attachment.click()">
          {{ $t("GLOBAL_UPLOAD") }}
        </Button>
      </div>
      <div class="img-wrapper">
        <div v-if="hasError" class="error-wrapper">
          <span class="error-msg">{{ errors[0] }}</span>
        </div>
      </div>
    </div>
  </ValidationProvider>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    maxSize: {
      type: Number,
      default: 5000 * 5, // in kilobytes
    },
    defaultImage: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "FILE.DRAG_DROP",
    },
    extentions: {
      type: Array,
      default: () => [],
    },
    name: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      background: null,
      hasError: false,
    };
  },
  created() {
    this.background = this.defaultImage;
  },
  methods: {
    ...mapActions(["ShowToast"]),

    onFileChange(changeEvent) {
      this.$emit("imageUpload", changeEvent);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./index";
</style>
