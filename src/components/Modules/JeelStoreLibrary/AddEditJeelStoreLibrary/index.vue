<template>
  <div class="add-edit-role">
    <div class="container-fluid custom-container">
      <div class="add-edit-role-form">
        <h3>{{ $route.params.id ? "تعديل محتوى" : "إضافة محتوى" }}</h3>
        <validation-observer v-slot="{ invalid }" ref="addLibraryItemForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <TextField
                      v-model="createItem.file_name"
                      :label="'اسم المحتوى'"
                      :name="'اسم المحتوى'"
                      placeholder="أختر المحتوى"
                      :rules="'required|min:3|max:100'"
                  ></TextField>
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

              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <TextField
                      type="number"
                      v-model="createItem.gems"
                      :label="'عدد الجيمز'"
                      :name="'عدد الجيمز'"
                      placeholder="أختر عدد الجيمز"
                      :rules="'required|min:3|max:100'"
                  ></TextField>
                </div>
              </b-col>

              <!------------------- start logo uploader --------------------------------->
              <b-col lg="12" class="mb-3 mt-4">
                <UploadAttachment
                    v-if="!$route.params.id || attachment.thumbnailChangedRequest"
                    :rules="'required'"
                    :label="'لوجو المحتوى'"
                    :type-of-attachment="'image'"
                    :accept-files="'image/*'"
                    @setFileId="setThumbnailId"
                />
                <PreviewMedia
                    v-if="
                    $route.params.id &&
                    attachment.thumbnailChanged === false &&
                    !attachment.thumbnailChangedRequest
                  "
                    :header="`${$t('BADGE.bade_logo')}`"
                    :media-name="attachment.thumbnail_name"
                    :file-size="attachment.thumbnail_size"
                    :image-url="attachment.thumbnail"
                    :typeOfMedia="'image'"
                    :show-remove-button="true"
                    @removeFile="
                    removeFile('thumbnail', 'thumbnailChanged', 'thumbnailChangedRequest')
                  "
                    @showModal="showModal(createItem,'logo')"

                />
              </b-col>
              <!------------------- end uploader --------------------------------->

              <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <TextAreaField
                      :label="'الوصف'"
                      :rules="'required|min:3|max:250'"
                      v-model="createItem.description"
                  />
                </div>
              </b-col>

              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <label>
                    نوع المحتوى
                    <span><i class="fa-solid fa-asterisk"></i></span>
                  </label>
                  <SelectSearch
                    isRequired="true"
                    v-model="createItem.type"
                    name="نوع الملف"
                    placeholder="أختر نوع الملف"
                    :options="types"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                  ></SelectSearch>
                </div>
              </b-col>

              <!------------------- start file audio --------------------------------->
              <b-col lg="6" v-if="createItem.type==145" class="mb-3 mt-4">
                <UploadAttachment
                  v-if="!$route.params.id || attachment.audioChangedRequest"
                  :type-of-attachment="'audio'"
                  :dropIdRef="'audioFile'"
                  :accept-files="'audio/*'"
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
                  :media-name="ttachment.audio_name"
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
              <b-col lg="6" v-if="createItem.type==146" class="mb-3 mt-4">
                <UploadAttachment
                  v-if="!$route.params.id || attachment.imageChangedRequest"
                  :rules="'required'"
                  :label="'ملف صورة '"
                  :type-of-attachment="'image'"
                  :accept-files="'image/*'"
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
              <b-col lg="6"  v-if="createItem.type==147" class="mb-3 mt-4">
                <UploadAttachment
                  v-if="!$route.params.id || attachment.videoWithOutMuiscChangedRequest"
                  :type-of-attachment="'video'"
                  :dropIdRef="'VideFile'"
                  :accept-files="'.mp4'"
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
                  :header="`${$t('BADGE.bade_logo')}`"
                  :media-name="attachment.videoWithOutMuisc_name"
                  :file-size="attachment.videoWithOutMuisc_size"
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
              <b-col lg="6"  v-if="createItem.type==147" class="mb-3 mt-4">
                <UploadAttachment
                  v-if="!$route.params.id || attachment.videoWithMuiscChangedRequest"
                  :type-of-attachment="'video'"
                  :label="'ملف الفيديو '"
                  :name="'VideFile'"
                  :dropIdRef="'VideFile'"
                  :accept-files="'.mp4'"
                  @setFileId="setVideoWithMuiscFileId"
                />


                <PreviewMedia
                  v-if="
                    $route.params.id &&
                    attachment.videoWithMuiscChanged === false &&
                    !attachment.videoWithMuiscChangedRequest
                  "
                  :header="`${$t('BADGE.bade_logo')}`"
                  :media-name="attachment.videoWithMuisc_name"
                  :file-size="attachment.videoWithMuisc_size"
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
              <b-col lg="6"  v-if="createItem.type==148" class="mb-3 mt-4">
                <UploadAttachment
                  v-if="!$route.params.id || attachment.fileChangedRequest"
                  :type-of-attachment="'file'"
                  :label="'ملف المحتوي '"
                  :name="'File'"
                  :dropIdRef="'File'"
                  :accept-files="'.pdf'"
                  @setFileId="setFileId"
                />


                <PreviewMedia
                  v-if="
                    $route.params.id &&
                    attachment.fileChanged === false &&
                    !attachment.fileChangedRequest
                  "
                  :header="`${$t('BADGE.bade_logo')}`"
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

              <b-col lg="12" class="mb-3" v-if="createItem.type==150">
                <div class="hold-field">
                  <TextAreaField
                    v-if="createItem.type==150"
                    :label="'اكتب ملحوظة'"
                    :rules="'required|min:3|max:250'"
                    v-model="createItem.note"
                  />

                </div>
              </b-col>

              <b-col lg="6" class="mb-3" v-if="createItem.type == 151 || createItem.type == 149">
                <div class="hold-field">
                  <TextField
                    v-model="createItem.link"
                    :label="'رابط'"
                    :name="'رابط'"
                    placeholder="اكتب رابط"
                    :rules="'required|url'"
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
                      :disabled="invalid || checkLogo"
                      custom-class="submit-btn"
                    >
                      {{ $t("GLOBAL_SAVE") }}
                    </Button>
                    <Button
                      v-if="$route.params.id"
                      type="submit"
                      :loading="loading"
                      :disabled="invalid || checkLogo"
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
          <div class="height-modal" v-if=" typeOfAttachment=='logo' || typeOfAttachment =='image'">
            <img :src="attachment.thumbnail" class="image-modal" />
          </div>

          <div class="height-modal" v-if=" typeOfAttachment=='file'">
            <input type="file" :value="attachment.file" class="image-modal" />
          </div>

          <audio :src="audioUrl"  v-if=" typeOfAttachment =='audio'"
                 ref="player"
                 autoplay="autoplay"
                 controls="controls"></audio>

          <vimeo-player
            v-if="typeOfAttachment=='videoWithMusic' || typeOfAttachment =='videoWithOutMusic'"
            class="vimeo-player my-3"
            ref="videoPlayer"
            :video-url="`${videoUrl}`"
            :options="{'responsive':true}"
          ></vimeo-player>
          <video v-else width="90%"
                 class="my-3"
                 :src="videoUrl"
                 ref="player"
                 autoplay="autoplay"
                 controls="controls"
          />

          <Button @click="hideModal" :custom-class="'rounded-btn transparent-btn'">
            {{ $t("BACK") }}
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
import {getStoreLibraryTypeRequest} from "@/api/system";

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
      typeOfAttachment:null,
      imageUrl:null,
      audioUrl:null,
      videoUrl:null,
      fileUrl: null,
      createItem: {
        level_id: "",
        file_name: "",
        gems: "",
        link: "",
        type: null,
        image: "",
        logo: "",
        video_with_muisc: "",
        video_without_music: "",
        audio: "",
        file: "",

        // note
        note: null
      },
      attachment:{
        //  thumbnail
        thumbnail: null,
        thumbnailChanged: false,
        thumbnailChangedRequest: false,

        //  image
        image: null,
        imageChanged: false,
        imageChangedRequest: false,

        //  audio
        audio: null,
        audioChanged: false,
        audioChangedRequest: false,

        //  file
        file: null,
        fileChanged: false,
        fileChangedRequest: false,

        //  video_with_muisc
        videoWithMuisc: null,
        videoWithMuiscChanged: false,
        videoWithMuiscChangedRequest: false,

        //  video_without_music
        videoWithOutMuisc: null,
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
      this.attachment.thumbnailChanged = false;
      this.attachment.thumbnailChangedRequest = true;
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
      this.attachment.videoWithMuiscChanged= false;
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
      this.createItem[fileChange] = true;
      this.createItem[fileRequest] = true;
    },

    showModal(item, typeOfAttachment) {
      this.$bvModal.show('holdContent');

      this.typeOfAttachment = typeOfAttachment;
      //videoWithMusic , logo ,videoWithOutMusic ,image ,audio

      if (typeOfAttachment === 'videoWithMusic') {
        this.videoUrl = this.attachment.videoWithMuisc
      }
      else if (typeOfAttachment === 'videoWithOutMusic') {
        this.videoUrl = this.attachment.videoWithOutMuisc
      }
      else if (typeOfAttachment === 'audio') {
        this.audioUrl = this.attachment.audio
      }
      else if (typeOfAttachment === 'logo') {
        this.imageUrl = this.attachment.thumbnail
      }
      else if (typeOfAttachment === 'image') {
        this.imageUrl = this.attachment.image
      }
      else if (typeOfAttachment === 'file') {
        this.fileUrl = this.attachment.file
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
        if (this.createItem.logo != null) {
          this.$emit("handleEditItem", this.createItem);
        } else {
          delete this.createItem.logo;

          this.$emit("handleEditItem", this.createItem);
        }
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

          this.createItem = response.data.data;
          this.createItem.level_id= response.data.data.level.id;

          //
          // logo: null,
          // this.createItem.logo = response.data.data.logo_uuid;
          this.attachment.thumbnail_name = response.data.data.logo_name;
          this.attachment.thumbnail_size = response.data.data.logo_size;
          this.attachment.thumbnail = response.data.data.logo;

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
      if (this.attachment.thumbnail === null) {
        return true;
      } else {
        return false;
      }
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
