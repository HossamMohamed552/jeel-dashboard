<template>
  <div class="add-edit-country">
    <div class="container-fluid custom-container">
      <div class="add-edit-country-form">
        <h3>
          {{ bloomTypeId ? $t("BLOOM.EDIT") : $t("BLOOM.ADD") }}
        </h3>
        <validation-observer v-slot="{ invalid }" ref="addEditSchoolTyeForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="formValues.name"
                    :label="$t('GLOBAL_NAME')"
                    :name="$t('GLOBAL_NAME')"
                    :rules="'required'"
                  ></TextField>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="formValues.slug"
                    :label="$t('SLUG')"
                    :name="$t('SLUG')"
                    :rules="'required'"
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
                  {{ bloomTypeId ? $t("GLOBAL_EDIT") : $t("GLOBAL_SAVE") }}
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
import { getBloomCategoryByIdRequest } from "@/api/bloom.js";
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
      formValues: {
        name: "",
        slug: "",
      },
      bloomTypeId: this.$route.params.id,
    };
  },
  methods: {
    onSubmit() {
      this.$refs.addEditSchoolTyeForm.validate().then((success) => {
        if (!success) return;
      });
      if (this.bloomTypeId) {
        this.$emit("editBloomCategory", this.formValues);
      } else {
        this.$emit("addBloomCategory", this.formValues);
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getBloomCategoryById() {
      if (this.bloomTypeId) {
        this.ApiService(getBloomCategoryByIdRequest(this.bloomTypeId)).then((response) => {
          this.formValues = response.data.data;
        });
      }
    },
  },
  mounted() {
    this.getBloomCategoryById();
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
