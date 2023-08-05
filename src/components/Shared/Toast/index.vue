<template>
  <div v-if="showToast"/>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import it from "vue2-datepicker/locale/es/it";

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
        } else if (this.toast.message instanceof Array){
            this.toast.message.forEach(msg => {
            this.$root.$bvToast.toast(msg, {
            title: this.toast.title,
            solid: true,
            variant: this.toast.type,
            appendToast: true,
            toaster: this.$i18n.locale == "ar" ? "b-toaster-top-left" : "b-toaster-top-right",
            autoHideDelay: this.toast.time,
            });
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
