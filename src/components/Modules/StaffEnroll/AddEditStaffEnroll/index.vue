<template>
  <div class="add-edit-country">
    <div class="container-fluid custom-container">
      <div class="add-edit-country-form">
        <h3>
          {{
            staffEnrollId ? $t("STAFF_ENROLL.EDIT") : $t("STAFF_ENROLL.ADD_NEW")
          }}
        </h3>
        <validation-observer v-slot="{ invalid }" ref="addEditStaffEnrollForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="staffEnroll.user_id"
                    :label="$t('STAFF_ENROLL.USER')"
                    :name="$t('STAFF_ENROLL.USER')"
                    :options="staffUsers"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="staffEnroll.role_id"
                    :label="$t('STAFF_ENROLL.ROLE')"
                    :name="$t('STAFF_ENROLL.ROLE')"
                    :options="staffRoles"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="staffEnroll.level_id"
                    :label="$t('STAFF_ENROLL.LEVEL')"
                    :name="$t('STAFF_ENROLL.LEVEL')"
                    :options="staffLevels"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    :disabled="staffEnroll.level_id === null"
                    v-model="staffEnroll.class_id"
                    :label="$t('STAFF_ENROLL.CLASS')"
                    :name="$t('STAFF_ENROLL.CLASS')"
                    :options="staffClasses"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                    multiple
                  ></SelectSearch>
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
                  {{ staffEnrollId ? $t("GLOBAL_EDIT") : $t("GLOBAL_SAVE") }}
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
import Button from "@/components/Shared/Button/index.vue";
import {getSingleStaffEnrollRequest, getStaffEnrollClassesRequest} from "@/api/staffEnroll.js";
import Modal from "@/components/Shared/Modal/index.vue";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";

export default {
  components: {
    Modal,
    Button,
    SelectSearch,
  },
  props: {
    schoolId: {
      type: Number,
      default: null,
    },
    staffUsers: {
      type: Array,
      default: () => {
      },
    },
    staffRoles: {
      type: Array,
      default: () => {
      },
    },
    staffLevels: {
      type: Array,
      default: () => {
      },
    },
    // staffClasses: {
    //   type: Array,
    //   default: () => {},
    // },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      staffClasses: [],
      staffEnroll: {
        school_id: this.schoolId,
        user_id: null,
        role_id: null,
        class_id: null,
        level_id: null,
      },
      staffEnrollId: this.$route.params.id,
    };
  },
  watch: {
    "staffEnroll.level_id"(val) {

      this.getStaffEnrollClasses()
    }
  },
  methods: {
    onSubmit() {
      this.$refs.addEditStaffEnrollForm.validate().then((success) => {
        if (!success) return;
      });
      if (this.staffEnrollId) {
        this.$emit("handleEditStaffEnroll", this.staffEnroll);
      } else {
        this.$emit("handleAddStaffEnroll", this.staffEnroll);
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getStaffEnrollToEdit() {
      if (this.staffEnrollId) {
        this.ApiService(getSingleStaffEnrollRequest(this.staffEnrollId)).then(
          (response) => {
            const res = response.data.data;
            this.staffEnroll.user_id = res.user.id;
            this.staffEnroll.role_id = res.role.id;
            this.staffEnroll.class_id = res.class.id;
            this.staffEnroll.level_id = res.level.id;
          }
        );
      }
    },
    getStaffEnrollClasses() {
      this.ApiService(getStaffEnrollClassesRequest({
        schoolId: this.staffEnroll.school_id,
        levelId: this.staffEnroll.level_id
      })).then(
        (response) => {
          this.staffClasses = response.data.data;
        }
      );
    },
  },
  mounted() {
    // this.getStaffEnrollClasses();
    this.getStaffEnrollToEdit();
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
