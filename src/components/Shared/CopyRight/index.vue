<template>
  <div class="copyright" :class="isLayout?'copyrightLayout':''">
    {{ $t('copyRight', {year: new Date().getFullYear()}) }}
  </div>
</template>
<script>
export default {
  name: "index",
  props: {
    isLayout: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
