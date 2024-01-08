<template>
  <section class="main" :class="isSuperVisor ? 'main-supervisor' : ''">
    <div class="container-fluid custom-container">
      <InnerRoutes class="px-0"/>
    </div>
  </section>
</template>
<script>
import InnerRoutes from "@/components/InnerRoutes/index.vue";
export default {
  name: "index",
  data(){
    return{
      isSuperVisor: false,
    }
  },
  components:{
    InnerRoutes
  },
  computed:{
    user() {
      return this.$store.getters.user;
    },
  },
  mounted() {
    this.isSuperVisor = this.user.roles[0]?.code === 'supervisor';
  }
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
