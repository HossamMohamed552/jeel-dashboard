<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{$t('COUNTRY.showDetails')}}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="12">
            <ShowItem :title="$t('COUNTRY.name')" :subtitle="country.name"/>
          </b-col>
<!--          <b-col lg="6">-->
<!--            <ShowItem :title="$t('COUNTRY.countryCode')" :subtitle="country.code"/>-->
<!--          </b-col>-->
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import {getSingleCountryRequest} from "@/api/country";
export default {
  name: "index",
  components:{
    ShowItem
  },
  data(){
    return{
      country: {}
    }
  },
  mounted() {
    this.ApiService(getSingleCountryRequest(this.$route.params.id)).then((response)=>{
      this.country = response.data.data
    })
  }
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
