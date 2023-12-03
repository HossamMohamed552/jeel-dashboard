<template>
  <div>
    <div class="title">
      {{ title }}
    </div>
    <div class="subtitle" v-if="subtitle">
      {{ subtitle }}
    </div>
    <slot class="subtitle" v-if="listItems">
      <span class="item listItem" v-for="item in listItems">{{item.name}}</span>
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
      default: ''
    },
    listItems: {
      type: Array,
      default: null
    }
  },
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
