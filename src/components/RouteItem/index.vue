<template>
  <router-link :to="item.path" tag="div" class="route-item">
    <div class="hold-content">
      <div class="icon">
        <img :src="item.icon" alt="permissions" title="permissions">
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
