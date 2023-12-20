<template>
  <section class="container-fluid custom-container">
    <div class="show-term">
      <div class="hold-fields">
        <b-row> </b-row>
        <b-row>
          <b-col cols="12" md="6" lg="4">
            <ShowItem title="الاسم " :subtitle="Currency.name" class="with-border-bottom" />
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import { getCurrencyByIdRequest } from "@/api/currency";
export default {
  name: "index",
  components: {
    ShowItem,
  },
  data() {
    return {
      Currency: {},
    };
  },
  mounted() {
    this.ApiService(getCurrencyByIdRequest(this.$route.params.id)).then((response) => {
      this.Currency = response.data.data;
    });
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
