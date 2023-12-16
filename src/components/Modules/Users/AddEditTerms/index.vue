<template>
  <div class="add-edit-term">
    <div class="container-fluid custom-container">
      <div class="add-edit-term-form">
        <h3>{{ $route.params.id ? $t("TERM.EDIT") : $t("TERM.ADD_NEW") }}</h3>
        <validation-observer v-slot="{ invalid }" ref="addEditTermForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="createTerm.name"
                    :label="$t('TERM.name')"
                    :name="$t('TERM.name')"
                    :rules="'required|min:3|max:30'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="createTerm.min_missions"
                    :label="$t('LEVEL.min_levels')"
                    :name="$t('LEVEL.min_levels')"
                    :rules="'required|numeric|max_value:20'"
                  ></TextField>
                </div>
              </b-col>
              <!-- <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="createTerm.levels"
                    :label="$t('TERM.level')"
                    :name="$t('TERM.level')"
                    :options="levels"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                    multiple
                  ></SelectSearch>
                </div>
              </b-col> -->
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
import { getSingleTermsRequest } from "@/api/term";
import { getAllLevelsRequest } from "@/api/level";

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
      levels: [],
      createTerm: {
        min_missions: null,
        name: "",
        levels: [],
        school_id: null,
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.addEditTermForm.validate().then((success) => {
        if (!success) return;
      });
      if (this.$route.params.id) {
        this.$emit("handleEditTerm", { ...this.createTerm, levels: [1] });
      } else {
        this.$emit("handleAddTerm", { ...this.createTerm, levels: [1] });
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getTermToEdit() {
      if (this.$route.params.id) {
        this.ApiService(getSingleTermsRequest(this.$route.params.id)).then((response) => {
          this.createTerm.name = response.data.data.name;
          this.createTerm.min_missions = response.data.data.min_missions;
          this.createTerm.levels = response.data.data.levels.map((item) => item.id);
        });
      }
    },
    getAllLevels() {
      this.ApiService(getAllLevelsRequest()).then((response) => {
        this.levels = response.data.data;
      });
    },
  },
  mounted() {
    this.getTermToEdit();
    this.getAllLevels();
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
