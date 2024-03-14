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
        </div>
      </div>
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
      <draggable v-model="missionSaved" group="items" :animation="150" class="list-group"
                 :options="{ draggable: [''] }">
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
                <date-picker :lang="en"
                             v-model="item.start_date"
                             valueType="format"
                             :disabled="true"
                ></date-picker>
              </ValidationProvider>
            </b-col>
            <b-col lg="2" class="d-flex justify-content-start align-items-center">
              <ValidationProvider v-slot="{errors, invalid}" rules="required"
                                  :name="`${item.name}+end`">
                <date-picker :lang="en"
                             v-model="item.end_date"
                             :default-value="new Date()"
                             valueType="format"
                             :disabled="true"></date-picker>
              </ValidationProvider>
            </b-col>
            <b-col lg="2"
                   class="custom-border-left d-flex justify-content-center align-items-center">
              <b-form-checkbox v-model="item.is_selected" switch
                               :disabled="true"></b-form-checkbox>
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
    </section>
  </section>
</template>
<script>

import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import draggable from 'vuedraggable'
import DatePicker from "vue2-datepicker";
import 'vue2-datepicker/locale/en'
import "vue2-datepicker/index.css";
import GenericForm from "@/components/Shared/GenericForm/index.vue";
import {getLevelsForTeacher, getSTermsForTeacher, getStudyYearsForTeacher} from "@/services/dropdownService";
import {log} from "video.js";
import {getTeacherMissionsRequest, getTeacherPowerUpBoxRequest} from "@/api/teacher-module";

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
      this.ApiService(getTeacherMissionsRequest(values)).then((response) => {
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
      this.ApiService(getTeacherPowerUpBoxRequest(values)).then((response) => {
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
    goToMission(missionId) {
      this.$router.push(`/dashboard/mission-detail/${missionId}`)
    },
  },
  mounted() {
    getLevelsForTeacher(this.missionSearch, 'level_id')
    getStudyYearsForTeacher(this.missionSearch, 'study_year_id')
    getSTermsForTeacher(this.missionSearch, 'term_id')
  }
}
</script>
<style scoped lang="scss">
@import "index";
</style>
