<template>
  <div class="add-edit-country">
    <div class="container-fluid custom-container">
      <div class="add-edit-country-form">
        <h3>
          {{ staffEnrollId ? $t("STAFF_ENROLL.EDIT") : $t("STAFF_ENROLL.ADD_NEW") }}
        </h3>
        <validation-observer v-slot="{ invalid }" ref="addEditStaffEnrollForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="staffEnroll.name"
                    :label="$t('STAFF_ENROLL.name')"
                    :name="$t('STAFF_ENROLL.name')"
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
                  {{ staffEnrollId ? $t("GLOBAL_EDIT") : $t("GLOBAL_SAVE") }}
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
import { getSingleStaffEnrollRequest } from "@/api/staffEnroll.js";
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
      staffEnroll: {
        name: ""
      },
      staffEnrollId: this.$route.params.id,
    };
  },
  methods: {
    onSubmit() {
      this.$refs.addEditStaffEnrollForm.validate().then((success) => {
        if (!success) return;
      });
      if (this.staffEnrollId) {
        this.$emit("handleEditStaffEnroll", this.staffEnroll);
      } else {
        this.$emit("handleAddStaffEnroll", this.staffEnroll);
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getStaffEnrollToEdit() {
      if (this.staffEnrollId) {
        this.ApiService(getSingleStaffEnrollRequest(this.staffEnrollId)).then(
          (response) => {
            this.staffEnroll = response.data.data;
          }
        );
      }
    },
  },
  mounted() {
    this.getStaffEnrollToEdit();
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
