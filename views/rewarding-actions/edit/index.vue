<template>
  <b-container fluid class="holder px-5">
    <div v-if="loading" class="text-center text-danger my-5 my-5">
      <b-spinner class="align-middle"></b-spinner>
    </div>
    <b-row v-else class="mb-4 align-items-bottom">
      <b-col cols="12" md="6" lg="4" class="mb-1 mb-md-4">
        <label for="" class="label">{{ $t("SYSTEM_SETTINGS.NAME") }}</label>
        <TextField v-model="action.action_name" type="text" />
      </b-col>
      <b-col cols="12" md="6" lg="4" class="mb-1 mb-md-4">
        <label for="" class="label">{{ $t("SYSTEM_SETTINGS.DESC") }}</label>
        <TextField v-model="action.action_desc" type="text" />
      </b-col>
      <b-col cols="12" md="6" lg="4" class="mb-1 mb-md-4">
        <label for="" class="label">{{ $t("SYSTEM_SETTINGS.MAX_TRIAL") }}</label>
        <TextField v-model="action.max_trail" type="number" />
      </b-col>
      <b-col cols="12" md="6" lg="6" class="mb-1 mb-md-4">
        <label for="" class="label">{{ $t("SYSTEM_SETTINGS.COINS") }}</label>
        <TextField v-model="action.jeel_coins" type="number" />
      </b-col>
<!--      <b-col cols="12" md="6" lg="4" class="mb-1 mb-md-4">-->
<!--        <label for="" class="label">{{ $t("SYSTEM_SETTINGS.SECOND_COINS") }}</label>-->
<!--        <TextField v-model="action.second_jeel_coins" type="number" />-->
<!--      </b-col>-->
<!--      <b-col cols="12" md="6" lg="4" class="mb-1 mb-md-4">-->
<!--        <label for="" class="label">{{ $t("SYSTEM_SETTINGS.NEXT_COINS") }}</label>-->
<!--        <TextField v-model="action.next_jeel_coins" type="number" />-->
<!--      </b-col>-->
      <b-col cols="12" md="6" lg="6" class="mb-1 mb-md-4">
        <label for="" class="label">{{ $t("SYSTEM_SETTINGS.JEEl_EXPERIENCE") }}</label>
        <TextField v-model="action.jeel_xp" type="number" />
      </b-col>
<!--      <b-col cols="12" md="6" lg="4" class="mb-1 mb-md-4">-->
<!--        <label for="" class="label">{{ $t("SYSTEM_SETTINGS.SECOND_EXPERIENCE") }}</label>-->
<!--        <TextField v-model="action.second_jeel_xp" type="number" />-->
<!--      </b-col>-->
<!--      <b-col cols="12" md="6" lg="4" class="mb-1 mb-md-4">-->
<!--        <label for="" class="label">{{ $t("SYSTEM_SETTINGS.NEXT_EXPERIENCE") }}</label>-->
<!--        <TextField v-model="action.next_jeel_xp" type="number" />-->
<!--      </b-col>-->
    </b-row>
    <b-row class="justify-content-end">
      <b-col
        cols="12"
        md="6"
        lg="12"
        class="d-flex align-items-end justify-content-end mt-4 mt-lg-0"
      >
        <Button
          class="w-100"
          customClass="update-button"
          :loading="updateLoading"
          @click="updateAction()"
          >{{ $t("SYSTEM_SETTINGS.UPDATE") }}</Button
        >
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {
  getRewardingActionByIdRequest,
  putRewardingActionsRequest,
} from "@/api/system-settings.js";

export default {
  data() {
    return {
      loading: false,
      updateLoading: false,
      action: {
        action_name: "",
        action_desc: "",
        max_trail: 1,
        jeel_coins: 0,
        // second_jeel_coins: 0,
        // next_jeel_coins: 0,
        // first_jeel_xp: 0,
        // second_jeel_xp: 0,
        jeel_xp: 0,
      },
      id: this.$route.params.id,
    };
  },
  mounted() {
    this.getRewardingActionDetails();
  },
  methods: {
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
    updateAction() {
      this.updateLoading = true;

      this.ApiService(putRewardingActionsRequest(this.id, this.action))
        .then((response) => {
          console.log("response", response);
        })
        .finally(() => {
          this.updateLoading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
