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
    toast(newVal) {
      if (this.toast.isVisible) {
        this.showToast = true;
        newVal.message.forEach((item) => {
          this.$root.$bvToast.toast(item, {
            title: this.toast.title,
            solid: true,
            variant: this.toast.type,
            toaster:
              this.$i18n.locale === "ar"
                ? "b-toaster-top-left"
                : "b-toaster-top-right",
          });
        })
        // this.$root.$bvToast.toast(this.toast.message, {
        //   title: this.toast.title,
        //   solid: true,
        //   variant: this.toast.type,
        //   toaster:
        //     this.$i18n.locale === "ar"
        //       ? "b-toaster-top-left"
        //       : "b-toaster-top-right",
        // });
        // if (typeof this.toast.message === "string") {
        //
        // } else {
        //   this.$root.$bvToast.toast(this.$t("PLEASE_TRY_AGAIN"), {
        //     title: this.toast.title,
        //     solid: true,
        //     variant: this.toast.type,
        //     toaster:
        //       this.$i18n.locale == "ar"
        //         ? "b-toaster-top-left"
        //         : "b-toaster-top-right",
        //   });
        // }
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
