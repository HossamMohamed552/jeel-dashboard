<template>
  <section class="login">
    <Login @handleLogin="handleLogin($event)" :loading="loading"/>
  </section>
</template>

<script>
import Login from "@/components/login/index.vue";
import CopyRight from "@/components/Shared/CopyRight/index.vue";
import {postLoginRequest} from "@/api/register";
import {mapActions} from "vuex";

export default {
  name: "login",
  components: {
    Login,
    CopyRight
  },
  data(){
    return{
      loading: false
    }
  },
  methods:{
    ...mapActions(['setUser']),
    handleLogin($event){
      this.loading = true
      this.ApiService(postLoginRequest($event)).then((response)=>{
        response.data.code === 200 ? this.loading = false : this.loading = true
        let payload = {}
        payload.user = response.data.data.user
        payload.token = response.data.data.token_data
        this.setUser(payload)
      }).catch(()=>{
        this.loading = false
      })
    }
  },
}
</script>

<style scoped lang="scss">
@import "./index";
</style>
