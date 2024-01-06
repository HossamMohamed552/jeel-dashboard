<template>
  <section class="container-fluid custom-container">
    <div class="show-term">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h3 class="heading">تفاصيل نوع الادارة</h3>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" md="6" lg="4">
            <ShowItem
              title="اسم نوع الادارة"
              :subtitle="schoolDepartmentType.name"
              class="with-border-bottom"
            />
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import { getSchoolDepartmentTypeByIdRequest } from "@/api/school-department-type";
export default {
  name: "index",
  components: {
    ShowItem,
  },
  data() {
    return {
      schoolDepartmentType: {},
    };
  },
  mounted() {
    this.ApiService(getSchoolDepartmentTypeByIdRequest(this.$route.params.id)).then((response) => {
      this.schoolDepartmentType = response.data.data;
    });
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
