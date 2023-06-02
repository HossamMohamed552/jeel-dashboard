<template>
  <div class="add-edit-country">
    <div class="container-fluid custom-container">
      <div class="add-edit-country-form">
        <h3>
          {{ $route.params.id ? $t("PACKAGE.EDIT") : $t("PACKAGE.ADD_NEW") }}
        </h3>
        <validation-observer v-slot="{ invalid }" ref="addEditPackageForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="createPackage.name"
                    :label="$t('PACKAGE.name')"
                    :name="$t('PACKAGE.name')"
                    :rules="'required'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="createPackage.price"
                    :label="$t('PACKAGE.price')"
                    :name="$t('PACKAGE.price')"
                    :rules="'required'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="createPackage.classes_count"
                    :label="$t('PACKAGE.classes_count')"
                    :name="$t('PACKAGE.classes_count')"
                    :rules="'required'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <TextAreaField
                    v-model="createPackage.description"
                    :label="$t('PACKAGE.description')"
                    :name="$t('PACKAGE.description')"
                    :rules="'required'"
                  ></TextAreaField>
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
                  {{ $route.params.id ? $t("GLOBAL_EDIT") : $t("GLOBAL_SAVE") }}
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
import { getSinglePackagesRequest } from "@/api/packages";
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
      createPackage: {
        name: "",
        price: "",
        classes_count: "",
        description: ""
      },
      packageId: this.$route.params.id
    };
  },
  methods: {
    onSubmit() {
      this.$refs.addEditPackageForm.validate().then((success) => {
        if (!success) return;
      });
      if (this.packageId) {
        this.$emit("handleEditPackage", this.createPackage);
      } else {
        this.$emit("handleAddPackage", this.createPackage);
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getPackageToEdit() {
      if (this.packageId) {
        this.ApiService(getSinglePackagesRequest(this.packageId)).then(
          (response) => {
            this.createPackage = response.data.data;
          }
        );
      }
    },
  },
  mounted() {
    this.getPackageToEdit();
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
