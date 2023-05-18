<template>
  <div>
    <div class="title">
      {{ title }}
    </div>
    <div class="subtitle" v-if="subtitle">
      {{ subtitle }}
    </div>
    <slot class="subtitle" v-if="listItems">
      <span class="item" v-for="item in listItems">{{item.name}}</span>
    </slot>
  </div>
</template>
<script>
export default {
  name: "index",
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    listItems: {
      type: Array,
      default: []
    }
  },
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
