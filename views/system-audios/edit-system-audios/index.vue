<template>
  <section class="container-fluid custom-container">
    <Modal :content-message="'تم التعديل بنجاح'" :showModal="isShowModal" :is-success="true" />
    <div class="show-role">
      <div class="hold-fields">
        <form @submit.prevent="onSubmit" class="mt-2">
          <b-row>
            <b-col lg="12">
              <h2 class="heading">تعديل الصوت</h2>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="12" class="mb-5">
              <ShowItem
                class="divider-show"
                title="اسم التصنيف"
                :subtitle="singleSystemAudios.category.name"
              />
            </b-col>
            <b-col lg="6" class="mb-5">
              <TextField
                v-model="singleSystemAudios.name.ar"
                @change="handleInput(singleSystemAudios.name.ar, 'ar')"
                label="الاسم بالعربية"
                name="الاسم بالعربية"
                :placeholder="$t('USERS.ENTER') + ' ' + 'الاسم بالعربية'"
                :rules="'required|min:2'"
              ></TextField>
            </b-col>
            <b-col lg="6" class="mb-5">
              <TextField
                v-model="singleSystemAudios.name.en"
                @change="handleInput(singleSystemAudios.name.en, 'en')"
                label="الاسم بالانجليزية"
                name="الاسم بالانجليزية"
                :placeholder="$t('USERS.ENTER') + ' ' + 'الاسم بالانجليزية'"
                :rules="'required|min:2'"
              ></TextField>
            </b-col>
            <b-col lg="6" class="mb-5">
              <UploadAttachment
                v-if="singleSystemAudios.taskAudioChangedRequest_ar"
                :type-of-attachment="'audio'"
                :dropIdRef="'audioFile'"
                :accept-files="'audio/*'"
                label="ملف الصوت العربي"
                :name="'audioFile'"
                :rules="'required'"
                @setFileId="
                  setAudioFileId(
                    $event,
                    'audio_ar',
                    'taskAudioChanged_ar',
                    'taskAudioChangedRequest_ar'
                  )
                "
              />
              <PreviewMedia
                v-else
                header="ملف الصوت العربي"
                :media-name="singleSystemAudios.audio_ar_name"
                :file-size="singleSystemAudios.audio_ar_size"
                :typeOfMedia="'audio'"
                :showRemoveButton="true"
                @showModal="showModal(singleSystemAudios.audio_ar)"
                @removeFile="
                  removeFile('audio_ar_name', 'taskAudioChanged_ar', 'taskAudioChangedRequest_ar')
                "
              />
            </b-col>
            <b-col lg="6" class="mb-5">
              <UploadAttachment
                v-if="singleSystemAudios.taskAudioChangedRequest_en"
                :type-of-attachment="'audio'"
                :dropIdRef="'audioFile'"
                :accept-files="'audio/*'"
                label="ملف الصوت الانجليزي"
                :name="'audioFile'"
                :rules="'required'"
                @setFileId="
                  setAudioFileId(
                    $event,
                    'audio_en',
                    'taskAudioChanged_en',
                    'taskAudioChangedRequest_en'
                  )
                "
              />
              <PreviewMedia
                v-else
                header="ملف الصوت الانجليزي"
                :media-name="singleSystemAudios.audio_en_name"
                :file-size="singleSystemAudios.audio_en_size"
                :typeOfMedia="'audio'"
                :showRemoveButton="true"
                @showModal="showModal(singleSystemAudios.audio_en)"
                @removeFile="
                  removeFile('audio_en_name', 'taskAudioChanged_en', 'taskAudioChangedRequest_en')
                "
              />
            </b-col>
          </b-row>
          <b-row>
            <div class="hold-btns-form">
              <Button @click="handleCancel" custom-class="cancel-btn margin">
                {{ $t("GLOBAL_CANCEL") }}
              </Button>
              <Button
                type="submit"
                :loading="loading"
                :disabled="isSubmit"
                custom-class="submit-btn"
              >
                {{ $t("GLOBAL_EDIT") }}
              </Button>
            </div>
          </b-row>
        </form>
      </div>
    </div>

    <GeneralModal :id="'holdContent'" :size="'lg'" :hide-header="true">
      <template #modalBody>
        <div class="text-center">
          <div>
            <audio :src="url" ref="player" autoplay="autoplay" controls="controls"></audio>
          </div>
          <Button @click="hideModal" :custom-class="'rounded-btn transparent-btn'">
            {{ $t("BACK") }}
          </Button>
        </div>
      </template>
    </GeneralModal>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import PreviewMedia from "@/components/Shared/PreviewMedia/PreviewMedia.vue";
import GeneralModal from "@/components/Shared/GeneralModal/index.vue";
import UploadAttachment from "@/components/Shared/UploadAttachment";
import Modal from "@/components/Shared/Modal/index.vue";
import TextField from "@/components/Shared/TextField/index.vue";

import { getSingleSystemAudiosRequest, putSystemAudiosRequest } from "@/api/system-audios.js";
export default {
  name: "index",
  components: {
    ShowItem,
    PreviewMedia,
    GeneralModal,
    UploadAttachment,
    Modal,
    TextField,
  },
  data() {
    return {
      singleSystemAudios: {},
      url: null,
      isShowModal: false,
      loading: false,
      isSubmit: true,
      audioForm: {
        name: {},
      },
    };
  },
  methods: {
    hideModal() {
      this.$bvModal.hide("holdContent");
    },
    handleInput(value, key) {
      this.audioForm.name[key] = value;
      this.isSubmit = false;
    },
    showModal(audio) {
      this.$bvModal.show("holdContent");
      this.url = audio;
    },
    setAudioFileId($event, fileName, fileChange, fileRequest) {
      this.audioForm[fileName] = $event;
      this.singleSystemAudios[fileName] = $event;
      this.singleSystemAudios[fileChange] = false;
      this.singleSystemAudios[fileRequest] = true;
      this.isSubmit = false;
    },
    removeFile(fileName, fileChange, fileRequest) {
      this.singleSystemAudios[fileChange] = true;
      this.singleSystemAudios[fileName] = null;
      this.singleSystemAudios[fileRequest] = true;
    },
    onSubmit() {
      this.ApiService(
        putSystemAudiosRequest(this.$route.params.id, {
          ...this.audioForm,
        })
      )
        .then((response) => {
          this.loading = true;
          this.isShowModal = true;
          setTimeout(() => {
            this.isShowModal = false;
            this.$router.push("/dashboard/system-audios");
          }, 3000);
        })
        .catch(() => {
          this.loading = false;
        });
    },
    handleCancel() {
      this.$router.push("/dashboard/system-audios");
    },
  },
  mounted() {
    this.ApiService(getSingleSystemAudiosRequest(this.$route.params)).then((response) => {
      this.singleSystemAudios = response.data.data;
      this.singleSystemAudios.taskAudioChanged_ar = false;
      this.singleSystemAudios.taskAudioChanged_en = false;
      this.singleSystemAudios.taskAudioChangedRequest_ar = false;
      this.singleSystemAudios.taskAudioChangedRequest_en = false;
    });
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
