<template>
  <section class="main">
    <div class="container-fluid custom-container">
      <InnerRoutes class="px-0" />
    </div>
  </section>
</template>
<script>
import InnerRoutes from "@/components/InnerRoutes/index.vue";
import store from "@/store";
export default {
  name: "index",
  data() {
    return {
      // isSuperVisor: false,
    };
  },
  components: {
    InnerRoutes,
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  created() {
    if (this.$store.getters?.user?.roles?.[0]?.type?.key === 'parent_management'){
      this.$router.push('/dashboard/choose-student/')
    }
  },
  mounted() {
    // this.isSuperVisor = this.user.roles[0]?.code === "supervisor";
    window.localStorage.setItem("page", "");
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
