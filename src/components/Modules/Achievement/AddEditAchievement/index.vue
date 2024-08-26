<template>
  <div class="add-edit-country">
    <div class="container-fluid custom-container">
      <div class="add-edit-country-form">
        <h3>
          {{ achievementId ? $t("achievements.EDIT") : $t("achievements.ADD") }}
        </h3>
        <validation-observer v-slot="{ invalid }" ref="addEditAchievementForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="achievement.name"
                    :label="$t('achievements.title')"
                    :name="$t('achievements.title')"
                    :placeholder="$t('achievements.title_PLACEHOLDER')"
                    :rules="'required|max:100'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="8" class="mb-3">
                <UploadAttachment
                  v-if="!$route.params.id || achievement.titleAudioChangedRequest"
                  :type-of-attachment="'audio'"
                  :dropIdRef="'audioFile'"
                  :accept-files="'audio/*'"
                  :label="$t('achievements.titleAudio')"
                  :name="$t('achievements.titleAudio')"
                  :rules="'required'"
                  @setFileId="setTitleAudioFileId($event)"
                />
                <PreviewMedia
                  v-if="$route.params.id && achievement.titleAudioChanged === false && !achievement.titleAudioChangedRequest"
                  :header="`${$t('achievements.titleAudio')}`"
                  :media-name="achievement.audio_name"
                  :file-size="achievement.audio_size"
                  :typeOfMedia="'audio'"
                  :show-remove-button="true"
                  @removeFile="removeFile('audio_name','titleAudioChanged','titleAudioChangedRequest')"
                  @showModal="showModal(achievement.audio_name,$event)"/>
              </b-col>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="achievement.description"
                    :label="$t('achievements.description')"
                    :name="$t('achievements.description')"
                    :placeholder="$t('achievements.description_PLACEHOLDER')"
                    :rules="'required|max:100'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="8" class="mb-3">
                <UploadAttachment
                  v-if="!$route.params.id || achievement.descriptionAudioChangedRequest"
                  :type-of-attachment="'audio'"
                  :dropIdRef="'audioFile2'"
                  :accept-files="'audio/*'"
                  :label="$t('achievements.descriptionAudio')"
                  :name="$t('achievements.descriptionAudio')"
                  :rules="'required'"
                  @setFileId="setDescriptionAudioFileId($event)"
                />
                <PreviewMedia
                  v-if="$route.params.id && achievement.descriptionAudioChanged === false && !achievement.descriptionAudioChangedRequest"
                  :header="`${$t('achievements.titleAudio')}`"
                  :media-name="achievement.description_audio_name"
                  :file-size="achievement.description_audio_size"
                  :typeOfMedia="'audio'"
                  :show-remove-button="true"
                  @removeFile="removeFile('description_audio','descriptionAudioChanged','descriptionAudioChangedRequest')"
                  @showModal="showModal(achievement.description_audio,$event)"/>
              </b-col>
              <b-col lg="6" class="mb-3">
                <SelectSearch
                  v-model="achievement.interactionType"
                  :label="$t('achievements.interactionType')"
                  :name="$t('achievements.interactionType')"
                  :placeholder="$t('achievements.select') + $t('achievements.interactionType')"
                  :options="typeOfAchievements"
                  :get-option-label="(option) => option.name"
                  :deselectFromDropdown="true"
                ></SelectSearch>
              </b-col>
              <b-col lg="6" class="mb-3">
                <TextField
                  v-if="achievement.interactionType.key === 'daily_entry'"
                  v-model="achievement.interaction_number"
                  :label="$t('achievements.numberOfDailyEntry')"
                  :name="$t('achievements.numberOfDailyEntry')"
                  :placeholder="$t('achievements.numberOfDailyEntry_PLACEHOLDER')"
                  :rules="'required|numeric'"
                ></TextField>
                <TextField
                  v-else-if="achievement.interactionType.key === 'mission'"
                  v-model="achievement.interaction_number"
                  :label="$t('achievements.numberOfMission')"
                  :name="$t('achievements.numberOfMission')"
                  :placeholder="$t('achievements.numberOfMission_PLACEHOLDER')"
                  :rules="'required|numeric'"
                ></TextField>
                <TextField
                  v-else-if="achievement.interactionType.key === 'seasonal_mission'"
                  v-model="achievement.interaction_number"
                  :label="$t('achievements.numberOfSeasonalMission')"
                  :name="$t('achievements.numberOfSeasonalMission')"
                  :placeholder="$t('achievements.numberOfSeasonalMission_PLACEHOLDER')"
                  :rules="'required|numeric'"
                ></TextField>
                <TextField
                  v-else-if="achievement.interactionType.key === 'competitions'"
                  v-model="achievement.interaction_number"
                  :label="$t('achievements.numberOfCompetitions')"
                  :name="$t('achievements.numberOfCompetitions')"
                  :placeholder="$t('achievements.numberOfCompetitions_PLACEHOLDER')"
                  :rules="'required|numeric'"
                ></TextField>
                <TextField
                  v-else-if="achievement.interactionType.key === 'leaderboard'"
                  v-model="achievement.interaction_number"
                  :label="$t('achievements.numberOfLeaderboard')"
                  :name="$t('achievements.numberOfLeaderboard')"
                  :placeholder="$t('achievements.numberOfLeaderboard_PLACEHOLDER')"
                  :rules="'required|numeric'"
                ></TextField>
              </b-col>
              <b-col lg="6" class="mb-3">
                <ValidationProvider v-slot="{ errors, invalid }" rules="required">
                  <label class="d-block">
                    {{ $t("achievements.startDate") }}
                  </label>
                  <date-picker
                    class="w-100"
                    :disabled-date="disabledBeforeToday"
                    :placeholder="$t('achievements.startDate')"
                    :lang="en"
                    :default-value="new Date()"
                    v-model="achievement.start_date"
                    @change="showDate = false;achievement.end_date=''"
                    valueType="format"
                  ></date-picker>
                  <p class="show-date" v-if="showDate">{{ achievement.start_date }}</p>
                </ValidationProvider>
              </b-col>
              <b-col lg="6" class="mb-3">
                <ValidationProvider v-slot="{ errors, invalid }" rules="required">
                  <label class="d-block">
                    {{ $t("achievements.endDate") }}
                  </label>
                  <date-picker
                    class="w-100"
                    :disabled-date="disabledAfterAndStart"
                    :placeholder="$t('achievements.endDate')"
                    :lang="en"
                    :default-value="new Date()"
                    v-model="achievement.end_date"
                    @change="showEndDate = false"
                    valueType="format"
                  ></date-picker>
                  <p class="show-date" v-if="showEndDate">{{ achievement.end_date }}</p>
                </ValidationProvider>
              </b-col>
              <b-col lg="6" class="my-3">
                <CheckboxField v-if="achievement.interactionType.key === 'daily_entry'" value="isRepeat" :name="$t('achievements.isRepeat')"
                               v-model="achievement.isRepeat"></CheckboxField>
                <TextField
                  class="my-3"
                  v-if="achievement.isRepeat"
                  v-model="achievement.repetitions_number"
                  :label="$t('achievements.repetitions_number')"
                  :name="$t('achievements.repetitions_number')"
                  :placeholder="$t('achievements.repetitions_number_PLACEHOLDER')"
                  :rules="'required|numeric|min_value:1'"
                ></TextField>
              </b-col>
              <b-col lg="6" class="my-3">
                <TextField
                  v-model="achievement.jeel_gems"
                  :label="$t('achievements.jeel_gems')"
                  :name="$t('achievements.jeel_gems')"
                  :placeholder="$t('achievements.jeel_gems_PLACEHOLDER')"
                  :rules="'required|numeric'"
                ></TextField>
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
                  :disabled="invalid || checkAchievementInputs"
                  custom-class="submit-btn"
                >
                  {{ $t("GLOBAL_SAVE") }}
                </Button>
                <Button
                  v-if="$route.params.id"
                  type="submit"
                  :loading="loading"
                  :disabled="invalid || checkAchievementInputsUpdate"
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
            <audio :src="url" ref="player" autoplay="autoplay" controls="controls"></audio>
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
import Button from "@/components/Shared/Button/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import UploadAttachment from "@/components/Shared/UploadAttachment/index.vue";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/locale/en";
import "vue2-datepicker/index.css";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import CheckboxField from "@/components/Shared/CheckboxField/index.vue";
import {getAchievementByIdRequest, getInteractionTypesRequest} from "@/api/achievement";
import ApiService from "@/api/ApiService";
import PreviewMedia from "@/components/Shared/PreviewMedia/PreviewMedia.vue";
import GeneralModal from "@/components/Shared/GeneralModal/index.vue";

