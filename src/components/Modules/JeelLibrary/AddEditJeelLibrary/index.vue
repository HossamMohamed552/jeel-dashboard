<template>
  <div class="add-edit-role">
    <div class="container-fluid custom-container">
      <div class="add-edit-role-form">
        <h3>{{ $route.params.id ? "تعديل عنصر المكتبة" : "إضافة عنصر المكتبة" }}</h3>
        <validation-observer v-slot="{ invalid }" ref="addLibraryItemForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="createItem.file_name"
                    :label="'اسم الملف'"
                    :name="'اسم الملف'"
                    placeholder="اسم الملف"
                    :rules="'required|min:3|max:100'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <label>
                    نوع الملف
                    <span><i class="fa-solid fa-asterisk"></i></span>
                  </label>
                  <SelectSearch
                    v-model="createItem.type"
                    name="نوع الملف"
                    placeholder="أختر نوع الملف"
                    :options="types"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                    @input="resetValues($event)"
                    :disabled="!!$route.params.id"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <label>
                    الصف الدراسى
                    <span><i class="fa-solid fa-asterisk"></i></span>
                  </label>
                  <SelectSearch
                    v-model="createItem.level_id"
                    :name="'أختر الصف الدراسى'"
                    placeholder="أختر الصف الدراسى"
                    :options="levels"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                  ></SelectSearch>
                </div>
              </b-col>



              <!------------------- start logo uploader --------------------------------->
              <b-col lg="6" class="mb-3">
                <UploadAttachment
                  v-if="!$route.params.id || attachment.logoChangedRequest"
                  :rules="'required'"
                  :label="'لوجو الملف'"
                  :type-of-attachment="'image'"
                  :accept-files="'image/jpeg,image/png,image/jpg,image/gif'"
                  @setFileId="setThumbnailId"
                />
                <PreviewMedia
                  v-if="$route.params.id && attachment.logoChanged === false && !attachment.logoChangedRequest"
                  :header="`لوجو الملف`"
                  :media-name="attachment.thumbnail_name"
                  :file-size="attachment.thumbnail_size"
                  :image-url="attachment.thumbnail"
                  :typeOfMedia="'logo'"
                  :show-remove-button="true"
                  @removeFile="removeFile('logo', 'logoChanged', 'logoChangedRequest')"
                  @showModal="showModal(createItem,'logo')"
                />
              </b-col>
              <!------------------- end uploader --------------------------------->

              <!------------------- start file audio --------------------------------->
              <b-col lg="6" v-if="createItem.type===111" class="mb-3">
                <UploadAttachment
                  v-if="!$route.params.id || attachment.audioChangedRequest"
                  :type-of-attachment="'audio'"
                  :dropIdRef="'audioFile'"
                  :accept-files="'audio/mpeg,audio/mpga,audio/mp3,audio/wav'"
                  :label="'ملف الصوت'"
                  :name="'audioFile'"
                  :rules="'required'"
                  @setFileId="setAudioId($event)"
                />
                <PreviewMedia
                  v-if="
                    $route.params.id &&
                    attachment.audioChanged === false &&
                    !attachment.audioChangedRequest
                  "
                  :header="$t('ملف الصوت')"
                  :media-name="attachment.audio_name"
                  :file-size="attachment.audio_size"
                  :typeOfMedia="'audio'"
                  :showRemoveButton="true"
                  @showModal="showModal(createItem,'audio')"
                  @removeFile="removeFile('audio','audioChanged','audioChangedRequest')
                  "
                />
              </b-col>
              <!------------------- end  file audio --------------------------------->
              <!------------------- start file image --------------------------------->
              <b-col lg="6" v-if="createItem.type===112" class="mb-3">
                <UploadAttachment
                  v-if="!$route.params.id || attachment.imageChangedRequest"
                  :rules="'required'"
                  :label="'ملف صورة '"
                  :type-of-attachment="'image'"
                  :accept-files="'image/jpeg,image/png,image/jpg,image/gif'"
                  @setFileId="setImageId"
                />
                <PreviewMedia
                  v-if="
                    $route.params.id &&
                    attachment.imageChanged === false &&
                    !attachment.imageChangedRequest
                  "
                  :header="`${$t('BADGE.bade_logo')}`"
                  :media-name="attachment.image_name"
                  :file-size="attachment.image_size"
                  :image-url="attachment.image"
                  :typeOfMedia="'image'"
                  :show-remove-button="true"
                  @removeFile="
                    removeFile('image', 'imageChanged', 'imageChangedRequest')
                  "
                  @showModal="showModal(createItem,'image')"
                />
              </b-col>
              <!------------------- end file image --------------------------------->

              <!------------------- start video 1  --------------------------------->
              <b-col lg="6" v-if="createItem.type === 113" class="mb-3">
                <UploadAttachment
                  v-if="!$route.params.id || attachment.videoWithOutMuiscChangedRequest"
                  :type-of-attachment="'video'"
                  :dropIdRef="'VideFile'"
                  :accept-files="'video/mp4,video/avi,video/mov'"
                  :name="'VideoWithout'"
                  :rules="'required'"
                  @setFileId="setVideoWithOutMuiscFileId($event)"
                  :label="'ملف الفيديو بدون موسيقى'"
                />

                <PreviewMedia
                  v-if="
                    $route.params.id &&
                    attachment.videoWithOutMuiscChanged === false &&
                    !attachment.videoWithOutMuiscChangedRequest
                  "
                  :header="`ملف الفيديو بدون موسيقى`"
                  :media-name="attachment.video_without_music_name"
                  :file-size="attachment.video_without_music_size"
                  :image-url="attachment.videoWithOutMuisc"
                  :typeOfMedia="'video'"
                  :show-remove-button="true"
                  @removeFile="
                    removeFile('videoWithOutMuisc', 'videoWithOutMuiscChanged', 'videoWithOutMuiscChangedRequest')
                  "
                  @showModal="showModal(createItem,'videoWithOutMusic')"
                />
              </b-col>
              <!------------------- end video 1 --------------------------------->

              <!------------------- start video 2 --------------------------------->
              <b-col lg="12" v-if="createItem.type === 113" class="mb-3 mt-4">
                <UploadAttachment
                  v-if="!$route.params.id || attachment.videoWithMuiscChangedRequest"
                  :type-of-attachment="'video'"
                  :label="'ملف الفيديو'"
                  :name="'VideFile'"
                  :dropIdRef="'VideFile'"
                  :accept-files="'video/mp4,video/avi,video/mov'"
                  @setFileId="setVideoWithMuiscFileId"
                />
                <PreviewMedia
                  v-if="
                    $route.params.id &&
                    attachment.videoWithMuiscChanged === false &&
                    !attachment.videoWithMuiscChangedRequest
                  "
                  :header="`ملف الفيديو`"
                  :media-name="attachment.video_with_music_name"
                  :file-size="attachment.video_with_music_size"
                  :image-url="attachment.videoWithMuisc"
                  :typeOfMedia="'video'"
                  :show-remove-button="true"
                  @removeFile="
                    removeFile('videoWithMuisc', 'videoWithMuiscChanged', 'videoWithMuiscChangedRequest')
                  "
                  @showModal="showModal(createItem,'videoWithMusic')"
                />
              </b-col>
              <!------------------- end 2 --------------------------------->

              <!------------------- start pdf --------------------------------->
              <b-col lg="6" v-if="createItem.type === 114" class="mb-3 ">
                <UploadAttachment
                  v-if="!$route.params.id || attachment.fileChangedRequest"
                  :type-of-attachment="'pdf'"
                  :label="'ملف المحتوي'"
                  :name="'File'"
                  :dropIdRef="'File'"
                  :accept-files="'application/pdf'"
                  @setFileId="setFileId"
                />
                <PreviewMedia
                  v-if="
                    $route.params.id &&
                    attachment.fileChanged === false &&
                    !attachment.fileChangedRequest
                  "
                  :header="`ملف المحتوي`"
                  :media-name="attachment.file_name"
                  :file-size="attachment.file_size"
                  :image-url="attachment.file"
                  :typeOfMedia="'file'"
                  :show-remove-button="true"
                  @removeFile="
                    removeFile('file', 'fileChanged', 'fileChangedRequest')
                  "
                  @showModal="showModal(createItem,'file')"
                />
              </b-col>
              <!------------------- end --------------------------------->

              <b-col lg="6" class="mb-3" v-if="createItem.type===116">
                <div class="hold-field">
                  <TextAreaField
                    :label="'اكتب ملحوظة'"
                    :rules="'required|min:3|max:250'"
                    v-model="createItem.note"
                    :name="'الملحوظة'"
                  />

                </div>
              </b-col>

              <b-col lg="6" class="mb-3" v-if="createItem.type === 115 || createItem.type === 117">
                <div class="hold-field">
                  <TextField
                    v-model="createItem.link"
                    :label="'رابط'"
                    :name="'رابط'"
                    placeholder="اكتب رابط"
                    :rules="'required|urlLink'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="12">
                <b-row>
                  <div class="hold-btns-form">
                    <Button @click="handleCancel" custom-class="cancel-btn margin">
                      {{ $t("GLOBAL_CANCEL") }}
                    </Button>

                    <Button
                      v-if="!$route.params.id"
                      type="submit"
                      :loading="loading"
                      :disabled='invalid || checkLogo || (checkAudioCustomInput && checkImageCustomInput && checkVideoCustomInput && checkFileCustomInput && checkLinkCustomInput && checkNoteCustomInput) '
                      custom-class="submit-btn"
                    >
                      {{ $t("GLOBAL_SAVE") }}
                    </Button>
                    <Button
                      v-if="$route.params.id"
                      type="submit"
                      :loading="loading"
                      :disabled="invalid"
                      custom-class="submit-btn"
                    >
                      {{ $t("GLOBAL_EDIT") }}
                    </Button>
                  </div>
                </b-row>
              </b-col>
            </b-row>
          </form>
        </validation-observer>
      </div>
    </div>

    <GeneralModal :id="'holdContent'" :size="'lg'" :hide-header="true">
      <template #modalBody>
        <div class="text-center">
          <div class="height-modal"
               v-if="typeOfAttachment === 'logo' || typeOfAttachment === 'image'">
            <img :src="imageUrl" class="image-modal" alt="logo"/>
          </div>
          <div v-if="typeOfAttachment ==='audio'">
            <audio :src="audioUrl" ref="player" autoplay="autoplay" controls="controls"></audio>
          </div>
          <div
            v-if="typeOfAttachment ==='videoWithMusic' || typeOfAttachment ==='videoWithOutMusic'">
            <video controls class="w-100 video" autoplay="autoplay">
              <source :src="videoUrl"/>
              Your browser does not support the video tag.
            </video>
          </div>

          <Button @click="hideModal" :custom-class="'rounded-btn transparent-btn'">{{
              $t("BACK")
            }}
          </Button>
        </div>
      </template>
    </GeneralModal>
  </div>
