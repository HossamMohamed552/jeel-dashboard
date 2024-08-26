<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{$t('subscription.details')}}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="4" class="mb-5">
            <ShowItem
              class="divider-show"
              :title="$t('subscription.schoolGroup')"
              :subtitle="singleSubscribtion.school_group.name"
            />
          </b-col>
          <b-col lg="4" class="mb-5">
            <ShowItem
              class="divider-show"
              :title="$t('subscription.country')"
              :subtitle="singleSubscribtion.country.name"
            />
          </b-col>
          <b-col lg="4" class="mb-5">
            <ShowItem
              class="divider-show"
              :title="$t('subscription.school')"
              :subtitle="singleSubscribtion.school.name"
            />
          </b-col>
          <b-col lg="4" class="mb-5">
            <ShowItem
              class="divider-show"
              :title="$t('subscription.studyYear')"
              :subtitle="singleSubscribtion.studyYear.name"
            />
          </b-col>
          <b-col lg="4" class="mb-5">
            <ShowItem
              class="divider-show"
              :title="$t('subscription.level')"
              :with-out-background="true"
              :listItems="singleSubscribtion.levels"
            />
          </b-col>
          <b-col lg="4" class="mb-5">
            <ShowItem
              class="divider-show"
              :title="$t('subscription.term')"
              :with-out-background="true"
              :listItems="singleSubscribtion.terms"
            />
          </b-col>
          <b-col lg="4" class="mb-5">
            <ShowItem
              class="divider-show"
              :title="$t('subscription.start_subscription')"
              :subtitle="singleSubscribtion.start_subscription"
            />
          </b-col>
          <b-col lg="4" class="mb-5">
            <ShowItem
              class="divider-show"
              :title="$t('subscription.end_subscription')"
              :subtitle="singleSubscribtion.end_subscription"
            />
          </b-col>
        </b-row>
        <b-row>
          <h4 class="subscription-price">{{ $t('subscription.price') }}</h4>
        </b-row>
        <b-row>
          <b-col lg="4" class="mb-5">
            <ShowItem
              class="divider-show"
              title="الباقة"
              :subtitle="singleSubscribtion.package.name"
            />
          </b-col>
          <b-col lg="4" class="mb-5">
            <ShowItem
              class="divider-show"
              :title="$t('subscription.disPercentage')"
              :subtitle="singleSubscribtion.package_discount ? `${singleSubscribtion.package_discount} %` : `0 %`"
            />
          </b-col>
          <b-col lg="4" class="mb-5">
            <ShowItem
              class="divider-show"
              :title="$t('subscription.finalResult')"
              :subtitle="`${singleSubscribtion.price_after_discount}  ${singleSubscribtion.package.currency.name}`"
            />
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import { getSingleSubscriptionsRequest } from "@/api/subscription.js";
export default {
  name: "index",
  components: {
    ShowItem,
  },
  data() {
    return {
      singleSubscribtion: {},
    };
  },
  mounted() {
    this.ApiService(getSingleSubscriptionsRequest(this.$route.params.id)).then(
      (response) => {
        this.singleSubscribtion = response.data.data;
      }
    );
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
