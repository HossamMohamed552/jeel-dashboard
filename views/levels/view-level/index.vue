<template>
  <section class="container-fluid custom-container">
    <div class="show-level">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{$t('LEVEL.showDetails')}}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="6">
            <ShowItem :title="$t('LEVEL.name')" :subtitle="level.name"/>
          </b-col>
          <b-col lg="6">
            <ShowItem :title="$t('LEVEL.min_levels')" :subtitle="level.min_levels"/>
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import {getSingleLevelRequest} from "@/api/level";
export default {
  name: "index",
  components:{
    ShowItem
  },
  data(){
    return{
      level: {}
    }
  },
  mounted() {
    this.ApiService(getSingleLevelRequest(this.$route.params.id)).then((response)=>{
      this.level = response.data.data
    })
  }
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
