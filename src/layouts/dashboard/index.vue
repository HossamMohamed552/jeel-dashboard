<template>
  <section>
    <TopNav />
    <router-view></router-view>
    <CopyRight :isLayout=true />
  </section>
</template>
<script>
import TopNav from "@/components/Layouts/TopNav/index.vue";
import CopyRight from "@/components/Shared/CopyRight/index.vue";
export default{
  name: "index",
  components:{
    TopNav,
    CopyRight
  }
}
</script>
<style scoped lang="scss">

</style>
