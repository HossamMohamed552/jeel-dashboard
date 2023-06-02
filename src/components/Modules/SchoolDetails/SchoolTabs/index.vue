<template>
  <section class="inner-routes">
    <div class="taps">
      <div
        @click="activeTap = 1"
        :class="activeTap === 1 ? 'active' : ''"
        class="tap"
      >
        الصفوف الدراسية
      </div>
      <div
        @click="activeTap = 2"
        :class="activeTap === 2 ? 'active' : ''"
        class="tap"
      >
        تسجيل الموظفين
      </div>
      <div
        @click="activeTap = 3"
        :class="activeTap === 3 ? 'active' : ''"
        class="tap"
      >
        تسجيل الطلاب
      </div>
    </div>
    <div class="content">
      <div class="row">
        <transition name="fade">
          <div class="col-12 px-0" v-if="activeTap === 1">
            <slot name="classes"></slot>
          </div>
          <div class="col-12 px-0" v-if="activeTap === 2">
            <slot name="staff-enroll"></slot>
          </div>
          <div class="col-12 px-0" v-if="activeTap === 3">
            <slot name="student-enroll"></slot>
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
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
