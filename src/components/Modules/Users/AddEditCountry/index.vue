<template>
  <div class="add-edit-country">
    <div class="container-fluid custom-container">
      <div class="add-edit-country-form">
        <h3>{{ $route.params.id ? $t("COUNTRY.EDIT") : $t("COUNTRY.ADD_NEW") }}</h3>
        <validation-observer v-slot="{ invalid }" ref="addEditCountryForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="createCountry.name"
                    :label="$t('COUNTRY.countryName')"
                    :name="$t('COUNTRY.countryName')"
                    :rules="'required|min:3'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="createCountry.code"
                    :label="$t('COUNTRY.countryCode')"
                    :name="$t('COUNTRY.countryCode')"
                    :rules="'required|min:2'"
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
import {getSingleCountryRequest} from "@/api/country";
import Modal from "@/components/Shared/Modal/index.vue";
export default {
  components: {
    Modal,
    TextField,
    Button
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      createCountry: {
        name: "",
        code: ""
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.addEditCountryForm.validate().then((success) => {
        if (!success) return;
      });
      if (this.$route.params.id) {
        this.$emit('handleEditCountry', this.createCountry)
      } else {
        this.$emit('handleAddCountry', this.createCountry)
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getCountryToEdit() {
      if (this.$route.params.id) {
        this.ApiService(getSingleCountryRequest(this.$route.params.id)).then((response) => {
          this.createCountry = response.data.data
        })
      }
    }
  },
  mounted() {
    this.getCountryToEdit()
  }
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