export default {
  components: {
    GeneralModal,
    PreviewMedia,
    CheckboxField,
    SelectSearch,
    UploadAttachment,
    Modal,
    TextField,
    Button,
    DatePicker
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed:{
    checkAchievementInputs() {
      return this.achievement.name_audio === null || this.achievement.description_audio === null;
    },
    checkAchievementInputsUpdate() {
      return this.achievement.titleAudioChanged === true || this.achievement.descriptionAudioChanged === true;
    }
  },
  data() {
    return {
      en: "en",
      achievement: {
        name: "",
        description: "",
        name_audio: null,
        description_audio: null,
        titleAudioChanged: false,
        descriptionAudioChanged: false,
        titleAudioChangedRequest: false,
        descriptionAudioChangedRequest: false,
        start_date: "",
        end_date: "",
        interactionType: "",
        interaction_number: "",
        repetitions_number: 1,
        jeel_gems: "",
        isRepeat: false,
      },
      url: null,
      mediaType: null,
      typeOfAchievements: [
        {
          id: 1,
          key: 'leaderboard',
          name: "قائمة المتصدرين"
        },
        {
          id: 2,
          key: 'competitions',
          name: "المنافسات"
        },
        {
          id: 3,
          key: 'seasonal_mission',
          name: 'المهام الموسمية',
        },
        {
          id: 4,
          key: 'mission',
          name: 'المهام الأسبوعية',
        },
        {
          id: 5,
          key: 'daily_entry',
          name: 'الدخول اليومى',
        }
      ],
      achievementId: this.$route.params.id,
      showDate: false,
      showEndDate: false,
    };
  },
  methods: {
    disabledBeforeToday(date) {
      return date < new Date(new Date().setHours(0, 0, 0, 0) + 1);
    },
    disabledAfterAndStart(date) {
      return date <= new Date(this.achievement.start_date).setHours(0, 0, 0, 0) + 1;
    },
    setTitleAudioFileId($event) {
      this.achievement.name_audio = $event;
      this.achievement.titleAudioChangedRequest = true
      this.achievement.titleAudioChanged = false
    },
    setDescriptionAudioFileId($event) {
      this.achievement.description_audio = $event;
      this.achievement.descriptionAudioChangedRequest = true
      this.achievement.descriptionAudioChanged = false
    },
    removeFile(fileName, fileChange, fileRequest) {
      this.achievement[fileName] = null
      this.achievement[fileChange] = true
      this.achievement[fileRequest] = true
    },
    showModal(audio, $event) {
      this.$bvModal.show('holdContent')
      this.mediaType = $event
      if (this.mediaType === 'audio') {
        this.url = audio
      }
    },
    hideModal() {
      this.$bvModal.hide('holdContent')
    },
    onSubmit() {
      this.$refs.addEditAchievementForm.validate().then((success) => {
        if (!success) return;
      });
      let data = {
        name: this.achievement.name,
        description: this.achievement.description,
        interaction: this.achievement.interactionType.id,
        name_audio: this.achievement.name_audio,
        description_audio: this.achievement.description_audio,
        interaction_number: this.achievement.interaction_number,
        repetitions_number: this.achievement.repetitions_number,
        jeel_gems: this.achievement.jeel_gems,
        start_date: this.achievement.start_date,
        end_date: this.achievement.end_date,
      }
      if (this.achievementId) {
        if(!this.achievement.descriptionAudioChangedRequest){
          delete  data.description_audio
        }
        if(!this.achievement.titleAudioChangedRequest){
          delete  data.name_audio
        }
        this.$emit("editAchievement", data);
      } else {
        this.$emit("addAchievement", data);
      }
    },
    getInteractionType() {
      ApiService(getInteractionTypesRequest()).then((response) => {
        this.typeOfAchievements = response.data.data
      })
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getAchievementById() {
      if (this.achievementId) {
        this.ApiService(getAchievementByIdRequest(this.$route.params.id)).then((response) => {
          let data = response.data.data
          this.achievement.name = data.name
          this.achievement.description = data.description
          this.achievement.interactionType = data.interaction
          this.achievement.interaction_number = data.interaction_number
          this.achievement.isRepeat = !!data.repetitions_number
          this.achievement.repetitions_number = data.repetitions_number
          this.achievement.start_date = data.start_date
          this.achievement.end_date = data.end_date
          this.achievement.jeel_gems = data.jeel_gems
          // name audio
          this.achievement.name_audio = response.data.data.name_audio;
          this.achievement.audio_name = response.data.data.name_audio_name;
          this.achievement.audio_size = response.data.data.name_audio_size;
          // description audio
          this.achievement.description_audio = response.data.data.description_audio;
          this.achievement.description_audio_name = response.data.data.description_audio_name;
          this.achievement.description_audio_size = response.data.data.description_audio_size;
        });
      }
    },
  },
  mounted() {
    this.getAchievementById();
    this.getInteractionType()
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
