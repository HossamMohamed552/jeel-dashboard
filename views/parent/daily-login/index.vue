<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'سجل الدوخل اليومى'"
      :fieldsList="fieldsList"
      :table-items="dailyLogin"
      :v-search-model="dailySearchWord"
      :number-of-item="totalNumber"
      :loading="loading"
      :showDateRange="true"
      @refetch="getDailyLogin"
    >
    </ListItems>
  </section>
</template>
<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import {getDailyLoginForParentRequest} from "@/api/parent-module";
import {mapGetters} from "vuex";


export default {
  name: "index",
  components: {ListItems, Button},
  data() {
    return {
      fieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "date",
          label: this.$i18n.t("TABLE_FIELDS.loginDate"),
        },
        {
          key: "time",
          label: this.$i18n.t("TABLE_FIELDS.enterTime"),
        },
        // {
        //   key: "dailyLogin3",
        //   label: this.$i18n.t("TABLE_FIELDS.dailyLogin3"),
        // },
        // {
        //   key: "dailyLogin4",
        //   label: this.$i18n.t("TABLE_FIELDS.dailyLogin4"),
        // },
      ],
      dailyLogin: [],
      dailySearchWord: "",
      loading: false,
      totalNumber: 0
    }
  },
  computed: {
    ...mapGetters(['currentChild'])
  },
  methods: {
    getDailyLogin(event) {
      this.loading = true;
      const params = event;
      this.ApiService(getDailyLoginForParentRequest(this.currentChild.id, params))
        .then((response) => {
          this.dailyLogin = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.getDailyLogin()
  }
}
</script>
<style scoped lang="scss">

</style>
