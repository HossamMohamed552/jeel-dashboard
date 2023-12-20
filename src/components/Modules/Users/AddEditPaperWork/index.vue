<template>
  <div class="add-edit-group">
    <div class="container-fluid custom-container">
      <div class="add-edit-group-form">
        <h3>
          {{ $route.params.id ? $t("PAPER_WORK.EDIT") : $t("PAPER_WORK.ADD_NEW") }}
        </h3>
        <validation-observer v-slot="{ invalid }" ref="addEditPaperWorkForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="createPaperWork.name"
                    :label="$t('PAPER_WORK.NAME')"
                    :name="$t('PAPER_WORK.NAME')"
                    :rules="'required|min:3|max:100'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <label
                    >{{ $t("PAPER_WORK.AUDIO") }} <span><i class="fa-solid fa-asterisk"></i></span
                  ></label>
                  <ValidationProvider
                    v-slot="{ errors }"
                    :rules="'required|audio'"
                    name="PAPER_WORKAudio"
                  >
                    <b-form-file
                      accept="audio/*"
                      :placeholder="createPaperWork.audio ? createPaperWork.audio : 'اختر ملف'"
                      v-model="createPaperWork.audio"
                      name="audio"
                    >
                    </b-form-file>
                    <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">
                      {{ error }}
                    </b-form-invalid-feedback>
                  </ValidationProvider>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3 mt-4">
                <div class="hold-field">
                  <SelectField
                    :label="$t('PAPER_WORK.type')"
                    class="type custom-form-group"
                    :rules="'required'"
                    v-model="createPaperWork.type"
                    name="type"
                    :options="paperWorkTypes"
                  ></SelectField>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3 mt-1">
                <div class="hold-field">
                  <TextField
                    v-model="createPaperWork.paper_work_final_degree"
                    :label="$t('PAPER_WORK.paper_work_final_degree')"
                    :name="$t('PAPER_WORK.paper_work_final_degree')"
                    :rules="'required|numeric'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <span class="custom-label"
                    >{{ $t("PAPER_WORK.print") }}
                    <span v-if="!$route.params.id"><i class="fa-solid fa-asterisk"></i></span
                  ></span>
                  <ImageUploader
                    :is-required="true"
                    :name="`${$t('PAPER_WORK.fileImgWithOutColor')}`"
                    :text="$t('PAPER_WORK.fileImgWithOutColor')"
                    :item-image="image.fileWithoutColor"
                    :value="createPaperWork.paper_work_without_color"
                    @input="logEvent($event)"
                    @imageUpload="
                      handleUploadImage($event, 'fileWithoutColor', 'paper_work_without_color')
                    "
                    @deleteImage="deleteImage('fileWithoutColor', 'paper_work_without_color')"
                    @change="checkEditPaperWork"
                  />
                </div>
              </b-col>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <span class="custom-label"
                    ><span v-if="!$route.params.id"><i class="fa-solid fa-asterisk"></i></span
                    >{{ $t("PAPER_WORK.color") }}</span
                  >
                  <ImageUploader
                    :is-required="true"
                    :name="`${$t('PAPER_WORK.file')}`"
                    :text="$t('PAPER_WORK.file')"
                    :item-image="image.fileImg"
                    v-model="createPaperWork.file"
                    @imageUpload="handleUploadImage($event, 'fileImg', 'file')"
                    @deleteImage="deleteImage('fileImg', 'file')"
                    @change="checkEditPaperWorkColor"
                  />
                </div>
              </b-col>
              <b-col lg="4" class="mb-3 mt-3">
                <div class="hold-field">
                  <ValidationProvider v-slot="{ errors, invalid }" rules="required">
                    <label
                      >{{ $t("PAPER_WORK.learning_path") }}
                      <span><i class="fa-solid fa-asterisk"></i></span
                    ></label>
                    <b-form-group
                      v-slot="{ ariaDescribedby }"
                      class="learning_path custom-form-group"
                    >
                      <SelectField
                        :rules="'required'"
                        v-model="createPaperWork.learning_path_id"
                        name="learning_path"
                        :options="paths"
                      >
                      </SelectField>
                    </b-form-group>
                  </ValidationProvider>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3 mt-3">
                <div class="hold-field">
                  <ValidationProvider v-slot="{ errors, invalid }" rules="required">
                    <label
                      >{{ $t("PAPER_WORK.level") }} <span><i class="fa-solid fa-asterisk"></i></span
                    ></label>
                    <b-form-group v-slot="{ ariaDescribedby }" class="level custom-form-group">
                      <SelectField
                        :rules="'required'"
                        v-model="createPaperWork.level_id"
                        name="level"
                        :options="levels"
                        @change="getTerms"
                      >
                      </SelectField>
                    </b-form-group>
                  </ValidationProvider>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3 mt-3">
                <div class="hold-field">
                  <ValidationProvider v-slot="{ errors, invalid }" rules="required">
                    <label
                      >{{ $t("MISSIONS.terms") }} <span><i class="fa-solid fa-asterisk"></i></span
                    ></label>
                    <b-form-group v-slot="{ ariaDescribedby }" class="level custom-form-group">
                      <SelectField
                        :rules="'required'"
                        v-model="createPaperWork.term_id"
                        name="term"
                        :options="terms"
                        :disabled="!createPaperWork.level_id"
                      >
                      </SelectField>
                    </b-form-group>
                  </ValidationProvider>
                </div>
              </b-col>
              <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <TextAreaField
                    :label="$t('PAPER_WORK.Description')"
                    v-model="createPaperWork.description"
                    :rules="'required|min:5|max:250'"
                    rows="5"
                    :name="$t('PAPER_WORK.Description')"
                  >
                  </TextAreaField>
                </div>
              </b-col>
              <b-col lg="12" class="mb-3">
                <div class="hold-field mt-4">
                  <ImageUploader
                    v-model="createPaperWork.thumbnail"
                    :is-required="true"
                    :name="`${$t('PAPER_WORK.paperWorkThumbnail')}`"
                    :text="$t('PAPER_WORK.paperWorkThumbnail')"
                    :item-image="image.img_url"
                    @imageUpload="handleUploadImage($event, 'img_url', 'thumbnail')"
                    @deleteImage="deleteImage('img_url', 'thumbnail')"
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
                  :disabled="invalid"
                  custom-class="submit-btn"
                >
                  {{ $route.params.id ? $t("GLOBAL_EDIT") : $t("GLOBAL_SAVE") }}
                </Button>
              </div>
            </b-row>
          </form>
        </validation-observer>
      </div>
    </div>
  </div>
