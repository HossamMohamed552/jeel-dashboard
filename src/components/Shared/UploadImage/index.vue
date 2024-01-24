<template>
  <div class="img-container">
    <span>
      <img v-if="localImageUrl" :src="localImageUrl" alt="Person Image" />
      <i v-else class="far fa-user"></i>
    </span>
    <input type="file" accept="image/*" ref="fileInput" style="display: none" @change="handleImageChange" />

    <div>
      <Button type="button" @click="openFileInput" :custom-class="'submit-btn'">
        {{ $t("BUTTONS.EDIT") }}
      </Button>
      <Button @click="clearImage" custom-class="cancel-btn">
        {{ $t("BUTTONS.DELETE") }}
      </Button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueCookies from "vue-cookies";

import { deleteProfileImageRequest } from "@/api/user";

export default {
  data() {
    return {
      localImageUrl: null,
    };
  },
  props: {
    maxSize: {
      type: Number,
      default: 5, // in MB
    },
    imageUrl: String, // Assuming imageUrl is a prop of type String, adjust accordingly
  },
  watch: {
    imageUrl(newImageUrl) {
      this.localImageUrl = newImageUrl;
    },
  },
  methods: {
    openFileInput() {
      this.$refs.fileInput.click();
    },
    handleImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        // Check if the file type is an image
        if (this.isValidImageType(file)) {
          // Check if the file size is within the allowed limit
          if (this.isValidImageSize(file)) {
            this.localImageUrl = URL.createObjectURL(file);
            this.uploadImage(file);
          } else {
            console.error("Image size exceeds the allowed limit.");
            this.resetFileInput();
          }
        } else {
          console.error("Invalid file type. Please select an image.");
          this.resetFileInput();
        }
      }
    },

    isValidImageType(file) {
      const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];
      return allowedImageTypes.includes(file.type);
    },
    isValidImageSize(file) {
      const maxSize = this.maxSize * 1024 * 1024; // 2MB
      return file.size <= maxSize;
    },
    clearImage() {
      if (this.$route.params.id && this.imageUrl != null) {
        this.ApiService(deleteProfileImageRequest({ user_id: this.$route.params.id })).then(() => {
          this.$emit("image-cleared", null);
        });
      }

      this.resetImage();
    },
    resetFileInput() {
      // Reset the file input to clear the selection
      this.$refs.fileInput.value = null;
    },
    resetImage() {
      // Reset the image and clear the file input
      this.localImageUrl = null;
      this.resetFileInput();
    },
    uploadImage(file) {
      const formData = new FormData();
      formData.append("attachment", file);
      formData.append("type", "image");

      axios
        .post(`${process.env.VUE_APP_ADMIN_URL}/attachment`, formData, {
          headers: {
            Authorization: `Bearer ${VueCookies.get("token")}`,
            locale: "ar",
          },
        })
        .then((res) => {
          this.$emit("image-uploaded", res.data.data.uuid);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
