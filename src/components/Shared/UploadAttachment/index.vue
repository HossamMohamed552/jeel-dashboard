<template>
  <vue2Dropzone :options="dropzoneOptions" :useCustomSlot=true
                @vdropzone-sending="sendFile"
                id="videoImage"
                ref="videoImage">
    <div class="dropzone-custom-content">
      <h3 class="dropzone-custom-title">
        <p>قم بسحب الملف هنا او<span>تصفح الملفات</span></p>
      </h3>
      <div class="subtitle"><p>اكبر حجم للملف : 5 مجيابايت</p></div>
    </div>
  </vue2Dropzone>
</template>
<script>
import VueCookies from "vue-cookies";
import vue2Dropzone from "vue2-dropzone";
export default {
  name: "index",
  components: {vue2Dropzone},
  props: {
    typeOfAttachment: {
      type: String,
      default: ''
    },
    acceptFiles: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dropzoneOptions: {
        acceptedFiles: 'image/*',
        url: '',
        thumbnailWidth: 150,
        maxFilesize: 5,
        clickable: true,
        previewTemplate: `
          <div class="dz-preview dz-file-preview">
           <div class="d-flex justify-content-lg-start align-items-center">
            <div class="dz-image">
              <img data-dz-thumbnail />
            </div>
            <div class="dz-details" data-dz-details>
             <div class="dz-filename"><span data-dz-name></span></div>
             <div class="dz-size" data-dz-size></div>
             </div>
            </div>
            <div class="dz-progress">
              <span class="dz-upload" data-dz-uploadprogress></span>
            </div>
            <div class="dz-success-mark">
              <span>&#10003;</span>
            </div>
            <div class="dz-error-mark">
              <span>&#10007;</span>
            </div>
            <div class="dz-error-message">
              <span data-dz-errormessage></span>
            </div>
            <a class="dz-remove" href="javascript:undefined;" data-dz-remove>
              حذف الملف
            </a>
          </div>
        `,
        headers: {"Authorization": `Bearer ${VueCookies.get("token")}`},
        paramName: 'attachment'
      },
    }
  },
  methods: {
    sendFile(file, xhr, formData) {
      formData.append('type', `${this.typeOfAttachment}`);
    }
  },
  mounted() {
    this.dropzoneOptions.acceptedFiles = this.acceptFiles
  },
  created() {
    this.dropzoneOptions.url = `${process.env.VUE_APP_ADMIN_URL}/attachment`
  },
}
</script>
<style scoped lang="scss">

</style>
