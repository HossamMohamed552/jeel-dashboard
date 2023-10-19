<template>
  <div class="add-edit-country">
    <Modal :content-message="'تمت تعديل المراحل بنجاح'" :showModal="showModal" :is-success="true"/>
    <div class="container-fluid custom-container">
      <div class="add-edit-country-form">
        <h3>{{ $route.params.id ? $t("LEVEL.EDIT") : $t("LEVEL.ADD_NEW") }}</h3>
        <div v-if="user.is_super_admin === 1 && user.permissions.includes('edit-levels')">
          <validation-observer v-slot="{ invalid }" ref="addEditLevelForm">
            <form @submit.prevent="onSubmit" class="mt-5">
              <b-row>
                <b-col lg="6" class="mb-3">
                  <div class="hold-field">
                    <TextField
                      v-model="createLevel.name"
                      :label="$t('LEVEL.name')"
                      :name="$t('LEVEL.name')"
                      :rules="'required|min:3|max:30'"
                    ></TextField>
                  </div>
                </b-col>
                <b-col lg="6" class="mb-3">
                  <div class="hold-field">
                    <TextField
                      v-model="createLevel.min_levels"
                      :label="$t('LEVEL.min_levels')"
                      :name="$t('LEVEL.min_levels')"
                      :rules="'required|numeric|max_value:20'"
                    ></TextField>
                  </div>
                </b-col>
                <b-col lg="12" class="mb-3">
                  <SelectSearch
                    multiple
                    v-if="!$route.params.id"
                    v-model="createLevel.school_groups"
                    :label="$t('TABLE_FIELDS.school_group')"
                    :name="$t('TABLE_FIELDS.school_group')"
                    :options="schoolGroupOptions"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                  ></SelectSearch>
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
                    <!--                  || missionsSend.length === 0-->
                    {{ $route.params.id ? $t("GLOBAL_EDIT") : $t("GLOBAL_SAVE") }}
                  </Button>
                </div>
              </b-row>
            </form>
          </validation-observer>
        </div>
        <div v-if="user.permissions.includes('rearrange-missions')">
          <validation-observer v-slot="{ invalid }" ref="addEditLevelForm">
            <form @submit.prevent="onSubmit" class="mt-5">
              <b-row>
                <b-col lg="12">
                  <b-row>
                    <b-col lg="6" class="mt-3">
                      <h3>المراحل</h3>
                      <draggable v-model="missionNotSelected" group="items" :animation="150"
                                 class="list-group" :sort="false">
                        <div v-for="item in missionNotSelected" :key="item.id"
                             class="list-group-item">
                          {{ item.name }}
                        </div>
                      </draggable>
                    </b-col>
                    <b-col lg="6" class="mt-3">
                      <h3>المراحل المختاره</h3>
                      <draggable v-model="missionsSend" group="items" :animation="150"
                                 class="list-group" :sort="true">
                        <div v-for="item in missionsSend" :key="item.id" class="list-group-item">
                          <b-row>
                            <b-col lg="12">
                              <div class="question-holder-details mb-2">
                                <p class="mission-name mb-0 font-weight-bold">{{ item.name }}</p>
                                <Button @click="handleShowMissionDetails(item.mission_info_id)">{{ $t("GLOBAL_DETAILS") }}
                                </Button>
                              </div>
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col lg="6">
                              <ValidationProvider v-slot="{errors, invalid}" rules="required">
                                <label class="mission-date">
                                  {{ $t('LEVEL.startMission') }}
                                </label>
                                <date-picker :disabled-date="disabledBeforeToday" :lang="en"
                                             v-model="item.start_date" @change="showDate = false"
                                             valueType="format"></date-picker>
                                <p class="show-date" v-if="showDate">{{ item.start_date }}</p>
                              </ValidationProvider>
                            </b-col>
                            <b-col lg="6">
                              <ValidationProvider v-slot="{errors, invalid}" rules="required">
                                <label class="mission-date">
                                  {{ $t('LEVEL.endMission') }}
                                </label>
                                <date-picker :disabled-date="disabledBeforeToday" :lang="en"
                                             v-model="item.end_date" @change="showDate = false"
                                             valueType="format"></date-picker>
                                <p class="show-date" v-if="showDate">{{ item.end_date }}</p>
                              </ValidationProvider>
                            </b-col>
                          </b-row>
                        </div>
                      </draggable>
                      <p v-if="isError" class="text-danger">لم تصل المراحل الى الحد الادنى للمراحل
                        {{ createLevel.min_levels }}</p>
                    </b-col>
                  </b-row>
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
                    :disabled="invalid || missionsSend.length === 0"
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
    <MissionDetailsModal
      :mission-id="selectedMission"
      @closeModal="handleCloseMissionDetailsModal"
    />
  </div>
