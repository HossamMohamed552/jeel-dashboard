<template>
  <div class="add-edit-role">
    <div class="container-fluid custom-container">
      <div class="add-edit-role-form">
        <h3>{{ $route.params.id ? $t("ROLES.EDIT") : $t("ROLES.ADD_NEW") }}</h3>
        <validation-observer v-slot="{ invalid }" ref="addEditRoleForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="createRole.name"
                    :label="$t('USERS.FIRST_NAME')"
                    :name="$t('USERS.FIRST_NAME')"
                    :rules="'required|max:30'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <TextAreaField
                    :rules="'required|min:3||max:70'"
                    v-model="createRole.description"
                    :label="$t('ROLES.description')"
                    :name="$t('ROLES.description')"
                  />
                </div>
              </b-col>
              <b-col lg="12">
                <p class="heading-permission">الصلاحيات</p>
              </b-col>
              <b-col lg="12">
                <b-row>
                  <b-col lg="5">
                    <div class="hold-permissions">
                      <label v-for="permissionItem in permission" class="permission-item">
                        <b-form-checkbox v-model="permissionSelected" :value="permissionItem.id"
                                         @change="showPermissionItemsSelected()"
                                         :disabled="isDefault === 1">
                          {{ permissionItem.name }}
                        </b-form-checkbox>
                      </label>

                    </div>
                  </b-col>
                  <b-col lg="2">
                    <div class="buttons">
                      <div>
                        <Button custom-class="transparent-btn rounded-btn all-add"
                                @click="addAllPermission" :disabled="isDefault === 1">
                          {{ $t('GLOBALAddAll') }}
                        </Button>
                        <Button custom-class="transparent-btn rounded-btn all-add"
                                @click="removeAllPermission" :disabled="isDefault === 1">
                          {{ $t('GLOBALRemoveAll') }}
                        </Button>
                      </div>
                    </div>
                  </b-col>
                  <b-col lg="5">
                    <div class="hold-permissions"
                         v-if="finalSelected && Array.from(finalSelected).length > 0">
                      <label v-for="permissionItem in finalSelected" class="permission-item">
                        <b-form-checkbox v-model="permissionSelected" :value="permissionItem.id"
                                         @change="showPermissionItemsSelected()"
                                         :disabled="isDefault === 1">
                          {{ permissionItem.name }}
                        </b-form-checkbox>
                      </label>
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
                      :disabled="invalid || Array.from(permissionSelected).length <= 0"
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
import {getSingleRoleRequest} from "@/api/role";
import Modal from "@/components/Shared/Modal/index.vue";

export default {
  components: {
    Modal,
    TextField,
    TextAreaField,
    CheckboxField,
    Button
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
        permissions: [],
        code: ""
      },
      finalSelected: [],
      isDefault: 0,
    };
  },
  watch: {
    'createRole.name'(newVal) {
      this.createRole.code = newVal
    }
  },
  methods: {
    showPermissionItemsSelected() {
      this.createRole.permissions = []
      this.finalSelected = this.permission.filter((item) => {
        return this.permissionSelected.includes(item.id)
      })
      this.finalSelected.forEach((item) => {
        this.createRole.permissions.push(item.id)
      })
    },
    addAllPermission() {
      this.permission.forEach((item) => {
        this.permissionSelected.push(item.id)
      })
      this.showPermissionItemsSelected()
    },
    removeAllPermission() {
      this.permissionSelected = []
      this.showPermissionItemsSelected()
    },
    onSubmit() {
      this.$refs.addEditRoleForm.validate().then((success) => {
        if (!success) return;
      });
      if (this.$route.params.id) {
        this.$emit('handleEditRole', this.createRole)
      } else {
        this.$emit('handleAddRole', this.createRole)
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getRoleToEdit() {
      if (this.$route.params.id) {
        this.ApiService(getSingleRoleRequest(this.$route.params.id)).then((response) => {
          this.createRole = response.data.data
          this.permissionSelected = this.createRole.permissions.map((item) => item.id)
          this.isDefault = this.createRole.is_default
        }).then(() => {
          this.showPermissionItemsSelected()
        })
      }
    }
  },
  mounted() {
    this.getRoleToEdit()
  }
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
