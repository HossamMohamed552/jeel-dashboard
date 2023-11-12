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
                    :rules="'required|numeric'"
                  ></TextField>
                </div>
              </b-col>
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
              <b-col v-for="role in createPackage.roles" :key="role.role_id" lg="4" class="mb-3">
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
                <div class="hold-field">
                  <TextAreaField
                    v-model="createPackage.description"
                    :label="$t('PACKAGE.description')"
                    :name="$t('PACKAGE.description')"
                    :rules="'required|min:20'"
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
      createPackage: {
        name: "",
        price: "",
        classes_count: "",
        description: "",
        roles: []
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
            this.createPackage = response.data.data;
          }
        );
      }
    },
    getAllRoles() {
      this.ApiService(getAllRolesSystemRequest()).then((response) => {
        this.createPackage.roles = response.data.data
        this.createPackage.roles.forEach((item) => {
          Object.assign(item, {number: ""})
        })
        this.createPackage.roles = this.createPackage.roles.map((item)=>{
          return {
            role_id: item.id,
            number: item.number,
            name: item.name
          }
        })
      })
    }
  },
  mounted() {
    this.getPackageToEdit();
    this.getAllRoles();
  },
};
</script>
<style scoped lang="scss">
@import "./index";

</style>
