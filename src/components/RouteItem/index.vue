<template>
  <router-link :to="item.path" tag="div" class="route-item">
    <div class="hold-content">
      <div class="icon">
        <img :src="item.icon" :alt="item.altImage" :title="item.titleImage">
      </div>
      <div class="name">{{item.name}}</div>
    </div>
  </router-link>
</template>
<script>
export default {
  name: "index",
  props: {
    item: {
      type: Object,
      default: function () {
        return {}
      }
    }
  }
}
</script>
<style scoped lang="scss">
@import "index";
</style>
