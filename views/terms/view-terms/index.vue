<template>
  <section class="container-fluid custom-container">
    <div class="show-term">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
              <h2 class="heading">{{$t('TERM.showDetails')}}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="6">
            <ShowItem :title="$t('TERM.name')" :subtitle="term.name"/>
          </b-col>
          <b-col lg="6">
            <ShowItem :title="$t('TERM.phases')" :list-items="term.levels"/>
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import {getSingleTermsRequest} from "@/api/term";
export default {
  name: "index",
  components:{
    ShowItem
  },
  data(){
    return{
      term: {}
    }
  },
  mounted() {
    this.ApiService(getSingleTermsRequest(this.$route.params.id)).then((response)=>{
      this.term = response.data.data
    })
  }
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
