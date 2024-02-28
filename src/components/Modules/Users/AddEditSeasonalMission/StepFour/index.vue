<template>
  <validation-observer v-slot="{ invalid }" ref="stepTwoForm">
    <GenericForm
      :schema="stepForm"
      @handleInput="handleInput"
      :loading="loading"
      :submitedForm="false"
      :invalid="invalid"
    >
      <template v-slot:customSubmit>
        <b-col class="adding" lg="12">
          <Button
            :disabled="invalid"
            type="submit"
            :loading="loading"
            @click="handleAdd"
            custom-class="submit-btn"
          >
            إضافة
          </Button>
        </b-col>
      </template>
      <ListItems
        class="seasonal-mission-custom-list-item"
        :tableItems="notifactionGroup"
        :headerName="'قائمة الإشعار'"
        :fieldsList="fieldsList"
        :showSortControls="false"
      >
      </ListItems>
      <div class="buttons-container">
        <slot></slot>
        <div class="steps">
          <Button custom-class="cancel-btn margin" v-if="currentStep > 0" @click="prevStep">
            السابق
          </Button>

          <Button custom-class="submit-btn" @click="nextStep"> التالي </Button>
        </div>
      </div>
    </GenericForm>
  </validation-observer>
</template>

<script>
import GenericForm from "@/components/Shared/GenericForm";
import ListItems from "@/components/ListItems/index.vue";
import { mapActions, mapGetters } from "vuex";
import moment from "moment";

export default {
  components: {
    GenericForm,
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
  },
  data() {
    return {
      loading: false,
      entry: {},
      watchedField: ["name", "start_date", "description"],
      notifactionGroup: [],
      notifactionIndex: 0,
      fieldsList: [
        { key: "id", label: "التسلسل" },
        { key: "name", label: "عنوان الإشعار" },
        { key: "start_date", label: "تاريخ ووقت الإشعار" },
        { key: "original_url", label: "صوت الإشعار" },
        { key: "description", label: "نص الإشعار" },
      ],
    };
  },
  methods: {
    ...mapActions(["addNotification"]),
    nextStep() {
      this.$emit("nextStep");
    },
    prevStep() {
      this.$emit("prevStep");
    },
    handleCancel() {
      this.$emit("onSubmit", this.stepForm);
    },
    handleInput(key, value) {
      if (typeof value == "object") {
        this.entry["uuid"] = value.uuid;
        this.entry["audio"] = value.uuid;
        this.entry["original_url"] = value.url;
      } else {
        this.entry[key] = value;
      }
    },
    removeFile() {
      let removeButton = document.getElementById("removeFile");
      removeButton.click();
    },
    handleAdd() {
      this.stepForm.forEach((field) => {
        if (this.watchedField.includes(field.key)) {
          try {
            if (field.type === "date")
              this.$set(
                this.entry,
                field.key,
                moment(field.value, "DD-MM-YYYY").format("YYYY-MM-DD")
              );
            else this.$set(this.entry, field.key, field.value);
            field.value = "";
          } catch (error) {
            console.error(`Error updating field ${field.key}:`, error);
          }
        }
      });

      if (this.notifactionGroup.length == 0) this.notifactionIndex++;
      else this.notifactionIndex = this.notifactionGroup[this.notifactionGroup.length - 1].id + 1;
      this.entry.id = this.notifactionIndex;
      this.addNotification(this.entry);
      this.entry = {};
      this.removeFile();
    },
  },
  computed: {
    ...mapGetters(["getNotificationsList"]),
  },
  async mounted() {
    this.notifactionGroup = this.getNotificationsList;
    if (this.$route.params.id) {
      this.notifactionGroup.forEach((notifaction) => {
        notifaction["original_url"] = notifaction.audio;
      });
    }
  },
  watch: {
    getNotificationsList() {
      this.notifactionGroup = this.getNotificationsList;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../index.scss";

.adding {
  display: flex;
  align-items: end;
  justify-content: flex-end;
}
</style>
