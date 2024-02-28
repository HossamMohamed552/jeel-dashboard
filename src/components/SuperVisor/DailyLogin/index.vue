<template>
  <b-row>
    <b-col lg="4">
      <label class="selectDate">حدد الفترة الزمنية</label>
      <date-picker
        v-model="dateRange"
        type="date"
        range
        placeholder="حدد الفتره الزمنية"
        valueType="format"
        :disabled-date="disabledBeforeTodayAndAfterAWeek"
        @change="setDate($event)"
      ></date-picker>
    </b-col>
    <b-col lg="12">
      <ListItems
        class="p-0 m-0"
        :show-sort-controls="false"
        :fieldsList="fieldsList"
        :number-of-item="totalNumber"
        :table-items="dailyLoginData"
        :loading="loading"
        :disable-it="true"
        @refetch="getDailyLoginForStudent"
      >
      </ListItems>
    </b-col>
  </b-row>
</template>
<script>
import {getDailyLoginRequest} from "@/api/user";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/locale/en";
import "vue2-datepicker/index.css";
import ListItems from "@/components/ListItems/index.vue";

export default {
  name: "index",
  components: {ListItems, DatePicker},
  data() {
    return {
      dateRange: [],
      startDate: null,
      endDate: null,
      loading: false,
      dailyLoginData: [],
      totalNumber: 0,
      fieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "date",
          label: this.$i18n.t("TABLE_FIELDS.date"),
        },
        {
          key: "time",
          label: this.$i18n.t("TABLE_FIELDS.time"),
        },
      ],
    }
  },
  methods: {
    getDailyLoginForStudent(event) {
      const params = {
        start_date: this.startDate,
        end_date: this.endDate,
       ...event
      };
      this.ApiService(getDailyLoginRequest(this.$route.params.id, params)).then((response) => {
        let data = response.data
        this.dailyLoginData = data.data
        this.totalNumber = data.meta.total
      })
    },
    disabledBeforeTodayAndAfterAWeek(date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return date > today || date > new Date(today.getTime() + 7 * 24 * 3600 * 1000);
    },
    setDate($event) {
      this.startDate = $event[0]
      this.endDate = $event[1]
      this.getDailyLoginForStudent()
    }
  },
  mounted() {
    this.getDailyLoginForStudent()
  }
}
</script>
<style scoped lang="scss">
.selectDate{
  color: #76236C;
}
</style>
