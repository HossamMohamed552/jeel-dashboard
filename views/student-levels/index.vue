<template>
  <b-container class="holder">
    <div v-if="loading" class="text-center text-danger my-5 my-5">
      <b-spinner class="align-middle"></b-spinner>
    </div>
    <b-row v-else v-for="(item, ind) in jems" :key="ind" class="mb-4 align-items-bottom">
      <b-col cols="2">
        <span class="label">{{ $t("SYSTEM_SETTINGS.LEVEL") }}</span>
        <div class="quantity">
          {{ item.level }}
        </div>
      </b-col>
      <b-col>
        <label for="" class="label">{{ $t("SYSTEM_SETTINGS.EXPERIENCE") }}</label>
        <TextField v-model="item.xp" type="number" />
      </b-col>
      <b-col cols="2" class="d-flex align-items-end">
        <Button variant="primary" :loading="updateLoading" @click="updateLevel(item.id, item.xp)">{{
          $t("SYSTEM_SETTINGS.UPDATE")
        }}</Button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { getLevelXPRequest, putLevelXPRequest } from "@/api/system-settings.js";

export default {
  data() {
    return {
      loading: false,
      updateLoading: false,
      jems: [],
    };
  },
  mounted() {
    this.getLevels();
  },
  methods: {
    getLevels() {
      this.loading = true;
      this.ApiService(getLevelXPRequest())
        .then((response) => {
          if (response.data) this.jems = response.data.data;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    updateLevel(id, quantity) {
      this.updateLoading = true;
      this.ApiService(putLevelXPRequest(id, { xp: quantity }))
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