</template>
<script>
import TextField from "@/components/Shared/TextField/index.vue";
import TextAreaField from "@/components/Shared/TextAreaField/index.vue";
import SelectField from "@/components/Shared/SelectField/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import { getSinglePaperworkRequest } from "@/api/paperWork";
import { getAllLearningPathsRequest } from "@/api/learningPath";
import { getAllLevelsRequest } from "@/api/level";
import ImageUploader from "@/components/Shared/ImageUploader/index.vue";
import { getAllTermsRequest } from "@/api/term";
import axios from "axios";
import { decode } from "qs/lib/utils";
import th from "vue2-datepicker/locale/es/th";

export default {
  components: {
    ImageUploader,
    Modal,
    TextField,
    TextAreaField,
    Button,
    SelectField,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      paths: [],
      levels: [],
      terms: [],
      paperWorkTypes: [
        { value: "single", text: "اوراق عمل فردية" },
        { value: "participatory", text: "اوراق عمل تشاركية" },
      ],
      image: {
        fileImg: null,
        fileWithoutColor: null,
        img_url: null,
      },
      createPaperWork: {
        name: "",
        description: "",
        type: "",
        audio: null,
        file: null,
        thumbnail: null,
        paper_work_without_color: null,
        learning_path_id: "",
        level_id: "",
        term_id: "",
        paper_work_final_degree: "",
        uploadPrint: false,
        uploadColor: false,
      },
      base64: {
        file: null,
        thumbnail: null,
        paper_work_without_color: null,
      },
    };
  },
  methods: {
    logEvent($event) {},
    convertToBase64(storeTo, paperWork, image) {
      let imageReplaced = image.replace(
        "https://jeeladmin.suredemos.com/",
        "http://localhost:8080/"
      );
      let extension = imageReplaced.split(".").pop();
      axios
        .get(imageReplaced, { responseType: "arraybuffer" })
        .then((response) => {
          let base64Image = btoa(
            new Uint8Array(response.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          this.base64[paperWork] = `data:${response.headers["content-type"]};base64,${base64Image}`;
        })
        .then(() => {
          this.saveBase64ToFile(storeTo, this.base64[paperWork], `${extension}`);
        })
        .catch((error) => {
          // console.error('Error fetching image:', error);
        });
    },
    saveBase64ToFile(storeTo, base64String, mimeType) {
      const binaryString = decode(`${base64String}`);
      const byteArray = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        byteArray[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([byteArray], { type: mimeType });
      const fileName = "paperWork";
      const file = new File([blob], fileName, { type: `image/${mimeType}` });
      this.createPaperWork[storeTo] = file;
    },
    deleteImage(keyToShow, keyToSend) {
      this.image[keyToShow] = null;
      this.createPaperWork[keyToSend] = null;
    },
    checkEditPaperWork($event) {
      this.createPaperWork.uploadPrint = !!$event;
    },
    checkEditPaperWorkColor($event) {
      this.createPaperWork.uploadColor = !!$event;
    },
    handleUploadImage(e, keyToShow, keyToSend) {
      this.image[keyToShow] = URL.createObjectURL(e.target.files[0]);
      if (e) this.createPaperWork[keyToSend] = e.target.files[0];
      else return;
    },
    onSubmit() {
      // this.$refs.addEditPaperWorkForm.validate().then((success) => {
      //   if (!success) return;
      // });
      if (this.$route.params.id) {
        this.$emit("handleEditPaperWork", this.createPaperWork);
      } else {
        this.$emit("handleAddPaperWork", this.createPaperWork);
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getPaperWorkToEdit() {
      if (this.$route.params.id) {
        this.ApiService(getSinglePaperworkRequest(this.$route.params.id)).then((response) => {
          this.createPaperWork.name = response.data.data.name;
          this.createPaperWork.audio = response.data.data.audio;
          this.createPaperWork.type = response.data.data.type;
          this.createPaperWork.description = response.data.data.description;
          this.convertToBase64("file", "file", response.data.data.paper_work_full_url);
          this.image.fileImg = response.data.data.paper_work_full_url;
          this.convertToBase64(
            "paper_work_without_color",
            "paper_work_without_color",
            response.data.data.paper_work_without_color_full_url
          );
          this.image.fileWithoutColor = response.data.data.paper_work_without_color_full_url;
          this.createPaperWork.learning_path_id = response.data.data.learningPath.id;
          this.createPaperWork.level_id = response.data.data.level.id;
          this.createPaperWork.term_id = response.data.data.term.id;
          this.createPaperWork.paper_work_final_degree = response.data.data.paper_work_final_degree;
          this.convertToBase64("thumbnail", "thumbnail", response.data.data.thumbnail);
          this.image.img_url = response.data.data.thumbnail;
        });
      }
    },
    getAllLearningPaths() {
      this.ApiService(getAllLearningPathsRequest()).then((response) => {
        const pathsArr = response.data.data;
        this.paths = pathsArr.map((path) => {
          return { value: path.id, text: path.name };
        });
      });
    },
    getAllLevels() {
      this.ApiService(getAllLevelsRequest()).then((response) => {
        const levelsArr = response.data.data;
        this.levels = levelsArr.map((path) => {
          return { value: path.id, text: path.name };
        });
      });
    },
    getTerms() {
      const params = {
        level_id: this.createPaperWork.level_id,
      };
      this.ApiService(getAllTermsRequest(params)).then((response) => {
        const termsArr = response.data.data;
        this.terms = termsArr.map((path) => {
          return { value: path.id, text: path.name };
        });
      });
    },
  },
  mounted() {
    this.getPaperWorkToEdit();
    this.getAllLearningPaths();
    this.getAllLevels();
    if (this.$route.params.id) this.getTerms();
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
