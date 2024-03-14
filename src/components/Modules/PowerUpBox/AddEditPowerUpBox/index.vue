<template>
  <div class="add-edit-role">
    <div class="container-fluid custom-container">
      <div class="add-edit-role-form">
        <h3>{{ $route.params.id ? "تعديل صندوق الطاقة" : "إضافة صندوق الطاقة" }}</h3>
        <validation-observer v-slot="{ invalid }" ref="addEditPowerUpBoxForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="6" class="mt-3">
                <div class="hold-field">
                  <TextField
                      v-model="createPowerUpBox.name"
                      :label="'اسم الصندوق'"
                      :name="'اسم الصندوق'"
                      placeholder="أختر إسم المهمة"
                      :rules="'required|min:3|max:100'"
                  ></TextField>
                </div>
              </b-col>

              <b-col lg="6" class="mt-3">
                <div class="hold-field">
                  <SelectSearch
                      v-model="createPowerUpBox.level_id"
                      :label="'الصف الدراسى'"
                      :name="'أختر الصف الدراسى'"
                      placeholder="أختر الصف الدراسى"
                      :options="levels"
                      :reduce="(option) => option.id"
                      :get-option-label="(option) => option.name"
                  ></SelectSearch>
                </div>
              </b-col>

              <b-col lg="4" class="mt-3">
                <div class="hold-field">
                  <SelectSearch
                      v-model="createPowerUpBox.term_id"
                      :label="'الترم الدراسى'"
                      :name="'أختر التيرم الدراسى'"
                      placeholder="أختر الترم الدراسى"
                      :options="terms"
                      :reduce="(option) => option.id"
                      :get-option-label="(option) => option.name"
                  ></SelectSearch>
                </div>
              </b-col>

              <b-col lg="4" class="mt-3">
                <div class="hold-field">
                  <SelectSearch
                      v-model="createPowerUpBox.country_id"
                      label="الدولة"
                      name="الدولة"
                      placeholder="أختر الدولة"
                      :options="countries"
                      :reduce="(option) => option.id"
                      :get-option-label="(option) => option.name"
                  ></SelectSearch>
                </div>
              </b-col>

              <b-col lg="4" class="mt-3">
                <div class="hold-field">
                  <TextField
                      v-model="createPowerUpBox.appear_after_missions"
                      :label="'ظهور بعد مهمة'"
                      :name="'ظهور بعد مهمة'"
                      placeholder="ادخل رقم المهمه"
                      type="number"
                      min="1"
                      :rules="'required|numeric|min_value:1'"
                  ></TextField>
                </div>
              </b-col>

              <b-col lg="6" class="mb-3 mt-4">
                <UploadAttachment
                  v-if="!$route.params.id || createPowerUpBox.thumbnailChangedRequest"
                  :rules="'required'"
                  :label="'لوجو الملف'"
                  :type-of-attachment="'image'"
                  :accept-files="'image/*'"
                  @setFileId="setImageId"
                />
                <PreviewMedia
                  v-if="
                    $route.params.id &&
                    createPowerUpBox.thumbnailChanged === false &&
                    !createPowerUpBox.thumbnailChangedRequest
                  "
                  :header="`${$t('BADGE.bade_logo')}`"
                  :media-name="createPowerUpBox.thumbnail_name"
                  :file-size="createPowerUpBox.thumbnail_size"
                  :image-url="createPowerUpBox.thumbnail"
                  :typeOfMedia="'image'"
                  :show-remove-button="true"
                  @removeFile="
                    removeFile('thumbnail', 'thumbnailChanged', 'thumbnailChangedRequest')
                  "
                  @showModal="showModal(createPowerUpBox, $event, createPowerUpBox.thumbnail)"
                />
              </b-col>

              <b-col lg="12"></b-col>

              <b-col lg="6">
                <label class="required-flag"> نوع محتوى الصندوق
                </label>
                <b-row>
                    <CheckboxField value="rememberMe" v-model="jeelXpStatus" :name="'نقاط'"></CheckboxField>
                    <CheckboxField value="rememberMe" v-model="jeelCoinsStatus" :name="'عملات جيل'"></CheckboxField>
                </b-row>
              </b-col>
              <b-col lg="12"></b-col>

              <b-col lg="6" class="mt-3">
                <b-row>
                  <b-col lg="6">
                    <div class="hold-field">
                      <TextField
                          v-model="createPowerUpBox.jeel_xp"
                          v-if="jeelXpStatus"
                          :label="'عدد النقاط'"
                          :name="' عدد النقاط'"
                          placeholder="ادخل عدد النقاط"
                          type="number"
                          min="0"
                          :rules="'required|numeric|min_value:0'"
                      ></TextField>
                    </div>
                  </b-col>
                  <b-col lg="6">
                    <div class="hold-field">
                      <TextField
                          v-model="createPowerUpBox.jeel_coins"
                          v-if="jeelCoinsStatus"
                          :label="'عدد عملات جيل'"
                          :name="'عدد عملات جيل'"
                          placeholder=" أدخل عدد عملات جيل"
                          min="0"
                          :rules="'required|numeric|min_value:0'"
                      ></TextField>
                    </div>
                  </b-col>
                </b-row>
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
                      :disabled="invalid || checkLogo || checkType"
                      custom-class="submit-btn"
                    >
                      {{ $t("GLOBAL_SAVE") }}
                    </Button>
                    <Button
                      v-if="$route.params.id"
                      type="submit"
                      :loading="loading"
                      :disabled="invalid || checkLogo || checkType"
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
          <div class="height-modal">
            <img :src="createPowerUpBox.thumbnail" class="image-modal" />
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
import TextField from "@/components/Shared/TextField/index.vue";
import TextAreaField from "@/components/Shared/TextAreaField/index.vue";
import CheckboxField from "@/components/Shared/CheckboxField/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import PreviewMedia from "@/components/Shared/PreviewMedia/PreviewMedia.vue";
import UploadAttachment from "@/components/Shared/UploadAttachment/index.vue";
import GeneralModal from "@/components/Shared/GeneralModal/index.vue";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import {getAllCountryRequest} from "@/api/country";
import {getAllLevelsRequest} from "@/api/level";
import {getAllTermsRequest} from "@/api/term";
import {getPowerUpBoxByIdRequest} from "@/api/power-up-boxes";

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
      countries: [],
      levels: [],
      terms: [],
      jeelCoinsStatus:false,
      jeelXpStatus:false,
      createPowerUpBox: {
        name: "",
        level_id: "",
        term_id: "",
        country_id: "",
        appear_after_missions: "",
        jeel_coins:0,
        jeel_xp:0,

        logo: null,

        //  thumbnail
        thumbnail: null,
        thumbnailChanged: false,
        thumbnailChangedRequest: false,
      },
      finalSelected: [],
      isDefault: 0,
    };
  },
  methods: {
    setImageId(id) {
      this.createPowerUpBox.thumbnail = id;
      this.createPowerUpBox.logo = id;
      this.createPowerUpBox.thumbnailChanged = false;
      this.createPowerUpBox.thumbnailChangedRequest = true;
    },

    removeFile(fileName, fileChange, fileRequest) {
      this.createPowerUpBox[fileName] = null;
      this.createPowerUpBox[fileChange] = true;
      this.createPowerUpBox[fileRequest] = true;
    },
    showModal(paperWork, $event, fileUrl = "") {
      this.$bvModal.show("holdContent");
      this.mediaType = $event;
      if (this.mediaType === "audio") {
        this.url = paperWork.audio;
      } else {
        this.url = fileUrl;
      }
    },
    hideModal() {
      this.$bvModal.hide("holdContent");
    },

    onSubmit() {
      this.$refs.addEditPowerUpBoxForm.validate().then((success) => {
        if (!success) return;
      });
      if (this.$route.params.id) {
        if (this.createPowerUpBox.thumbnailChangedRequest) {
          this.$emit("handleEditBadge", this.createPowerUpBox);
        } else {
          delete this.createPowerUpBox.thumbnail;
          delete this.createPowerUpBox.thumbnailChangedRequest;
          delete this.createPowerUpBox.thumbnail_name;
          delete this.createPowerUpBox.thumbnail_size;
          delete this.createPowerUpBox.thumbnailChanged;
          delete this.createPowerUpBox.logo;
          this.$emit("handleEditBadge", this.createPowerUpBox);
        }
      } else {
        this.$emit("handleAddBadge", this.createPowerUpBox);
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },

    getPowerUpBoxToEdit() {
      if (this.$route.params.id) {
        this.ApiService(getPowerUpBoxByIdRequest(this.$route.params.id)).then((response) => {

          this.createPowerUpBox.name= response.data.data.name;
          this.createPowerUpBox.level_id= response.data.data.level.id;
          this.createPowerUpBox.term_id= response.data.data.term.id;
          this.createPowerUpBox.country_id= response.data.data.country.id;
          this.createPowerUpBox.appear_after_missions= response.data.data.appear_after_missions;
          if (response.data.data.jeel_coins > 0){
            this.jeelCoinsStatus = true;
            this.createPowerUpBox.jeel_coins= response.data.data.jeel_coins;

          }
          if (response.data.data.jeel_xp > 0){
            this.jeelXpStatus = true;
            this.createPowerUpBox.jeel_xp = response.data.data.jeel_xp;

          }
          //
          // logo: null,
          // this.createPowerUpBox.logo = response.data.data.logo_uuid;
          this.createPowerUpBox.thumbnail_name = response.data.data.logo_name;
          this.createPowerUpBox.thumbnail_size = response.data.data.logo_size;
          this.createPowerUpBox.thumbnail = response.data.data.logo;

          this.isDefault = this.createPowerUpBox.is_default;
        });
      }
    },


    getAllCountries() {
      this.ApiService(getAllCountryRequest()).then((response) => {
        this.countries = response.data.data;
      });
    },
    getAllLevels() {
      this.ApiService(getAllLevelsRequest()).then((response) => {
        this.levels = response.data.data;
      });
    },
    getAllTerms() {
      this.ApiService(getAllTermsRequest()).then((response) => {
        this.terms = response.data.data;
      });
    },

  },
  watch:{
    jeelXpStatus(val) {
      if(val == false) {
        this.createPowerUpBox.jeel_xp = 0
      }
    },
    jeelCoinsStatus(val) {
      if(val == false) {
        this.createPowerUpBox.jeel_coins = 0
      }
    },
  },
  computed: {
    checkLogo() {
      if (this.createPowerUpBox.thumbnail === null) {
        return true;
      } else {
        return false;
      }
    },
    checkType() {
      if (this.createPowerUpBox.jeel_xp == 0 && this.createPowerUpBox.jeel_coins == 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    this.getPowerUpBoxToEdit();
    this.getAllCountries();
    this.getAllLevels();
    this.getAllTerms();
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
