<template>
  <section class="main">
    <div class="container-fluid custom-container">
      <InnerRoutes/>
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
