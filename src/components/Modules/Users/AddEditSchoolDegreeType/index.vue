<template>
  <div class="container-fluid custom-container">
    <div class="add-edit-learning-skill">
      <div class="add-edit-term-form">
        <h3>{{ $route.params.id ? "تعديل نوع الشهادة" : "اضافة نوع شهادة" }}</h3>
        <validation-observer v-slot="{ invalid }" ref="addEditSchoolDegreeType">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="4" md="6" cols="12" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="name"
                    label="اسم نوع الشهادة"
                    name="نوع الشهادة"
                    placeholder="أدخل اسم نوع الشهادة"
                    :rules="'required|min:3|max:100'"
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
import Modal from "@/components/Shared/Modal/index.vue";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import { getSchoolDegreeTypeByIdRequest } from "@/api/school-degree-type";

export default {
  components: {
    Modal,
    TextField,
    Button,
    SelectSearch,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      name: "",
    };
  },
  methods: {
    onSubmit() {
      this.$refs.addEditSchoolDegreeType.validate().then((success) => {
        if (!success) return;
      });
      if (this.$route.params.id) {
        this.$emit("handleEditSchoolDegreeType", this.name);
      } else {
        this.$emit("handleAddSchoolDegreeType", this.name);
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getSchoolDegreeType() {
      if (this.$route.params.id) {
        this.ApiService(getSchoolDegreeTypeByIdRequest(this.$route.params.id)).then((response) => {
          this.name = response.data.data.name;
        });
      }
    },
  },
  mounted() {
    this.getSchoolDegreeType();
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
