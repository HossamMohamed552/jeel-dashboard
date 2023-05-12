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
  },
};
</script>

<style lang="scss">
</style>
