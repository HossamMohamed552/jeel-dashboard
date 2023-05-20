<template>
  <section class="container-fluid custom-container" v-if="video">
    <section class="container-fluid custom-container">
    <div class="show-group">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12" class="divider">
            <ShowItem :title="$t('VIDEO.NAME')" :subtitle="video.original_name"/>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col lg="12">
            <video style="max-width: 100%;" controls  v-if="video.url">
              <source :src="`${video.url}`" type="video/mp4">
              <!-- <source src="http://localhost/Jeel/admin/public/videos_disk/1684582621.mp4" type="video/mp4"> -->
            </video>
          </b-col>
        </b-row>
        <b-row class="mt-5">
          <b-col lg="12">
            <h2 class="heading">{{$t('VIDEO.ShowDetails')}}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="12">
            <ShowItem :title="$t('VIDEO.Description')" :subtitle="video.description"/>
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
  </section>
</template>
<script>
import {getSingleVideoRequest} from "@/api/videos";
import ShowItem from "@/components/Shared/ShowItem/index.vue";

export default {
  name: "index",
  components:{
    ShowItem
  },
  data(){
    return{
      video: {}
    }
  },
  mounted() {
    this.ApiService(getSingleVideoRequest(this.$route.params.id)).then((response)=>{
      this.video = response.data.data
    })
  }
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
