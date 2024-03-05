<template>
  <section class="container-fluid custom-container">
    <section class="list">
      <validation-observer v-slot="{ invalid }" ref="schoolsUsersSearch">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("BUTTONS.SEARCH") }}</h2>
          </b-col>
        </b-row>
        <GenericForm
          class="w-100"
          :schema="missionSearch"
          @onSubmit="onSubmit"
          :loading="loading"
          :submitButton="$t('BUTTONS.SEARCH')"
          :cancelButton="$t('BUTTONS.RECOVERY')"
          :invalid="invalid"
          @handleInput="handleInput"
        ></GenericForm>
      </validation-observer>
      <div class="header m-0">
        <div class="list-of-item">
          <p class="name-of-item">قائمة المهام الدراسية</p>
          <!--          <span class="no-of-item">{{ missions.length }}</span>-->
        </div>
      </div>
      <b-row>
        <!--        <b-col lg="4" v-if="level_id">-->
        <!--          <SelectSearch-->
        <!--            v-model="level_id"-->
        <!--            :label="$t('ads.superLevel')"-->
        <!--            :name="$t('ads.superLevel')"-->
        <!--            :options="levels"-->
        <!--            :reduce="(option) => option.level.id"-->
        <!--            :get-option-label="(option) => option.level.name"-->
        <!--            :deselectFromDropdown="true"-->
        <!--            @input="getMissions($event)"-->
        <!--          ></SelectSearch>-->
        <!--        </b-col>-->
        <b-col lg="8" class="d-flex justify-content-start align-items-end" v-if="minMissions">
          <div class="info">
            <span><img src="@/assets/images/icons/info.png"></span>
            <span>يجب أن لا يقل عدد المهام عن {{ minMissions }} مهام</span>
          </div>
        </b-col>
      </b-row>
      <div class="mission-header">
        <b-row>
          <b-col lg="1"></b-col>
          <b-col lg="1">#</b-col>
          <b-col lg="2">اسم المهمة</b-col>
          <b-col lg="2">بداية المهمة</b-col>
          <b-col lg="2">نهاية المهمة</b-col>
          <b-col lg="2" class="d-flex justify-content-center align-items-center">الحالة</b-col>
          <b-col lg="2"></b-col>
        </b-row>
      </div>
      <!--      :move="checkMove"-->
      <validation-observer v-slot="{ invalid }" ref="addEditLevelForm">
        <form @submit.prevent="sortMissions">
          <draggable v-model="missionSaved" group="items" :animation="150" class="list-group"
                     :sort="true"
                     :options="{ draggable: ['.itemEnabled'] }" :move="checkMove">
            <div v-for="(item,index) in missionSaved"
                 :key="item.id"
                 :class="
                 [
                   (item.is_selected === 1 || item.is_selected ===  true) && !item.is_mission_start? 'itemEnabled': 'itemDisabled',
                   item.is_mission_start ? 'mission-started':'',
                   index % 2 === 1 ? 'odd': '',
                   item.type === 'mission' ? 'list-group-item': 'power-up-list-group-item'
                 ]">
              <b-row v-if="item.type === 'mission'">
                <b-col lg="1" class="d-flex justify-content-start align-items-center"><span><img
                  src="@/assets/images/icons/drag.svg"></span></b-col>
                <b-col lg="1" class="d-flex justify-content-start align-items-center"><p
                  class="sort"><span>{{ index + 1 }}</span></p></b-col>
                <b-col lg="2" class="d-flex justify-content-start align-items-center"><span
                  class="mission-name">{{ item.name }}</span></b-col>
                <b-col lg="2" class="d-flex justify-content-start align-items-center">
                  <ValidationProvider v-slot="{errors, invalid}" rules="required" :name="item.name">
                    <date-picker :disabled-date="disableEndDateItemBefore" :lang="en"
                                 v-model="item.start_date"
                                 valueType="format"
                                 :disabled="item.is_selected === false || item.is_mission_start"
                                 @change="setEndDate(item)"
                                 @open="disableDateSelectedBefore(item)"></date-picker>
                  </ValidationProvider>
                </b-col>
                <b-col lg="2" class="d-flex justify-content-start align-items-center">
                  <ValidationProvider v-slot="{errors, invalid}" rules="required"
                                      :name="`${item.name}+end`">
                    <date-picker :disabled-date="disabledBeforeToday" :lang="en"
                                 v-model="item.end_date"
                                 :default-value="new Date()"
                                 valueType="format"
                                 :disabled="item.is_selected === false || item.is_mission_start"></date-picker>
                  </ValidationProvider>
                </b-col>
                <b-col lg="2"
                       class="custom-border-left d-flex justify-content-center align-items-center">
                  <b-form-checkbox v-model="item.is_selected" switch
                                   :disabled="item.is_mission_start"></b-form-checkbox>
                </b-col>
                <b-col lg="2" class="d-flex justify-content-center align-items-center">
                  <button type="button" class="detail" @click="goToMission(item.id)">{{
                      $t('detail')
                    }}
                  </button>
                </b-col>
              </b-row>
              <b-row v-if="item.type === 'power'" class="power-box-container">
                <b-col lg="1" class="d-flex justify-content-start align-items-center"><span><img
                  src="@/assets/images/icons/drag.svg"></span></b-col>
                <b-col lg="1" class="d-flex justify-content-start align-items-center"><span
                  class="power-box"><img :src="item.logo" alt="image-power"></span></b-col>
                <b-col lg="2" class="d-flex justify-content-start align-items-center"><span
                  class="mission-name">{{ item.name }}</span></b-col>
                <b-col lg="2" class="d-flex justify-content-start align-items-center">
                  <span class="mission-name">عدد النقاط : {{ item.jeel_xp }} </span>
                </b-col>
                <b-col lg="2" class="d-flex justify-content-start align-items-center">
                  <span class="mission-name">عدد الجيمز : {{ item.jeel_coins }} </span>
                </b-col>
                <b-col lg="2" class="d-flex justify-content-start align-items-center"></b-col>
                <b-col lg="2" class="d-flex justify-content-center align-items-center">
                  <span class="main-image-power-box"><img :src="item.logo" alt="image-power"></span>
                </b-col>
              </b-row>
            </div>
          </draggable>
        </form>
        <b-row>
          <div class="hold-btns-form">
            <Button @click="handleCancel" custom-class="cancel-btn margin">
              {{ $t("GLOBAL_CANCEL") }}
            </Button>
            <Button @click="sortMissions" :disabled="missionSaved.length === 0" :loading="loading"
                    custom-class="submit-btn">
              {{ $t("GLOBAL_SAVE") }}
            </Button>
          </div>
        </b-row>
      </validation-observer>
    </section>
  </section>
