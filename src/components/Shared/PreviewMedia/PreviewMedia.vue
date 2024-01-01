<template>
  <div>
    <p class="header">{{ header }}</p>
    <div class="preview-content" :class="typeOfMedia === 'image'? 'contentImage': ''">
      <div class="type-media">
        <div class="video" v-if="typeOfMedia === 'video'"  @click="showModal">
          <div class="skeleton-video"><img src="@/assets/images/icons/play.png"></div>
        </div>
        <div class="video" v-if="typeOfMedia === 'audio'"   @click="showModal">
          <div class="skeleton-video"><img src="@/assets/images/icons/audio.png"></div>
        </div>
        <div class="image" v-else @click="showModal">
          <img :src="imageUrl">
        </div>
        <div class="info-media">
          <p>{{ mediaName }}</p>
          <p> <span>حجم الملف </span> <span>{{ fileSize }}</span></p>
        </div>
        <div class="removeBtn" v-if="showRemoveButton" @click="removeFile">حذف الملف</div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "PreviewMedia",
  props: {
    showRemoveButton:{
      type: Boolean,
      default: false
    },
    header: {
      type: String,
      default: "اسم الملف"
    },
    mediaName:{
      type: String,
      default: "اسم الصوره او .."
    },
    fileSize:{
      type: String,
      default: "0"
    },
    imageUrl:{
      type: String,
      default: "imageUrl"
    },
    typeOfMedia:{
      type: String,
      default: "typeOfMedia"
    }
  },
  methods:{
    showModal(){
      this.$emit('showModal',this.typeOfMedia)
    },
    removeFile(){
      this.$emit('removeFile')
    }
  }
}
</script>
<style scoped lang="scss">
@import "index";
</style>
