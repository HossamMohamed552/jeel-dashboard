<template>
  <div class="add-edit-group">
    <div class="container-fluid custom-container">
      <div class="add-edit-group-form">
        <h3>{{ $route.params.id ? $t("GROUP.EDIT") : $t("GROUP.ADD_NEW") }}</h3>
        <validation-observer v-slot="{ invalid }" ref="addEditGroupForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="3" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="createGroup.name"
                    :label="$t('GROUP.name')"
                    :name="$t('GROUP.name')"
                    :rules="'required|min:3'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="3" class="mb-3">
                <div class="hold-field">
                  <ValidationProvider v-slot="{errors, invalid}" rules="required">
                    <b-form-group :label="$t('GROUP.type')" v-slot="{ ariaDescribedby }"
                                  class="group-type">
                      <b-form-radio v-model="createGroup.type" value="national" name="group-type">محلى
                      </b-form-radio>
                      <b-form-radio v-model="createGroup.type" value="international" name="group-type">دولى
                      </b-form-radio>
                    </b-form-group>
                  </ValidationProvider>
                </div>
              </b-col>
              <b-col lg="3" class="mb-3">
                <div class="hold-field">
                  <ValidationProvider v-slot="{errors, invalid}" rules="required">
                    <b-form-group :label="$t('GROUP.music')" v-slot="{ ariaDescribedby }"
                                  class="group-type">
                      <b-form-radio v-model="createGroup.music_status" value="0" name="group-music_type">غير متاح
                      </b-form-radio>
                      <b-form-radio v-model="createGroup.music_status" value="1"
                                    name="group-music_type">
                        متاح
                      </b-form-radio>
                    </b-form-group>
                  </ValidationProvider>
                </div>
              </b-col>
              <b-col lg="3" class="mb-3">
                <div class="hold-field">
                  <ValidationProvider v-slot="{errors, invalid}" rules="required">
                    <b-form-group :label="$t('GROUP.status')" v-slot="{ ariaDescribedby }"
                                  class="group-type">
                      <b-form-radio v-model="createGroup.status" value="0" name="group-status">غير
                        مفعل
                      </b-form-radio>
                      <b-form-radio v-model="createGroup.status" value="1" name="group-status">مفعل
                      </b-form-radio>
                    </b-form-group>
                  </ValidationProvider>
                </div>
              </b-col>
              <b-col lg="4" class="mt-5">
                <div class="hold-field">
                  <TextField
                    v-model="createGroup.email"
                    :label="$t('GROUP.email')"
                    :name="$t('GROUP.email')"
                    :rules="'email'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="4" class="mt-5">
                <div class="hold-field">
                  <ValidationProvider v-slot="{errors, invalid}" rules="required">
                    <label>{{ $t('GROUP.owner') }}</label>
                    <select v-model="createGroup.owner_id" class="custom-selectBox form-control">
                      <option value="''" selected disabled>{{ $t('GROUP.selectUser') }}</option>
                      <option v-for="user in users" :key="user.id" :value="user.id">
                        {{ user.name }}
                      </option>
                    </select>
                  </ValidationProvider>
                </div>
              </b-col>
              <b-col lg="4" class="mt-5">
                <div class="hold-field">
                  <ValidationProvider v-slot="{errors, invalid}" rules="required">
                    <label>{{ $t('GROUP.country') }}</label>
                    <select v-model="createGroup.country_id" class="custom-selectBox form-control">
                      <option value="''" selected disabled>{{ $t('GROUP.selectCountry') }}</option>
                      <option v-for="country in countries" :key="country.id" :value="country.id">
                        {{ country.name }}
                      </option>
                    </select>
                  </ValidationProvider>
                </div>
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
                      :disabled="invalid"
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
import {getSingleSchoolGroupRequest} from "@/api/schoolGroup";
import {getAllUsersRequest} from "@/api/user";
import {getCountryRequest} from "@/api/country";
export default {
  components: {
    Modal,
    TextField,
    RadioButton,
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
      users: null,
      countries: null,
      createGroup: {
        name: "",
        type: null,
        music_status: '',
        status: null,
        owner_id: '',
        country_id: ''
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.addEditGroupForm.validate().then((success) => {
        if (!success) return;
      });
      if (this.$route.params.id) {
        this.$emit('handleEditGroup', this.createGroup)
      } else {
        this.$emit('handleAddGroup', this.createGroup)
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getGroupToEdit() {
      if (this.$route.params.id) {
        this.ApiService(getSingleSchoolGroupRequest(this.$route.params.id)).then((response) => {
          this.createGroup.name =response.data.data.name
          this.createGroup.type =response.data.data.type
          this.createGroup.music_type =response.data.data.music_status
          this.createGroup.status =response.data.data.status
          this.createGroup.owner_id =response.data.data.owner.id
          this.createGroup.country_id =response.data.data.country.id
        })
      }
    },
    getAllUsers() {
      this.ApiService(getAllUsersRequest()).then((response) => {
        this.users = response.data.data
      })
    },
    getAllCountries() {
      this.ApiService(getCountryRequest()).then((response) => {
        this.countries = response.data.data
      })
    }
  },
  mounted() {
    this.getGroupToEdit()
    this.getAllUsers()
    this.getAllCountries()
  }
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
