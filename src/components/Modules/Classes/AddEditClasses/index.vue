<template>
  <div class="add-edit-country">
    <div class="container-fluid custom-container">
      <div class="add-edit-country-form">
        <h3>
          {{ classId ? $t("CLASS.EDIT") : $t("CLASS.ADD_NEW") }}
        </h3>
        <validation-observer v-slot="{ invalid }" ref="addEditClassForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="classData.name"
                    :label="$t('CLASS.name')"
                    :name="$t('CLASS.name')"
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
                  {{ classId ? $t("GLOBAL_EDIT") : $t("GLOBAL_SAVE") }}
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
import { getSingleClassRequest } from "@/api/class.js";
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
      classData: {
        name: ""
      },
      classId: this.$route.params.id,
    };
  },
  methods: {
    onSubmit() {
      this.$refs.addEditClassForm.validate().then((success) => {
        if (!success) return;
      });
      if (this.classId) {
        this.$emit("handleEditClass", this.classData);
      } else {
        this.$emit("handleAddClass", this.classData);
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getClassToEdit() {
      if (this.classId) {
        this.ApiService(getSingleClassRequest(this.classId)).then(
          (response) => {
            this.classData = response.data.data;
          }
        );
      }
    },
  },
  mounted() {
    this.getClassToEdit();
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
