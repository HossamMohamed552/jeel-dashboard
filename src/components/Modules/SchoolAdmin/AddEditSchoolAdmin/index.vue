<template>
  <div class="add-edit-country">
    <Modal
      :content-message="'تمت الإضافة بنجاح'"
      :showModal="showModal"
      :is-success="true"
    />
    <div class="container-fluid custom-container">
      <div class="add-edit-country-form">
        <h3>
          {{ $t("SCHOOL_ADMIN.ADD_NEW") }}
        </h3>
        <validation-observer v-slot="{ invalid }" ref="addEditSchoolAdminForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="schoolAdminData.user_id"
                    :label="$t('SCHOOL_ADMIN.schoolAdminName')"
                    :name="$t('SCHOOL_ADMIN.schoolAdminName')"
                    :options="allStaff"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                  ></SelectSearch>
                </div>
              </b-col>
              <p v-if="isError" class="text-danger">{{ messageError }}</p>
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
                  {{ $t("GLOBAL_SAVE") }}
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
import {getSingleClassRequest} from "@/api/class.js";
import Modal from "@/components/Shared/Modal/index.vue";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import {getStaffEnrollUsersRequest} from "@/api/staffEnroll";
import {postSchoolAdminRequest} from "@/api/schoolAdmin";

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
    schoolId: {
      type: Number,
      default: null,
    },
    isError: {
      type: Boolean,
      default: false,
    },
    messageError: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      schoolAdminData: {
        user_id: "",
        school_id: this.schoolId
      },
      schoolAdminId: this.$route.params.id,
      allStaff: [],
      showModal: false,
    };
  },
  methods: {
    onSubmit() {
      this.$refs.addEditSchoolAdminForm.validate().then((success) => {
        if (!success) return;
        this.ApiService(postSchoolAdminRequest(this.schoolAdminData)).then((response) => {
          this.showModal = true
          setTimeout(() => {
            this.showModal = false
          }, 3000)
        }).then(() => this.$router.back())
      });
    },
    handleCancel() {
      this.$router.back()
    },
  },
  mounted() {
    this.ApiService(getStaffEnrollUsersRequest(this.schoolId)).then((response) => {
      this.allStaff = response.data.data
    })
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
