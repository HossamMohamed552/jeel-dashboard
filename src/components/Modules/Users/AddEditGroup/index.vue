<template>
  <div class="add-edit-group">
    <div class="container-fluid custom-container">
      <div class="add-edit-group-form">
        <h3>{{ $route.params.id ? $t("GROUP.EDIT") : $t("GROUP.ADD_NEW") }}</h3>
        <validation-observer v-slot="{ invalid }" ref="addEditGroupForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="createGroup.name"
                    :label="$t('GROUP.name')"
                    :name="$t('GROUP.name')"
                    :rules="'required|min:3|max:30'"
                  ></TextField>
                </div>
              </b-col>
              <!--              <b-col lg="3" class="mb-3 radio-item">-->
              <!--                <div class="hold-field">-->
              <!--                  <ValidationProvider rules="required" v-slot="{ errors }" class="d-flex justify-content-start align-items-start">-->
              <!--                    <span><i class="fa-solid fa-asterisk"></i></span> <b-form-group :label="$t('GROUP.type')" class="group-type">-->
              <!--                      <b-form-radio v-model="createGroup.type" value="national" name="group-type">-->
              <!--                        محلى-->
              <!--                      </b-form-radio>-->
              <!--                      <b-form-radio v-model="createGroup.type" value="international"-->
              <!--                                    name="group-type">دولى-->
              <!--                      </b-form-radio>-->
              <!--                    </b-form-group>-->
              <!--                    <b-form-invalid-feedback v-for="(error, index) in errors" :key="index">-->
              <!--                      {{ error }}-->
              <!--                    </b-form-invalid-feedback>-->
              <!--                  </ValidationProvider>-->
              <!--                </div>-->
              <!--              </b-col>-->
              <b-col lg="3" class="mb-3 radio-item">
                <div class="hold-field">
                  <ValidationProvider rules="required" v-slot="{ errors }">
                    <label for="music" class="group-type d-inline-block">{{
                      $t("GROUP.music")
                    }}</label>
                    <span><i class="fa-solid fa-asterisk"></i></span>
                    <b-form-group
                      id="music"
                      class="d-flex justify-content-start align-items-start mt-3"
                    >
                      <b-form-radio
                        v-model="createGroup.music_status"
                        value="0"
                        name="group-music_type"
                        >أكابيلا
                      </b-form-radio>
                      <b-form-radio
                        v-model="createGroup.music_status"
                        value="1"
                        name="group-music_type"
                        >بموسيقى
                      </b-form-radio>
                    </b-form-group>
                    <b-form-invalid-feedback
                      v-for="(error, index) in errors"
                      :key="index"
                    >
                      {{ error }}
                    </b-form-invalid-feedback>
                  </ValidationProvider>
                </div>
              </b-col>
              <b-col lg="3" class="mb-3 radio-item">
                <div class="hold-field">
                  <ValidationProvider
                    rules="required"
                    v-slot="{ errors }"
                    
                  >
                    <label for="active" class="group-type d-inline-block">{{
                      $t("GROUP.status")
                    }}</label>
                    <span><i class="fa-solid fa-asterisk"></i></span>
                    <b-form-group
                      id="active"
                      class="d-flex justify-content-start align-items-start mt-3"
                    >
                      <b-form-radio
                        v-model="createGroup.status"
                        value="0"
                        name="group-status"
                        >غير مفعل
                      </b-form-radio>
                      <b-form-radio
                        v-model="createGroup.status"
                        value="1"
                        name="group-status"
                        >مفعل
                      </b-form-radio>
                    </b-form-group>
                    <b-form-invalid-feedback
                      v-for="(error, index) in errors"
                      :key="index"
                    >
                      {{ error }}
                    </b-form-invalid-feedback>
                  </ValidationProvider>
                </div>
              </b-col>
              <!--              <b-col lg="4" class="mt-5">-->
              <!--                <div class="hold-field">-->
              <!--                  <TextField-->
              <!--                    v-model="createGroup.email"-->
              <!--                    :label="$t('GROUP.email')"-->
              <!--                    :name="$t('GROUP.email')"-->
              <!--                    :rules="'email'"-->
              <!--                  ></TextField>-->
              <!--                </div>-->
              <!--              </b-col>-->
              <b-col lg="6" class="mt-5">
                <div class="hold-field" v-if="users">
                  <SelectSearch
                    v-model="createGroup.owner_id"
                    :label="$t('GROUP.owner')"
                    :name="$t('GROUP.owner')"
                    :options="users"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="6" class="mt-5">
                <div class="hold-field" v-if="countries">
                  <SelectSearch
                    v-model="createGroup.country_id"
                    :label="$t('GROUP.country')"
                    :name="$t('GROUP.country')"
                    :options="countries"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="12">
                <b-row>
                  <div class="hold-btns-form">
                    <Button
                      @click="handleCancel"
                      custom-class="cancel-btn margin"
                    >
                      {{ $t("GLOBAL_CANCEL") }}
                    </Button>
                    <Button
                      type="submit"
                      :loading="loading"
                      :disabled="invalid || canNotSend"
                      custom-class="submit-btn"
                    >
                      {{
                        $route.params.id ? $t("GLOBAL_EDIT") : $t("GLOBAL_SAVE")
                      }}
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
import { getSingleSchoolGroupRequest } from "@/api/schoolGroup";
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
      users: null,
      countries: null,
      createGroup: {
        name: "",
        // type: '',
        music_status: "",
        status: "",
        owner_id: "",
        country_id: "",
      },
      defaultGroup: {
        name: "",
        // type: '',
        music_status: "",
        status: "",
        owner_id: "",
        country_id: "",
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
        this.createGroup.owner_id === this.defaultGroup.owner_id &&
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
    getGroupToEdit() {
      if (this.$route.params.id) {
        this.ApiService(
          getSingleSchoolGroupRequest(this.$route.params.id)
        ).then((response) => {
          this.createGroup.name = response.data.data.name;
          this.defaultGroup.name = response.data.data.name;
          this.createGroup.type = response.data.data.type;
          this.defaultGroup.type = response.data.data.type;
          this.createGroup.music_status = response.data.data.music_status;
          this.defaultGroup.music_status = response.data.data.music_status;
          this.createGroup.status = response.data.data.status;
          this.defaultGroup.status = response.data.data.status;
          this.createGroup.owner_id = response.data.data.owner.id;
          this.defaultGroup.owner_id = response.data.data.owner.id;
          this.createGroup.country_id = response.data.data.country.id;
          this.defaultGroup.country_id = response.data.data.country.id;
        });
      }
    },
    getAllUsers() {
      this.ApiService(getAllSearchUsersRequest()).then((response) => {
        this.users = response.data.data;
      });
    },
    getAllCountries() {
      this.ApiService(getAllCountryRequest()).then((response) => {
        this.countries = response.data.data;
      });
    },
  },
  mounted() {
    this.getGroupToEdit();
    this.getAllUsers();
    this.getAllCountries();
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
