<template>
  <section class="container-fluid custom-container">
    <div class="collapse-search">
      <div class="collapse-search__header">
        <h2 class="heading">{{ $t("BUTTONS.SEARCH") }}</h2>
        <button class="collapsed" @click="toggleCollapsed">
          <i :class="collapsed ? 'fas fa-minus' : 'fas fa-plus'"></i>
        </button>
      </div>
      <transition name="fade" mode="out-in">
        <div :class="collapsed ? '' : 'collapsed'" class="collapse-search__body" v-if="collapsed">
          <validation-observer v-slot="{ invalid }" ref="schoolsUsersSearch">
            <GenericForm
              class="w-100"
              :schema="leaderBoardSearch"
              @onSubmit="onSubmit"
              @handleCancel="handleCancel"
              :loading="loading"
              :submitButton="$t('BUTTONS.SEARCH')"
              :cancelButton="$t('BUTTONS.RECOVERY')"
              :invalid="invalid"
              @handleInput="handleInput"
            ></GenericForm>
          </validation-observer>
        </div>
      </transition>
    </div>
    <div class="list">
      <b-row>
        <b-col lg="4" v-for="(item,index) in topStudents" :key="item.id">
          <div class="leader-item leader-board">
            <div class="leader-item-img">
              <img :src="item.image">
              <div class="leader-item-rank"><span>#{{ index + 1 }}</span></div>
            </div>
            <p class="leader-item-name">{{ item.name }}</p>
            <p class="leader-item-class">{{ item.class.level.name }}</p>
            <p class="leader-item-point"><span>{{ item.missions_points }}</span><span>نقطة</span>
            </p>
          </div>
        </b-col>
      </b-row>
      <ListItems
        class="mt-5 p-0"
        :header-name="$t('schoolAdmin.listOfStudents')"
        :fieldsList="fieldsList"
        :table-items="students"
        :number-of-item="totalNumber"
        :loading="loading"
        :disable-it="true"
        :is-refresh="refresh"
        @refetch="getLeaderBoard"
        :show-sort-controls="false"
      >
      </ListItems>
    </div>
  </section>
</template>
<script>
import GenericForm from "@/components/Shared/GenericForm/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import {getLeaderBoardRequest} from "@/api/teacher-module";
import {
  getClassForSupervisorBasedStudyYearLevel,
  getClassForTeacherBasedStudyYearLevel, getLevelByStudyYearForSupervisor,
  getLevelByStudyYearForTeacher, getMissionForSuperBasedStudyYearLevelTerm,
  getMissionForTeacherBasedStudyYearLevelTerm,
  getStudyYearForSupervisor,
  getStudyYearForTeacher, getTermsForSupervisorBasedStudyYear,
  getTermsForTeacherBasedStudyYear,
  getTypeForTeacher
} from "@/services/dropdownService";
import {getLeaderBoardSuperRequest} from "@/api/supervisor-module";


