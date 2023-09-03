<template>
  <section class="main">
    <div class="container-fluid custom-container">
      <InnerRoutes class="px-0"/>
    </div>
  </section>
</template>
<script>
import InnerRoutes from "@/components/InnerRoutes/index.vue";
export default {
  name: "index",
  components:{
    InnerRoutes
  }
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
