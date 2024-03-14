<template>
  <div class="add-edit-competition">
    <div class="container-fluid custom-container">
      <b-row>
        <b-col v-for="field in stepForm" :key="field.key" :lg="field.col">
          <ShowItem
            v-if="field.type === 'select'"
            class="divider-show"
            :title="field?.label"
            :subtitle="Array.isArray(field?.name) ? field?.name.join(', ') : field?.name"
          />
          <ShowItem v-else class="divider-show" :title="field?.label" :subtitle="field?.value" />
        </b-col>
        <b-col :lg="12">
          <div class="list seasonal-mission-custom-list-item">
            <div class="header">
              <div class="list-of-item">
                <p class="name-of-item">قائمة الاسئلة</p>
              </div>
            </div>
            <b-table
              striped
              :head-variant="'gradient'"
              :tbody-class="'custom-body'"
              :items="questions"
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
                    class="question-image"
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
          </div>
        </b-col>
        <b-col :lg="12">
          <ListItems
            class="seasonal-mission-custom-list-item"
            :tableItems="notificationsList"
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
            :tableItems="prizesList"
            :headerName="'قائمة الجوائز'"
            :fieldsList="prizeFieldsList"
            :showSortControls="false"
            :notHidePagination="false"
          >
          </ListItems>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="12">
          <div class="buttons-container">
            <slot></slot>
            <div class="steps">
              <Button custom-class="cancel-btn margin" v-if="currentStep > 0" @click="prevStep">
                السابق
              </Button>

              <Button custom-class="submit-btn" @click="submitForm"> إنهاء </Button>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import { postAddCompetitionRequest, putEditCompetitionRequest } from "@/api/competition";
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  components: {
    ShowItem,
    ListItems,
  },
  props: {
    currentStep: {
      type: Number,
      default: 0,
    },
    stepForm: {
      type: Array,
      default: () => [],
    },
    questions_ids: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      prizesList: [],
      questions: [],
      notificationsList: [],
      prizeFieldsList: [
        { key: "id", label: "التسلسل" },
        { key: "main_percentage", label: "من نسبة" },
        { key: "max_percentage", label: "إلى نسبة" },
        { key: "prizeable_type_name", label: "نوع الجائزة" },
        { key: "prizeable_id_name", label: "الجائزة" },
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
      NotifacationFieldsList: [
        { key: "id", label: "التسلسل" },
        { key: "name", label: "عنوان اللإشعار" },
        { key: "start_date", label: "تاريخ ووقت الإشعار" },
        { key: "original_url", label: "صوت الإشعار" },
        { key: "description", label: "نص الإشعار" },
      ],
      submittedForm: {},
      loading: false,
    };
  },
  methods: {
    isAudio(url) {
      return /\.(mp3|ogg|wav)$/i.test(url);
    },
    isImage(url) {
      return /\.(png|jpg|jpeg|gif)$/i.test(url);
    },
    async submitForm() {
      await this.updateFields();
      if (this.$route.params.id) this.handleEditCompetition();
      else this.handleAddCompetition();
    },
    handleAddCompetition() {
      this.ApiService(postAddCompetitionRequest(this.submittedForm)).then(() => {
        this.$router.push("/dashboard/competitions");
      });
    },
    handleEditCompetition() {
      this.submittedForm["_method"] = "PUT";
      console.log(this.submittedForm);
      this.ApiService(putEditCompetitionRequest(this.submittedForm, this.$route.params.id)).then(
        () => {
          this.$router.push("/dashboard/competitions");
        }
      );
    },
    prevStep() {
      this.$emit("prevStep");
    },
    async updateFields() {
      // Generic method to update createSchool object based on the fieldArray
      this.stepForm.forEach((field) => {
        try {
          if (field.type === "date")
            this.$set(
              this.submittedForm,
              field.key,
              moment(field.value, "DD-MM-YYYY").format("YYYY-MM-DD")
            );
          else this.$set(this.submittedForm, field.key, field.value);
        } catch (error) {
          console.error(`Error updating field ${field.key}:`, error);
        }
      });
      this.submittedForm["prizes"] = this.prizesList;
      this.submittedForm["notifications"] = this.notificationsList;
      if (this.$route.params.id) {
        this.submittedForm["questions"] = this.questions.map((item) => item.id);
      } else this.submittedForm["questions"] = this.questions_ids;
    },
  },
  async mounted() {},
  computed: {
    ...mapGetters(["getPrizesList", "getNotificationsList", "getQuestionsList"]),

    showValue(values) {
      if (typeof values == Array) {
        return "array";
      }
      return values;
    },
  },
  mounted() {
    this.prizesList = this.getPrizesList;
    this.notificationsList = this.getNotificationsList;
    this.questions = this.getQuestionsList;
  },
  watch: {
    getPrizesList() {
      this.prizesList = this.getPrizesList;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";

.adding {
  display: flex;
  align-items: end;
  justify-content: flex-end;
}
</style>
