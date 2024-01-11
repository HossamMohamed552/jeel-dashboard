<template>
  <div class="add-edit-role">
    <div class="container-fluid custom-container">
      <div class="add-edit-role-form">
        <h3>{{ $route.params.id ? $t("ROLES.EDIT_DEPARTMENT") : $t("ROLES.ADD_DEPARTMENT") }}</h3>
        <validation-observer v-slot="{ invalid }" ref="addEditRoleForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="createRole.type"
                    :label="$t('ROLES.CATEGORIES')"
                    :name="$t('ROLES.CATEGORIES')"
                    :options="roleTypes"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                    :deselectFromDropdown="true"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="createRole.name"
                    :label="$t('ROLES.DEPARTMENT')"
                    :name="$t('ROLES.DEPARTMENT')"
                    :placeholder="$t('ROLES.ENTER_DEPARTMENT')"
                    :rules="'required|min:3|max:100'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <TextAreaField
                    :rules="'required|min:3|max:250'"
                    v-model="createRole.description"
                    :label="$t('ROLES.description')"
                    :name="$t('ROLES.description')"
                    :placeholder="$t('ROLES.ENTER_DESCRIPTION')"
                    :isRequiredField="false"
                  />
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
import TextAreaField from "@/components/Shared/TextAreaField/index.vue";
import CheckboxField from "@/components/Shared/CheckboxField/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import { getSingleRoleRequest, getRolesTypesRequest } from "@/api/role";
import Modal from "@/components/Shared/Modal/index.vue";

import SelectSearch from "@/components/Shared/SelectSearch/index.vue";

export default {
  components: {
    Modal,
    TextField,
    TextAreaField,
    CheckboxField,
    Button,
    SelectSearch,
  },
  props: {
    permission: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      permissionSelected: [],
      createRole: {
        name: "",
        description: "",
        type: "",
      },
      roleTypes: [],
      finalSelected: [],
      isDefault: 0,
    };
  },
  watch: {
    "createRole.name"(newVal) {
      this.createRole.code = newVal;
    },
  },
  methods: {
    showPermissionItemsSelected() {
      this.createRole.permissions = [];
      this.finalSelected = this.permission.filter((item) => {
        return this.permissionSelected.includes(item.id);
      });
      this.finalSelected.forEach((item) => {
        this.createRole.permissions.push(item.id);
      });
    },
    addAllPermission() {
      this.permission.forEach((item) => {
        this.permissionSelected.push(item.id);
      });
      this.showPermissionItemsSelected();
    },
    removeAllPermission() {
      this.permissionSelected = [];
      this.showPermissionItemsSelected();
    },
    onSubmit() {
      this.$refs.addEditRoleForm.validate().then((success) => {
        if (!success) return;
      });
      if (this.$route.params.id) {
        this.$emit("handleEditRole", this.createRole);
      } else {
        this.$emit("handleAddRole", this.createRole);
      }

      console.log(this.createRole);
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getRoleToEdit() {
      if (this.$route.params.id) {
        this.ApiService(getSingleRoleRequest(this.$route.params.id))
          .then((response) => {
            this.createRole = response.data.data;
            this.createRole.type = response.data.data.type.id;
            this.isDefault = this.createRole.is_default;
          })
          .then(() => {
            this.showPermissionItemsSelected();
          });
      }
    },

    getAllRolesTypes() {
      this.ApiService(getRolesTypesRequest()).then((response) => {
        this.roleTypes = response.data.data;
      });
    },
  },
  mounted() {
    if (this.$route.params.id) this.getRoleToEdit();
    this.getAllRolesTypes();
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
