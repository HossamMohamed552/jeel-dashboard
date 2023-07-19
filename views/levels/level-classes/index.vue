<template>
  <section class="container-fluid custom-container">
    <section class="show-level-classes">
      <b-row>
        <b-col lg="12">
          <h2 class="heading">قائمة الصفوف الدراسية</h2>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="6" v-for="levelClass in classesList" :key="levelClass.id">
          <div class="hold-missions-class my-3">
            <p class="class-name">{{ levelClass.name }}</p>
            <div class="missions">
              <p class="text-center"><span>مراحل</span> <span>{{ levelClass.name }}</span></p>
              <b-row>
                <b-col lg="6" v-for="mission in levelClass.missions" :key="mission.id">
                  <p class="mission-item" @click="$router.push(`/dashboard/path-content/${mission.id}`)">{{mission.name}} <i class="far fa-edit"></i></p>
                </b-col>
              </b-row>
            </div>
          </div>
        </b-col>
      </b-row>
    </section>
  </section>
</template>
<script>
import {getAllClassRequest} from "@/api/class";

export default {
  name: "index",
  data() {
    return {
      classesList: []
    }
  },
  mounted() {
    this.ApiService(getAllClassRequest()).then((response) => {
      this.classesList = response.data.data;
    })
  }
}
</script>

<style scoped lang="scss">
@import "./index";
</style>
