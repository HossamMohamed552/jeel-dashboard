<template>
  <b-container class="p-5">
    <div v-if="loading" class="text-center text-danger my-5 my-5">
      <b-spinner class="align-middle"></b-spinner>
    </div>
    <b-row v-else v-for="(item, ind) in jems" :key="ind" class="mb-4 align-items-bottom">
      <b-col cols="2">
        <span class="label">{{ $t("SYSTEM_SETTINGS.QUANTITY") }}</span>
        <div class="quantity">
          {{ item.quantity }}
        </div>
      </b-col>
      <b-col>
        <label for="" class="label">{{ $t("SYSTEM_SETTINGS.COINS") }}</label>
        <TextField v-model="item.jeel_coins_quantity" type="number" />
      </b-col>
      <b-col cols="2" class="d-flex align-items-end">
        <Button
          variant="primary"
          :loading="updateLoading"
          @click="updateJem(item.id, item.jeel_coins_quantity)"
          >{{ $t("SYSTEM_SETTINGS.UPDATE") }}</Button
        >
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { getGemPricesRequest, putGemPricesRequest } from "@/api/system-settings.js";

export default {
  data() {
        return {
            loading: false,
            updateLoading: false,
            jems: []
        };
  },
  mounted() {
    this.getJems();
  },
  methods: {
    getJems() {
      this.loading = true;
      this.ApiService(getGemPricesRequest())
        .then((response) => {
          if (response.data) this.jems = response.data.data;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    updateJem(id, quantity) {
      this.updateLoading = true;
      this.ApiService(putGemPricesRequest(id, { jeel_coins_quantity: quantity }))
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