</template>
<script>
import TextField from "@/components/Shared/TextField/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {getSingleLevelRequest} from "@/api/level";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import draggable from 'vuedraggable'
import axios from "axios";
import VueCookies from "vue-cookies";
import {mapGetters} from "vuex";
import DatePicker from "vue2-datepicker";
import 'vue2-datepicker/locale/en'
import "vue2-datepicker/index.css";
import MissionDetailsModal from "@/components/Shared/MissionDetailsModal/index.vue";

export default {
  components: {
    draggable,
    Modal,
    TextField,
    Button,
    SelectSearch,
    DatePicker,
    MissionDetailsModal
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    schoolGroupOptions: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters(['user'])
  },
  data() {
    return {
      selectedMission: null,
      en: 'en',
      createLevel: {
        name: "",
        min_levels: null,
        themes: [1],
        school_groups: [],
      },
      showModal: false,
      showDate: false,
      isError: false,
      missionNotSelected: [],
      missionsSend: [],
    };
  },
  watch: {
    missionsSend(newArray) {
      newArray.map((item) => Object.assign(item, {
        start_date: item.start_date ? item.start_date : "",
        end_date: item.end_date ? item.end_date : ""
      }))
    }
  },
  methods: {
    handleShowMissionDetails(missionId) {
      this.selectedMission = missionId;
      this.$bvModal.show("mission-details-modal");
    },
    handleCloseMissionDetailsModal() {
      this.$bvModal.hide("mission-details-modal");
      this.selectedMission = null;
    },
    disabledBeforeToday(date) {
      return date < new Date(new Date().setHours(0, 0, 0, 0))

    },
    onSubmit() {
      this.$refs.addEditLevelForm.validate().then((success) => {
        if (!success) return;
      });
      if (this.$route.params.id) {
        if (!this.user.permissions.includes('rearrange-missions')) {
          this.$emit("handleEditLevel", this.createLevel);
        } else {
          this.selectSortMissions()
        }
      } else {
        this.$emit("handleAddLevel", this.createLevel);
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getLevelToEdit() {
      if (this.$route.params.id) {
        this.ApiService(getSingleLevelRequest(this.$route.params.id)).then((response) => {
          this.createLevel.name = response.data.data.name;
          this.createLevel.min_levels = response.data.data.min_levels;
          this.createLevel.school_groups = response.data.data.school_groups.map(e => e.id);
          this.missionNotSelected = response.data.data.missions.filter((item) => item.is_selected === null || item.is_selected === 0)
          this.missionsSend = response.data.data.missions.filter((item) => item.is_selected === 1)
        });
      }
    },
    selectSortMissions() {
      let missions = this.missionsSend.map((item, index) => {
        return {
          id: item.id,
          order: index + 1,
          is_selected: 1,
          start_date: item.start_date,
          end_date: item.end_date
        }
      })

      axios.post('/rearrange-mission', {
        level_id: this.$route.params.id,
        missions: missions
      }, {
        headers: {
          Authorization: `Bearer ${VueCookies.get("token")}`,
          locale: 'ar',
        }
      }).then(() => {
        this.showModal = true
        setTimeout(() => {
          this.showModal = false;
        }, 3000);
      }).then(() => this.$router.push('/dashboard/levels')).catch((error) => {
        this.isError = true
        setTimeout(() => {
          this.isError = false;
        }, 3000);
      })
    }
  },
  mounted() {
    this.getLevelToEdit();
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
