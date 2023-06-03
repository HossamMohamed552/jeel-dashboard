<template>
  <div class="add-edit-country">
    <div class="container-fluid custom-container">
      <div class="add-edit-country-form">
        <h3>{{ $route.params.id ? $t("LEVEL.EDIT") : $t("LEVEL.ADD_NEW") }}</h3>
        <validation-observer v-slot="{ invalid }" ref="addEditCountryForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="createLevel.name"
                    :label="$t('LEVEL.name')"
                    :name="$t('LEVEL.countryName')"
                    :rules="'required|min:3'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="createLevel.min_levels"
                    :label="$t('LEVEL.min_levels')"
                    :name="$t('LEVEL.min_levels')"
                    :rules="'required|numeric'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3">
                <SelectSearch
                  multiple
                  v-model="createLevel.school_groups"
                  :label="$t('TABLE_FIELDS.school_group')"
                  :name="$t('TABLE_FIELDS.school_group')"
                  :options="schoolGroupOptions"
                  :reduce="(option) => option.id"
                  :get-option-label="(option) => option.name"
                  :rules="'required'"
                ></SelectSearch>
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
import { getSingleCountryRequest } from "@/api/country";
import Modal from "@/components/Shared/Modal/index.vue";
import { getSingleLevelRequest } from "@/api/level";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";

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
    schoolGroupOptions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      createLevel: {
        name: "",
        min_levels: null,
        themes: [1],
        school_groups: [],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.addEditCountryForm.validate().then((success) => {
        if (!success) return;
      });
      if (this.$route.params.id) {
        this.$emit("handleEditLevel", this.createLevel);
      } else {
        this.$emit("handleAddLevel", this.createLevel);
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getLevelToEdit() {
      if (this.$route.params.id) {
        this.ApiService(getSingleLevelRequest(this.$route.params.id)).then((response) => {
          this.createLevel.name = response.data.data.name;
          this.createLevel.min_levels = response.data.data.min_levels;
          this.createLevel.school_groups = response.data.data.school_groups.map(e => e.id);
        });
      }
    },
  },
  mounted() {
    this.getLevelToEdit();
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
