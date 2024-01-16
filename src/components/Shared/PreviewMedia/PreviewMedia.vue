<template>
  <div>
    <p class="header">{{ header }}</p>
    <div class="preview-content" :class="typeOfMedia === 'image' ? 'contentImage' : ''">
      <div class="type-media">
        <div class="video" v-if="typeOfMedia === 'video'" @click="showModal">
          <div class="skeleton-video"><img src="@/assets/images/icons/play.png" /></div>
        </div>
        <div class="video" v-if="typeOfMedia === 'audio'" @click="showModal">
          <div class="skeleton-video"><img src="@/assets/images/icons/audio.png" /></div>
        </div>
        <div class="image" v-else @click="showModal">
          <img :src="imageUrl" />
        </div>
        <div class="info-media">
          <p>{{ mediaName }}</p>
          <p>
            <span>حجم الملف </span> <span>{{ fileSize }}</span>
          </p>
        </div>
        <div class="removeBtn" v-if="showRemoveButton" @click="removeFile">حذف الملف</div>
        <div class="download-button" v-if="showDownloadButton" @click="downloadFile">
          تحميل الملف
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "PreviewMedia",
  props: {
    showDownloadButton: {
      type: Boolean,
      default: false,
    },
    showRemoveButton: {
      type: Boolean,
      default: false,
    },
    header: {
      type: String,
      default: "اسم الملف",
    },
    mediaName: {
      type: String,
      default: "اسم الصوره او ..",
    },
    fileSize: {
      type: String,
      default: "0",
    },
    imageUrl: {
      type: String,
      default: "imageUrl",
    },
    typeOfMedia: {
      type: String,
      default: "typeOfMedia",
    },
  },
  methods: {
    showModal() {
      this.$emit("showModal", this.typeOfMedia);
    },
    removeFile() {
      this.$emit("removeFile");
    },
    async downloadFile() {
      try {
        const link = document.createElement("a");

        link.href = this.imageUrl;
        link.download = this.mediaName;
        link.target = "_blank";

        link.click();
      } catch (error) {
        console.error(error.message);
      }
    },
  },
};
</script>
<style scoped lang="scss">
@import "index";
</style>
