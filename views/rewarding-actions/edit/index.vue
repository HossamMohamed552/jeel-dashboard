<template>
  <div class="add-edit-school">
    <Modal
      :content-message="$t('CONTROLS.edit_successfully')"
      :showModal="showModal"
      :is-success="true"
    />
    <div class="container-fluid custom-container">
      <div class="add-edit-school-form">
        <h3>{{ $t('rewardingActions.edit') }}</h3>
        <validation-observer
          v-slot="{ invalid }"
          ref="addEditQuestionDifficultyPointsForm"
        >
          <form @submit.prevent="onSubmit" class="mt-2">
            <b-row>
              <b-col lg="4" class="mt-3">
                <div class="hold-field">
                  <TextField
                    v-model="action.action_name"
                    :label="$t('rewardingActions.action_name')"
                    :name="$t('rewardingActions.action_name')"
                    :placeholder="$t('rewardingActions.action_name')"
                    :rules="'required'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="4" class="mt-3">
                <div class="hold-field">
                  <TextField
                    v-model="action.jeel_xp"
                    :label="$t('rewardingActions.jeel_xp')"
                    :name="$t('rewardingActions.jeel_xp')"
                    :placeholder="$t('rewardingActions.jeel_xp')"
                    :rules="'required'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="4" class="mt-3">
                <div class="hold-field">
                  <TextField
                    v-model="action.jeel_coins"
                    :label="$t('rewardingActions.jeel_coins')"
                    :name="$t('rewardingActions.jeel_coins')"
                    :placeholder="$t('rewardingActions.jeel_coins')"
                    :rules="'required'"
                  ></TextField>
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
                  {{ $t("GLOBAL_EDIT") }}
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
import {
  getRewardingActionByIdRequest,
  putRewardingActionsRequest,
} from "@/api/system-settings.js";
import Button from "@/components/Shared/Button/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import TextField from "@/components/Shared/TextField/index.vue";

export default {
  components: {Button, Modal, TextField},
  data() {
    return {
      loading: false,
      showModal: false,
      action: {
        action_name: "",
        jeel_xp: "",
        jeel_coins: ""
      },
      id: this.$route.params.id,
    };
  },
  mounted() {
    this.getRewardingActionDetails();
  },
  methods: {
    handleCancel() {
      this.$router.back()
    },
    getRewardingActionDetails() {
      this.loading = true;
      this.ApiService(getRewardingActionByIdRequest(this.id))
        .then((response) => {
          if (response.data) this.action = response.data.data;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onSubmit() {
      this.loading = true;

      this.ApiService(putRewardingActionsRequest(this.id, this.action))
        .then((response) => {
          this.showModal = true;
          setTimeout(() => {
            this.showModal = false;
            this.$router.push("/dashboard/rewarding-actions");
          }, 1500);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
