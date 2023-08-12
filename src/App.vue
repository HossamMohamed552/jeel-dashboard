<template>
  <div :class="$i18n.locale === 'en' ? '' : 'rtl'">
    <router-view />
    <Toast/>
  </div>
</template>

<script>
import Toast from "@/components/Shared/Toast/index.vue";
export default {
  components:{
    Toast
  },
  created() {
    const htmlDoc = document.documentElement
    htmlDoc.setAttribute("lang", this.$i18n.locale === "ar" ? "ar" : "en")
    htmlDoc.setAttribute("dir", this.$i18n.locale === "ar" ? "rtl" : "ltr")
  },
};
</script>

<style lang="scss">
@import "@/assets/style/scss/__variables";

@font-face {
    font-family: DiodrumArabic ;
    src: url('~@/assets/fonts/alfont_com_AlFont_com_DiodrumArabic-Regular.ttf');
}

* {
  &:lang(ar) {
    font-family: "DiodrumArabic", sans-serif;
  }
}


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
