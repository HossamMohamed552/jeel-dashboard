<template>
  <div class="add-edit-role">
    <div class="container-fluid custom-container">
      <div class="add-edit-role-form">
        <h3>{{ $route.params.id ? $t('content.edit') : $t('content.add') }}</h3>
        <validation-observer v-slot="{ invalid }" ref="addLibraryItemForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="createItem.file_name"
                    :label="$t('content.name')"
                    :name="$t('content.name')"
                    :placeholder="$t('content.name')"
                    :rules="'required|min:3|max:100'"
                  ></TextField>
                </div>
              </b-col>

              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <label>
                    {{$t('content.level')}}
                    <span><i class="fa-solid fa-asterisk"></i></span>
                  </label>
                  <SelectSearch
                    v-model="createItem.level_id"
                    :name="$t('content.selectLevel')"
                    :placeholder="$t('content.selectLevel')"
                    :options="levels"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                  ></SelectSearch>
                </div>
              </b-col>

              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <TextField
                    type="number"
                    v-model="createItem.gems"
                    :label="$t('content.gems')"
                    :name="$t('content.gems')"
                    :placeholder="$t('content.selectGems')"
                    :rules="'required'"
                  ></TextField>
                </div>
              </b-col>

              <!------------------- start logo uploader --------------------------------->
              <b-col lg="12" class="mb-3 mt-4">
                <UploadAttachmentImage
                  v-if="!$route.params.id || attachment.logoChangedRequest"
                  :rules="'required'"
                  :label="$t('content.logo')"
                  :name="'logoFile'"
                  :dropIdRef="'logoFile'"
                  :type-of-attachment="'image'"
                  :accept-files="'image/jpeg,image/png,image/jpg,image/gif'"
                  @setFileId="setThumbnailId($event)"
                />
                <PreviewMedia
                  v-if="$route.params.id && attachment.logoChanged === false && !attachment.logoChangedRequest"
                  :header="`${$t('BADGE.bade_logo')}`"
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

              <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <TextAreaField
                    :label="$t('content.description')"
                    :name="$t('content.description')"
                    :rules="'required|min:3|max:250'"
                    v-model="createItem.description"
                  />
                </div>
              </b-col>

              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <label>
                    {{$t('content.type')}}
                    <span><i class="fa-solid fa-asterisk"></i></span>
                  </label>
                  <SelectSearch
                    v-model="createItem.type"
                    :name="$t('content.type')"
                    :placeholder="$t('content.selectType')"
                    :options="types"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                    @input="resetValues($event)"
                    :disabled="!!$route.params.id"
                  ></SelectSearch>
                </div>
              </b-col>

              <!------------------- start file audio --------------------------------->
              <b-col lg="8" v-if="createItem.type === 145" class="mb-3">
                <UploadAttachmentAudio
                  v-if="!$route.params.id || attachment.audioChangedRequest"
                  :type-of-attachment="'audio'"
                  :dropIdRef="'audioFile'"
                  :label="$t('PAPER_WORK.audioFile')"
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
                  :header="$t('PAPER_WORK.audioFile')"
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
              <b-col lg="8" v-if="createItem.type === 146" class="mb-3">
                <UploadAttachmentImage
                  v-if="!$route.params.id || attachment.imageChangedRequest"
                  :type-of-attachment="'image'"
                  :dropIdRef="'imageFile'"
                  :accept-files="'image/jpeg,image/png,image/jpg,image/gif'"
                  :label="$t('BADGE.bade_logo')"
                  :name="'imageFile'"
                  :rules="'required'"
                  @setFileId="setImageId($event)"
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
              <b-col lg="8" v-if="createItem.type === 147" class="mb-3 mt-4">
                <UploadAttachmentVideo
                  v-if="!$route.params.id || attachment.videoWithOutMuiscChangedRequest"
                  :type-of-attachment="'video'"
                  :dropIdRef="'VideFile'"
                  :name="'VideoWithout'"
                  :rules="'required'"
                  @setFileId="setVideoWithOutMuiscFileId($event)"
                  :label="$t('VIDEO.videoWithoutMusic')"
                />
                <PreviewMedia
                  v-if="
                    $route.params.id &&
                    attachment.videoWithOutMuiscChanged === false &&
                    !attachment.videoWithOutMuiscChangedRequest
                  "
                  :header="$t('VIDEO.videoWithoutMusic')"
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
              <b-col lg="12" v-if="createItem.type === 147" class="mb-3 mt-4">
                <UploadAttachmentVideo
                  v-if="!$route.params.id || attachment.videoWithMuiscChangedRequest"
                  :type-of-attachment="'video'"
                  :label="$t('VIDEO.videoWithMusic')"
                  :name="'VideoWithout2'"
                  :dropIdRef="'VideFile2'"
                  :accept-files="'video/mp4,video/avi,video/mov'"
                  @setFileId="setVideoWithMuiscFileId($event)"
                />
                <PreviewMedia
                  v-if="
                    $route.params.id &&
                    attachment.videoWithMuiscChanged === false &&
                    !attachment.videoWithMuiscChangedRequest
                  "
                  :header="$t('VIDEO.videoWithMusic')"
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
              <b-col lg="8" v-if="createItem.type === 148" class="mb-3 mt-4">
                <UploadAttachmentFile
                  v-if="!$route.params.id || attachment.fileChangedRequest"
                  :type-of-attachment="'pdf'"
                  :label="$t('content.content_file')"
                  :name="'pdfFile'"
                  :dropIdRef="'pdfFile'"
                  @setFileId="setFileId"
                />
                <PreviewMedia
                  v-if="
                    $route.params.id &&
                    attachment.fileChanged === false &&
                    !attachment.fileChangedRequest
                  "
                  :header="$t('content.content_file')"
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

              <b-col lg="12" class="mb-3" v-if="createItem.type === 150">
                <div class="hold-field">
                  <TextAreaField
                    v-if="createItem.type === 150"
                    :label="$t('content.writeNote')"
                    :rules="'required|min:3|max:250'"
                    v-model="createItem.note"
                    :name="$t('content.note')"
                  />

                </div>
              </b-col>

              <b-col lg="8" class="mb-3" v-if="createItem.type === 151 || createItem.type === 149">
                <div class="hold-field">
                  <TextField
                    v-model="createItem.link"
                    :label="$t('content.link')"
                    :name="$t('content.link')"
                    :placeholder="$t('content.writeLink')"
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
import UploadAttachmentImage from "@/components/Shared/UploadAttachmentImage/index.vue";
import UploadAttachmentAudio from "@/components/Shared/UploadAttachmentAudio/index.vue";
import UploadAttachmentVideo from "@/components/Shared/UploadAttachmentVideo/index.vue";
import UploadAttachmentFile from "@/components/Shared/UploadAttachmentFile/index.vue";
import GeneralModal from "@/components/Shared/GeneralModal/index.vue";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import {getAllLevelsRequest} from "@/api/level";
import {getJeelStoreLibraryByIdRequest} from "@/api/jeel-store-library";
import {getStoreLibraryTypeRequest} from "@/api/system";

