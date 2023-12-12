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
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="createPackage.name"
                    :label="$t('PACKAGE.name')"
                    :name="$t('PACKAGE.name')"
                    :rules="'required|min:3'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="createPackage.price"
                    :label="$t('PACKAGE.price')"
                    :name="$t('PACKAGE.price')"
                    :rules="'required'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="4" class="mt-3">
                <div class="hold-field" v-if="countries">
                  <SelectSearch
                    v-model="createPackage.country_id"
                    :label="$t('GROUP.country')"
                    :name="$t('GROUP.country')"
                    :options="countries"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                  ></SelectSearch>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="4" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="createPackage.classes_count"
                    :label="$t('PACKAGE.classes_count')"
                    :name="$t('PACKAGE.classes_count')"
                    :rules="'required|numeric'"
                  ></TextField>
                </div>
              </b-col>
              <b-col v-for="role in createPackage.roles" :key="role.id" lg="4" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="role.number"
                    :label="` عدد ${role.name} `"
                    :name="` عدد ${role.name} `"
                    :rules="'required|numeric'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="12" class="mb-3">
<!--                :rules="'min:20'"-->
                <div class="hold-field">
                  <TextAreaField
                    v-model="createPackage.description"
                    :label="$t('PACKAGE.description')"
                    :name="$t('PACKAGE.description')"
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
import {getSinglePackagesRequest} from "@/api/packages";
import Modal from "@/components/Shared/Modal/index.vue";
import {getAllRolesRequest, getAllRolesSystemRequest} from "@/api/user";
import {getAllCountryRequest} from "@/api/country";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";

export default {
  components: {
    SelectSearch,
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
      countries:[],
      createPackage: {
        name: "",
        price: "",
        classes_count: "",
        description: "",
        country_id:"",
        roles: [
          {
            role_id: 2,
            name: "مديرين المدرسة",
            number: "",
          },
          {
            role_id: 3,
            name: "المشرفين",
            number: "",
          },
          {
            role_id: 4,
            name: "المدرسين",
            number: "",
          },
          {
            role_id: 5,
            name: "الطلاب",
            number: "",
          },
          {
            role_id: 6,
            name: "أولياء الأمور",
            number: "",
          }

        ]
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
            // this.createPackage = response.data.data;
            // this.createPackage.roles = this.createPackage.number_users_roles
            this.createPackage.name = response.data.data.name
            this.createPackage.price = response.data.data.price
            this.createPackage.classes_count = response.data.data.classes_count
            this.createPackage.description = response.data.data.description
            this.createPackage.country_id = response.data.data.country.id
            this.createPackage.roles[0].number = response.data.data.number_users_roles[0].number
            this.createPackage.roles[1].number = response.data.data.number_users_roles[1].number
            this.createPackage.roles[2].number = response.data.data.number_users_roles[2].number
            this.createPackage.roles[3].number = response.data.data.number_users_roles[3].number
            this.createPackage.roles[4].number = response.data.data.number_users_roles[4].number
            // this.createPackage.roles = this.createPackage.number_users_roles.map((item) => {
            //   return {
            //     role_id: item.id,
            //     number: item.number,
            //     name: item.name
            //   }
            // })
          }
        );
      }
    },
    getAllCountries() {
      this.ApiService(getAllCountryRequest()).then((response) => {
        this.countries = response.data.data
      })
    }
    // getAllRoles() {
    //   this.ApiService(getAllRolesSystemRequest()).then((response) => {
    //     this.createPackage.roles = response.data.data
    //     this.createPackage.roles.forEach((item) => {
    //       Object.assign(item, {number: ""})
    //     })
    //     this.createPackage.roles = this.createPackage.roles.map((item)=>{
    //       return {
    //         role_id: item.id,
    //         number: item.number,
    //         name: item.name
    //       }
    //     })
    //   })
    // }
  },
  mounted() {
    this.getPackageToEdit();
    this.getAllCountries();
    // this.getAllRoles();
  },
};
</script>
<style scoped lang="scss">
@import "./index";

</style>
