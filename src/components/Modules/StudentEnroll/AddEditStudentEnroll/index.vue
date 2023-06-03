<template>
  <div class="add-edit-country">
    <div class="container-fluid custom-container">
      <div class="add-edit-country-form">
        <h3>
          {{ studentEnrollId ? $t("STUDENT_ENROLL.EDIT") : $t("STUDENT_ENROLL.ADD_NEW") }}
        </h3>
        <validation-observer v-slot="{ invalid }" ref="addEditStudentEnrollForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="studentEnroll.name"
                    :label="$t('STUDENT_ENROLL.name')"
                    :name="$t('STUDENT_ENROLL.name')"
                    :rules="'required|min:3'"
                  ></TextField>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <div class="hold-btns-form">
                <Button @click="handleCancel" custom-class="cancel-btn margin">
                  {{ $t("GLOBAL_CANCEL") }}
                </Button>
                <Button
                  type="submit"
                  :loading="loading"
                  :disabled="invalid"
                  custom-class="submit-btn"
                >
                  {{ studentEnrollId ? $t("GLOBAL_EDIT") : $t("GLOBAL_SAVE") }}
                </Button>
              </div>
            </b-row>
          </form>
        </validation-observer>
      </div>
    </div>
  </div>
</template>
<script>
import TextField from "@/components/Shared/TextField/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import { getSingleStudentEnrollRequest } from "@/api/studentEnroll.js";
import Modal from "@/components/Shared/Modal/index.vue";
export default {
  components: {
    Modal,
    TextField,
    Button,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      studentEnroll: {
        name: ""
      },
      studentEnrollId: this.$route.params.id,
    };
  },
  methods: {
    onSubmit() {
      this.$refs.addEditStudentEnrollForm.validate().then((success) => {
        if (!success) return;
      });
      if (this.studentEnrollId) {
        this.$emit("handleEditStudentEnroll", this.studentEnroll);
      } else {
        this.$emit("handleAddStudentEnroll", this.studentEnroll);
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getStudentEnrollToEdit() {
      if (this.studentEnrollId) {
        this.ApiService(getSingleStudentEnrollRequest(this.studentEnrollId)).then(
          (response) => {
            this.studentEnroll = response.data.data;
          }
        );
      }
    },
  },
  mounted() {
    this.getStudentEnrollToEdit();
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
