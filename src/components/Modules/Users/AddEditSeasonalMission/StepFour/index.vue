<template>
<div>
  <validation-observer v-slot="{ invalid }" ref="stepFourForm">
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
            :disabled="invalid || !voiceUploaded"
            type="submit"
            :loading="loading"
            @click="handleAdd"
            custom-class="submit-btn"
          >
            {{ $t('ADD_ANSWER') }}
          </Button>
        </b-col>
      </template>
    </GenericForm>
  </validation-observer>
  <ListItems
    class="seasonal-mission-custom-list-item"
    :tableItems="notifactionGroup"
    :headerName="$t('seasonalMission.notification')"
    :fieldsList="fieldsList"
    :permission_delete="'add-seasonal-missions'"
    :showSortControls="false"
    :not-hide-pagination="false"
    @deleteItem="deleteItem($event)"
  >
  </ListItems>
  <div class="buttons-container">
    <slot></slot>
    <div class="steps">
      <Button custom-class="cancel-btn margin" v-if="currentStep > 0" @click="prevStep">
        {{ $t('GLOBAL_BACK') }}
      </Button>
      <Button custom-class="submit-btn"
              :disabled="!isNextStep && notifactionGroup.length === 0" @click="nextStep">
        {{ $t('GLOBAL_NEXT') }}
      </Button>
    </div>
  </div>
</div>
</template>

<script>
import GenericForm from "@/components/Shared/GenericForm";
import ListItems from "@/components/ListItems/index.vue";
import {mapActions, mapGetters} from "vuex";
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
      isNextStep: false,
      voiceUploaded: false,
      loading: false,
      entry: {},
      watchedField: ["name", "start_date", "description"],
      notifactionGroup: [],
      notifactionIndex: 0,
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
    deleteItem($event) {
      this.$store.commit('DELETE_NOTIFICATION_FROM_LIST', $event)
    },
    handleInput(key, value) {
      if (typeof value == "object") {
        this.entry["uuid"] = value.uuid;
        this.entry["audio"] = value.uuid;
        this.entry["original_url"] = value.url;
        this.voiceUploaded = true;
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
          console.log('field.key',field.key)
          console.log('field',field)
          try {
            if (field.type === "date") this.$set(this.entry, field.key, moment(field.value, "DD-MM-YYYY").format("YYYY-MM-DD"));
            else this.$set(this.entry, field.key, field.value);
            field.value = "";
          } catch (error) {
            console.error(`Error updating field ${field.key}:`, error);
          }
        }
      });
      if (this.notifactionGroup.length === 0) {
        this.notifactionIndex++;
      } else {
        this.notifactionIndex = this.notifactionGroup[this.notifactionGroup.length - 1].id + 1;
      }
      this.entry.id = this.notifactionIndex;
      this.addNotification(this.entry);
      this.entry = {};
      this.$nextTick(() => {
        this.$refs.stepFourForm.reset()
        this.voiceUploaded = false;
      })
      setTimeout(()=>{
        this.removeFile()
      },1000)
      this.isNextStep = true;
    },
  },
  computed: {
    fieldsList() {
      return [
        {key: "vid", label: this.$i18n.t('TABLE_FIELDS.id')},
        {key: "name", label: this.$i18n.t('seasonalMission.NoticeTitle')},
        {key: "start_date", label: this.$i18n.t('seasonalMission.DateTimeNotification')},
        {key: "original_url", label: this.$i18n.t('seasonalMission.NotificationSound')},
        {key: "description", label: this.$i18n.t('seasonalMission.NotificationText')},
        {key: "actions", label: this.$i18n.t('TABLE_FIELDS.actions')},
      ]
    },
    ...mapGetters(["getNotificationsList"]),
  },
  async mounted() {
    this.notifactionGroup = this.getNotificationsList;
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
  align-items: flex-end;
  justify-content: flex-end;
}
</style>
