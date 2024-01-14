<template>
  <div class="add-edit-user">
    <div class="container-fluid custom-container">
      <div class="add-edit-user-form">
        <h3>{{ $t("CHANGE_PASSWORD") }}</h3>
        <validation-observer v-slot="{ invalid }" ref="addEditUserForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="3" class="showItem">
                <ShowItem :title="$t('USER.first_name')" :subtitle="singleUser.first_name" />
              </b-col>
              <b-col lg="3" class="showItem">
                <ShowItem :title="$t('USER.second_name')" :subtitle="singleUser.middle_name" />
              </b-col>
              <b-col lg="3" class="showItem">
                <ShowItem :title="$t('USER.second_name')" :subtitle="singleUser.last_name" />
              </b-col>
              <b-col lg="3" class="showItem status">
                <ShowItem :title="$t('TABLE_FIELDS.status')" :subtitle="singleUser.status.name" />
              </b-col>
              <b-col lg="6" class="showItem">
                <ShowItem :title="$t('TABLE_FIELDS.email_username')" :subtitle="singleUser.email" />
              </b-col>
              <b-col lg="3" class="showItem">
                <ShowItem :title="$t('SCHOOL.phone')" :subtitle="singleUser.email" />
              </b-col>
              <b-col lg="4" class="showItem">
                <b-form-group class="mb-3">
                  <TextField
                    v-model="user.password"
                    rules="required"
                    :type="passwordType"
                    :label="$t('USERS.PASSWORD')"
                    :name="$t('USERS.PASSWORD')"
                    :placeholder="$t('USERS.ENTER') + ' ' + $t('USERS.PASSWORD')"
                    class="p-relative d-block"
                    ref="password"
                  >
                    <b-icon :icon="passwordIcon" @click="hideShowPassword" class="icon-password" />
                  </TextField>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group class="mb-3">
                  <TextField
                    v-model="user.password_confirmation"
                    :rules="`required|confirmed:${$t('USERS.PASSWORD')}`"
                    :type="confirmPasswordType"
                    :label="$t('USERS.CONFIRM_PASSWORD')"
                    :name="$t('USERS.CONFIRM_PASSWORD')"
                    :placeholder="$t('USERS.ENTER') + ' ' + $t('USERS.CONFIRM_PASSWORD')"
                    class="p-relative d-block"
                  >
                    <b-icon
                      :icon="confirmPasswordIcon"
                      @click="hideShowPassword('confirm')"
                      class="icon-password"
                    />
                  </TextField>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <div class="action-holder">
                <Button @click="handleCancel" custom-class="cancel-btn margin">
                  {{ $t("GLOBAL_CANCEL") }}
                </Button>
                <Button
                  type="submit"
                  :loading="loading"
                  :disabled="invalid"
                  :custom-class="'submit-btn'"
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
import { TogglePasswordMixins } from "@/mixins/TogglePasswordMixins";
import { getSingleUserRequest, postChangePasswordRequest } from "@/api/user.js";
import ShowItem from "@/components/Shared/ShowItem/index.vue";

export default {
  mixins: [TogglePasswordMixins],
  components: {
    ShowItem,
  },
  data() {
    return {
      id: this.$route.params.id,
      singleUser: {},
      user: {
        password: "",
        password_confirmation: "",
      },
    };
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleCancel() {
      this.$emit("handleCancel");
    },
    onSubmit() {
      this.$refs.addEditUserForm.validate().then((success) => {
        if (!success) return;
        this.ApiService(postChangePasswordRequest(this.id, this.user)).then((response) => {
          this.$router.push(`/dashboard/users`);
        });
      });
    },
  },
  mounted() {
    this.ApiService(getSingleUserRequest(this.$route.params.id)).then((response) => {
      this.singleUser = response.data.data;
    });
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
