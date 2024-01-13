<template>
  <div class="container-fluid custom-container">
    <div class="add-edit-learning-skill">
      <div class="add-edit-term-form">
        <h3>{{ $route.params.id ? "تعديل المجموعة" : "اضافة مجموعة جديدة" }}</h3>
        <validation-observer v-slot="{ invalid }" ref="addEditSeasonalMissionGroup">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="4" md="6" cols="12" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="name"
                    label="اسم المجموعة"
                    name="اضافة مجموعة"
                    placeholder="أدخل اسم المجموعة"
                    :rules="'required|min:3|max:100'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="12" cols="12" class="mb-3 mt-4">
                <UploadAttachment
                  :label="$t('PAPER_WORK.color')"
                  v-if="isLogoDeleted || !$route.params.id"
                  @setFileId="setLogoId"
                  :type-of-attachment="'image'"
                  :accept-files="'image/*'"
                />
                <PreviewMedia
                  v-else
                  :header="'لوجو المجموعة'"
                  :typeOfMedia="'image'"
                  :show-remove-button="true"
                  :mediaName="fileName"
                  :fileSize="logoSize"
                  :imageUrl="url"
                  @removeFile="removeFile"
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
                  :disabled="invalid || !logoId"
                  custom-class="submit-btn"
                >
                  {{ $route.params.id ? $t("GLOBAL_EDIT") : $t("GLOBAL_SAVE") }}
                </Button>
              </div>
            </b-row>
          </form>
        </validation-observer>
      </div>
      <GeneralModal :id="'holdContent'" :size="'lg'" :hide-header="true">
        <template #modalBody>
          <div class="text-center">
            <div class="height-modal">
              <img :src="url" class="image-modal" />
            </div>
            <Button @click="hideModal" :custom-class="'rounded-btn transparent-btn'">
              {{ $t("BACK") }}
            </Button>
          </div>
        </template>
      </GeneralModal>
    </div>
  </div>
</template>
<script>
import TextField from "@/components/Shared/TextField/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import { getSeasonalMissionGroupByIdRequest } from "@/api/seasonal-mission-group";
import UploadAttachment from "@/components/Shared/UploadAttachment";
import PreviewMedia from "@/components/Shared/PreviewMedia/PreviewMedia.vue";
import GeneralModal from "@/components/Shared/GeneralModal/index.vue";
export default {
  components: {
    Modal,
    TextField,
    Button,
    SelectSearch,
    UploadAttachment,
    PreviewMedia,
    GeneralModal,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      name: "",
      fileName: "",
      url: "",
      logoSize: "",
      logoId: "",
      isLogoDeleted: false,
    };
  },
  methods: {
    onSubmit() {
      this.$refs.addEditSeasonalMissionGroup.validate().then((success) => {
        if (!success) return;
      });
      if (this.$route.params.id) {
        this.$emit("handleEditSeasonalMissionGroup", { name: this.name, logo: this.logoId });
      } else {
        this.$emit("handleAddSeasonalMissionGroup", { name: this.name, logo: this.logoId });
      }
    },
    setLogoId(event) {
      this.logoId = event;
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getSeasonalMissionGroup() {
      if (this.$route.params.id) {
        this.ApiService(getSeasonalMissionGroupByIdRequest(this.$route.params.id)).then(
          (response) => {
            this.name = response.data.data.name;
            this.logoId = response.data.data.logo_uuid;
            this.fileName = response.data.data.logo_name;
            this.url = response.data.data.logo;
            this.logoSize = response.data.data.logo_size;
          }
        );
      }
    },
    removeFile() {
      this.isLogoDeleted = true;
      this.logoId = "";
      this.fileName = "";
      this.url = "";
      this.logoSize = "";
    },
  },

  mounted() {
    this.getSeasonalMissionGroup();
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
