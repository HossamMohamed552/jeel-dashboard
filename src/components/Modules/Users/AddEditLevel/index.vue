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
                      :rules="'required|min:3'"
                    ></TextField>
                  </div>
                </b-col>
                <b-col lg="6" class="mb-3">
                  <div class="hold-field">
                    <TextField
                      v-model="createLevel.min_levels"
                      :label="$t('LEVEL.min_levels')"
                      :name="$t('LEVEL.min_levels')"
                      :rules="'required|numeric'"
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
                              <p class="mission-name">{{ item.name }}</p>
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col lg="6">
                              <ValidationProvider v-slot="{errors, invalid}" rules="required">
                                <label class="mission-date">
                                  {{ $t('LEVEL.startMission') }}
                                </label>
                                <date-picker v-model="item.start_date" @change="showDate = false"
                                             valueType="format"></date-picker>
                                <p class="show-date" v-if="showDate">{{ item.start_date }}</p>
                              </ValidationProvider>
                            </b-col>
                            <b-col lg="6">
                              <ValidationProvider v-slot="{errors, invalid}" rules="required">
                                <label class="mission-date">
                                  {{ $t('LEVEL.endMission') }}
                                </label>
                                <date-picker v-model="item.end_date" @change="showDate = false"
                                             valueType="format"></date-picker>
                                <p class="show-date" v-if="showDate">{{ item.end_date }}</p>
                              </ValidationProvider>
                            </b-col>
                          </b-row>
                        </div>
                      </draggable>
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
import "vue2-datepicker/index.css";

export default {
  components: {
    draggable,
    Modal,
    TextField,
    Button,
    SelectSearch,
    DatePicker
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
      createLevel: {
        name: "",
        min_levels: null,
        themes: [1],
        school_groups: [],
      },
      showModal: false,
      showDate: false,
      missionNotSelected: [],
      missionsSend: [],
    };
  },
  watch: {
    missionsSend(newArray) {
      newArray.map((item) => Object.assign(item, {start_date: item.start_date ? item.start_date : "" , end_date: item.end_date ? item.end_date : ""}))
    }
  },
  methods: {
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
      console.log('this.missionsSend', missions)
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
        console.log(error)
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
