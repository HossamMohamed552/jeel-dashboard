<template>
  <div v-if="showToast" />
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  // type: // success,danger,light,medium,dark
  computed: {
    ...mapGetters(["toast"]),
  },
  methods: {
    ...mapActions(["hideToast"]),
  },
  data() {
    return {
      showToast: false,
    };
  },
  watch: {
    toast() {
      if (this.toast.isVisible) {
        this.showToast = true;
        if (typeof this.toast.message === "string") {
          this.$root.$bvToast.toast(this.toast.message, {
            title: this.toast.title,
            solid: true,
            variant: this.toast.type,
            toaster:
              this.$i18n.locale == "ar"
                ? "b-toaster-top-left"
                : "b-toaster-top-right",
          });
        } else {
          this.$root.$bvToast.toast(this.$t("PLEASE_TRY_AGAIN"), {
            title: this.toast.title,
            solid: true,
            variant: this.toast.type,
            toaster:
              this.$i18n.locale == "ar"
                ? "b-toaster-top-left"
                : "b-toaster-top-right",
          });
        }
      } else {
        this.showToast = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
