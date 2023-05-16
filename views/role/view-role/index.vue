<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{$t('showDetails')}}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="6">
            <ShowItem :title="$t('ROLES.name')" :subtitle="role.name"/>
          </b-col>
          <b-col lg="6">
            <ShowItem :title="$t('ROLES.description')" :subtitle="role.description"/>
          </b-col>
        </b-row>
      </div>
      <div class="permissions">
        <h2 class="heading">{{$t('permissions')}} </h2>
        <b-row>
          <b-col lg="3" v-for="permission in role.permissions" :key="permission.id">
            <div class="permission-item">
              <img src="@/assets/images/icons/verify.svg">
              <span>{{permission.name}}</span>
            </div>
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import {getSingleRoleRequest} from "@/api/role";
export default {
  name: "index",
  components:{
    ShowItem
  },
  data(){
    return{
      role: {}
    }
  },
  mounted() {
    console.log('this.$route.params.id', this.$route.params.id)
    this.ApiService(getSingleRoleRequest(this.$route.params.id)).then((response)=>{
      this.role = response.data.data
    })
  }
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
