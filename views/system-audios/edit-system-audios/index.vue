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
            <b-col lg="6" class="mb-5">
              <ShowItem
                class="divider-show"
                title="اسم التصنيف"
                :subtitle="singleSystemAudios.category.name"
              />
            </b-col>
            <b-col lg="6" class="mb-5">
              <ShowItem
                class="divider-show"
                title="اسم الصوت"
                :subtitle="singleSystemAudios.name"
              />
            </b-col>
            <b-col lg="12" class="mb-5">
              <UploadAttachment
                v-if="singleSystemAudios.taskAudioChangedRequest"
                :type-of-attachment="'audio'"
                :dropIdRef="'audioFile'"
                :accept-files="'audio/*'"
                :label="'ملف الصوت'"
                :name="'audioFile'"
                :rules="'required'"
                @setFileId="setAudioFileId($event)"
              />
              <PreviewMedia
                v-else
                :header="$t('ملف الصوت')"
                :media-name="singleSystemAudios.audio_name"
                :file-size="singleSystemAudios.audio_size"
                :typeOfMedia="'audio'"
                :showRemoveButton="true"
                @showModal="showModal(singleSystemAudios.audio)"
                @removeFile="
                  removeFile('audio_name', 'taskAudioChanged', 'taskAudioChangedRequest')
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

import { getSingleSystemAudiosRequest, putSystemAudiosRequest } from "@/api/system-audios.js";
export default {
  name: "index",
  components: {
    ShowItem,
    PreviewMedia,
    GeneralModal,
    UploadAttachment,
    Modal,
  },
  data() {
    return {
      singleSystemAudios: {},
      url: null,
      isShowModal: false,
      loading: false,
      isSubmit: true,
    };
  },
  methods: {
    hideModal() {
      this.$bvModal.hide("holdContent");
    },
    showModal(audio) {
      this.$bvModal.show("holdContent");
      this.url = audio;
    },
    setAudioFileId($event) {
      this.singleSystemAudios.audio = $event;
      this.singleSystemAudios.taskAudioChangedRequest = true;
      this.singleSystemAudios.taskAudioChanged = false;
      this.isSubmit = false;
    },
    removeFile(fileName, fileChange, fileRequest) {
      this.singleSystemAudios[fileChange] = true;
      this.singleSystemAudios[fileName] = null;
      this.singleSystemAudios[fileRequest] = true;
    },
    onSubmit() {
      this.ApiService(
        putSystemAudiosRequest(this.$route.params.id, { audio: this.singleSystemAudios.audio })
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
  created() {
    this.ApiService(getSingleSystemAudiosRequest(this.$route.params)).then((response) => {
      this.singleSystemAudios = response.data.data;
      this.singleSystemAudios.taskAudioChanged = false;
      this.singleSystemAudios.taskAudioChangedRequest = false;
    });
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