export default {
  name: "index",
  components: {ListItems, Button, GenericForm},
  data() {
    return {
      collapsed: false,
      refresh: false,
      leaderBoardSearch: [
        {
          key: "name",
          label: "اسم الطالب",
          labelEn: "student name",
          col: "4",
          listen: "id",
          value: "",
          type: "text",
          rules: "",
        },
        {
          key: "study_year_id",
          col: "4",
          type: "select",
          optionValue: "name",
          listen: "id",
          label: "العام الدراسي",
          labelEn: "study Year name",
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
          label: "الصف الدراسي",
          labelEn: "level",
          options: [],
          deselectFromDropdown: true,
          disabled: true,
          value: "",
          rules: 'required'
        },
        {
          key: "term_id",
          col: "4",
          type: "select",
          optionValue: "name",
          listen: "id",
          label: "الترم الدراسي",
          labelEn: "terms",
          options: [],
          deselectFromDropdown: true,
          value: "",
          disabled: true,
          rules: 'required'
        },
        {
          key: "class_id",
          col: "4",
          type: "select",
          optionValue: "name",
          listen: "id",
          label: "اسم الفصل",
          labelEn: "class Name",
          options: [],
          deselectFromDropdown: true,
          value: "",
          disabled: true,
          rules: 'required'
        },
        {
          key: "type_id",
          col: "4",
          type: "select",
          optionValue: "name",
          listen: "id",
          label: "النوع",
          labelEn: "type Name",
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: 'required'
        },
        {
          key: "mission_id",
          col: "4",
          type: "select",
          optionValue: "name",
          listen: "id",
          label: "اسم المهمة",
          labelEn: "mission Name",
          options: [],
          deselectFromDropdown: true,
          disabled: true,
          value: "",
          rules: 'required'
        },
      ],
      loading: false,
      students: [],
      topStudents: [],
      totalNumber: 0
    }
  },
  computed:{
    fieldsList(){
      return [
        {
          key: "position",
          label: this.$i18n.t("TABLE_FIELDS.position"),
        },
        {
          key: "image",
          label: this.$i18n.t("TABLE_FIELDS.image"),
        },
        {
          key: "first_name",
          label: this.$i18n.t("TABLE_FIELDS.first_name"),
        },
        {
          key: "middle_name",
          label: this.$i18n.t("TABLE_FIELDS.middle_name"),
        },
        {
          key: "class.level.name",
          label: this.$i18n.t("schoolAdmin.level"),
        },
        {
          key: "class.name",
          label: this.$i18n.t("schoolAdmin.class"),
        },
        {
          key: "missions_points",
          label: this.$i18n.t("TABLE_FIELDS.points"),
        },

      ]
    },
  },
  methods: {
    handleInput(key, value) {
      if (key === 'study_year_id' && value !== '') {
        this.leaderBoardSearch[2].disabled = false;
        this.leaderBoardSearch[3].disabled = false;
        getLevelByStudyYearForSupervisor(this.leaderBoardSearch, 'level_id', value)
        getTermsForSupervisorBasedStudyYear(this.leaderBoardSearch, 'term_id', value)
      } else if (key === 'level_id' && value !== ''){
        this.leaderBoardSearch[4].disabled = false;
        getClassForSupervisorBasedStudyYearLevel(this.leaderBoardSearch,'class_id',this.leaderBoardSearch[1].value,this.leaderBoardSearch[2].value)
      } else if(this.leaderBoardSearch[1].value !== '' && this.leaderBoardSearch[2].value !== '' && this.leaderBoardSearch[3].value !== ''){
        this.leaderBoardSearch[6].disabled = false;
        getMissionForSuperBasedStudyYearLevelTerm(this.leaderBoardSearch,'mission_id',this.leaderBoardSearch[1].value,this.leaderBoardSearch[2].value,this.leaderBoardSearch[3].value)
      }
    },
    onSubmit(values) {
      this.getLeaderBoard(values)
    },
    handleCancel(){
      this.leaderBoardSearch.forEach((item)=>{
        item.value = ''
      })
      this.$nextTick(()=>{
        this.$refs.schoolsUsersSearch.reset()
      })
      this.getLeaderBoard()
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    getLeaderBoard(params) {
      this.ApiService(getLeaderBoardSuperRequest(params)).then((response) => {
        this.topStudents = response.data.data.slice(0, 3)
        this.students = response.data.data.slice(3)
        this.students = this.students.map((item, index) => {
          return {position: index + 4, ...item}
        })
        this.totalNumber = response.data.meta.total
        this.refresh = true
      })
    }
  },
  mounted() {
    this.getLeaderBoard()
    getStudyYearForSupervisor(this.leaderBoardSearch, 'study_year_id')
    getTypeForTeacher(this.leaderBoardSearch, 'type_id')
  }
}
</script>
<style scoped lang="scss">
@import "index";

.leader-board {
  background: url("../../src/assets/images/bg/leader-bg.svg");
  background-color: #fff;
  background-repeat: no-repeat;
  background-size: 80%;
  background-position: center;
  border-radius: 1rem;
  border: 1px solid #eee;
}
</style>