</template>
<script>
import TextField from "@/components/Shared/TextField/index.vue";
import TextAreaField from "@/components/Shared/TextAreaField/index.vue";
import CheckboxField from "@/components/Shared/CheckboxField/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import PreviewMedia from "@/components/Shared/PreviewMedia/PreviewMedia.vue";
import UploadAttachment from "@/components/Shared/UploadAttachment/index.vue";
import GeneralModal from "@/components/Shared/GeneralModal/index.vue";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import {getAllLevelsRequest} from "@/api/level";
import {getJeelStoreLibraryByIdRequest} from "@/api/jeel-store-library";
import {getLibraryTypeRequest, getStoreLibraryTypeRequest} from "@/api/system";
import {getJeelLibraryByIdRequest} from "@/api/jeel-library";

export default {
  components: {
    SelectSearch,
    GeneralModal,
    UploadAttachment,
    PreviewMedia,
    Modal,
    TextField,
    TextAreaField,
    CheckboxField,
    Button,
  },
  props: {
    permission: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      levels: [],
      types: [],
      typeOfAttachment: null,
      imageUrl: null,
      audioUrl: null,
      videoUrl: null,
      fileUrl: null,
      createItem: {
        level_id: "",
        file_name: "",
        link: "",
        type: null,
        image: null,
        logo: "",
        video_with_muisc: null,
        video_without_music: null,
        audio: null,
        file: null,
        note: null
      },
      attachment: {
        //  thumbnail
        logo: null,
        logoChanged: false,
        logoChangedRequest: false,

        //  image
        image: null,
        image_name: "",
        image_size: "",
        imageChanged: false,
        imageChangedRequest: false,

        //  audio
        audio: null,
        audioChanged: false,
        audioChangedRequest: false,

        //  file
        file: null,
        file_name: "",
        file_size: "",
        fileChanged: false,
        fileChangedRequest: false,

        //  video_with_muisc
        videoWithMuisc: null,
        video_with_music_name: "",
        video_with_music_size: "",
        videoWithMuiscChanged: false,
        videoWithMuiscChangedRequest: false,

        //  video_without_music
        videoWithOutMuisc: null,
        videoWithOutMuisc_name: "",
        videoWithOutMuisc_size: "",
        videoWithOutMuiscChanged: false,
        videoWithOutMuiscChangedRequest: false,

      },
      finalSelected: [],
    };
  },
  methods: {
    setThumbnailId(id) {
      this.attachment.thumbnail = id;
      this.createItem.logo = id;
      this.attachment.logoChanged = false;
      this.attachment.logoChangedRequest = true;
    },
    setImageId(id) {
      this.attachment.image = id;
      this.createItem.image = id;
      this.attachment.imageChanged = false;
      this.attachment.imageChangedRequest = true;
    },
    setAudioId(id) {
      this.attachment.audio = id;
      this.createItem.audio = id;
      this.attachment.audioChanged = false;
      this.attachment.audioChangedRequest = true;
    },

    setVideoWithOutMuiscFileId(id) {
      this.attachment.videoWithOutMuisc = id;
      this.createItem.video_without_music = id;
      this.attachment.videoWithOutMuiscChanged = false;
      this.attachment.videoWithOutMuiscChangedRequest = true;
    },

    setVideoWithMuiscFileId(id) {
      this.attachment.videoWithMuisc = id;
      this.createItem.video_with_muisc = id;
      this.attachment.videoWithMuiscChanged = false;
      this.attachment.videoWithMuiscChangedRequest = true;
    },

    setFileId(id) {
      this.attachment.file = id;
      this.createItem.file = id;
      this.attachment.fileChanged = false;
      this.attachment.fileChangedRequest = true;
    },

    removeFile(fileName, fileChange, fileRequest) {
      this.createItem[fileName] = null;
      this.attachment[fileChange] = true;
      this.attachment[fileRequest] = true;
    },

    showModal(item, typeOfAttachment) {
      this.typeOfAttachment = typeOfAttachment;
      if(this.typeOfAttachment !== 'file') {
        this.$bvModal.show('holdContent')
      }
      if (typeOfAttachment === 'videoWithMusic') {
        this.videoUrl = this.attachment.video_with_music
      } else if (typeOfAttachment === 'videoWithOutMusic') {
        this.videoUrl = this.attachment.video_without_music
      } else if (typeOfAttachment === 'audio') {
        this.audioUrl = this.attachment.audio
      } else if (typeOfAttachment === 'logo') {
        this.imageUrl = this.attachment.thumbnail
      } else if (typeOfAttachment === 'image') {
        this.imageUrl = this.attachment.image
      } else if (typeOfAttachment === 'file') {
        this.fileUrl = this.attachment.file
        window.open(this.fileUrl, "_blank", "noreferrer")
      }
    },
    resetValues($event) {
      if ($event !== 115 || $event !== 116 || $event !== 117) {
        this.createItem.link = ""
        this.createItem.note = ""
      }
    },
    hideModal() {
      this.$bvModal.hide("holdContent");
    },

    onSubmit() {
      this.$refs.addLibraryItemForm.validate().then((success) => {
        if (!success) return;
      });
      if (this.$route.params.id) {
        if (!this.createItem.logo) {
          delete this.createItem.logo
        }
        if (!this.createItem.image) {
          delete this.createItem.image
        }
        if (!this.createItem.audio) {
          delete this.createItem.audio
        }
        if (!this.createItem.video_with_muisc) {
          delete this.createItem.video_with_muisc
        }
        if (!this.createItem.video_without_music) {
          delete this.createItem.video_without_music
        }
        if (!this.createItem.file){
          delete this.createItem.file
        }
        this.$emit("handleEditJeelLibrary", this.createItem);
      } else {
        this.$emit("handleAddJeelLibrary", this.createItem);
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },

    getJeelStoreLibraryToEdit() {
      if (this.$route.params.id) {
        this.ApiService(getJeelLibraryByIdRequest(this.$route.params.id)).then((response) => {
          this.createItem.level_id = response.data.data.level.id;
          this.createItem.type = response.data.data.type.id
          this.createItem.description = response.data.data.description
          this.createItem.file_name = response.data.data.file_name
          this.createItem.gems = response.data.data.gems
          // logo
          this.attachment.thumbnail_name = response.data.data.logo_name;
          this.attachment.thumbnail_size = response.data.data.logo_size;
          this.attachment.thumbnail = response.data.data.logo;
          // image
          if (this.createItem.type === 111) {
            this.attachment.audio_name = response.data.data.audio_orginal_name
            this.attachment.audio_size = response.data.data.audio_size
            this.attachment.audio = response.data.data.audio
          } else if (this.createItem.type === 112) {
            this.attachment.image = response.data.data.image
            this.attachment.image_name = response.data.data.image_orginal_name
            this.attachment.image_size = response.data.data.image_size
          } else if (this.createItem.type === 113) {
            this.attachment.video_with_music_name = response.data.data.video_with_music_name
            this.attachment.video_with_music_size = response.data.data.video_with_music_size
            this.attachment.video_with_music = response.data.data.video_with_music
            this.attachment.video_without_music_name = response.data.data.video_without_music_name
            this.attachment.video_without_music_size = response.data.data.video_without_music_size
            this.attachment.video_without_music = response.data.data.video_without_music
          } else if (this.createItem.type === 114) {
            this.attachment.file = response.data.data.file
            this.attachment.file_name = response.data.data.file_orginal_name
            this.attachment.file_size = response.data.data.file_size
          }
          else if (this.createItem.type === 115 || this.createItem.type === 117) {
            this.createItem.link = response.data.data.link
          } else if (this.createItem.type === 116) {
            this.createItem.note = response.data.data.note
          }
        });
      }
    },

    getAllLevels() {
      this.ApiService(getAllLevelsRequest()).then((response) => {
        this.levels = response.data.data;
      });
    },

    getAllLibraryTypes() {
      this.ApiService(getLibraryTypeRequest()).then((response) => {
        this.types = response.data.data;
      });
    },

  },
  computed: {
    checkLogo() {
      return this.attachment.thumbnail === null;
    },
    checkLogoUpdate() {
      return this.attachment.logoChanged === true;
    },
    checkAudioCustomInput() {
      return this.createItem.audio === null;
    },
    checkImageCustomInput() {
      return this.createItem.image === null;
    },
    checkVideoCustomInput() {
      return this.createItem.video_with_muisc === null || this.createItem.video_without_music === null;
    },
    checkFileCustomInput() {
      return this.createItem.file === null;
    },
    checkLinkCustomInput() {
      return this.createItem.link === null || this.createItem.link === "";
    },
    checkNoteCustomInput() {
      return this.createItem.note === null || this.createItem.note === ""
    },
  },
  mounted() {
    this.getJeelStoreLibraryToEdit();
    this.getAllLevels();
    this.getAllLibraryTypes();
  },

};
</script>
<style scoped lang="scss">
@import "./index";
</style>
