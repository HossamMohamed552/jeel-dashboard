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
      <validation-observer v-slot="{ invalid }" ref="addEditLevelForm">
        <form @submit.prevent="sortMissions">
          <draggable v-model="missionSaved" group="items" :animation="150" class="list-group"
                     :sort="true"
                     :options="{ draggable: '.itemEnabled' }" :move="checkMove">
            <div v-for="(item,index) in missionSaved" :key="item.id" class="list-group-item"
                 :class="[(item.is_selected === 1 || item.is_selected ===  true) &&  !item.is_mission_start? 'itemEnabled': 'itemDisabled',item.is_mission_start ? 'mission-started':'',index % 2 === 1 ? 'odd': '']">
              <b-row>
                <b-col lg="1"><span><img src="@/assets/images/icons/drag.svg"></span></b-col>
                <b-col lg="1"><p class="sort"><span>{{ index + 1 }}</span></p></b-col>
                <b-col lg="2"><span class="mission-name">{{ item.name }}</span></b-col>
                <b-col lg="2">
                  <ValidationProvider v-slot="{errors, invalid}" rules="required" :name="item.name">
                    <date-picker :disabled-date="disableEndDateItemBefore" :lang="en"
                                 v-model="item.start_date"
                                 valueType="format"
                                 :disabled="item.is_selected === false || item.is_mission_start"
                                 @change="setEndDate(item)"
                                 @open="disableDateSelectedBefore(item)"></date-picker>
                  </ValidationProvider>

                </b-col>
                <b-col lg="2">
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
                  <button class="detail" @click="goToMission(item.id)">{{ $t('detail') }}</button>
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
import {getLevelsForSuperVisorRequest, getLevelsRequest} from "@/api/level";
import Button from "@/components/Shared/Button/index.vue";
import draggable from 'vuedraggable'
import {getSuperMissionsRequest} from "@/api/missios";
import DatePicker from "vue2-datepicker";
import 'vue2-datepicker/locale/en'
import "vue2-datepicker/index.css";
import axios from "axios";
import VueCookies from "vue-cookies";
import GenericForm from "@/components/Shared/GenericForm/index.vue";
import {
  getLevelsForSuperVisor,
  getSTermsForSuperVisor,
  getStudyYearsForSuperVisor
} from "@/services/dropdownService";

export default {
  name: "index",
  components: {GenericForm, Button, draggable, SelectSearch, DatePicker},
  data() {
    return {
      en: 'en',
      level_id: "",
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
      } else if (key === 'level_id') {
        this.level_id = value
      }
    },
    onSubmit(values) {
      this.getMissions(values)
    },
    // getLevelsBySchoolId() {
    //   this.ApiService(getLevelsForSuperVisorRequest()).then((response) => {
    //     this.levels = response.data.data
    //   }).then(() => {
    //     this.level_id = this.levels ? this.levels[0].level.id : ""
    //   })
    // },
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
      let missionStarted = this.missionSaved.filter((item) => {
        return item.is_mission_start === true
      })
      let resetMissionNotStarted = this.missionSaved.filter((item) => {
        return item.is_mission_start === false
      }).map((item) => {
        return {...item, start_date: null, end_date: null}
      })
      this.missionSaved = [...missionStarted, ...resetMissionNotStarted]
      // window.console.log("Future index: " + e.draggedContext.futureIndex);
    },
    goToMission(missionId) {
      this.$router.push(`/dashboard/mission-detail/${missionId}`)
    },
    sortMissions() {
      let missions = this.missionSaved.map((item, index) => {
        return {
          id: item.id,
          order: index + 1,
          is_selected: 1,
          start_date: item.start_date,
          end_date: item.end_date
        }
      })
      axios.post('/rearrange-mission', {
        level_id: this.level_id,
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
