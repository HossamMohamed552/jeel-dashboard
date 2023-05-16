<template>
  <div :class="$i18n.locale === 'en' ? '' : 'rtl'">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    const htmlDoc = document.documentElement
    htmlDoc.setAttribute("lang", this.$i18n.locale === "ar" ? "ar" : "en")
    htmlDoc.setAttribute("dir", this.$i18n.locale === "ar" ? "rtl" : "ltr")
    this.$router.push('/dashboard/home')
  },
};
</script>

<style lang="scss">
@import "@/assets/style/scss/__variables";
// style scroll bar general
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: $color-notify;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: $color-primary;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgba(118, 35, 108, 0.75);
}
</style>
