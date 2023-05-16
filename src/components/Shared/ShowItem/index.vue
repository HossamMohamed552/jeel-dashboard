<template>
  <div>
    <div class="title">
      {{title}}
    </div>
    <div class="subtitle">
      {{subtitle}}
    </div>
  </div>
</template>
<script>
export default {
  name: "index",
  props:{
    title:{
      type:String,
      default:''
    },
    subtitle:{
      type:String,
      default:''
    }
  },
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
