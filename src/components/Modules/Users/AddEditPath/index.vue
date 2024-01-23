<template>
  <div class="add-edit-school">
    <div class="container-fluid custom-container">
      <div class="add-edit-school-form">
        <h3>{{ $route.params.id ? $t("PATH.EDIT") : $t("PATH.ADD_NEW") }}</h3>
        <validation-observer v-slot="{ invalid }" ref="addEditPathForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="createPath.name"
                    :label="$t('PATH.Name')"
                    :name="$t('PATH.Name')"
                    :placeholder="$t('PATH.Name_PLACEHOLDER')"
                    :rules="'required|min:3|max:100'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="12">
                <UploadAttachment v-if="!$route.params.id || createPath.audioChangedRequest"
                                  :type-of-attachment="'audio'"
                                  :dropIdRef="'audioFile'"
                                  :accept-files="'.mp3'"
                                  :label="'ملف الصوتى للمسار'" :name="'audioFile'"
                                  :rules="'required'"
                                  @setFileId="setAudioFileId($event)"/>
                <PreviewMedia v-if="$route.params.id && createPath.audioChanged === false && !createPath.audioChangedRequest" :header="'ملف الصوتى للمسار'"
                              :media-name="createPath.audio_name"
                              :file-size="createPath.audio_size"
                              :image-url="createPath.audio"
                              :typeOfMedia="'audio'"
                              :showRemoveButton="true"
                              @removeFile="removeFile('audio','audioChanged','audioChangedRequest')"
                />
              </b-col>
              <!-- <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <b-form-group v-slot="{ ariaDescribedby }" class="description">
                    <TextAreaField
                      v-model="createPath.description"
                      :label="$t('PATH.Description')"
                      :rules="'required|max:250'"
                      rows="5"
                      :name="$t('VIDEO.Description')"
                    ></TextAreaField>
                  </b-form-group>
                </div>
              </b-col> -->
            </b-row>
            <b-row>
              <div class="hold-btns-form">
                <Button @click="handleCancel" custom-class="cancel-btn margin">
                  {{ $t("GLOBAL_CANCEL") }}
                </Button>
                <Button
                  v-if="!$route.params.id"
                  type="submit"
                  :loading="loading"
                  :disabled="invalid || canNotSend || checkAudioInputs"
                  custom-class="submit-btn"
                >
                  {{$t("GLOBAL_SAVE") }}
                </Button>
                <Button
                  v-if="$route.params.id"
                  type="submit"
                  :loading="loading"
                  :disabled="invalid || canNotSend || checkAudioInputsUpdate"
                  custom-class="submit-btn"
                >
                  {{$t("GLOBAL_EDIT") }}
                </Button>
              </div>
            </b-row>
          </form>
        </validation-observer>
      </div>
    </div>
  </div>
</template>
<script>
import TextField from "@/components/Shared/TextField/index.vue";
import TextAreaField from "@/components/Shared/TextAreaField/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import {getSingleLearningPathRequest} from "@/api/learningPath";
import Modal from "@/components/Shared/Modal/index.vue";
import UploadAttachment from "@/components/Shared/UploadAttachment/index.vue";
import PreviewMedia from "@/components/Shared/PreviewMedia/PreviewMedia.vue";

export default {
  components: {
    PreviewMedia,
    UploadAttachment,
    TextField,
    TextAreaField,
    Button,
    Modal,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      createPath: {
        name: "",
        audio: null,
        audioChanged: false,
        audioChangedRequest: false,
        audio_name: "",
        audio_size: "",
        // description: "",
      },
      defaultValue: {
        name: "",
        // description: "",
      },
    };
  },
  computed: {
    canNotSend() {
      return (
        this.createPath.name === this.defaultValue.name
        // this.createPath.description === this.defaultValue.description
      );
    },
    checkAudioInputs() {
      if (this.createPath.audio === null ) {
        return true
      } else {
        return false
      }
    },
    checkAudioInputsUpdate(){
      if (this.createPath.audioChanged === true ) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    removeFile(fileName,fileChange,fileRequest){
      this.createPath[fileChange] = true
      this.createPath[fileName] = null
      this.createPath[fileRequest] = true
    },
    onSubmit() {
      // this.$refs.addEditPathForm.validate().then((success) => {
      //   if (!success) return;
      // });
      if (this.$route.params.id) {
        this.$emit("handleEditPath", this.createPath);
      } else {
        this.$emit("handleAddPath", this.createPath);
      }
    },
    setAudioFileId($event) {
      this.createPath.audio = $event
      this.createPath.audioChangedRequest = true
      this.createPath.audioChanged = false
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getPathToEdit() {
      if (this.$route.params.id) {
        this.ApiService(getSingleLearningPathRequest(this.$route.params.id)).then((response) => {
          this.createPath.name = response.data.data.name;
          this.createPath.audio_name = response.data.data.audio_name;
          this.createPath.audio_size = response.data.data.audio_size;
          this.createPath.audio = response.data.data.audio;
          this.defaultValue.name = response.data.data.name;
          // this.createPath.description = response.data.data.description;
          // this.defaultValue.description = response.data.data.description;
        });
      }
    },
  },
  mounted() {
    this.getPathToEdit();
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
