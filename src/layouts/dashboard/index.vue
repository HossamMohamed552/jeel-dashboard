<template>
  <section>
    <TopNav />
    <BreadCrumb/>
    <transition name="router-view-fade" appear> 
      <router-view></router-view>
    </transition>
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
}
</script>
<style lang="scss">
.router-view-fade-enter-active,
.router-view-fade-leave-active {
  transition: opacity 0.5s ease;
}

.router-view-fade-enter,
.router-view-fade-leave-to {
  opacity: 0;
}
</style>
