<template>
  <div class="container-fluid custom-container">
    <div class="add-edit-form">
      <b-row>
        <b-col lg="4">
          <ShowItem class="divider-show" :title="$t('COMPETITIONS.NAME')"
                    :subtitle="competition?.name"/>
        </b-col>
        <b-col lg="4">
          <ShowItem
            class="divider-show"
            :title="$t('supervisor.levels')"
            :subtitle="competition?.level?.name"
          />
        </b-col>
        <b-col lg="4">
          <ShowItem
            class="divider-show"
            :title="$t('supervisor.missions')"
            :subtitle="spreateArray(competition?.mission)"
          />
        </b-col>
        <b-col lg="4">
          <ShowItem
            class="divider-show"
            :title="$t('supervisor.objective')"
            :subtitle="competition?.objective?.name"
          />
        </b-col>
        <b-col lg="4">
          <ShowItem
            class="divider-show"
            :title="$t('supervisor.outcome')"
            :subtitle="competition?.outcome?.name"
          />
        </b-col>
        <b-col lg="2">
          <ShowItem
            class="divider-show"
            :title="$t('supervisor.start')"
            :subtitle="competition?.start_date"
          />
        </b-col>
        <b-col lg="2">
          <ShowItem class="divider-show" :title="$t('supervisor.end') "
                    :subtitle="competition?.end_date"/>
        </b-col>
        <b-col lg="4">
          <ShowItem
            class="divider-show"
            :title="$t('supervisor.durationTime')"
            :subtitle="competition?.competition_time"
          />
        </b-col>
        <b-col :lg="12">
          <ListItems
            class="seasonal-mission-custom-list-item"
            :tableItems="competition?.notifications"
            :headerName="$t('supervisor.listOfNotification')"
            :fieldsList="NotifacationFieldsList"
            :showSortControls="false"
            :notHidePagination="false"
          >
          </ListItems>
        </b-col>
        <b-col :lg="12">
          <ListItems
            class="seasonal-mission-custom-list-item"
            :tableItems="competition?.prizes"
            :headerName="$t('supervisor.listOfPrizes')"
            :fieldsList="prizeFieldsList"
            :showSortControls="false"
            :notHidePagination="false"
          >
          </ListItems>
        </b-col>
        <b-col :lg="12">
          <div class="header">
            <div class="list-of-item">
              <p class="name-of-item">{{ $t('supervisor.listOfQuestions') }}</p>
            </div>
          </div>
          <b-table
            striped
            :head-variant="'gradient'"
            :tbody-class="'custom-body'"
            :items="competition?.questions"
            :fields="questionsFieldsList"
          >
            <template v-slot:cell(question_difficulty)="data">
              <div :class="data.item.question_difficulty.slug">
                {{ data.item.question_difficulty.name }}
              </div>
            </template>
            <template v-slot:cell(question)="data">
              <div v-if="typeof data.item.question === 'object'">
                <audio v-if="isAudio(data.item.question.question)" controls>
                  <source :src="data.item.question.question" type="audio/mp3"/>
                  Your browser does not support the audio tag.
                </audio>
                <img
                  v-else-if="isImage(data.item.question.question)"
                  class="question-image"
                  :src="data.item.question.question"
                  alt="Image"
                />
                <div v-else>{{ data.item.question.question }}</div>
              </div>
              <div v-else>{{ data.item.question }}</div>
            </template>
            <template v-slot:empty>
              <div class="text-center p-5">{{ $t('supervisor.noQuestions') }}</div>
            </template>
            <template v-slot:cell(id)="data">
              <div>
                {{ data.index + 1 }}
              </div>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import {getCompetitionByIdRequest} from "@/api/competition";
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import ListItems from "@/components/ListItems/index.vue";

export default {
  name: "view-competition",
  data() {
    return {
      competition: {},
    };
  },
  components: {
    ShowItem,
    ListItems,
  },
  methods: {
    spreateArray(value) {
      if (value) {
        return value
          .map((item) => {
            return item.name;
          })
          .join(", ");
      }
    },
    isAudio(url) {
      return /\.(mp3|ogg|wav)$/i.test(url);
    },
    isImage(url) {
      return /\.(png|jpg|jpeg|gif)$/i.test(url);
    },
  },
  mounted() {
    this.ApiService(getCompetitionByIdRequest(this.$route.params.id)).then((response) => {
      this.competition = response.data.data
    });
  },
  computed: {
    prizeFieldsList() {
      return [
        {key: "vid", label: this.$i18n.t('TABLE_FIELDS.id')},
        {key: "main_percentage", label: this.$i18n.t('TABLE_FIELDS.percentage_of')},
        {key: "max_percentage", label: this.$i18n.t('TABLE_FIELDS.percentage_to')},
        {key: "type.name", label: this.$i18n.t('seasonalMission.prizeType')},
        {key: "type", label: this.$i18n.t('seasonalMission.singlePrize')},
      ]
    },
    NotifacationFieldsList() {
      return [
        {key: "vid", label: this.$i18n.t('TABLE_FIELDS.id')},
        {key: "name", label: this.$i18n.t('seasonalMission.NoticeTitle')},
        {key: "start_date", label: this.$i18n.t('seasonalMission.DateTimeNotification')},
        {key: "original_url", label: this.$i18n.t('seasonalMission.NotificationSound')},
        {key: "description", label: this.$i18n.t('seasonalMission.NotificationText')},
      ]
    },
    questionsFieldsList() {
      return [
        {
          key: "vid",
          label: this.$i18n.t("#"),
        },
        {
          key: "question_type.name",
          label: this.$i18n.t("QUESTION_TYPE"),
        },
        {
          key: "sub_question_type.name",
          label: this.$i18n.t("SUB_QUESTION_TYPE"),
        },
        {
          key: "question",
          label: this.$i18n.t("QUESTION"),
        },
        {
          key: "question_difficulty",
          label: this.$i18n.t("QUESTION_DIFFICULTY_TABLE"),
        },
      ]
    },
  }
};
</script>

<style lang="scss" scoped>
@import "./index";
</style>
