<template>
  <div class="container-fluid custom-container">
    <div class="add-edit-form">
      <b-row>
        <b-col lg="4">
          <ShowItem class="divider-show" title="اسم المسابقة" :subtitle="competition?.name" />
        </b-col>
        <b-col lg="4">
          <ShowItem
            class="divider-show"
            title="الصفوف المدرسية"
            :subtitle="competition?.level?.name"
          />
        </b-col>
        <b-col lg="4">
          <ShowItem
            class="divider-show"
            title="المهام"
            :subtitle="spreateArray(competition?.mission)"
          />
        </b-col>
        <b-col lg="4">
          <ShowItem
            class="divider-show"
            title="الاهداف التعليمية"
            :subtitle="competition?.objective?.name"
          />
        </b-col>
        <b-col lg="4">
          <ShowItem
            class="divider-show"
            title="مخرجات التعلم"
            :subtitle="competition?.outcome?.name"
          />
        </b-col>
        <b-col lg="2">
          <ShowItem
            class="divider-show"
            title="بداية المسابقة"
            :subtitle="competition?.start_date"
          />
        </b-col>
        <b-col lg="2">
          <ShowItem class="divider-show" title="نهاية المسابقة" :subtitle="competition?.end_date" />
        </b-col>
        <b-col lg="4">
          <ShowItem
            class="divider-show"
            title="المدة الزمنية (بالساعات)"
            :subtitle="competition?.competition_time"
          />
        </b-col>
        <b-col :lg="12">
          <ListItems
            class="seasonal-mission-custom-list-item"
            :tableItems="competition?.notifications"
            :headerName="'قائمة الإشعار'"
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
            :headerName="'قائمة الجوائز'"
            :fieldsList="prizeFieldsList"
            :showSortControls="false"
            :notHidePagination="false"
          >
          </ListItems>
        </b-col>
        <b-col :lg="12">
          <div class="header">
            <div class="list-of-item">
              <p class="name-of-item">قائمة الاسئلة</p>
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
                  <source :src="data.item.question.question" type="audio/mp3" />
                  Your browser does not support the audio tag.
                </audio>
                <img
                  v-else-if="isImage(data.item.question.question)"
                  :src="data.item.question.question"
                  alt="Image"
                />
                <div v-else>{{ data.item.question.question }}</div>
              </div>
              <div v-else>{{ data.item.question }}</div>
            </template>
            <template v-slot:empty>
              <div class="text-center p-5">لا يوجد اسئلة لعرضها</div>
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
import { getCompetitionByIdRequest } from "@/api/competition";
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import ListItems from "@/components/ListItems/index.vue";

export default {
  name: "view-competition",
  data() {
    return {
      competition: {},
      prizeFieldsList: [
        { key: "id", label: "التسلسل" },
        { key: "main_percentage", label: "من نسبة" },
        { key: "max_percentage", label: "إلى نسبة" },
        { key: "prizeable_type_name", label: "نوع الجائزة" },
        { key: "prizeable_id_name", label: "الجائزة" },
      ],
      NotifacationFieldsList: [
        { key: "id", label: "التسلسل" },
        { key: "name", label: "عنوان اللإشعار" },
        { key: "start_date", label: "تاريخ ووقت الإشعار" },
        { key: "original_url", label: "صوت الإشعار" },
        { key: "description", label: "نص الإشعار" },
      ],
      questionsFieldsList: [
        {
          key: "id",
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
      ],
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
      console.log(response.data.data);
      this.competition = response.data.data;
    });
  },
};
</script>

<style lang="scss" scoped>
@import "./index";
</style>
