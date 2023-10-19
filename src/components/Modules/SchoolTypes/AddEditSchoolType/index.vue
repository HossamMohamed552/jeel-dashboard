<template>
  <div class="add-edit-country">
    <div class="container-fluid custom-container">
      <div class="add-edit-country-form">
        <h3>
          {{ schoolTypeId ? $t("SCHOOL_TYPE.EDIT") : $t("SCHOOL_TYPE.ADD_NEW") }}
        </h3>
        <validation-observer v-slot="{ invalid }" ref="addEditSchoolTyeForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="schoolType.name"
                    :label="$t('SCHOOL_TYPE.name')"
                    :name="$t('SCHOOL_TYPE.name')"
                    :rules="'required|min:3|max:30'"
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
                  {{ schoolTypeId ? $t("GLOBAL_EDIT") : $t("GLOBAL_SAVE") }}
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
import { getSingleSchoolTypesRequest } from "@/api/schoolType.js";
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
      schoolType: {
        name: ""
      },
      schoolTypeId: this.$route.params.id,
    };
  },
  methods: {
    onSubmit() {
      this.$refs.addEditSchoolTyeForm.validate().then((success) => {
        if (!success) return;
      });
      if (this.schoolTypeId) {
        this.$emit("handleEditSchoolType", this.schoolType);
      } else {
        this.$emit("handleAddSchoolType", this.schoolType);
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getSchoolTypeToEdit() {
      if (this.schoolTypeId) {
        this.ApiService(getSingleSchoolTypesRequest(this.schoolTypeId)).then(
          (response) => {
            this.schoolType = response.data.data;
          }
        );
      }
    },
  },
  mounted() {
    this.getSchoolTypeToEdit();
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