</template>
<script>

import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import draggable from 'vuedraggable'
import {getSuperMissionsRequest, getSuperPowerUpBoxRequest} from "@/api/missios";
import DatePicker from "vue2-datepicker";
import 'vue2-datepicker/locale/en'
import "vue2-datepicker/index.css";
import GenericForm from "@/components/Shared/GenericForm/index.vue";
import {
  getLevelsForSuperVisor,
  getSTermsForSuperVisor,
  getStudyYearsForSuperVisor
} from "@/services/dropdownService";
import {log} from "video.js";
import axios from "axios";
import VueCookies from "vue-cookies";

export default {
  name: "index",
  components: {GenericForm, Button, draggable, SelectSearch, DatePicker},
  data() {
    return {
      en: 'en',
      level_id: "",
      term_id: "",
      levels: [],
      missions: [],
      missionsStarted: [],
      missionsNotStarted: [],
      missionSaved: [],
      endDateItemBefore: null,
      loading: false,
      invalid: true,
      minMissions: null,
      missionSearch: [
        {
          key: "study_year_id",
          col: "4",
          type: "select",
          optionValue: "name",
          listen: "id",
          label: this.$t("TABLE_FIELDS.studyYear"),
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: 'required'
        },
        {
          key: "level_id",
          col: "4",
          type: "select",
          optionValue: "name",
          listen: "id",
          label: this.$t("TABLE_FIELDS.levelSchoolAdmin"),
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: 'required'
        },
        {
          key: "term_id",
          col: "4",
          type: "select",
          optionValue: "name",
          listen: "id",
          label: this.$t("MISSIONS.terms"),
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: 'required'
        },
      ],
      powerUpBoxList: [],
      missionSavedWithPower: [],
    }
  },
  watch: {
    missionSavedWithPower(newVal) {
      return newVal
    }
  },
  computed: {
    levelSelected() {
      return this.levels.filter((item) => {
        return item.id === this.level_id
      })
    }
  },
  methods: {
    handleInput(key, value, field) {
      if (key === 'term_id') {
        this.minMissions = field?.options ? field?.options.find(item => item.id === value)?.min_missions : null
        this.term_id = value
      } else if (key === 'level_id') {
        this.level_id = value
      }
    },
    onSubmit(values) {
      this.getMissions(values)
    },
    getMissions(values) {
      this.ApiService(getSuperMissionsRequest(values)).then((response) => {
        this.missions = response.data.data
        this.missionsStarted = this.missions.filter((item) => item.is_mission_start === true).map((item) => {
          return {...item, is_selected: item.is_selected === 1}
        })
        this.missionsNotStarted = this.missions.filter((item) => item.is_mission_start === false).map((item) => {
          return {...item, is_selected: item.is_selected === 1}
        })
        this.missionSaved = [...this.missionsStarted, ...this.missionsNotStarted]
        this.missionSaved = this.missionSaved.map((item) => {
          return {...item, type: 'mission'}
        })
      }).then((response) => {
        this.getSuperPowerUpBox(values)
      })
    },
    getSuperPowerUpBox(values) {
      this.ApiService(getSuperPowerUpBoxRequest(values)).then((response) => {
        this.powerUpBoxList = response.data.data
        this.powerUpBoxList = this.powerUpBoxList.map((item) => {
          return {...item, type: 'power', is_selected: true, is_mission_start: null}
        })
      }).then(() => {
        this.powerUpBoxList.forEach((item) => {
          let index;
          if (item.mission_id) {
            const getIndex = this.missionSaved.find(element => {
              return element.id === item.mission_id
            })
            index = this.missionSaved.indexOf(getIndex) + 1
          } else {
            index = item.appear_after_missions
          }
          let missionWithPower = [
            ...this.missionSaved.splice(0, index),
            item,
            ...this.missionSaved
          ]
          this.missionSaved = missionWithPower
        })
      }).then(() => {
        this.missionWithPowerSend = this.missionSaved
      })
    },
    disabledBeforeToday(date) {
      return date < new Date(new Date().setHours(0, 0, 0, 0))
    },
    disableEndDateItemBefore(date) {
      return date < new Date(new Date(this.endDateItemBefore).setHours(0, 0, 0, 0))
    },
    setEndDate(item) {
      let startDate = new Date(item.start_date)
      item.end_date = new Date(startDate.getTime() + item.range * 24 * 3600 * 1000).toISOString().slice(0, 10)
      this.disableEndDateItemBefore(date)
    },
    disableDateSelectedBefore(item) {
      let findItemBefore = this.missionSaved.findIndex((itemMissionSaved) => itemMissionSaved.id === item.id) - 1
      this.endDateItemBefore = this.missionSaved[findItemBefore].end_date
    },
    checkMove: function (e) {
      // let missionStarted = this.missionSaved.filter((item) => {
      //   return item.is_mission_start === true
      // })
      // let resetMissionNotStarted = this.missionSaved.filter((item) => {
      //   return item.is_mission_start === false
      // }).map((item) => {
      //   return {...item, start_date: null, end_date: null}
      // })
      // this.missionSaved = [...missionStarted, ...resetMissionNotStarted]

      // this.powerUpBoxList.forEach((item) => {
      //   const index = item.appear_after_missions
      //   let missionWithPower = [
      //     ...this.missionSaved.splice(0, index),
      //     item,
      //     ...this.missionSaved
      //   ]
      //   this.missionSaved = missionWithPower
      // })
    },
    goToMission(missionId) {
      this.$router.push(`/dashboard/mission-detail/${missionId}`)
    },
    sortMissions() {
      for (let index = 0; index < this.missionSaved.length; index++) {
        let typeOfNextElement = this.missionSaved[index + 1]
        if (typeOfNextElement?.type === 'power') {
          this.missionSaved[index]['power_up_box_id'] = this.missionSaved[index + 1].id
        } else {
          delete this.missionSaved[index]['power_up_box_id']
        }
      }
      this.missionSavedWithPower = this.missionSaved
      let missionSavedWithPower = this.missionSavedWithPower.map((item, index) => {
        if (item.power_up_box_id) {
          return {
            id: item.id,
            order: index + 1,
            is_selected: 1,
            start_date: item.start_date,
            end_date: item.end_date,
            type: item.type,
            power_up_box_id: item.power_up_box_id
          }
        } else {
          return {
            id: item.id,
            order: index + 1,
            is_selected: 1,
            start_date: item.start_date,
            end_date: item.end_date,
            type: item.type,
          }
        }
      })
      missionSavedWithPower = missionSavedWithPower.filter((item) => {
        return item.type === 'mission'
      })
      axios.post('/rearrange-mission', {
        level_id: this.level_id,
        term_id: this.term_id,
        missions: missionSavedWithPower
      }, {
        headers: {Authorization: `Bearer ${VueCookies.get("token")}`, locale: 'ar',}
      }).then(() => {
        this.showModal = true
        setTimeout(() => {
          this.showModal = false;
        }, 1500);
      }).then(() => this.$router.push('/')).catch((error) => {
        this.isError = true
        setTimeout(() => {
          this.isError = false;
        }, 1500);
      })
    },
    handleCancel() {
      this.$router.push('/');
    }
  },

  mounted() {
    // this.getLevelsBySchoolId()
    getLevelsForSuperVisor(this.missionSearch, 'level_id')
    getStudyYearsForSuperVisor(this.missionSearch, 'study_year_id')
    getSTermsForSuperVisor(this.missionSearch, 'term_id')
  }
}
</script>
<style scoped lang="scss">
@import "index";
</style>
