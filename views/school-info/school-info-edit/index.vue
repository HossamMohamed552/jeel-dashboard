<template>
  <div class="edit-school-info">
    <div class="container-fluid custom-container">
      <div class="edit-school-info-form">
        <h3>
          تعديل بيانات المدرسة
        </h3>
        <validation-observer v-slot="{ invalid }" ref="EditSchoolInfoForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <TextField
                    disabled="disabled"
                    v-model="schoolInfoEdit.name"
                    :label="$t('schoolAdmin.schoolName')"
                    :name="$t('schoolAdmin.schoolName')"
                    :placeholder="$t('schoolAdmin.schoolName')"
                    :rules="'required|max:100'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="4" class="mt-3 mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="schoolInfoEdit.country_id"
                    :label="$t('PACKAGE.countryName')"
                    :name="$t('PACKAGE.countryName')"
                    placeholder="اختر الدولة"
                    :options="countries"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                    disabled="disabled"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="4" class="mt-3 mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="schoolInfoEdit.school_group_id"
                    :label="$t('schoolAdmin.schoolGroup')"
                    :name="$t('schoolAdmin.schoolGroup')"
                    placeholder="اختر مجموعة المدرسة"
                    :options="schoolGroups"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                    disabled="disabled"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="schoolInfoEdit.management_type_id"
                    :label="$t('schoolAdmin.managementType')"
                    :name="$t('schoolAdmin.managementType')"
                    placeholder="اختر نوع إدارة المدرسة"
                    :options="managementTypes"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                    disabled="disabled"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="schoolInfoEdit.certificate_id"
                    :label="$t('schoolAdmin.certificate')"
                    :name="$t('schoolAdmin.certificate')"
                    placeholder="اختر نوع شهادة المدرسة"
                    :options="certificate"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                    disabled="disabled"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="schoolInfoEdit.teaching_language_id"
                    :label="$t('schoolAdmin.teachingLanguage')"
                    :name="$t('schoolAdmin.teachingLanguage')"
                    placeholder="اختر لغة التدريس"
                    :options="teachingLanguage"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                    disabled="disabled"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="4" class="mt-3 mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="schoolInfoEdit.students_type_id"
                    :label="$t('schoolAdmin.studentsType')"
                    :name="$t('schoolAdmin.studentsType')"
                    placeholder="اختر نوع الطلبة"
                    :options="studentsType"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                    disabled="disabled"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <TextField
                    disabled="disabled"
                    v-model="schoolInfoEdit.phone"
                    :label="$t('schoolAdmin.phone')"
                    :name="$t('schoolAdmin.phone')"
                    :placeholder="$t('schoolAdmin.phone')"
                    :rules="'required|max:100'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="4" class="mt-3 mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="schoolInfoEdit.music_status_id"
                    :label="$t('schoolAdmin.musicStatus')"
                    :name="$t('schoolAdmin.musicStatus')"
                    placeholder="الصوت"
                    :options="musicStatus"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="schoolInfoEdit.status_id"
                    :label="$t('schoolAdmin.status')"
                    :name="$t('schoolAdmin.status')"
                    placeholder="الحالة"
                    :options="schoolStatus"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                    disabled="disabled"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="12">
                <UploadAttachment
                  :label="$t('schoolAdmin.schoolLogo')"
                  :rules="'required'"
                  v-if="schoolInfoEdit.logoChangedRequest"
                  @setFileId="setImageId"
                  :type-of-attachment="'image'"
                  :accept-files="'image/*'"
                />
                <!--                v-if="$route.params.id && createPaperWork.thumbnailChanged === false && !createPaperWork.thumbnailChangedRequest"-->
                <PreviewMedia
                  v-if="schoolInfoEdit.logoChanged === false && !schoolInfoEdit.logoChangedRequest"
                  :header="`${$t('schoolAdmin.schoolLogo')}`"
                  :media-name="schoolInfoEdit.logo_name"
                  :file-size="schoolInfoEdit.logo_size"
                  :image-url="schoolInfoEdit.logo"
                  :typeOfMedia="'image'"
                  :show-remove-button="true"
                  @removeFile="removeFile('logo','logoChanged','logoChangedRequest')"
                  @showModal="showModal(schoolInfoEdit,$event,schoolInfoEdit.logo)"/>
              </b-col>
              <b-col lg="12" class="mt-5 mb-4">
                <h2 class="heading m-0">{{ $t("schoolAdmin.schoolInfoDetailResponsible") }}</h2>
              </b-col>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="schoolInfoEdit.owner_name"
                    :label="$t('schoolAdmin.ownerName')"
                    :name="$t('schoolAdmin.ownerName')"
                    :placeholder="$t('schoolAdmin.ownerName')"
                    :rules="'required|max:100'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="schoolInfoEdit.owner_phone"
                    :label="$t('schoolAdmin.ownerPhone')"
                    :name="$t('schoolAdmin.ownerPhone')"
                    :placeholder="$t('schoolAdmin.ownerPhone')"
                    :rules="'required|max:100'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="schoolInfoEdit.owner_role"
                    :label="$t('schoolAdmin.ownerRole')"
                    :name="$t('schoolAdmin.ownerRole')"
                    :placeholder="$t('schoolAdmin.ownerRole')"
                    :rules="'required|max:100'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="12" class="mb-4">
                <h2 class="heading m-0">{{ $t("schoolAdmin.ResponsibleAddress") }}</h2>
              </b-col>
              <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <TextField
                    :label="$t('schoolAdmin.address')"
                    :name="$t('schoolAdmin.address')"
                    :placeholder="$t('schoolAdmin.address')"
                    :rules="'required|min:3|max:250'"
                    v-model="schoolInfoEdit.address"
                  />
                </div>
              </b-col>
              <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <TextAreaField
                    :label="$t('schoolAdmin.notes')"
                    :name="$t('schoolAdmin.notes')"
                    :placeholder="$t('schoolAdmin.notes')"
                    :rules="'required|min:3|max:250'"
                    v-model="schoolInfoEdit.notes"
                  />
                </div>
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
                  :disabled="invalid || checkSchoolLogoUpdate"
                  custom-class="submit-btn"
                >
                  {{ $t("GLOBAL_EDIT") }}
                </Button>
              </div>
            </b-row>
          </form>
        </validation-observer>
      </div>
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
  </div>
