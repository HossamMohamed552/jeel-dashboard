<template>
  <div class="add-edit-country">
    <div class="container-fluid custom-container">
      <div class="add-edit-country-form">
        <h3>
          {{
            studentEnrollId
              ? $t("STUDENT_ENROLL.EDIT")
              : $t("STUDENT_ENROLL.ADD_NEW")
          }}
        </h3>
        <validation-observer
          v-slot="{ invalid }"
          ref="addEditStudentEnrollForm"
        >
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="studentEnroll.user_id"
                    :label="$t('STUDENT_ENROLL.USER')"
                    :name="$t('STUDENT_ENROLL.USER')"
                    :options="studentUsers"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="studentEnroll.class_id"
                    :label="$t('STUDENT_ENROLL.CLASS')"
                    :name="$t('STUDENT_ENROLL.CLASS')"
                    :options="studentClasses"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                  ></SelectSearch>
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
import Button from "@/components/Shared/Button/index.vue";
import { getSingleStudentEnrollRequest } from "@/api/studentEnroll.js";
import Modal from "@/components/Shared/Modal/index.vue";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
export default {
  components: {
    Modal,
    Button,
    SelectSearch,
  },
  props: {
    schoolId: {
      type: Number,
      default: null,
    },
    studentUsers: {
      type: Array,
      default: () => {},
    },
    studentClasses: {
      type: Array,
      default: () => {},
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      studentEnroll: {
        school_id: this.schoolId,
        user_id: null,
        class_id: null,
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
        this.ApiService(
          getSingleStudentEnrollRequest(this.studentEnrollId)
        ).then((response) => {
          const res = response.data.data;
          this.studentEnroll.user_id = res.user.id;
          this.studentEnroll.class_id = res.class.id;
        });
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
