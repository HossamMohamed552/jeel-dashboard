<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">تفاصيل الإشتراك</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="4" class="mb-5">
            <ShowItem
              class="divider-show"
              title="مجموعة المدارس"
              :subtitle="singleSubscribtion.school_group.name"
            />
          </b-col>
          <b-col lg="4" class="mb-5">
            <ShowItem
              class="divider-show"
              title="الدولة"
              :subtitle="singleSubscribtion.country.name"
            />
          </b-col>
          <b-col lg="4" class="mb-5">
            <ShowItem
              class="divider-show"
              title="المدرسة"
              :subtitle="singleSubscribtion.school.name"
            />
          </b-col>
          <b-col lg="4" class="mb-5">
            <ShowItem
              class="divider-show"
              title="العام الدراسي"
              :subtitle="singleSubscribtion.study_year.name"
            />
          </b-col>
          <b-col lg="4" class="mb-5">
            <ShowItem
              class="divider-show"
              title="الصف الدراسي"
              :with-out-background="true"
              :listItems="singleSubscribtion.levels"
            />
          </b-col>
          <b-col lg="4" class="mb-5">
            <ShowItem
              class="divider-show"
              title="الترم الدراسي"
              :with-out-background="true"
              :listItems="singleSubscribtion.terms"
            />
          </b-col>
          <b-col lg="4" class="mb-5">
            <ShowItem
              class="divider-show"
              title="تاريخ بدء الإشتراك"
              :subtitle="singleSubscribtion.start_subscription"
            />
          </b-col>
          <b-col lg="4" class="mb-5">
            <ShowItem
              class="divider-show"
              title="تاريخ نهاية الإشتراك"
              :subtitle="singleSubscribtion.end_subscription"
            />
          </b-col>
        </b-row>
        <b-row>
          <h4 class="subscription-price">سعر الإشتراك</h4>
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
              title="قيمة الخصم"
              :subtitle="singleSubscribtion.package_discount || 0"
            />
          </b-col>
          <b-col lg="4" class="mb-5">
            <ShowItem
              class="divider-show"
              title="القيمة النهائية"
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