</template>
<script>
import {getSchoolInfoRequest} from "@/api/school-info";
import TextField from "@/components/Shared/TextField/index.vue";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import {getAllMusicStatusRequest} from "@/api/system";
import PreviewMedia from "@/components/Shared/PreviewMedia/PreviewMedia.vue";
import UploadAttachment from "@/components/Shared/UploadAttachment/index.vue";
import GeneralModal from "@/components/Shared/GeneralModal/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import TextAreaField from "@/components/Shared/TextAreaField/index.vue";
import axios from "axios";
import VueCookies from "vue-cookies";

export default {
  name: "index",
  components: {
    TextAreaField,
    Button, GeneralModal, UploadAttachment, PreviewMedia, SelectSearch, TextField
  },
  data() {
    return {
      schoolInfoEdit: {
        name: "",
        country_id: "",
        management_type_id: "",
        school_group_id: "",
        certificate_id: "",
        teaching_language_id: "",
        students_type_id: "",
        phone: "",
        music_status_id: "",
        status_id: "",
        logo: "",
        logo_name: "",
        logo_size: "",
        logoChanged: false,
        logoChangedRequest: false,
        owner_name: "",
        owner_role: "",
        address: "",
      },
      url: null,
      mediaType: null,
      countries: [],
      managementTypes: [],
      schoolGroups: [],
      certificate: [],
      teachingLanguage: [],
      studentsType: [],
      musicStatus: [],
      schoolStatus: [],
      loading:false,
    }
  },
  computed:{
    checkSchoolLogoUpdate() {
      if (this.schoolInfoEdit.logoChanged === true) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    setImageId(id) {
      this.schoolInfoEdit.logo = id;
      this.schoolInfoEdit.logoChanged = false;
      this.schoolInfoEdit.logoChangedRequest = true;
    },
    handleCancel() {
      this.$router.push("/dashboard/school-info");
    },
    hideModal() {
      this.$bvModal.hide('holdContent')
    },
    removeFile(fileName, fileChange, fileRequest) {
      this.schoolInfoEdit[fileName] = null
      this.schoolInfoEdit[fileChange] = true
      this.schoolInfoEdit[fileRequest] = true
    },
    showModal(schoolInfoEdit, $event, fileUrl = '') {
      this.$bvModal.show('holdContent')
      this.mediaType = $event
      if (this.mediaType === 'audio') {
        this.url = schoolInfoEdit.audio
      } else {
        this.url = fileUrl
      }
    },
    getAllMusicStatus() {
      this.ApiService(getAllMusicStatusRequest()).then((response) => {
        this.musicStatus = response.data.data
      })
    },
    getSchoolInfo() {
      this.ApiService(getSchoolInfoRequest()).then((response) => {
        this.schoolInfoEdit.name = response.data.data.name
        this.schoolInfoEdit.country_id = response.data.data.country.id
        this.schoolInfoEdit.management_type_id = response.data.data.management_type.id
        this.schoolInfoEdit.school_group_id = response.data.data.school_group.id
        this.schoolInfoEdit.certificate_id = response.data.data.certificate.id
        this.schoolInfoEdit.teaching_language_id = response.data.data.teaching_language.id
        this.schoolInfoEdit.students_type_id = response.data.data.students_type.id
        this.schoolInfoEdit.phone = response.data.data.phone
        this.schoolInfoEdit.music_status_id = response.data.data.music_status.id
        this.schoolInfoEdit.status_id = response.data.data.status.id
        this.schoolInfoEdit.logo = response.data.data.logo
        this.schoolInfoEdit.logo_name = response.data.data.logo_name
        this.schoolInfoEdit.logo_size = response.data.data.logo_size
        this.schoolInfoEdit.owner_name = response.data.data.owner_name
        this.schoolInfoEdit.owner_phone = response.data.data.owner_phone
        this.schoolInfoEdit.owner_role = response.data.data.owner_role
        this.schoolInfoEdit.address = response.data.data.address
        this.schoolInfoEdit.notes = response.data.data.notes
        this.countries.push(response.data.data.country)
        this.managementTypes.push(response.data.data.management_type)
        this.schoolGroups.push(response.data.data.school_group)
        this.certificate.push(response.data.data.certificate)
        this.teachingLanguage.push(response.data.data.teaching_language)
        this.studentsType.push(response.data.data.students_type)
        this.schoolStatus.push(response.data.data.status)
      })
    },
    onSubmit() {
      const formData = new FormData()
      formData.append('music_status', this.schoolInfoEdit.music_status_id);
      formData.append('owner_name', this.schoolInfoEdit.owner_name);
      formData.append('owner_role', this.schoolInfoEdit.owner_role);
      formData.append('owner_phone', this.schoolInfoEdit.owner_phone);
      formData.append('notes', this.schoolInfoEdit.notes);
      formData.append('address', this.schoolInfoEdit.address);
      formData.append('phone', this.schoolInfoEdit.phone);
      formData.append('_method', 'PUT');
      if (this.schoolInfoEdit.logoChangedRequest) {
        formData.append('logo', this.schoolInfoEdit.logo);
      }
      this.loading = true;
      axios.post(`school-admin/school/update`, formData, {
        headers: {
          Authorization: `Bearer ${VueCookies.get("token")}`,
          locale: 'ar',
          'Content-Type': 'multipart/form-data',
          'Accept': '*/*'
        }
      }).then((response) => {
        this.showModal = true
        this.loading = false
        setTimeout(() => {
          this.showModal = false
        }, 3000)
      }).then(() => {
        this.$router.push("/dashboard/school-info");
      }).catch(err => {
        this.loading = false;
      })
    }
  },
  mounted() {
    this.getSchoolInfo()
    this.getAllMusicStatus()
  }
}
</script>
<style scoped lang="scss">
@import "index";
</style>
