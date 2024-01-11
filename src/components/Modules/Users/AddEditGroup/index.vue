<template>
  <div class="add-edit-group">
    <div class="container-fluid custom-container">
      <div class="add-edit-group-form">
        <h3>{{ $route.params.id ? $t("GROUP.EDIT") : $t("GROUP.ADD_NEW") }}</h3>
        <validation-observer v-slot="{ invalid }" ref="addEditGroupForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="4" class="mb-3">
                <div class="hold-field custom-text-field">
                  <TextField
                    v-model="createGroup.name"
                    :label="$t('GROUP.name')"
                    :placeholder="$t('GROUP.name_placeholder')"
                    :name="$t('GROUP.name')"
                    :rules="'required|min:3|max:100'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3">
                <div class="hold-field" v-if="countries">
                  <SelectSearch
                    v-model="createGroup.country_id"
                    :label="$t('GROUP.country')"
                    :placeholder="$t('GROUP.country_placeholder')"
                    :name="$t('GROUP.country')"
                    :options="countries"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="createGroup.owner_name"
                    :label="$t('GROUP.owner')"
                    :placeholder="$t('GROUP.owner_placeholder')"
                    :name="$t('GROUP.owner')"
                    :rules="'required|min:3|max:100'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="createGroup.music_status"
                    :label="$t('GROUP.music')"
                    :placeholder="$t('GROUP.music_placeholder')"
                    :name="$t('GROUP.music')"
                    :options="schoolGroupMusicStatus"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="createGroup.status"
                    :label="$t('GROUP.status')"
                    :placeholder="$t('GROUP.status_placeholder')"
                    :name="$t('GROUP.status')"
                    :options="schoolGroupStatus"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="12" class="mb-3">
                <span class="custom-label">{{ $t("GROUP.Description") }} </span>
                <TextAreaField
                  v-model="createGroup.description"
                  :rules="'min:5|max:250'"
                  rows="5"
                  :name="$t('GROUP.Description')"
                  :placeholder="$t('GROUP.DESCRIPTION_INPUT_PLACEHOLDER')"
                >
                </TextAreaField>
              </b-col>

              <b-col lg="12">
                <b-row>
                  <div class="hold-btns-form">
                    <Button @click="handleCancel" custom-class="cancel-btn margin">
                      {{ $t("GLOBAL_CANCEL") }}
                    </Button>
                    <Button
                      type="submit"
                      :loading="loading"
                      :disabled="invalid || canNotSend"
                      custom-class="submit-btn"
                    >
                      {{ $route.params.id ? $t("GLOBAL_EDIT") : $t("GLOBAL_SAVE") }}
                    </Button>
                  </div>
                </b-row>
              </b-col>
            </b-row>
          </form>
        </validation-observer>
      </div>
    </div>
  </div>
</template>
<script>
import TextField from "@/components/Shared/TextField/index.vue";
import RadioButton from "@/components/Shared/RadioButton/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {
  getSingleSchoolGroupRequest,
  getSchoolGroupById,
  getSchoolGroupMusicStatusEnum,
  getSchoolGroupStatusEnum,
} from "@/api/schoolGroup";
import { getAllSearchUsersRequest } from "@/api/user";
import { getAllCountryRequest } from "@/api/country";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";

export default {
  components: {
    SelectSearch,
    Modal,
    TextField,
    RadioButton,
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
      countries: null,
      schoolGroupMusicStatus: [],
      schoolGroupStatus: [],
      createGroup: {
        name: "",
        // type: '',
        music_status: "",
        status: "",
        owner_name: "",
        country_id: "",
        description: "",
      },
      defaultGroup: {
        name: "",
        // type: '',
        music_status: "",
        status: "",
        owner_name: "",
        country_id: "",
        description: "",
      },
    };
  },
  computed: {
    canNotSend() {
      // && (this.createGroup.type === this.defaultGroup.type)
      return (
        this.createGroup.name === this.defaultGroup.name &&
        this.createGroup.music_status === this.defaultGroup.music_status &&
        this.createGroup.status === this.defaultGroup.status &&
        this.createGroup.owner_name === this.defaultGroup.owner_name &&
        this.createGroup.country_id === this.defaultGroup.country_id
      );
    },
  },
  methods: {
    onSubmit() {
      this.$refs.addEditGroupForm.validate().then((success) => {
        if (!success) return;
      });
      if (this.$route.params.id) {
        this.$emit("handleEditGroup", this.createGroup);
      } else {
        this.$emit("handleAddGroup", this.createGroup);
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getSchoolStatus() {
      this.ApiService(getSchoolGroupStatusEnum()).then((response) => {
        this.schoolGroupStatus = response.data.data;
      });
    },
    getSchoolMusicStatus() {
      this.ApiService(getSchoolGroupMusicStatusEnum()).then((response) => {
        this.schoolGroupMusicStatus = response.data.data;
      });
    },
    getGroupToEdit() {
      if (this.$route.params.id) {
        this.ApiService(getSchoolGroupById(this.$route.params.id)).then((response) => {
          this.createGroup.name = response.data.data.name;
          this.defaultGroup.name = response.data.data.name;
          this.createGroup.type = response.data.data.type;
          this.defaultGroup.type = response.data.data.type;
          this.createGroup.music_status = response.data.data.music_status.id;
          this.defaultGroup.music_status = response.data.data.music_status.id;
          this.createGroup.status = response.data.data.status.id;
          this.defaultGroup.status = response.data.data.status.id;
          this.createGroup.owner_name = response.data.data.owner_name;
          this.defaultGroup.owner_name = response.data.data.owner_name;
          this.createGroup.country_id = response.data.data.country.id;
          this.defaultGroup.country_id = response.data.data.country.id;
          this.createGroup.description = response.data.data.description;
          this.defaultGroup.description = response.data.data.description;
        });
      }
    },

    getAllCountries() {
      this.ApiService(getAllCountryRequest()).then((response) => {
        this.countries = response.data.data;
      });
    },
  },
  mounted() {
    this.getGroupToEdit();
    this.getAllCountries();
    this.getSchoolStatus();
    this.getSchoolMusicStatus();
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
