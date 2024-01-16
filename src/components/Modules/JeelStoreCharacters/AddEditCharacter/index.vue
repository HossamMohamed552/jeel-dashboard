<template>
  <div class="add-edit-character">
    <div class="container-fluid custom-container">
      <div class="add-edit-character-form">
        <h3>{{ $route.params.id ? $t("CHARACTER.EDIT") : $t("CHARACTER.ADD_NEW") }}</h3>
        <validation-observer v-slot="{ invalid }" ref="addEditCharacterForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="createCharacter.name"
                    :label="$t('CHARACTER.name')"
                    :name="$t('CHARACTER.name')"
                    placeholder="أدخل اسم الشخصية"
                    :rules="'required|min:3'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="4" class="mt-3">
                <div class="hold-field" v-if="countries">
                  <SelectSearch
                    v-model="createCharacter.country_id"
                    :label="$t('CHARACTER.country')"
                    :name="$t('CHARACTER.country')"
                    placeholder="اختر الدولة"
                    :options="countries"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="4" class="mt-3">
                <div class="hold-field" v-if="characters">
                  <SelectSearch
                    v-model="characterSelected"
                    :label="$t('CHARACTER.type')"
                    :name="$t('CHARACTER.type')"
                    placeholder="اختر نوع الشخصية"
                    :options="characters"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.key"
                    :rules="'required'"
                  ></SelectSearch>
                </div>
              </b-col>

              <b-col lg="4" class="mt-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="createCharacter.level_id"
                    :label="'الصف الدراسى'"
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
                    type="number"
                    v-model="createCharacter.gems"
                    :label="'عدد الجيمز'"
                    :name="'عدد الجيمز'"
                    placeholder="أدخل عدد الجيمز"
                    :rules="'required'"
                  ></TextField>
                </div>
              </b-col>

              <b-col lg="12" class="mb-3 mt-4">
                <UploadAttachment
                  v-if="!$route.params.id || createCharacter.thumbnailChangedRequest"
                  :rules="'required'"
                  :label="$t('CHARACTER.character_logo')"
                  :type-of-attachment="'image'"
                  :accept-files="'image/*'"
                  @setFileId="setImageId"
                />
                <PreviewMedia
                  v-if="
                    $route.params.id &&
                    createCharacter.thumbnailChanged === false &&
                    !createCharacter.thumbnailChangedRequest
                  "
                  :header="`${$t('CHARACTER.character_logo')}`"
                  :media-name="createCharacter.thumbnail_name"
                  :file-size="createCharacter.thumbnail_size"
                  :image-url="createCharacter.thumbnail"
                  :typeOfMedia="'image'"
                  :show-remove-button="true"
                  @removeFile="
                    removeFile('thumbnail', 'thumbnailChanged', 'thumbnailChangedRequest')
                  "
                  @showModal="
                    showModal(createCharacter, $event, createCharacter.thumbnail)
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
          </form>
        </validation-observer>
      </div>
    </div>

    <GeneralModal :id="'holdContent'" :size="'lg'" :hide-header="true">
      <template #modalBody>
        <div class="text-center">
          <div class="height-modal">
            <img :src="createCharacter.thumbnail" class="image-modal" />
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
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import TextAreaField from "@/components/Shared/TextAreaField/index.vue";
import CheckboxField from "@/components/Shared/CheckboxField/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import { getCharacterByIdRequest } from "@/api/jeel-store-character";
import { getAllCountryRequest } from "@/api/country";
import Modal from "@/components/Shared/Modal/index.vue";
import PreviewMedia from "@/components/Shared/PreviewMedia/PreviewMedia.vue";
import UploadAttachment from "@/components/Shared/UploadAttachment/index.vue";
import GeneralModal from "@/components/Shared/GeneralModal/index.vue";
import {getAllLevelsRequest} from "@/api/level";
import {getStoreCharacterTypeRequest} from "@/api/system";

export default {
  components: {
    GeneralModal,
    UploadAttachment,
    PreviewMedia,
    Modal,
    SelectSearch,
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
      characters: [
      ],
      levels: [],
      createCharacter: {
        name: "",
        country_id: "",
        image: null,
        level_id: "",
        gems: "",
        character_type: [],
        //  thumbnail
        thumbnail: null,
        thumbnailChanged: false,
        thumbnailChangedRequest: false,
      },
      characterSelected: null,
    };
  },
  methods: {
    setImageId(id) {
      this.createCharacter.thumbnail = id;
      this.createCharacter.image = id;
      this.createCharacter.thumbnailChanged = false;
      this.createCharacter.thumbnailChangedRequest = true;
    },

    removeFile(fileName, fileChange, fileRequest) {
      this.createCharacter[fileName] = null;
      this.createCharacter[fileChange] = true;
      this.createCharacter[fileRequest] = true;
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
      this.$refs.addEditCharacterForm.validate().then((success) => {
        if (!success) return;
      });
      if (this.$route.params.id) {

        if (this.createCharacter.image != null) {
          this.$emit("handleEditStoreCharacter", this.createCharacter);
        } else {
          delete this.createCharacter.image;

          this.$emit("handleEditStoreCharacter", this.createCharacter);
        }
      } else {
        this.$emit("handleAddStoreCharacter", this.createCharacter);
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },

    getCharacterToEdit() {
      if (this.$route.params.id) {
        this.ApiService(getCharacterByIdRequest(this.$route.params.id)).then(
          (response) => {
            console.log(response.data.data);
            this.createCharacter.name = response.data.data.name;
            this.createCharacter.country_id = response.data.data.country.id;
            this.createCharacter.gems = response.data.data.gems;
            this.createCharacter.level_id = response.data.data.level.id;

            this.characterSelected = response.data.data.type;
            this.createCharacter.thumbnail_name = response.data.data.image_name;
            this.createCharacter.thumbnail_size = response.data.data.image_size;
            this.createCharacter.thumbnail = response.data.data.image;
          }
        );
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
    getCharcterType() {
      this.ApiService(getStoreCharacterTypeRequest()).then((response) => {
        this.characters = response.data.data;
      });
    },
  },
  computed: {
    checkLogo() {
      if (this.createCharacter.thumbnail === null ) {
        return true
      } else {
        return false
      }
    },
  },
  watch: {
    characterSelected(val) {
      this.createCharacter.character_type = []
      if(isNaN(val)){
        this.createCharacter.character_type.push(val[0].id)
      }else{
        this.createCharacter.character_type.push(val)
      }
    },
  },
  mounted() {
    this.getCharacterToEdit();
    this.getAllCountries();
    this.getAllLevels();
    this.getCharcterType();
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
