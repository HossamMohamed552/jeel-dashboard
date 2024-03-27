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
              :loading="loading"
              :submitButton="$t('BUTTONS.SEARCH')"
              :cancelButton="$t('BUTTONS.RECOVERY')"
              :invalid="invalid"
            ></GenericForm>
          </validation-observer>
        </div>
      </transition>
    </div>
    <div class="list">
      <b-row>
        <b-col lg="4" v-for="item in 3">
          <div class="leader-item leader-board">
            <div class="leader-item-img">
              <img src="@/assets/images/icons/user-avatar.png">
              <div class="leader-item-rank"><span>#1</span></div>
            </div>
            <p class="leader-item-name">حمزه عمر</p>
            <p class="leader-item-class">الصف الأول الأبتدائى</p>
            <p class="leader-item-point"><span>989</span><span>نقطة</span></p>
          </div>
        </b-col>
      </b-row>
      <ListItems
        class="mt-5 p-0"
        :header-name="'قائمة الطلاب'"
        :fieldsList="fieldsList"
        :table-items="students"
        :loading="loading"
        :disable-it="true"
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

export default {
  name: "index",
  components: {ListItems, Button, GenericForm},
  data() {
    return {
      collapsed: false,
      leaderBoardSearch: [
        {
          key: "name",
          label: this.$t("leaderboard.name"),
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
        {
          key: "class_id",
          col: "4",
          type: "select",
          optionValue: "name",
          listen: "id",
          label: this.$t("leaderboard.className"),
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: 'required'
        },
        {
          key: "type_id",
          col: "4",
          type: "select",
          optionValue: "name",
          listen: "id",
          label: this.$t("leaderboard.typeName"),
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
          label: this.$t("leaderboard.missionName"),
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: 'required'
        },
      ],
      loading: false,
      students: [],
      fieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id"),
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
      ]
    }
  },
  methods: {
    onSubmit(values) {

    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
  }
}
</script>
<style scoped lang="scss">
@import "index";

.leader-board {
  background: url("../../../src/assets/images/bg/leader-bg.svg");
  background-color: #fff;
  background-repeat: no-repeat;
  background-size: 80%;
  background-position: center;
  border-radius: 1rem;
  border: 1px solid #eee;
}
</style>
