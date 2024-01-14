<template>
  <div class="add-edit-role">
    <div class="container-fluid custom-container">
      <div class="add-edit-role-form">
        <h3>{{ $route.params.id ? "تعديل مجموعة جيمز" : "إضافة مجموعة جيمز" }}</h3>
        <validation-observer v-slot="{ invalid }" ref="addEditPowerUpBoxForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <TextField
                      v-model="createJeelStoreGames.name"
                      :label="'اسم المجموعه'"
                      :name="'اسم المجموعه'"
                      placeholder="أختر إسم المجموعه"
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
                      v-model="createJeelStoreGames.level_id"
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
                    v-model="createJeelStoreGames.gems"
                    :label="'عدد الجيمز'"
                    :name="'عدد الجيمز'"
                    placeholder="أختر عدد الجيمز"
                    :rules="'required'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="createJeelStoreGames.jeel_coins"
                    :label="'عدد العملات'"
                    :name="'عدد العملات'"
                    placeholder="أختر عدد العملات"
                    :rules="'required'"
                  ></TextField>
                </div>
              </b-col>

              <b-col lg="12" class="mb-3 mt-4">
                <UploadAttachment
                  v-if="!$route.params.id || createJeelStoreGames.thumbnailChangedRequest"
                  :rules="'required'"
                  :label="'لوجو المجموعه'"
                  :type-of-attachment="'image'"
                  :accept-files="'image/*'"
                  @setFileId="setImageId"
                />
                <PreviewMedia
                  v-if="
                    $route.params.id &&
                    createJeelStoreGames.thumbnailChanged === false &&
                    !createJeelStoreGames.thumbnailChangedRequest
                  "
                  :header="`${$t('BADGE.bade_logo')}`"
                  :media-name="createJeelStoreGames.thumbnail_name"
                  :file-size="createJeelStoreGames.thumbnail_size"
                  :image-url="createJeelStoreGames.thumbnail"
                  :typeOfMedia="'image'"
                  :show-remove-button="true"
                  @removeFile="
                    removeFile('thumbnail', 'thumbnailChanged', 'thumbnailChangedRequest')
                  "
                  @showModal="showModal(createJeelStoreGames, $event, createJeelStoreGames.thumbnail)"
                />
              </b-col>

              <b-col lg="12" class="mb-3" >
                <div class="hold-field">
                  <TextAreaField
                    :label="'اكتب ملحوظة'"
                    :rules="'required|min:3|max:250'"
                    v-model="createJeelStoreGames.description"
                  />

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
          <div class="height-modal">
            <img :src="createJeelStoreGames.thumbnail" class="image-modal" />
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
import {getAllLevelsRequest} from "@/api/level";
import {getAllTermsRequest} from "@/api/term";
import {getJeelStoreGamesByIdRequest} from "@/api/jeel-store-games";

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
      terms: [],
      jeelCoinsStatus:false,
      jeelXpStatus:false,
      createJeelStoreGames: {
        name: "",
        level_id: "",
        gems: 0,
        jeel_coins: 0,
        description: "",
        logo: null,

        //  thumbnail
        thumbnail: null,
        thumbnailChanged: false,
        thumbnailChangedRequest: false,
      },
      finalSelected: [],
    };
  },
  methods: {
    setImageId(id) {
      this.createJeelStoreGames.thumbnail = id;
      this.createJeelStoreGames.logo = id;
      this.createJeelStoreGames.thumbnailChanged = false;
      this.createJeelStoreGames.thumbnailChangedRequest = true;
    },

    removeFile(fileName, fileChange, fileRequest) {
      this.createJeelStoreGames[fileName] = null;
      this.createJeelStoreGames[fileChange] = true;
      this.createJeelStoreGames[fileRequest] = true;
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
        if (this.createJeelStoreGames.logo != null) {
          this.$emit("handleEditJeelStoreGames", this.createJeelStoreGames);
        } else {
          delete this.createJeelStoreGames.logo;

          this.$emit("handleEditJeelStoreGames", this.createJeelStoreGames);
        }
      } else {
        this.$emit("handleAddJeelStoreGames", this.createJeelStoreGames);
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },

    getPowerUpBoxToEdit() {
      if (this.$route.params.id) {
        this.ApiService(getJeelStoreGamesByIdRequest(this.$route.params.id)).then((response) => {

          this.createJeelStoreGames.name= response.data.data.name;
          this.createJeelStoreGames.level_id= response.data.data.level.id;
          this.createJeelStoreGames.gems= response.data.data.gems;
          this.createJeelStoreGames.jeel_coins= response.data.data.jeel_coins;
          this.createJeelStoreGames.description= response.data.data.description;

          // logo: null,
          // this.createJeelStoreGames.logo = response.data.data.logo_uuid;
          this.createJeelStoreGames.thumbnail_name = response.data.data.logo_name;
          this.createJeelStoreGames.thumbnail_size = response.data.data.logo_size;
          this.createJeelStoreGames.thumbnail = response.data.data.logo;
        });
      }
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
  computed: {
    checkLogo() {
      if (this.createJeelStoreGames.thumbnail === null) {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    this.getPowerUpBoxToEdit();
    this.getAllLevels();
    this.getAllTerms();
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
