<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t('rewardingActions.rewardingActionDetail') }}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="4" class="mb-5">
            <ShowItem
              class="divider-show"
              :title="$t('rewardingActions.action_name')"
              :subtitle="singleReward.action_name"
            />
          </b-col>
          <b-col lg="4" class="mb-5">
            <ShowItem
              class="divider-show"
              :title="$t('rewardingActions.jeel_xp')"
              :subtitle="singleReward.jeel_xp"
            />
          </b-col>
          <b-col lg="4" class="mb-5">
            <ShowItem
              class="divider-show"
              :title="$t('rewardingActions.jeel_coins')"
              :subtitle="singleReward.jeel_coins"
            />
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import { getRewardingActionByIdRequest } from "@/api/system-settings.js";
export default {
  name: "index",
  components: {
    ShowItem,
  },
  data() {
    return {
      singleReward: {},
    };
  },
  mounted() {
    this.ApiService(
      getRewardingActionByIdRequest(this.$route.params.id)
    ).then((response) => {
      this.singleReward = response.data.data;
    });
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
