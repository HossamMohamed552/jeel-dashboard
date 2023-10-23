<template>
  <ValidationProvider
    ref="provider"
    v-slot="{ errors,invalid }"
    :rules="{ image: true, size: maxSize, required:isRequired }"
    :name="name"
    class="image-uploader"
  >
    <div>
      <h5 class="file-title">
        {{ text }}
      </h5>
      <div class="file-input-container">
        <b-form-file accept="image/*"
                     v-model="innerValue"
                     v-bind="$attrs"
                     v-on="$listeners"
                     class="file-input"
                     ref="attachment"
                     type="file"
                     @change="onFileChange"
                     :class="{
        'input-disabled': $attrs.disabled,
        'is-invalid': invalid & errors.length,
      }"></b-form-file>
        <!--        <input-->
        <!--          v-bind="$attrs"-->
        <!--          v-on="$listeners"-->
        <!--          class="file-input"-->
        <!--          ref="attachment"-->
        <!--          type="file"-->
        <!--          accept="image/*"-->
        <!--          @change="onFileChange"-->
        <!--        />-->
        <!--        <Button color="gray" class="btn-file" @click="$refs.attachment.click()">-->
        <!--          {{ $t("GLOBAL_UPLOAD") }}-->
        <!--        </Button>-->
      </div>
      <div class="img-wrapper">
        <div class="hold-img" v-if="itemImage">
          <img :src="itemImage" alt="image">
          <span @click="deleteImage">x</span>
        </div>
        <div v-if="hasError" class="error-wrapper">
          <span class="error-msg">{{ errors[0] }}</span>
        </div>
      </div>
    </div>
    <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
      {{ error }}
    </b-form-invalid-feedback>
  </ValidationProvider>
</template>

<script>
import {mapActions} from "vuex";
import {FieldMixin} from "@/mixins/FieldMixin";

export default {
  mixins: [FieldMixin],
  props: {
    isRequired: {
      type: Boolean,
      default: false
    },
    itemImage: {
      type: String,
    },
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
    this.innerValue = []
  },
  methods: {
    ...mapActions(["ShowToast"]),
    onFileChange(changeEvent) {
      this.$emit("imageUpload", changeEvent);
    },
    deleteImage() {
      this.$emit("deleteImage");
    }
  },
};
</script>
<style lang="scss" scoped>
@import "./index";
</style>
