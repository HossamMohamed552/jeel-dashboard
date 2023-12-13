<template>
  <section class="inner-routes px-0">
    <div class="taps">
      <div
        @click="activeTapStatus(1,'info')"
        :class="activeTap === 1 ? 'active' : ''"
        class="tap"
      >
        معلومات السؤال
      </div>
      <div
        @click="activeTapStatus(2,'review')"
        :class="activeTap === 2 ? 'active' : ''"
        class="tap"
      >
         مراجعة السؤال
      </div>
    </div>
    <div class="content">
      <div class="row">
        <transition name="fade">
          <div class="col-12 px-0" v-if="activeTap === 1">
            <slot name="info"></slot>
          </div>
          <div class="col-12 px-0" v-if="activeTap === 2">
            <slot name="review"></slot>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "index",
  data() {
    return {
      activeTap: 1,
    };
  },
  methods: {
    activeTapStatus(id, slot) {
      this.activeTap = id
      // window.localStorage.setItem('page', slot)
    }
  },
  beforeDestroy() {
    window.localStorage.setItem('page', '')
  }
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