export default {
  components: {
    SelectSearch,
    GeneralModal,
    UploadAttachment,
    UploadAttachmentImage,
    UploadAttachmentAudio,
    UploadAttachmentVideo,
    UploadAttachmentFile,
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
        gems: "",
        link: "",
        type: null,
        image: null,
        logo: "",
        video_with_muisc: null,
        video_without_music: null,
        audio: null,
        file: null,
        description: "",
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
      if ($event !== 151 || $event !== 149 || $event !== 150) {
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
        this.$emit("handleEditJeelStoreLibrary", this.createItem);
      } else {
        this.$emit("handleAddJeelStoreLibrary", this.createItem);
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },

    getJeelStoreLibraryToEdit() {
      if (this.$route.params.id) {
        this.ApiService(getJeelStoreLibraryByIdRequest(this.$route.params.id)).then((response) => {
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
          if (this.createItem.type === 145) {
            this.attachment.audio_name = response.data.data.audio_orginal_name
            this.attachment.audio_size = response.data.data.audio_size
            this.attachment.audio = response.data.data.audio
          } else if (this.createItem.type === 146) {
            this.attachment.image = response.data.data.image
            this.attachment.image_name = response.data.data.image_orginal_name
            this.attachment.image_size = response.data.data.image_size
          } else if (this.createItem.type === 147) {
            this.attachment.video_with_music_name = response.data.data.video_with_music_name
            this.attachment.video_with_music_size = response.data.data.video_with_music_size
            this.attachment.video_with_music = response.data.data.video_with_music
            this.attachment.video_without_music_name = response.data.data.video_without_music_name
            this.attachment.video_without_music_size = response.data.data.video_without_music_size
            this.attachment.video_without_music = response.data.data.video_without_music
          } else if (this.createItem.type === 148) {
            this.attachment.file = response.data.data.file
            this.attachment.file_name = response.data.data.file_orginal_name
            this.attachment.file_size = response.data.data.file_size
          }
          else if (this.createItem.type === 151 || this.createItem.type === 149) {
            this.createItem.link = response.data.data.link
          } else if (this.createItem.type === 150) {
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
      this.ApiService(getStoreLibraryTypeRequest()).then((response) => {
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
