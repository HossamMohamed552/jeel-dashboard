<template>
  <section class="container-fluid custom-container" v-if="jeelStoreLibrary">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col md="4" sm="12">
            <ShowItem
                class="divider-show"
                :title="'اسم الملف'"
                :subtitle="jeelStoreLibrary.file_name"
            />
          </b-col>
          <b-col md="4" sm="12">
            <ShowItem
                class="divider-show"
                :title="'الصف الدراسى'"
                :subtitle="jeelStoreLibrary?.level?.name"
            />
          </b-col>
          <b-col lg="4" >
            <ShowItem class="divider-show" :title="'نوع الملف'" :subtitle="jeelStoreLibrary?.type?.name"/>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="12" class="mb-2 mt-2">
            <PreviewMedia
              :header="'لوجو الملف'"
              :media-name="jeelStoreLibrary.logo_name"
              :file-size="jeelStoreLibrary.logo_size"
              :image-url="jeelStoreLibrary.logo"
              :typeOfMedia="'imageLogo'"
              @showModal="showModal(jeelStoreLibrary,$event)"
            />
          </b-col>
          <b-col lg="12" class="mb-2 mt-2" v-if="jeelStoreLibrary?.type?.key === 'voice'">
            <PreviewMedia
              :header="'ملف صوت'"
              :media-name="jeelStoreLibrary.audio_orginal_name"
              :file-size="jeelStoreLibrary.audio_size"
              :image-url="jeelStoreLibrary.audio"
              :typeOfMedia="'audio'"
              @showModal="showModal(jeelStoreLibrary,$event)"
            />
          </b-col>
          <b-col lg="12" class="mb-2 mt-2" v-if="jeelStoreLibrary?.type?.key === 'image'">
            <PreviewMedia
              :header="'ملف صورة'"
              :media-name="jeelStoreLibrary.image_orginal_name"
              :file-size="jeelStoreLibrary.image_size"
              :image-url="jeelStoreLibrary.image"
              :typeOfMedia="'image'"
              @showModal="showModal(jeelStoreLibrary,$event)"
            />
          </b-col>
          <b-col lg="12" class="mb-2 mt-2" v-if="jeelStoreLibrary?.type?.key === 'video'">
            <PreviewMedia
              :header="'ملف الفيديو بدون موسيقى'"
              :media-name="jeelStoreLibrary.video_without_music_name"
              :file-size="jeelStoreLibrary.video_without_music_size"
              :image-url="jeelStoreLibrary.video_without_music"
              :typeOfMedia="'videoWithOutMusic'"
              @showModal="showModal(jeelStoreLibrary,$event)"
            />
          </b-col>
          <b-col lg="12" class="mb-2 mt-2" v-if="jeelStoreLibrary?.type?.key === 'video'">
            <PreviewMedia
              :header="'ملف الفيديو'"
              :media-name="jeelStoreLibrary.video_with_music_name"
              :file-size="jeelStoreLibrary.video_with_music_size"
              :image-url="jeelStoreLibrary.video_with_music"
              :typeOfMedia="'video'"
              @showModal="showModal(jeelStoreLibrary,$event)"
            />
          </b-col>
          <b-col lg="12" class="mb-2 mt-2" v-if="jeelStoreLibrary?.type?.key === 'file'">
            <PreviewMedia
              :header="'ملف المحتوي'"
              :media-name="jeelStoreLibrary.file_orginal_name"
              :file-size="jeelStoreLibrary.file_size"
              :image-url="jeelStoreLibrary.file"
              :typeOfMedia="'file'"
              @showModal="showModal(jeelStoreLibrary,$event)"
            />
          </b-col>
          <b-col lg="12" class="mt-2 mb-2" v-if="jeelStoreLibrary?.type?.key === 'game' || jeelStoreLibrary?.type?.key === 'read_with_jeel'">
            <ShowItem class="divider-show" :title="'الرابط'" :subtitle="jeelStoreLibrary.link ? jeelStoreLibrary.link : '----'"/>
          </b-col>
          <b-col lg="12" class="mt-2 mb-2" v-if="jeelStoreLibrary?.type?.key === 'note'">
            <ShowItem class="divider-show" :title="'الملحوظة'" :subtitle="jeelStoreLibrary.note ? jeelStoreLibrary.note : '----'"/>
          </b-col>
        </b-row>

        <GeneralModal :id="'holdContent'" :size="'lg'" :hide-header="true">
          <template #modalBody>
            <div class="text-center">
              <div v-if="mediaType === 'audio'">
                <audio :src="url"
                       ref="player"
                       autoplay="autoplay"
                       controls="controls"></audio>
              </div>
              <div v-if="mediaType === 'video' || mediaType === 'videoWithOutMusic'">
                <video controls class="w-100 video" autoplay="autoplay">
                  <source :src="url"/>
                  Your browser does not support the video tag.
                </video>
              </div>
              <div v-else>
                <img :src="url" alt="image preview" class="wrap-img">
              </div>
              <Button @click="hideModal" :custom-class="'rounded-btn transparent-btn'">
                {{ $t("BACK") }}
              </Button>
            </div>
          </template>
        </GeneralModal>
      </div>
    </div>
  </section>
</template>
<script>
import { getJeelStoreLibraryByIdRequest } from "@/api/jeel-store-library";
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import PreviewMedia from "@/components/Shared/PreviewMedia/PreviewMedia.vue";
import GeneralModal from "@/components/Shared/GeneralModal/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import {getJeelLibraryByIdRequest} from "@/api/jeel-library";

export default {
  name: "index",
  components: {
    Button, GeneralModal,
    ShowItem,
    PreviewMedia,
  },
  data() {
    return {
      jeelStoreLibrary: {},
      url: null,
      mediaType: null,
    };
  },
  methods:{
    showModal(item, $event) {
      this.mediaType = $event
      if(this.mediaType !== 'file') {
        this.$bvModal.show('holdContent')
      }
      if (this.mediaType === 'audio') {
        this.url = item.audio
      } else if(this.mediaType === 'imageLogo'){
        this.url = item.logo
      } else if(this.mediaType === 'videoWithOutMusic'){
        this.url = item.video_without_music
      } else if(this.mediaType === 'video'){
        this.url = item.video_with_music
      } else if(this.mediaType === 'image'){
        this.url = item.image
      } else if(this.mediaType === 'file'){
       window.open(item.file, "_blank", "noreferrer")
      }
    },
    hideModal() {
      this.$bvModal.hide('holdContent')
    },
  },
  mounted() {
    this.ApiService(getJeelLibraryByIdRequest(this.$route.params.id))
      .then((response) => {
        this.jeelStoreLibrary = response.data.data;
      })
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
