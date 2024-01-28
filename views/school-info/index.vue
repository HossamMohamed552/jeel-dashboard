<template>
  <section class="container-fluid custom-container">
    <div class="show-role school-info">
      <b-row>
        <b-col lg="9">
          <h2 class="heading">{{ $t("schoolAdmin.schoolInfoDetail") }}</h2>
        </b-col>
        <b-col lg="3">
          <Button :custom-class="'btn-add rounded-btn big-padding'" @click="goToAddEditSchoolInfo"
                  v-if="user.permissions.includes(`update-schooladmin-school`)">
            <span>تعديل بيانات المدرسة</span>
          </Button>
        </b-col>
        <b-col lg="4" class="mb-4">
          <ShowItem class="divider-show" :title="$t('schoolAdmin.schoolName')"
                    :subtitle="user.school.name"/>
        </b-col>
        <b-col lg="4" class="mb-4">
          <ShowItem class="divider-show" :title="$t('schoolAdmin.country')"
                    :subtitle="schoolInfo?.country?.name"/>
        </b-col>
        <b-col lg="4" class="mb-4">
          <ShowItem class="divider-show" :title="$t('schoolAdmin.schoolGroup')"
                    :subtitle="schoolInfo?.school_group?.name"/>
        </b-col>
        <b-col lg="4" class="mb-4">
          <ShowItem class="divider-show" :title="$t('schoolAdmin.managementType')"
                    :subtitle="schoolInfo?.name"/>
        </b-col>
        <b-col lg="4" class="mb-4">
          <ShowItem class="divider-show" :title="$t('schoolAdmin.certificate')"
                    :subtitle="schoolInfo?.certificate?.name"/>
        </b-col>
        <b-col lg="4" class="mb-4">
          <ShowItem class="divider-show" :title="$t('schoolAdmin.teachingLanguage')"
                    :subtitle="schoolInfo?.teaching_language?.name"/>
        </b-col>
        <b-col lg="4" class="mb-4">
          <ShowItem class="divider-show" :title="$t('schoolAdmin.studentsType')"
                    :subtitle="schoolInfo?.students_type?.name"/>
        </b-col>
        <b-col lg="4" class="mb-4">
          <ShowItem class="divider-show" :title="$t('schoolAdmin.phone')"
                    :subtitle="schoolInfo.owner_phone"/>
        </b-col>
        <b-col lg="4" class="mb-4">
          <ShowItem class="divider-show" :title="$t('schoolAdmin.musicStatus')"
                    :subtitle="schoolInfo?.music_status?.name"/>
        </b-col>
        <b-col lg="4" class="mb-4">
          <ShowItem class="divider-show" :title="$t('schoolAdmin.status')"
                    :subtitle="schoolInfo?.status?.name"/>
        </b-col>
        <b-col lg="12" class="mb-4">
          <PreviewMedia :header="$t('schoolAdmin.schoolLogo')"
                        :media-name="schoolInfo.logo_name"
                        :file-size="schoolInfo.logo_size"
                        :image-url="schoolInfo.logo"
                        :typeOfMedia="'image'"
                        @showModal="showModal(schoolInfo,$event,schoolInfo.logo)"
          />
        </b-col>
        <b-col lg="12" class="mb-4">
          <h2 class="heading m-0">{{ $t("schoolAdmin.schoolInfoDetailResponsible") }}</h2>
        </b-col>
        <b-col lg="4" class="mb-4">
          <ShowItem class="divider-show" :title="$t('schoolAdmin.ownerName')"
                    :subtitle="schoolInfo.owner_name"/>
        </b-col>
        <b-col lg="4" class="mb-4">
          <ShowItem class="divider-show" :title="$t('schoolAdmin.ownerPhone')"
                    :subtitle="schoolInfo.owner_phone"/>
        </b-col>
        <b-col lg="4" class="mb-4">
          <ShowItem class="divider-show" :title="$t('schoolAdmin.ownerRole')"
                    :subtitle="schoolInfo.owner_role"/>
        </b-col>
        <b-col lg="12" class="mb-4">
          <h2 class="heading m-0">{{ $t("schoolAdmin.ResponsibleAddress") }}</h2>
        </b-col>
        <b-col lg="12" class="mb-4">
          <ShowItem class="divider-show" :title="$t('schoolAdmin.address')"
                    :subtitle="schoolInfo.address"/>
        </b-col>
      </b-row>
    </div>
    <GeneralModal :id="'holdContent'" :size="'lg'" :hide-header="true">
      <template #modalBody>
        <div class="text-center">
          <div v-if="mediaType === 'audio'">
            <audio :src="url"
                   ref="player"
                   autoplay="autoplay"
                   controls="controls"></audio>
          </div>
          <div v-else class="height-modal">
            <img :src="url" class="image-modal">
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
import {getSchoolInfoRequest} from "@/api/school-info";
import Button from "@/components/Shared/Button/index.vue";
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import PreviewMedia from "@/components/Shared/PreviewMedia/PreviewMedia.vue";
import GeneralModal from "@/components/Shared/GeneralModal/index.vue";

export default {
  name: "index",
  components: {GeneralModal, PreviewMedia, ShowItem, Button},
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  data() {
    return {
      schoolInfo: {},
      url: null,
      mediaType: null
    }
  },
  methods: {
    showModal(schoolInfo, $event, fileUrl = '') {
      this.$bvModal.show('holdContent')
      this.mediaType = $event
      if (this.mediaType === 'audio') {
        this.url = schoolInfo.audio
      } else {
        this.url = fileUrl
      }
    },
    hideModal() {
      this.$bvModal.hide('holdContent')
    },
    getSchoolInfo() {
      this.ApiService(getSchoolInfoRequest()).then((response) => {
        this.schoolInfo = response.data.data
      })
    },
    goToAddEditSchoolInfo() {
      this.$router.push('/')
    }
  },
  mounted() {
    this.getSchoolInfo()
  }
}
</script>
<style scoped lang="scss">

</style>
