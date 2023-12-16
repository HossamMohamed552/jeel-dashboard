<template>
  <div class="add-edit-currency">
    <div class="container-fluid custom-container">
      <div class="add-edit-term-form">
        <h3>{{ $route.params.id ? "تعديل العملة" : "اضافة عملة جديد" }}</h3>
        <validation-observer v-slot="{ invalid }" ref="addEditCurrency">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="name"
                    label="الاسم"
                    name="الاسم"
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
import { getCurrencyByIdRequest } from "@/api/currency";

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
      this.$refs.addEditCurrency.validate().then((success) => {
        if (!success) return;
      });
      if (this.$route.params.id) {
        this.$emit("handleEditCurrency", this.name);
      } else {
        this.$emit("handleAddCurrency", this.name);
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getCurrency() {
      if (this.$route.params.id) {
        this.ApiService(getCurrencyByIdRequest(this.$route.params.id)).then((response) => {
          this.name = response.data.data.name;
        });
      }
    },
  },
  mounted() {
    this.getCurrency();
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
