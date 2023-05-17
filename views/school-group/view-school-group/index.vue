<template v-if="group">
  <section class="container-fluid custom-container">
    <div class="show-group">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{$t('GROUP.showDetails')}}</h2>
          </b-col>
        </b-row>
        <div v-if="group" class="divider">
          <b-row>
            <b-col lg="4">
              <ShowItem :title="$t('GROUP.name')" :subtitle="group.name"/>
            </b-col>
            <b-col lg="4">
              <ShowItem :title="$t('GROUP.type')" :subtitle="group.type"/>
            </b-col>
            <b-col lg="4">
              <ShowItem :title="$t('GROUP.music')" :subtitle="group.music_type === 1 ?  'غير متاح' :'متاح'"/>
            </b-col>
          </b-row>
        </div>
        <div v-if="group" class="divider bottom">
          <b-row>
            <b-col lg="4">
              <ShowItem :title="$t('GROUP.email')" :subtitle="group?.owner.email"/>
            </b-col>
            <b-col lg="4">
              <ShowItem :title="$t('GROUP.status')" :subtitle="group.status === 1? 'مفعل':'غير مفعل'"/>
            </b-col>
            <b-col lg="4">
              <ShowItem :title="$t('GROUP.country')" :subtitle="group.country.name"/>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import {getSingleSchoolGroupRequest} from "@/api/schoolGroup";
export default {
  name: "index",
  components:{
    ShowItem
  },
  data(){
    return{
      group: {},
    }
  },
  mounted() {
    this.ApiService(getSingleSchoolGroupRequest(this.$route.params.id)).then((response)=>{
      this.group = response.data.data
    })
  }
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
