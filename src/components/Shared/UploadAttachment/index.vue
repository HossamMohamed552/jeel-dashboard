<template>
  <ValidationProvider
    v-slot="{ errors, invalid }"
    :name="name"
    :rules="rules"
    class="p-relative text-field"
  >
    <label v-if="label" :class="isRequired && 'required-flag'">
      {{ label }}
    </label>
    <vue2Dropzone :options="dropzoneOptions" :useCustomSlot=true
                  @vdropzone-sending="sendFile"
                  @vdropzone-success="fileSent"
                  @vdropzone-thumbnail="showModal"
                  @vdropzone-removed-file="removeFile"
                  :id="dropIdRef"
                  :ref="dropIdRef" class="dropZone" :class="dropImage ? 'dropImage' : ''">
      <div class="dropzone-custom-content">
        <h3 class="dropzone-custom-title">
          <p>قم بسحب الملف هنا او<span class="browse">تصفح الملفات</span></p>
        </h3>
        <div class="subtitle"><p>اكبر حجم للملف : {{ dropzoneOptions.maxFilesize }} مجيابايت</p></div>
        <div class="subtitle" v-if="!dropImage"><p class="d-inline-block m-0"> نوع الملفات </p> <p class="d-inline-block m-0">(mp4.)</p> </div>
      </div>
    </vue2Dropzone>
    <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
      {{ error }}
    </b-form-invalid-feedback>
  </ValidationProvider>
</template>
<script>
import VueCookies from "vue-cookies";
import vue2Dropzone from "vue2-dropzone";

export default {
  name: "index",
  components: {vue2Dropzone},
  computed: {
    isRequired() {
      if (typeof this.rules === "string") return !!this.rules.includes("required")
      else return this.rules.hasOwnProperty("required") ? this.rules.required : false
    }
  },
  props: {
    dropImage:{
      type: Boolean,
      default: false
    },
    label:{
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: 'attachment'
    },
    rules: {
      type: [Object, String],
      default: "",
    },
    header: {
      type: String,
      default: ''
    },
    typeOfAttachment: {
      type: String,
      default: ''
    },
    acceptFiles: {
      type: String,
      default: ''
    },
    dropIdRef: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dropzoneOptions: {
        acceptedFiles: '',
        url: '',
        thumbnailWidth: 150,
        maxFilesize: 5,
        clickable: true,
        previewTemplate: `
          <div class="dz-preview dz-file-preview">
           <div class="d-flex justify-content-lg-start align-items-center">
            <div class="dz-image" id="dz-image">
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
      fileUrl: null,
      fileId: null,
      fileInfo: null,
    }
  },
  methods: {
    sendFile(file, xhr, formData) {
      formData.append('type', `${this.typeOfAttachment}`);
    },
    fileSent(file, response) {
      this.fileInfo = response.data
      this.fileUrl = this.fileInfo.original_url
      this.fileId = this.fileInfo.uuid
      this.$emit('setFileId', this.fileId)
    },
    removeFile(){
      this.$emit('setFileId', null)
    },
    showModal() {
      const thumbnail = document.getElementById('dz-image')
      thumbnail.addEventListener("click", () => {
        console.log('fire')
      })
    }
  },
  mounted() {
  },
  created() {
    this.dropzoneOptions.acceptedFiles = this.acceptFiles
    this.dropzoneOptions.url = `${process.env.VUE_APP_ADMIN_URL}/attachment`
    if (this.typeOfAttachment === 'video') {
      this.dropzoneOptions.maxFilesize = 1024
    }
  },
}
</script>
<style scoped lang="scss">
.dropZone{
  border-radius: 1rem;
  height: 200px;
}
.dropImage{
  border: 2px dashed #8C8C8C;
}
.browse{
  color: #76236C;
  display: inline-block;
  margin: 0 .5rem;
}
::v-deep{
  .dropzone .dz-preview.dz-image-preview{
    width: 100%;
    background: transparent !important;
    margin-right: 0;
  }
  .dropzone .dz-preview{
    width: 100%;
  }
  //.dz-details{
  //  display: none;
  //}
  .dropzone .dz-preview.dz-error .dz-error-message{
    opacity: 1;
    top: auto;
    bottom: -3.6rem;
    transform: translateY(-50%);
  }
  .vue-dropzone>.dz-preview .dz-remove{
    position: absolute;
    z-index: 30;
    top: 40%;
    transform: translateY(-50%);
    bottom: auto;
    color: #CC0000;
    font-weight: 800;
    left: 0;
    opacity: 1;
    border: none;
    text-decoration: none;
    letter-spacing: 0;
    font-size: 1.5rem;
  }
  .dropzone .dz-preview .dz-image{
    width: 200px;
    height: 109px;
    border-radius: 1rem;
    overflow: hidden;
    cursor: pointer;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      cursor: pointer;
    }
  }
  .dropzone .dz-preview{
    &:hover{
      .dz-image{
        img{
          transform: scale(1.05, 1.05);
          filter: blur(0);
        }
      }
    }
    .dz-progress{
      background: rgba(118, 35, 108, 0.9);
    }
    .dz-details{
      opacity: 1;
      background-color: transparent;
      text-align: right;
      color: $color-primary;
      position: relative;
      max-width: unset;
      min-width: unset;
      max-height: unset;
      .dz-filename{
        margin-bottom: 1rem;
      }
      .dz-size{
        margin: 0;
      }
    }
  }
  .dz-success-mark,
  .dz-error-mark{
    span{
      background: purple;
      padding: 0.5rem;
      border-radius: 50%;
      color: #fff;
      width: 30px;
      display: flex;
      height: 30px;
      justify-content: center;
      align-items: center;
    }
  }
  .dz-error-mark{
    span{
      background: #B22424;
    }
  }
  .dropzone .dz-preview .dz-progress{
    background: rgba(255, 255, 255, 0.9);
    left: 35%;
    top: 60%;
    width: 120px;
  }
  .dropzone .dz-preview.dz-complete .dz-progress{
    opacity: 1;
    z-index: 1000;
    pointer-events: none;
    position: absolute;
    height: 16px;
    left: 35%;
    top: 60%;
    width: 120px;
    margin-left: -40px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 8px;
    overflow: hidden;
  }
  .vue-dropzone>.dz-preview .dz-progress .dz-upload{
    background: #76236C;
  }
}

</style>
