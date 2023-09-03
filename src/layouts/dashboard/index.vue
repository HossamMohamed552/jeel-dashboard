<template>
  <section>
    <TopNav />
    <BreadCrumb/>
    <router-view></router-view>
    <CopyRight :isLayout=true />
  </section>
</template>
<script>
import TopNav from "@/components/Layouts/TopNav/index.vue";
import BreadCrumb from "@/components/Layouts/BreadCrumb/index.vue";
import CopyRight from "@/components/Shared/CopyRight/index.vue";
export default{
  name: "index",
  components:{
    TopNav,
    BreadCrumb,
    CopyRight
  },
  created() {
    this.$router.push({name:"main"})
  }
}
</script>
<style scoped lang="scss">

</style>
