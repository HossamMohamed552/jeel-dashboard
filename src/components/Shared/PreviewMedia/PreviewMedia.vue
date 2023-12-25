<template>
  <div>
    <p class="header">{{ header }}</p>
    <div class="preview-content" :class="typeOfMedia === 'image'? 'contentImage': ''">
      <div class="type-media">
        <div class="image" v-if="typeOfMedia === 'image'">
          <img :src="imageUrl">
        </div>
        <div class="video" v-if="typeOfMedia === 'video'"  @click="showModal">
          <div class="skeleton-video"><img src="@/assets/images/icons/play.png"></div>
        </div>
        <div class="info-media">
          <p>{{ mediaName }}</p>
          <p> <span>حجم الملف </span> <span>{{ fileSize }}</span></p>
        </div>
        <div class="removeBtn" v-if="showRemoveButton">حذف الملف</div>
      </div>
    </div>
  </div>
</template>
<script>
import GeneralModal from "@/components/Shared/GeneralModal/index.vue";
export default {
  name: "PreviewMedia",
  components:{
    GeneralModal
  },
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
    vimeoUrl:{
      type: String,
      default: "url"
    },
    typeOfMedia:{
      type: String,
      default: "typeOfMedia"
    }
  },
  methods:{
    showModal(){
      this.$emit('showModal')
    }
  }
}
</script>
<style scoped lang="scss">
@import "index";
</style>
