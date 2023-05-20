<template>
  <section class="container-fluid custom-container" v-if="paperwork">
    <section class="container-fluid custom-container">
    <div class="show-group">
      <div class="hold-fields">
        <b-row class="mt-5">
          <b-col lg="12">
            <h2 class="heading">{{$t('PAPER_WORK.ShowDetails')}}</h2>
          </b-col>
        </b-row>
        <b-row class="divider">
          <b-col lg="4 mt-5">
            <ShowItem :title="$t('PAPER_WORK.NAME')" :subtitle="paperwork.name"/>
          </b-col>
          <b-col lg="4 mt-5">
            <ShowItem :title="$t('PAPER_WORK.type')" :subtitle="paperwork.type"/>
          </b-col>
          <b-col lg="4 mt-5">
            <ShowItem :title="$t('PAPER_WORK.level')" :subtitle="paperwork.level.name"/>
          </b-col>
          <!-- <b-col lg="4 mt-5">
            <ShowItem :title="$t('PAPER_WORK.file')" :subtitle="paperwork.file"/>
          </b-col> -->
        </b-row>
        <b-row>
          <b-col lg="12 mt-5">
            <ShowItem :title="$t('PAPER_WORK.Description')" :subtitle="paperwork.description"/>
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
  </section>
</template>
<script>
import {getSinglePaperworkRequest} from "@/api/paperWork";
import ShowItem from "@/components/Shared/ShowItem/index.vue";

export default {
  name: "index",
  components:{
    ShowItem
  },
  data(){
    return{
      paperwork:null
    }
  },
  mounted() {
    console.log('Ahmed');
    this.ApiService(getSinglePaperworkRequest(this.$route.params.id)).then((response)=>{
      this.paperwork = response.data.data
    })
  }
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
