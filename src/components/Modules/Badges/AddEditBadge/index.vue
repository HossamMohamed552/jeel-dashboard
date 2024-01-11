<template>
  <div class="add-edit-role">
    <div class="container-fluid custom-container">
      <div class="add-edit-role-form">
        <h3>{{ $route.params.id ? $t("BADGE.EDIT") : $t("BADGE.ADD_NEW") }}</h3>
        <validation-observer v-slot="{ invalid }" ref="addEditBadgeForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="createBadge.name"
                    :label="'اسم الشارة'"
                    :name="$t('BADGE.NAME')"
                    :rules="'required|min:3|max:100'"
                  ></TextField>
                </div>
              </b-col>

              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="createBadge.main_percentage"
                    :label="'نسبة من '"
                    :name="$t('BADGE.main_percentage')"
                    type="number"
                    :rules="'required|numeric|min_value:1'"
                  ></TextField>
                </div>
              </b-col>

              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="createBadge.max_percentage"
                    :label="'نسبة الى '"
                    type="number"
                    :name="$t('BADGE.max_percentage')"
                    :rules="'required|numeric|min_value:1'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="12" class="mb-3 mt-4">
                <UploadAttachment
                  v-if="!$route.params.id || createBadge.thumbnailChangedRequest"
                  :rules="'required'"
                  :label="$t('BADGE.bade_logo')"
                  :type-of-attachment="'image'"
                  :accept-files="'image/*'"
                  @setFileId="setImageId"
                />
                <PreviewMedia
                  v-if="
                    $route.params.id &&
                    createBadge.thumbnailChanged === false &&
                    !createBadge.thumbnailChangedRequest
                  "
                  :header="`${$t('BADGE.bade_logo')}`"
                  :media-name="createBadge.thumbnail_name"
                  :file-size="createBadge.thumbnail_size"
                  :image-url="createBadge.thumbnail"
                  :typeOfMedia="'image'"
                  :show-remove-button="true"
                  @removeFile="
                    removeFile('thumbnail', 'thumbnailChanged', 'thumbnailChangedRequest')
                  "
                  @showModal="showModal(createBadge, $event, createBadge.thumbnail)"
                />
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
            <img :src="createBadge.thumbnail" class="image-modal" />
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
import { getBadgeByIdRequest } from "@/api/badge";
import Modal from "@/components/Shared/Modal/index.vue";
import PreviewMedia from "@/components/Shared/PreviewMedia/PreviewMedia.vue";
import UploadAttachment from "@/components/Shared/UploadAttachment/index.vue";
import GeneralModal from "@/components/Shared/GeneralModal/index.vue";

export default {
  components: {
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
      createBadge: {
        name: "",
        main_percentage: "",
        max_percentage: "",
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
      this.createBadge.thumbnail = id;
      this.createBadge.logo = id;
      this.createBadge.thumbnailChanged = false;
      this.createBadge.thumbnailChangedRequest = true;
    },

    removeFile(fileName, fileChange, fileRequest) {
      this.createBadge[fileName] = null;
      this.createBadge[fileChange] = true;
      this.createBadge[fileRequest] = true;
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
      this.$refs.addEditBadgeForm.validate().then((success) => {
        if (!success) return;
      });
      if (this.$route.params.id) {
        if (this.createBadge.logo != null) {
          this.$emit("handleEditBadge", this.createBadge);
        } else {
          delete this.createBadge.logo;

          this.$emit("handleEditBadge", this.createBadge);
        }
      } else {
        this.$emit("handleAddBadge", this.createBadge);
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },

    getBadgeToEdit() {
      if (this.$route.params.id) {
        this.ApiService(getBadgeByIdRequest(this.$route.params.id)).then((response) => {
          this.createBadge.name = response.data.data.name;
          this.createBadge.max_percentage = response.data.data.max_percentage;
          this.createBadge.main_percentage = response.data.data.main_percentage;
          this.createBadge.logo = response.data.data.logo_uuid;
          this.createBadge.thumbnail_name = response.data.data.logo_name;
          this.createBadge.thumbnail_size = response.data.data.logo_size;
          this.createBadge.thumbnail = response.data.data.logo;
          this.isDefault = this.createBadge.is_default;
        });
      }
    },
  },
  computed: {
    checkLogo() {
      if (this.createBadge.thumbnail === null) {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    this.getBadgeToEdit();
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
